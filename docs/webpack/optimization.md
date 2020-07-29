---
title: 配置优化（上）
date: 2020-07-29 06:56:27
---

<span class='pink'>开发环境性能优化</span>

- 优化打包构建速度
  - HMR
- 优化代码调试
  - source-map

<span class='pink'>生产环境性能优化</span>

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

<span class='pink'>开发环境：速度快，调试更友好</span>

- 速度快(eval>inline>cheap>...): `eval-cheap-source-map` `eval-source-map`
- 调试更友好: `source-map` `cheap-module-source-map` `cheap-source-map`

推荐 --> `eval-source-map` / `eval-cheap-module-source-map`

<span class='pink'>生产环境：源代码要不要隐藏? 调试要不要更友好</span>

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

<span class='pink'>babel 缓存</span>

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

<span class='pink'>文件缓存</span>

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
