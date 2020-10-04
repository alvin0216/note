---
title: 概览
date: 2020-07-29 06:56:27
---

<span class='mgreen'>开发环境性能优化</span>

- 优化打包构建速度
  - HMR
- 优化代码调试
  - source-map

<span class='mgreen'>生产环境性能优化</span>

- 优化打包构建速度
  - oneOf
  - babel 缓存
  - 多进程打包
  - externals
  - dll
- 优化代码运行的性能

  - 缓存(hash-chunkhash-contenthash)
  - tree shaking
  - code split
  - 懒加载/预加载
  - pwa

## 开发环境性能优化

### 模块热加载(HMR)

模块热加载，不用每次打包运行。

安装 `webpack-dev-server`, 添加 `devServer` 配置：

```js
// webpack-dev-server --mode development
mode: 'development',
devServer: {
  port: 1234,
  // 运行代码的目录
  contentBase: path.resolve(__dirname, 'dist'),
  watchContentBase: true, // 监视目录下的所有文件，文件变化则 reload
  watchOptions: {
    ignored: /node_modules/ // 忽略目录
  },
  open: true, // 自动打开浏览器
  compress: true, // 服务器压缩
  hot: true, // 开启 HMR
  quiet: true, //除了一些基本启动信息外，其他内容不显示
  overlay: false, // 如果出错了 不要全屏显示
}
```

在需要热加载的入口添加

```js
if (module.hot) {
  module.hot.accept()
}
```

了解更多请查阅官方文档。

### 优化代码调试(source-map)

`source-map`: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

| 字段                    | 方式                      | 描述                                                                                           |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| source-map              | 外部                      | 错误代码准确信息 和 源代码的错误位置                                                           |
| inline-source-map       | 只生成一个内联 source-map | 错误代码准确信息 和 源代码的错误位置                                                           |
| hidden-source-map       | 外部                      | 错误代码错误原因，但是没有错误位置。 不能追踪源代码错误， <br />只能提示到构建后代码的错误位置 |
| eval-source-map         | 内联                      | 每一个文件都生成对应的 source-map，都在 eval <br /> 错误代码准确信息 和 源代码的错误位置       |
| nosources-source-map    | 外部                      | 错误代码准确信息, 但是没有任何源代码信息                                                       |
| cheap-source-map        | 外部                      | 错误代码准确信息 和 源代码的错误位置。只能精确的行                                             |
| cheap-module-source-map | 外部                      | 错误代码准确信息 和 源代码的错误位置。module 会将 loader 的 source map 加入                    |

内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

<span class='mgreen'>开发环境：速度快，调试更友好</span>

- 速度快(eval>inline>cheap>...): `eval-cheap-source-map` `eval-source-map`
- 调试更友好: `source-map` `cheap-module-source-map` `cheap-source-map`

推荐 --> `eval-source-map` / `eval-cheap-module-source-map`

<span class='mgreen'>生产环境：源代码要不要隐藏? 调试要不要更友好</span>

内联会让代码体积变大，所以在生产环境不用内联

- `nosources-source-map` 全部隐藏
- `hidden-source-map` 只隐藏源代码，会提示构建后代码错误信息

真的要用 map 的话--> `source-map` / `cheap-module-source-map`

```js
devtool: 'eval-source-map'
```

## 生产环境性能优化

### oneOf

`webpack` 原本的 loader 是将每个文件都过一遍，比如有一个 js 文件 rules 中有 10 个 loader，第一个是处理 js 文件的 loader，当第一个 loader 处理完成后 webpack 不会自动跳出，而是会继续拿着这个 js 文件去尝试匹配剩下的 9 个 loader，相当于没有 break。

而 oneOf 就相当于这个 break

```js {9}
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    enforce: 'pre',
    loader: 'eslint-loader'
  },
  {
    oneOf: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
          //...
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      //...
    ]
  }
]
```

在 oneOf 里面的 loader 一旦匹配成功则会跳出匹配，相当于 break 语句。

注意如果处理了同个 js ，比如用了 `eslint` 和 `babel-loader`，匹配中了 `eslint` 后 后面将不再匹配，所以需要提取出去。

### 缓存

```js
/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样    
      --> 让代码上线运行缓存更好使用
*/
```

<span class='mgreen'>babel 缓存</span>

我们写代码的时候，会经常写 js 代码，结构和样式相对少一点。

为什么要对 babel 进行缓存呢？bebel 主要对 js 文件进行编译处理，假设我们有 100 个 js 模块，我只改动一个 js 模块，这样不需要把所有的东西再编译一次，应该是编译修改后的文件，其他 99 个文件都不会变。

这个和 `HMR` 很像，但是生产环境不会用到 HMR 的。

**babel 缓存 先对 100 个文件进行缓存，再打包发现文件没变化。直接使用缓存而不会直接编译。** 直接添加 `cacheDirectory`

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

<span class='mgreen'>文件缓存</span>

```js
output: {
  path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
  filename: 'js/bundle.[contenthash:10].js'
}

// plugins

new MiniCssExtractPlugin({
  filename: 'css/main.[contenthash:10].css'
}), // 抽离样式文件
```

注意要关闭 `HotModuleReplacementPlugin`, 这是生产环境而不是开发环境。

### 删除冗杂代码(tree-shaking)

```js
/*
  tree shaking：去除无用代码
    前提：1. 必须使用ES6模块化  2. 开启production环境
    作用: 减少代码体积

    在package.json中配置 
      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
        问题：可能会把css / @babel/polyfill （副作用）文件干掉
      "sideEffects": ["*.css", "*.less"]
*/
```

<span class='mgreen'>demo</span>

```js
// test.js
export const add = (a, b) => a + b
export const minus = (a, b) => a - b

// index.js
import { add } from './test'
console.log(add(1, 2))
```

这里使用 使用 ES6 模块化，开启 `production` 环境打包后会发现效果出来了。`tree-shaking` 的知识下次再单独研究，因为有很多值得思考的地方。

相关链接：

- [Tree-Shaking 性能优化实践 - 原理篇](https://juejin.im/post/5a4dc842518825698e7279a9)
- [Tree-Shaking 性能优化实践 - 实践篇](https://juejin.im/post/5a4dca1d518825128654fa78)
- [如何使用 Tree-shaking 减少代码构建体积](https://juejin.im/post/5e54d5e7e51d4526c932b60f)

### 代码分割(code split)

常用有拆包

```js
/*
  1. 可以将node_modules中代码单独打包一个chunk最终输出
  2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
*/
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

什么作用呢？比如 `index.js` 引入 `jquery`

```js
import $ from 'jquery'

console.log($)
console.log(123)
```

```js
// 不加 splitChunks
main.0d1a4b0979.js   88.9 KiB

// 加了 splitChunks
main.35ad2e97e5.js           1.6 KiB
vendors~main.17b2d7e07c.js   87.9 KiB
```

<span class='mgreen'>如果要让某个文件被单独打包成一个 chunk</span>

```js
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName: 'test' */ './test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    console.log(mul(2, 5))
  })
  .catch(() => {
    console.log('文件加载失败~')
  })
```

### 懒加载/预加载

```js
// import { mul } from './test'

document.getElementById('btn').onclick = function() {
  // 懒加载~：当文件需要使用时才加载~
  // 预加载 prefetch：会在使用之前，提前加载js文件
  // 正常加载可以认为是并行加载（同一时间加载多个文件）
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName: 'test', webpackPrefetch: true */ './test').then(({ mul }) => {
    console.log(mul(4, 5))
  })
}
```

### 多进程打包

下载 `thead-loader`，打包 js

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    /*
      开启多进程打包。
      进程启动大概为600ms，进程通信也有开销。
      只有工作消耗时间比较长，才需要多进程打包
    */
    {
      loader: 'thread-loader',
      options: {
        workers: 2 // 进程2个
      }
    },
    {
      loader: 'babel-loader',
      options: {
        // 开启babel缓存
        // 第二次构建时，会读取之前的缓存
        cacheDirectory: true
      }
    }
  ]
}
```

相关文章：[Webpack 升级优化小记：happyPack+dll 初体验](https://juejin.im/post/5bfa696d51882579117f7d26)

### externals

比如我们用了 `jquery` 模块，但是这个 `jquery` 是通过 `cdn` 引入的。所以不希望 `webpack` 也将 `jquery` 打包进来。就需要加 `externals`

```JSX
// index.html
<script src='https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js'></script>

// index.js
import $ from 'jquery'

console.log($)
```

`webpack` 配置：

```js
externals: {
  // 拒绝jQuery被打包进来
  jquery: 'jQuery'
}
```

### 打包第三方库(dll)

项目中难免会使用一些第三方的库，除非版本升级，一般情况下，这些库的代码不会发生较大变动，这也就意味着这些库没有必要每次都参与到构建和 rebuild 的过程中。如果能把这部分代码提取出来并提前构建好，那么在构建项目的时候就可以直接跳过第三方库，进一步提升效率。

<span class='mgreen'>换言之即清理不必要打包的文件</span>

1. `新建 webpack.dll.js`

```js
/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
*/

const { resolve } = require('path')
const webpack = require('webpack')

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
}
```

打包好 dll 文件，通过 `add-asset-html-webpack-plugin'` 引入：

```js
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

plugins: [
  // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
  }),
  // 将某个文件打包输出去，并在html中自动引入该资源
  new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
  })
]
```
