---
title: CommonJS 模块的实现
date: 2020-08-01 21:15:27
---

在浏览器中使用 `commonJS` 规范

```jsx
// module1.js
module.exports = 'alvin'

// main.js 通过 require 引入
// 在 node 端执行会输出 alvin，因为 node 采用 commonJS 规范
console.log(require('./module1'))

// html
<script src="./main.js"></script>

// Uncaught ReferenceError: module is not defined
```

## 原理

浏览器不兼容 `CommonJS` 的根本原因，在于缺少四个 `Node.js` 环境的变量

```ts
module exports require global
```

只要能够提供这四个变量，浏览器就能加载 `CommonJS` 模块。

下面是一个简单的示例。

```JSX
// index.html
<script src="./common.js"></script>
<script src="./module1.js"></script>
<script src="main.js"></script>

// common.js
var module = {
  exports: {}
}

(function(module, exports) {
  exports.multiply = function(n) {
    return n * 1000
  }
})(module, module.exports)

// main.js
var f = module.exports.multiply
console.log(f(5)) // 5000
```

上面代码向一个立即执行函数提供 `module` 和 `exports` 两个外部变量，模块就放在这个立即执行函数里面。模块的输出值放在 `module.exports` 之中，这样就实现了模块的加载。

## Browserify

[Browserify](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html) 是目前最常用的 `CommonJS` 格式转换的工具。

```bash
npm i -g browserify
```

demo：

```jsx
// module1.js
module.exports = 'alvin'

// main.js
console.log(require('./module1'))

// 在 html 引入转义后的文件
<script src="bundle.js"></script>
```

使用 `browserify` 编译：

```bash
browserify main.js -o bundle.js
```

## commonJS 模块加载的过程

在浏览器中，加载模块使用 `script` 标签即可，而在 `nodejs` 中，如何在一个模块中，加载另一个模块呢？

通过 `module.exports` 和 `require`。

<span class='mgreen'>【0】缓存加载</span>

再展开介绍 `require()`方法的标识符分析之前，需要知道，与前端浏览器会缓存静态脚本文件以提高性能一样，Node 对引入过的模块都会进行缓存，以减少二次引入时的开销。不同的地方在于，浏览器仅仅缓存文件，而 Node 缓存的是编译和执行之后的对象

<span class='mgreen'>【1】标识符分析</span>

`require()` 方法接受一个标识符作为参数。在 `Node` 实现中，正是基于这样一个标识符进行模块查找的。

```js
require('fs') // 加载核心模块 fs

require('./foo.js') // 加载相对路径下的 foo.js 文件

// 如果不是相对路径，nodejs 会试图去加载核心模块，或 node_modules 内的模块
```

<span class='mgreen'>【2】文件扩展名分析</span>

`require()` 在分析标识符的过程中，会出现标识符中不包含文件扩展名的情况。`CommonJS` 模块规范也允许在标识符中不包含文件扩展名。如 `require('./foo')`

这种情况下，`Node` 会先查找是否存在没有后缀的该文件，如果没有，再按`.js`、`.json`、`.node` 的次序补足扩展名，依次尝试

在尝试的过程中，需要调用 `fs` 模块同步阻塞式地判断文件是否存在。因为 `Node` 是单线程的，所以这里是一个会引起性能问题的地方。小诀窍是：如果是 `.node` 和 `.json` 文件，在传递给 `require()` 的标识符中带上扩展名，会加快一点速度。另一个诀窍是：同步配合缓存，可以大幅度缓解 `Node` 单线程中阻塞式调用的缺陷

<span class='mgreen'>【3】目录分析和包</span>

```js
require('./foo') // foo.js >> foo.json >> foo.node >> foo/index.js ...
```

<span class='mgreen'>【4】访问变量</span>

```js
console.log(module)

// 在 node 运行 main.js
Module {
  id: '.',
  path: '/Users/guosw/Desktop/code/note/test',
  exports: {},
  parent: null,
  filename: '/Users/guosw/Desktop/code/note/test/main.js',
  loaded: false,
  children: [],
  paths: [
     '/Users/guosw/Desktop/code/note/test/node_modules',
     // ...
  ]
}
```

| 参数            | 描述                                           |
| --------------- | ---------------------------------------------- |
| module.id       | 模块的识别符，通常是带有绝对路径的模块文件名。 |
| module.filename | 模块的文件名，带有绝对路径。                   |
| module.loaded   | 返回一个布尔值，表示模块是否已经完成加载。     |
| module.parent   | 返回一个对象，表示调用该模块的模块。           |
| module.children | 返回一个数组，表示该模块要用到的其他模块。     |
| module.exports  | 表示模块对外输出的值。                         |

`module.exports` 就存放模块对外输出的值。

<span class='mgreen'>【5】模块编译</span>

编译和执行是模块实现的最后一个阶段。定位到具体的文件后，Node 会新建一个模块对象，然后根据路径载入并编译。对于不同的文件扩展名，其载入方法也有所不同，具体如下所示

- js 文件——通过 fs 模块同步读取文件后编译执行
- json 文件——通过 fs 模块同步读取文件后，用 JSON.parse()解析返回结果
- node 文件——这是用 C/C++编写的扩展文件，通过 dlopen()方法加载最后编译生成的文件

其余扩展名文件——它们都被当做.js 文件载入

每一个编译成功的模块都会将其文件路径作为索引缓存在 Module.\_cache 对象上，以提高二次引入的性能。

```js
Module._extensions['.json'] = function(module, filename) {
  var content = NativeModule.require('fs').readFileSync(filename, 'utf8')
  try {
    module.exports = JSON.parse(stripBOM(content))
  } catch (err) {
    err.message = filename + ': ' + err.message
    throw err
  }
}
```

**JavaScript 模块的编译**

在编译的过程中，Node 对获取的 JavaScript 文件内容进行了头尾包装。在头部添加了

```JS
(function(exports, require, module, filename, dirname) {})
```

main.js 会被编译为：

```JS
// main.js
module.exports = 'alvin'

// 被编译为
(function (exports, require, module, __filename, __dirname) {
  module.exports = 'alvin'
})
```

这样每个模块文件之间都进行了作用域隔离。包装之后的代码会通过 `vm` 原生模块的 `runInThisContext()` 方法执行(类似 `eval`，只是具有明确上下文，不污染全局)返回一个具体的 `function` 对象。

最后，将当前模块对象的 `exports` 属性、`require()` 方法、`module`(模块对象自身)，以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个 `function()` 执行

这就是这些变量并没有定义在每个模块文件中却存在的原因。在执行之后，模块的 `exports` 属性被返回给了调用方。`exports` 属性上的任何方法和属性都可以被外部调用到，但是模块中的其余变量或属性则不可直接被调用

```js
let content = fs.readFileSync(module.id, 'utf8')
// (function (exports, require, module, __filename, __dirname) { ${content} })
let funcStr = Module.wrap(content)
vm.runInThisContext(funcStr).call(module.exports, module.exports, requireFunc, module)
```

## 代码实现

在介绍完 `Node` 的模块实现之后，回过头来再学习下 `CommonJS` 规范，相对容易理解

```bash
├── module.js  # 主代码实现文件
└── moduleA.js # 被引入的文件 测试文件

# 测试代码 moduleA.js
module.exports = 'alvin'
```

实现 模块化加载：

1. 标识符分析和文件扩展名分析：查找或自动添加后缀名查找。
2. 通过后缀名去进行不同的解析，如果是 js 文件。进行 js 的编译
3. 通过 fs 读取字符串，包装字符串，形成作用域隔离，再通过 vm 执行代码

其中，如果 `Module` 缓存过文件，会直接读取文件结果。

```js
function Module(id) {
  this.id = id
  this.exports = {}
}

Module._cacheModule = {} // 根据绝对路径进行缓存的模块对象

// 测试代码
function requireFunc(path) {
  return Module._load(path) // 加载模块
}

console.log(requireFunc('./moduleA.js'))
```

### 标识符分析，返回路径

实现 `Module._load` 第一步就是对路径进行解析。

```js
Module._load = function(filePath) {
  let fileName = Module._resolveFilename(filePath)
}

// 我们在 Module._extensions 定义不同的编译方式
Module._extensions = {
  '.js': function(module) {},
  '.json': function(module) {}
}

Module._resolveFilename = function(filePath) {
  if (/\.js$|\.json$/.test(filePath)) {
    return path.resolve(__dirname, filePath) // 直接返回路径
  } else {
    // 1. 没有后后缀 自动拼后缀
    // 2. 找不到文件，在通过目录
    let exts = Object.keys(Module._extensions)

    // 文件扩展名分析
    for (let i = 0; i < exts.length; i++) {
      let filename = path.resolve(__dirname, filePath + exts[i])
      if (fs.existsSync(filename)) {
        return filename
      }
    }

    // 目录分析
    for (let i = 0; i < exts.length; i++) {
      let filename = path.resolve(__dirname, filePath + '/index' + exts[i])
      if (fs.existsSync(filename)) {
        return filename
      }
    }

    throw new Error('module not exists')
  }
}
```

### 缓存加载

```js
Module._load = function(filePath) {
  let fileName = Module._resolveFilename(filePath) // 获取到绝对路径

  // 判断缓存中是否有该模块
  if (Module._cacheModule[fileName]) {
    return Module._cacheModule[fileName].exports
  }

  let module = new Module(fileName) // 没有就创建模块 { id: filename, exports: {} }
  Module._cacheModule[fileName] = module // 并将创建的模块添加到缓存
}

// 根据绝对路径进行缓存的模块对象
Module._cacheModule = {}
```

### 编译文件

```js {13,14}
Module._load = function(filePath) {
  let fileName = Module._resolveFilename(filePath) // 获取到绝对路径

  // 判断缓存中是否有该模块
  if (Module._cacheModule[fileName]) {
    return Module._cacheModule[fileName].exports
  }

  let module = new Module(fileName) // 没有就创建模块 { id: filename, exports: {} }
  Module._cacheModule[fileName] = module // 并将创建的模块添加到缓存

  // 加载模块
  tryModuleLoad(module)
  return module.exports
}

// 根据传入的模块，尝试加载模块方法
function tryModuleLoad(module) {
  let ext = path.extname(module.id) //获取扩展名

  // 如果扩展名是js 调用js处理器 如果是json 调用json处理器
  Module._extensions[ext](module) // exports 上就有了数组
}
```

这里定义了 `tryModuleLoad` 尝试解析文件内容，通过 `Module._extensions` 去加载不同的文件. 比如

```js
const vm = require('vm') // 虚拟机模块，沙箱运行，防止变量污染

Module._extensions = {
  '.js': function(module) {
    let content = fs.readFileSync(module.id, 'utf8')
    let funcStr = Module.wrap(content) // 给内容添加闭包
    // vm沙箱运行, node内置模块，前面我们已经引入， 将我们js函数执行，将this指向 module.exports
    vm.runInThisContext(funcStr).call(module.exports, module.exports, requireFunc, module)
  },
  '.json': function(module) {
    // 对于json文件的处理就相对简单了，将读取出来的字符串转换未JSON对象就可以了
    module.exports = JSON.parse(fs.readFileSync(module.id, 'utf8'))
  }
}
```

重点关注 js 是如何执行编译的：

```js
let content = fs.readFileSync(module.id, 'utf8') // 读取文件内容
let funcStr = Module.wrap(content) // 给内容添加闭包
vm.runInThisContext(funcStr).call(module.exports, module.exports, requireFunc, module)

// Module.wrap
// 存放闭包字符串
Module.wrapper = ['(function (exports, require, module, __filename, __dirname) {', '})']
// 将我们读到js的内容传入,组合成闭包字符串
Module.wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1]
}
```

读取内容后包装成:

```JS
(function (exports, require, module, __filename, __dirname) {
  // ...content
})
```

最终通过 `vm` 执行代码

```js
vm.runInThisContext(funcStr).call(module.exports, module.exports, requireFunc, module)
```

`requireFunc` 就是我们要执行的 `require` 方法。

```js
// 测试代码
function requireFunc(path) {
  return Module._load(path) // 加载模块
}
```

我们测试一下：

```js
console.log(requireFunc('./moduleA'))
```

成功输出 `alvin` 代表 `Module` 加载大功告成了。

更多查见：[Node 源码](https://github.com/nodejs/node/blob/v0.12/lib/module.js)

### 完整代码

```js
const fs = require('fs')
const path = require('path')
const vm = require('vm') // 虚拟机模块，沙箱运行，防止变量污染

function Module(id) {
  this.id = id
  this.exports = {}
}

// 模块加载
Module._load = function(filePath) {
  // 相对路径,可能这个文件没有后缀，尝试加后缀
  let fileName = Module._resolveFilename(filePath) // 获取到绝对路径

  // 判断缓存中是否有该模块
  if (Module._cacheModule[fileName]) {
    return Module._cacheModule[fileName].exports
  }

  let module = new Module(fileName) // 没有就创建模块
  Module._cacheModule[fileName] = module // 并将创建的模块添加到缓存

  // 加载模块
  tryModuleLoad(module)
  return module.exports
}

// 根据绝对路径进行缓存的模块对象
Module._cacheModule = {}

Module._resolveFilename = function(filePath) {
  if (/\.js$|\.json$/.test(filePath)) {
    return path.resolve(__dirname, filePath) // 直接返回路径
  } else {
    // 1. 没有后后缀 自动拼后缀
    // 2. 找不到文件，在通过目录
    let exts = Object.keys(Module._extensions)

    // 文件扩展名分析
    for (let i = 0; i < exts.length; i++) {
      let filename = path.resolve(__dirname, filePath + exts[i])
      if (fs.existsSync(filename)) {
        return filename
      }
    }

    // 目录分析
    for (let i = 0; i < exts.length; i++) {
      let filename = path.resolve(__dirname, filePath + '/index' + exts[i])
      if (fs.existsSync(filename)) {
        return filename
      }
    }

    throw new Error('module not exists')
  }
}

// 不同模块编译的方法
Module._extensions = {
  '.js': function(module) {
    let content = fs.readFileSync(module.id, 'utf8')
    let funcStr = Module.wrap(content) // 给内容添加闭包

    // vm沙箱运行, node内置模块，前面我们已经引入， 将我们js函数执行，将this指向 module.exports
    vm.runInThisContext(funcStr).call(module.exports, module.exports, requireFunc, module)
  },
  '.json': function(module) {
    // 对于json文件的处理就相对简单了，将读取出来的字符串转换未JSON对象就可以了
    module.exports = JSON.parse(fs.readFileSync(module.id, 'utf8'))
  }
}

// 存放闭包字符串
Module.wrapper = ['(function (exports, require, module, __filename, __dirname) {', '})']

// 根据传入的模块，尝试加载模块方法
function tryModuleLoad(module) {
  let ext = path.extname(module.id) //扩展名
  // 如果扩展名是js 调用js处理器 如果是json 调用json处理器
  Module._extensions[ext](module) // exports 上就有了数组
}

// 将我们读到js的内容传入,组合成闭包字符串
Module.wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1]
}

// 测试代码
function requireFunc(path) {
  return Module._load(path) // 加载模块
}

console.log(requireFunc('./moduleA'))
```

---

- [代码地址](https://github.com/alvin0216/alvin-code-store/tree/master/commonJs/module.js)
- [阮一峰 浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)
- [蓝色小火柴： Commonjs 规范及 Node 模块实现](https://www.cnblogs.com/xiaohuochai/p/6847939.html)
- [基于 CommonJS 规范，简单实现 NodeJs 模块化](https://juejin.im/post/6844903679145803784)
