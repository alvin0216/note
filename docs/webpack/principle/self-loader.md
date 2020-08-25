---
title: 手写 loader
date: 2020-08-25 10:41:35
---

loader 用于对模块的源代码进行转换。比如 `scss、less -> css`，`img -> data URL`

## 一个简单的 loader

先来一个简单的 demo：

```bash
├── loaders
│   ├── one.js
│   └── two.js
├── package.json
├── src
│   └── index.js
└── webpack.config.js
```

```js
// index.js
console.log('name: alvin')

// webpack.config.js
const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [{ test: /\.js$/, use: './loaders/one.js' }]
  },

  mode: 'development'
}
```

`loaders/one.js`

```js
module.exports = function(source) {
  return source.replace(/name/g, '姓名')
}
```

执行 `webpack` 打包后可以发现，`name` 字段替换为了 `"姓名"`

## 获取 loader 中的 options

我们可以在 loader 配置中加入 options 字段。而 loader 中获取的方式可以通过 `loader-utils`

除了 `loader-utils` 之外包还有 `schema-utils` 包，我们可以用 `schema-utils` 提供的工具，获取用于校验 `options` 的 JSON Schema 常量，从而校验 loader options。

```js
rules: [
  {
    test: /\.js$/,
    use: [
      {
        loader: './loaders/one.js',
        options: { color: 'red', num: 2 }
      }
    ]
  }
]
```

使用工具包：

```js
const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')

const schema = {
  type: 'object',
  properties: {
    color: { type: 'string', description: '颜色变量' },
    num: { type: 'number' }
  }
}

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) // 获取到用户给当前 Loader 传入的 options
  validateOptions(schema, options, 'Example Loader')

  return source.replace(/name/g, '姓名')
}
```

## this.callback

有时候我们不止要 return 一个 resource，还可能要返回多个结果，就需要用到 callback。

```js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
)
```

第一个参数是错误，第二个是结果，第三个是 sourcemap，第四个可以是任何内容（比如元数据）

```js
module.exports = function(source) {
  const result = source.replace(/name/g, '姓名')

  this.callback(null, result)
}
```

## this.async

在 loader 中，如果我们直接调用 setTimeout，就会报错，那么如果我们想进行异步操作要怎么做呢？

```js {2}
module.exports = function(source) {
  const callback = this.async()

  setTimeout(() => {
    const result = source.replace(/name/g, '姓名')
    callback(null, result)
  }, 1000)
}
```

当要使用异步的时候，需要先把 callback 变为 this.callback，然后再返回结果（和 this.callback 一样）。

这样再打包就不会有任何问题。

## 其它 Loader API

| API                       | 描述                                                                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| this.cacheable            | Webpack 会默认缓存所有 Loader 的处理结果，关闭则 `this.cacheable(false)`                                                                                                                                             |
| this.context              | 当前处理文件的所在目录，假如当前 Loader 处理的文件是 /src/main.js，则 this.context 就等于 /src。                                                                                                                     |
| this.resource             | 当前处理文件的完整请求路径，包括 querystring，例如 /src/main.js?name=1。                                                                                                                                             |
| this.resourcePath         | 当前处理文件的路径，例如 /src/main.js。                                                                                                                                                                              |
| this.resourceQuery        | 当前处理文件的 querystring。                                                                                                                                                                                         |
| this.target               | 等于 Webpack 配置中的 Target                                                                                                                                                                                         |
| this.loadModule           | 但 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时， 就可以通过 this.loadModule(request: string, callback: function(err, source, sourceMap, module)) 去获得 request 对应文件的处理结果。 |
| this.resolve              | 像 require 语句一样获得指定文件的完整路径，使用方法为 resolve(context: string, request: string, callback: function(err, result: string))。                                                                           |
| this.addDependency        | 给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 addDependency(file: string)。                                                                                 |
| this.addContextDependency | 和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 addContextDependency(directory: string)。                                                                      |
| this.clearDependencies    | 清除当前正在处理文件的所有依赖，使用方法为 clearDependencies()。                                                                                                                                                     |

---

## 实现 style-loader 和 less-loader

```bash
├── dist
│   ├── bundle.js
│   └── index.html
├── loaders
│   ├── less-loader.js
│   └── style-loader.js
├── src
│   ├── index.js
│   └── index.less
└── webpack.config.js
```

loaders:

```js
// style-loader
module.exports = function(source) {
  let script = `
    let style = document.createElement("style");
    style.innerText = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `
  return script
}

// less-loader
const less = require('less')

module.exports = function(source) {
  this.cacheable()
  less.render(source, (err, result) => {
    this.callback(err, result.css)
  })
}
```

`webpack.config.js`

```js
const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['./loaders/style-loader', './loaders/less-loader']
      }
    ]
  },

  mode: 'development'
}
```

[编写 Loader](http://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/5-3%E7%BC%96%E5%86%99Loader.html)
