---
title: 构建基本环境
date: 2020-07-27 22:50:27
---

## webpack 基本概念

```js
module.exports = {
  entry: '', // 打包入口：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
  output: '', // 出口
  resolve: {}, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
  devServer: {}, // 开发服务器：run dev/start 的配置，如端口、proxy等
  module: {}, // 模块配置：配置loader（处理非 JavaScript 文件，比如 less、sass、jsx、图片等等）等
  plugins: [] // 插件的配置：打包优化、资源管理和注入环境变量,
  mode: 'development'
}
```

- --mode production 生产环境
  - 提供 uglifyjs-webpack-plugin 代码压缩
  - 不需要定义 new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }) 默认 production
  - 默认开启 NoEmitOnErrorsPlugin -> optimization.noEmitOnErrors, 编译出错时跳过输出，以确保输出资源不包含错误
  - 默认开启 ModuleConcatenationPlugin -> optimization.concatenateModules, webpack3 添加的作用域提升(Scope Hoisting)
- --mode development 开发环境
  - 使用 eval 构建 module, 提升增量构建速度
  - 不需要定义 new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }) 默认 development
  - 默认开启 NamedModulesPlugin -> optimization.namedModules 使用模块热替换(HMR)时会显示模块的相对路径

## 开始

```js
// package.json 添加打包命令
"scripts": {
  "build": "webpack"
}
```

新建 `webpack.config.js` 文件配置 `webpack`

## 打包 HTML

使用 [html-webpack-plugin](https://webpack.docschina.org/plugins/html-webpack-plugin/) 插件来将 HTML 引用路径和我们的构建结果关联起来。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
    filename: '[name].[hash:8].js'
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
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    }) // 抽离样式文件
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

### 打包 less

```js
less less-loader
```

新增 rules

```js
{
  test: /.less$/,
  use: [
    MiniCssExtractPlugin.loader, // 取代 style-loader：提取 js 中的 css 到独立文件中
    'css-loader', // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
    {
      loader: 'postcss-loader', // 兼容性处理
      options: {
        // 在没有任何配置的情况下，postcss-preset-env会开启stage 2阶段的特性并支持所有浏览器。
        plugins: [require('postcss-preset-env')] // postcss-preset-env 集成了 autoprefixer。
      }
    },
    'less-loader' // less less-loader
  ]
},
```

## 打包图片

```js
url-loader file-loader html-loader
```

- `file-loader`: 可以用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回。
- `url-loader` 可以看作是增强版的 file-loader, 它可以把图片编码成 base64 格式写进页面。

```js
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader', // 下载 url-loader file-loader
      options: {
        outputPath: 'images/', //输出到images文件夹
        limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
        name: '[hash:10].[ext]', // 原来是什么格式的图片就被打包成什么格式，哈希值取 10 位
      }
    }
  ]
},
```

如果在 html 中引入图片

```html
<img src="./render.png" alt="" />
```

会发现不生效的，所以要使用 `html-loader` 进行处理。

因为 `url-loader` 默认使用 `es6 module` 解析，而 `html-loader` 是 `commonJS` 解析，解析会出现问题 解决：关闭 `url-loader` `es6 module`，使用 `commonJS` 规范。

```js {9}
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader', // 下载 url-loader file-loader
      options: {
        outputPath: 'images/', //输出到images文件夹
        limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
        name: '[hash:10].[ext]', // 原来是什么格式的图片就被打包成什么格式，哈希值取 10 位
        esModule: false
      }
    }
  ]
},
{
  test: /\.html$/,
  loader: 'html-loader' // 处理 html 文件的 img 图片, 使其从而被 url-loader 解析
}
```

## 打包 JS

```bash
babel-loader @babel/core # 只能转换基本的 js 语法，比如 const -> var

# 只能转义 async await 之类的 es6 语法
@babel/preset-env

# Babel 默认只转换新的 JavaScript 句法（syntax），
# 而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象
# polyfill 会全局兼容 js
@babel/polyfill

# @babel/polyfill 注意点：
# babel-polyfill 会污染全局作用域,
# 如引入 Array.prototype.includes 修改了 Array 的原型，除此外还有 String...
# babel-polyfill 引入新的对象： Promise、WeakMap 等，构成打包体积大


# 需要做兼容性处理 做到按需加载 core-js

# 提取辅助函数。ES6 转码时，babel 会需要一些辅助函数，
# 例如 _extend。babel 默认会将这些辅助函数内联到每一个 js 文件里，
@babel/runtime

# 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小。
# babel-runtime 更像是分散的 polyfill 模块，需要在各自的模块里单独引入，
# 借助 transform-runtime 插件来自动化处理这一切，
# 也就是说你不要在文件开头 import 相关的 polyfill，你只需使用，transform-runtime 会帮你引入。
@transform-runtime
```

```bash
yarn add babel-loader @babel/core @babel/preset-env
yarn add @babel/runtime-corejs2 @babel/runtime @babel/plugin-transform-runtime
```

新增 rule

```js
{
  test: /\.m?js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
}
```

`.babelrc`

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 按需加载
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [["@babel/plugin-transform-runtime", { "corejs": 2 }]]
}
```

## 插件

### clean-webpack-plugin

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

plugins: [
  new CleanWebpackPlugin()
  // ...
]
```

### ProgressPlugin

```js
const webpack = require('webpack')

plugins: [
  new webpack.ProgressPlugin(),
  new CleanWebpackPlugin()
  // ...
]
```

## 减少 resolve 的解析，配置别名

如果我们可以精简 resolve 配置，让 webpack 在查询模块路径时尽可能快速地定位到需要的模块，不做额外的查询工作，那么 webpack 的构建速度也会快一些

```js
resolve: {
  /**
   * alias: 别名的配置
   *
   * extensions: 自动解析确定的扩展,
   *    比如 import 'xxx/theme.css' 可以在extensions 中添加 '.css'， 引入方式则为 import 'xxx/theme'
   *    @default ['.wasm', '.mjs', '.js', '.json']
   *
   * modules 告诉 webpack 解析模块时应该搜索的目录
   *   如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
   *   这样配置在某种程度上可以简化模块的查找，提升构建速度 @default node_modules 优先
   */
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  modules: [path.resolve(__dirname, 'src'), 'node_modules']
}
```

## splitChunks

假如你 a.js 和 b.js 都 import 了 c.js 文件，这段代码就冗杂了。为什么要提取公共代码，简单来说，就是减少代码冗余，提高加载速度。

```js
optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // 抽离自己写的公共代码
          chunks: 'initial',
          name: 'common', // 打包后的文件名，任意命名
          minChunks: 2, //最小引用2次
          minSize: 0 // 只要超出0字节就生成一个新包
        },
        styles: {
          name: 'styles', // 抽离公用样式
          test: /\.css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true
        },
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        }
      }
    }
  }
```

## webpack-dev-server

webpack-dev-server 是 webpack 官方提供的一个工具，可以基于当前的 webpack 构建配置快速启动一个静态服务。当 mode 为 development 时，会具备 hot reload 的功能，即当源码文件变化时，会即时更新当前页面，以便你看到最新的效果。...

```bash
yarn add webpack-dev-server
```

```js
"dev": "webpack-dev-server --mode development"
```

```js
module.exports = {
  // 配置开发服务器
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

    proxy: {
      '/api': {
        target: 'http://localhost:6000', // 转发代理
        // 发送请求时 请求路径重写, /api/xxx --> /xxx
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

## 模块热替换(hot module replacement)

```js
const webpack = require('webpack')

module.exports = {
  devServer: {
    //...
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    //...
  ]
}
```

配置后还不行，因为 webpack 还不知道你要更新哪里, 修改 src/index.js 文件, 添加

```js
if (module.hot) {
  module.hot.accept()
}
```

- [代码路径](https://gitee.com/alvin0216/webpack-demo)
- [旧文：webpack4.0 入门篇 - 构建前端开发的基本环境](https://juejin.im/post/5bb089e86fb9a05cd84935d0)
