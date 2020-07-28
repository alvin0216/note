---
title: 打包样式、html、以及图片资源
date: 2020-07-27 22:50:27
---

## 打包 HTML

使用 [html-webpack-plugin](https://webpack.docschina.org/plugins/html-webpack-plugin/) 插件来将 HTML 引用路径和我们的构建结果关联起来。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: './public/index.html', // 配置要被编译的html文件
      hash: true,
      // 压缩 => production 模式使用
      minify: {
        removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true //折叠 html 为一行
      }
    })
  ]
}
```

## 打包样式

```js
// src/index.js
import './index.css'
```

### 打包 CSS 到 JS 中

```js
const path = require('path')

module.exports = {
  //...

  module: {
    /**
     * test: 匹配特定条件。一般是提供一个正则表达式或正则表达式的数组
     * include: 匹配特定条件。一般是提供一个字符串或者字符串数组
     * exclude: 排除特定条件
     * and: 必须匹配数组中的所有条件
     * or: 匹配数组中任何一个条件,
     * nor: 必须排除这个条件
     * use: 数组中的 loader 执行顺序，由左到右，由下到上 依次执行
     */
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader', // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
          'css-loader' // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
        ]
      }
    ]
  }
}
```

经由上述两个 loader 的处理后，CSS 代码会转变为 JS， 如果需要单独把 CSS 文件分离出来，我们需要使用 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 插件

### 把 CSS 文件分离出来

```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  //  ...

  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          // 'style-loader', // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
          MiniCssExtractPlugin.loader, // 取代 style-loader：提取 js 中的 css 到独立文件中
          'css-loader' // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
        ]
      }
    ]
  },

  plugins: [
    // ...,
    new MiniCssExtractPlugin()
  ]
}
```

### CSS 兼容性处理

考虑到浏览器兼容问题，如 transform 属性，需要添加浏览器前缀以适配其他浏览器。故使用到 `postcss-loader` 这个 `loader`。`postcss-preset-env` 帮助 `postcss` 识别环境，加载配置。

```js
postcss-loader  postcss-preset-env
```

```js
module: {
  rules: [
    {
      test: /.css$/,
      use: [
        // 'style-loader', // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
        MiniCssExtractPlugin.loader, // 取代 style-loader：提取 js 中的 css 到独立文件中
        'css-loader', // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
        {
          loader: 'postcss-loader', // 兼容性处理
          options: {
            // 在没有任何配置的情况下，postcss-preset-env会开启stage 2阶段的特性并支持所有浏览器。
            plugins: [require('postcss-preset-env')] // postcss-preset-env 集成了 autoprefixer。
          }
        }
      ]
    }
  ]
}
```

`package.json` 配置 `browserList`

```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```

### 压缩 css 文件

[optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

```bash
npm i optimize-css-assets-webpack-plugin
```

```js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  plugins: [
    // ,,,,
    new OptimizeCssAssetsPlugin()
  ]
}
```
