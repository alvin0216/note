---
title: webpack 怎么构建优化？
date: 2020-07-24 21:08:06
sidebar: 'auto'
tags:
  - Webpack
  - 性能优化
categories:
  - Webpack
---

不要死记硬背，从根本解决方法出发。

- 首先是构建项目的速度太慢则需要考虑缓存、开启多线程、打包成 dll、挑选适当的 sourceMap 等等。
- 生产环境的构建：通过 `webpack-bundle-analyzer` 分析打包后的结果针对性的进行拆包，转化 moment 等

## 构建速度慢

### 减少模块解析

:::: tabs

::: tab 减少模块解析

1. loader 范围缩小到 src 项目文件！一些不必要的 loader 能关就关了吧
2. eslint 代码校验其实是一个很费时间的一个步奏。 ：可以把 eslint 的范围缩小到 src,且只检查*.ts 和 *.tsx ：生产环境不开启 lint，使用 pre-commit 或者 husky 在提交前校验
3. 利用缓存

:::

::: tab 关于利用缓存

我们写代码的时候，会经常写 js 代码，结构和样式相对少一点。

为什么要对 babel 进行缓存呢？bebel 主要对 js 文件进行编译处理，假设我们有 100 个 js 模块，我只改动一个 js 模块，这样不需要把所有的东西再编译一次，应该是编译修改后的文件，其他 99 个文件都不会变。

babel 缓存 先对 100 个文件进行缓存，再打包发现文件没变化。直接使用缓存而不会直接编译。 直接添加 `cacheDirectory`

```js
 {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    // 开启babel缓存
    // 第二次构建时，会读取之前的缓存
    cacheDirectory: true
  }
}
```

:::

::::

### happypack 开启多线程打包

:::: tabs

::: tab happypack 让你 happy

如同这个插件的名字一样，用完之后确实能让人 happy，打包速度提升的不是一星半点，原理就是开启多个 node 子进程并行的用各种 loader 去处理待打包的源文件。

:::

::: tab 代码实操

略...

大概是：

```js
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 手动创建进程池

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: 'happypack/loader?id=babelInside' // id = babelInside
      }
    ]
  },

  // ...
  plugins: [
    // ...
    new HappyPack({
      id: 'babelInside',
      threadPool: happyThreadPool, // 指定进程池
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),

            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: { ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]' }
                  }
                }
              ]
            ],
            cacheDirectory: true,
            cacheCompression: isEnvProduction,
            compact: isEnvProduction
          }
        }
      ]
    })
  ]
};
```

:::

::::

### 用 dll 剥离第三方库

:::: tabs
::: tab 用 dll 剥离第三方库

项目中难免会使用一些第三方的库，除非版本升级，一般情况下，这些库的代码不会发生较大变动，这也就意味着这些库没有必要每次都参与到构建和 rebuild 的过程中。如果能把这部分代码提取出来并提前构建好，那么在构建项目的时候就可以直接跳过第三方库，进一步提升效率，换言之即清理不必要打包的文件。

注意一点

:::

::: tab 代码实操
新建 `webpack.dll.js`

```js
/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
*/

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json --> 提供和jquery映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};
```

打包好 dll 文件，通过 `add-asset-html-webpack-plugin` 引入：

```js
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

plugins: [
  // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
  }),
  // 将某个文件打包输出去，并在html中自动引入该资源
  new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
  })
];
```

:::

::::

### externals 跳过 cdn 引入的包

比如我们用了 `jquery` 模块，但是这个 `jquery` 是通过 cdn 引入的。所以不希望 webpack 也将 `jquery` 打包进来。就需要加 `externals`

```js
// index.html
<script src='https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js'></script>;

// index.js
import $ from 'jquery';

console.log($);
```

`webpack` 配置：

```js
externals: {
  // 拒绝jQuery被打包进来
  jquery: 'jQuery';
}
```
