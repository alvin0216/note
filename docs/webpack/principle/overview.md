---
title: 简单实现 webpack
date: 2020-08-24 21:08:06
---

## 概述

> `webpack` 是一个打包模块化 js 的工具，可以通过 `loader` 转换文件，通过 `plugin` 扩展功能。

<!-- 先看下简单的 `webpack` 基础配置：

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
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  mode: 'production'
}
``` -->

**主要步骤**

- 通过 `entry` 分析入口文件，递归去读取模块内依赖的文件内容，生成 `AST` 语法树。
- 根据 `AST` 语法树，生成浏览器等能够运行的代码

**实现细节**

- 获取主模块内容
- 分析模块内容 转化为 AST
- 对模块内容进行处理
  - 遍历 AST，收集依赖
  - 将 es6 转化为 es5
- 递归所有模块
- 生成最终代码

目录

```bash
├── package.json
├── src
│   ├── add.js
│   ├── index.js
│   └── max.js
└── build.js # 打包文件
```

需要打包的文件

```js
// add.js
export default (x, y) => x + y

// max.js
export default (x, y) => Math.max(x, y)

// index.js
import add from './add.js'
import max from './max.js'

console.log(add(1, 2))
console.log(max(1, 2))
```

## 获取模块内容

```js
// build.js
// 获取主入口文件
const fs = require('fs')
const getModuleInfo = file => {
  const body = fs.readFileSync(file, 'utf-8') // body 为主题内容
}
getModuleInfo('./src/index.js')
```

## 分析模块内容 转化为 AST

`@babel/parser`：可以用于接受一段代码，生成一段 Babel AST 格式的 AST

```diff
  const fs = require('fs')
+ const parser = require('@babel/parser')
  const getModuleInfo = file => {
    const body = fs.readFileSync(file, 'utf-8') // body 为主题内容
+   const ast = parser.parse(body, {
+     sourceType: 'module' // 表示解析的是 es6 模块
+   })
  }
  getModuleInfo('./src/index.js')
```

我们可以打印 `ast.program.body` 看看

```js
[Node {
  type: 'ImportDeclaration',
  start: 0,
  end: 26,
  loc: SourceLocation { start: [Position], end: [Position] },
  specifiers: [ [Node] ],
  source: Node {
    type: 'StringLiteral',
    start: 16,
    end: 26,
    loc: [SourceLocation],
    extra: [Object],
    value: './add.js'
  }
},
Node {
  type: 'ImportDeclaration',
  start: 27,
  end: 53,
  loc: SourceLocation { start: [Position], end: [Position] },
  specifiers: [ [Node] ],
  source: Node {
    type: 'StringLiteral',
    start: 43,
    end: 53,
    loc: [SourceLocation],
    extra: [Object],
    value: './max.js'
  },
  // ...
]
```

## 对模块内容进行处理

### 遍历 AST，收集依赖

现在我们需要 遍历 AST，将用到的依赖收集起来。什么意思呢？其实就是将用 `import` 语句引入的文件路径收集起来。我们将收集起来的路径放到 `deps` 里。

譬如 `index.js` 引入 `add.js`, `add.js` 也可能引入其他 js 文件...收集依赖就是用于后面递归所有模块。

遍历 AST 要用到 `@babel/traverse` 依赖包

```js
const traverse = require('@babel/traverse').default
const path = require('path')

const getModuleInfo = file => {
  // ...
  const deps = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
    }
  })
}
```

- `ImportDeclaration`：对 type 类型为 `ImportDeclaration` 的节点的处理.
- `node.source.value` 其实就是 `import` 的值, 也即 `'./add.js'`, `'./max.js'`

```js
import add from './add.js'
import max from './max.js'
```

然后我们将 file 目录路径跟获得的 value 值拼接起来保存到 deps 里

```js
// 此时 deps
{ './add.js': './src/add.js', './max.js': './src/max.js' }
```

### 将 ES6 转化为 ES5 的 AST

我们需要把获得的 ES6 的 AST 转化成 ES5 的 AST，执行这一步需要两个依赖包 `@babel/core` `@babel/preset-env`

我们现在将依赖引入并使用：

```js {22,23,24}
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser') // str 转化为 AST
const traverse = require('@babel/traverse').default // 遍历 AST
const babel = require('@babel/core')

const getModuleInfo = file => {
  const body = fs.readFileSync(file, 'utf-8') // body 为主题内容
  const ast = parser.parse(body, {
    sourceType: 'module' // 表示解析的是 es6 模块
  })

  const deps = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
    }
  })

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })

  return { file, deps, code }
}

getModuleInfo('./src/index.js')
```

code 结果：

```js
'use strict'

var _add = _interopRequireDefault(require('./add.js'))
var _max = _interopRequireDefault(require('./max.js'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

console.log((0, _add['default'])(1, 2))
```

可见 它将我们写 `const` 转化成 `var` 了

## 递归获取所有依赖

```js
const parseModules = file => {
  const entry = getModuleInfo(file)
  const moduleList = [entry]

  for (let i = 0; i < moduleList.length; i++) {
    const { deps } = moduleList[i]
    if (deps) {
      for (const key in deps) {
        if (deps.hasOwnProperty(key)) {
          moduleList.push(getModuleInfo(deps[key]))
        }
      }
    }
  }
}
parseModules('./src/index.js')
```

moduleList:

```JS
[
  {
    file: './src/index.js',
    deps: { './add.js': './src/add.js', './max.js': './src/max.js' },
    code: '"use strict";\n\nvar _add = ' +
      '_interopRequireDefault(require("./add.js"));\n\nvar _max = ' +
      '_interopRequireDefault(require("./max.js"));\n\nfunction ' +
      '_interopRequireDefault(obj) { return obj && obj.__esModule ? ' +
      'obj : { "default": obj }; }\n\nconsole.log((0, ' +
      '_add["default"])(1, 2));\nconsole.log((0, _max["default"])(1, ' +
      '2));'
  },
  {
    file: './src/add.js',
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: ' +
      'true\n});\nexports["default"] = void 0;\n\n// add.js\nvar _default = ' +
      'function _default(x, y) {\n  return x + y;\n};\n\nexports["default"] = ' +
      '_default;'
  },
  {
    file: './src/max.js',
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, ' +
      '"__esModule", {\n  value: true\n});\nexports["default"] = ' +
      'void 0;\n\n// max.js\nvar _default = function _default(x, ' +
      'y) {\n  return Math.max(x, y);\n};\n\nexports["default"] = ' +
      '_default;'
  }
]
```

不过现在的 `moduleList` 数组里的对象格式不利于后面的操作，我们希望是以文件的路径为 `key，{code，deps}` 为值的形式存储。因此，我们创建一个新的对象 `depsGraph`。

```js
const parseModules = file => {
  //...
  let depsGraph = {}
  moduleList.forEach(moduleInfo => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code
    }
  })
  return depsGraph
}
```

## 处理两个关键字

我们现在的目的就是要生成一个 bundle.js 文件，也就是打包后的一个文件。其实思路很简单，就是把 index.js 的内容和它的依赖模块整合起来。然后把代码写到一个新建的 js 文件。

我们把这段代码格式化一下

```js
// index.js
'use strict'

var _add = _interopRequireDefault(require('./add.js'))
var _max = _interopRequireDefault(require('./max.js'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

console.log((0, _add['default'])(1, 2))
console.log((0, _max['default'])(1, 2))

// add.js
var _default = function _default(x, y) {
  return x + y
}

exports['default'] = _default
```

但是我们现在是不能执行 `index.js` 这段代码的，因为浏览器不会识别执行 `require` 和 `exports`, 也即浏览器不支持 `commonjs` 语法.

我们创建一个函数

```js
const bundle = file => {
  const depsGraph = JSON.stringify(parseModules(file))
}
```

我们将上一步获得的 `depsGraph` 保存起来。

现在返回一个整合完整的字符串代码。

怎么返回呢？更改下 `bundle` 函数

```js
const bundle = file => {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function (graph) {
      function require(file) {
          function absRequire(relPath) {
              return require(graph[file].deps[relPath])
          }
          var exports = {};
          (function (require,exports,code) {
              eval(code)
          })(absRequire,exports,graph[file].code)
          return exports
      }
      require('${file}')
  })(${depsGraph})`
}

const content = bundle('./src/index.js')
```

最终会打包为：

```js
;(function(graph) {
  function require(file) {
    function absRequire(relPath) {
      return require(graph[file].deps[relPath])
    }
    var exports = {}
    ;(function(require, exports, code) {
      eval(code)
    })(absRequire, exports, graph[file].code)
    return exports
  }
  require('./src/index.js')
})({
  './src/index.js': {
    deps: { './add.js': './src/add.js', './max.js': './src/max.js' },
    code:
      '"use strict";\n\nvar _add = _interopRequireDefault(require("./add.js"));\n\nvar _max = _interopRequireDefault(require("./max.js"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n\nconsole.log((0, _add["default"])(1, 2));\nconsole.log((0, _max["default"])(1, 2));'
  },
  './src/add.js': {
    deps: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\n\n// add.js\nvar _default = function _default(x, y) {\n  return x + y;\n};\n\nexports["default"] = _default;'
  },
  './src/max.js': {
    deps: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\n\n// max.js\nvar _default = function _default(x, y) {\n  return Math.max(x, y);\n};\n\nexports["default"] = _default;'
  }
})
```

## 最终代码

```js
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser') // str 转化为 AST
const traverse = require('@babel/traverse').default // 遍历 AST
const babel = require('@babel/core')

const getModuleInfo = file => {
  const body = fs.readFileSync(file, 'utf-8') // body 为主题内容
  const ast = parser.parse(body, {
    sourceType: 'module' // 表示解析的是 es6 模块
  })

  const deps = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
    }
  })

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })

  return { file, deps, code }
}

const parseModules = file => {
  const entry = getModuleInfo(file)
  const moduleList = [entry]

  for (let i = 0; i < moduleList.length; i++) {
    const { deps } = moduleList[i]
    if (deps) {
      for (const key in deps) {
        if (deps.hasOwnProperty(key)) {
          moduleList.push(getModuleInfo(deps[key]))
        }
      }
    }
  }

  // 新增代码
  let depsGraph = {}
  moduleList.forEach(moduleInfo => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code
    }
  })

  return depsGraph
}

const bundle = file => {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function (graph) {
      function require(file) {
          function absRequire(relPath) {
              return require(graph[file].deps[relPath])
          }
          var exports = {};
          (function (require,exports,code) {
              eval(code)
          })(absRequire,exports,graph[file].code)
          return exports
      }
      require('${file}')
  })(${depsGraph})`
}

const content = bundle('./src/index.js')

!fs.existsSync('./dist') && fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content)
```

---

推荐文章 [凹凸实验室- Webpack 原理浅析](https://juejin.im/post/6854818576470933512)
