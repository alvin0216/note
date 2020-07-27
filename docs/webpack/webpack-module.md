---
title: webpack 与 模块化
date: 2020-07-27 07:38:52
---

学习 webpack 我们需要了解

- webpack 有什么用
- 理解前端的模块化、模块化演变的过程
- 理解 webpack 打包的核心思路
- webpack 核心：loader
- webpack 核心：plugin

## webpack 是什么

> 分析你的项目结构，找到 JavaScript 模块以及其他的一些浏览器不能直接运行的扩展语言（Scss、TypeScript 等），将其打包为合适的格式以供浏览器使用.

![webpack](https://gitee.com/alvin0216/cdn/raw/master/img/webpack/preview.png)

了解 `webpack` 对 `javascript` 是如何进行打包的，我们先看看**模块化**

## 前端模块化

类似于一个公司由各个部门组成，一个工程也由各个模块组成，高内聚低耦合，各司其职。先理解一下概念：

作用域

```js
// 全局作用域
var a = 1
window.a // 1
global.a // 1

// 局部作用域：
function a() {
  var v = 1
}
window.v // undefined
```

如果在传统 `js` 写法中，引入多个 `script`，就很容易造成全局作用域冲突而导致不可预测的问题：

```js
                                               +-------------------------------------------+
+-----------------------------------------+    | // moduleA.js                             |
|  vbodyv                                 |    | var a = 1                                 |
|    <script src='./moduleA.js'></script> |    |                                           |
|    <script src='./moduleB.js'></script> |    | // moduleB.js                             |
|    <script src='./moduleC.js'></script> |    | var b = 2                                 |
|  </body>                                |    | a = 2                                     |
|                                         |    |                                           |
+-----------------------------------------+    | // moduleC                                |
                                               | console.log(a + b) // 4 ==>  a 被修改了    |
                                               +---------------+---------------------------+

```

改进 1:

```js
var moduleA = { a: 1 }
```

即使我们可以修改定义为不同模块名去读取，也无法保证模块属性内部安全性，比如可能不小心改掉属性值。

我们可以使用 `IIFE`（自执行函数来隔离作用域，避免变量冲突。）从而避免变量名泄漏到全局作用域中：

```js
               写法1                               写法2 推荐
+-------------------------------+     +------------------------------+
| var moduleA = (function() {   |     | (function(window) {          |
|   var name = 'alvin'          |     |   var name = 'alvin'         |
|   var age = 18                |     |   var age = 18               |
|   return {                    |     |   window.moduleA = {         |
|     print() {                 |     |     print() {                |
|       console.log(name, age)  |     |       console.log(name, age) |
|     }                         |     |     }                        |
|   }                           |     |   }                          |
| })()                          |     | })(window)                   |
+-------------------------------+     +------------------------------+

// moduleC.js
moduleA.print() // alvin 18
console.log(moduleA.name) // undefined 也即 模块A 的属性并未暴露出来
```

虽然 `IIFE` 可以有效解决命名冲突的问题，但是**对于依赖管理，还是束手无策**。由于浏览器是从上至下执行脚本，因此为了维持脚本间的依赖关系，就必须手动维护好 script 标签的相对顺序。

### AMD

Asynchronous Module Definition（异步模块定义）目前很少使用

它主要提供了异步加载的功能。对于多个 JS 模块之间的依赖问题，如果使用原生的方式加载代码，随着加载文件的增多，浏览器会长时间地失去响应，而 AMD 能够保证被依赖的模块尽早地加载到浏览器中，从而提高页面响应速度。由于该规范原生 Javascript 无法支持，所以必须使用相应的库来实现对应的模块化。

利用 [RequireJS](https://github.com/requirejs/requirejs) 来编写模块，所有的依赖项必须提前声明好。在导入模块的时候，也会先加载对应的依赖模块，然后再执行接下来的代码，同时 AMD 模块可以并行加载所有依赖模块，从而很好地提高页面加载性能：

```js
define('./index.js', function(code) {
  // code 就是index.js 返回的内容
  return {
    sayHello: function(name) {
      return 'Hello, ' + name
    }
  }
})
```

### CommonJS

2009 年出的规范，原本是为服务端的规范，后来 nodejs 采用 commonjs 模块化规范

```js
// utils.js 模块定义
var add = function(a, b) {
  return a + b
}
module.exports = { add }

// 加载模块
var utils = require('./utils')
console.log(utils.add(1, 2))
```

此种模块化方案特点就是：同步阻塞式加载，无法实现按需异步加载。另外，如果想要在浏览器中使用 `CommonJS` 模块就需要使用 `Browserify` 进行解析：

### ES6 Module

```js
export const name = 'alvin'

import { name } from './constants'
```

- ES6 使用的是基于文件的模块。所以必须一个文件一个模块，不能将多个模块合并到单个文件中去。
- ES6 模块采用引用绑定（可以理解为指针)。这点和 CommonJS 中的值绑定不同，如果你的模块在运行过程中修改了导出的变量值，就会反映到使用模块的代码中去。所以，不推荐在模块中修改导出值，导出的变量应该是静态的。
- ES6 模块采用的是单例模式，每次对同一个模块的导入其实都指向同一个实例。

### ES6 Module 与 CommonJS 的差异

- CommonJS 模块输出的是一个`值的拷贝`，ES6 模块输出的是`值的引用`。
- CommonJS 模块是`运行时加载`，ES6 模块是`编译时输出接口`。

关于输出的对比：

```js
             CommonJS

+------------------------------------+
|   // lib.js                        |
|   var counter = 3                  |                         ES6 modules
|   function increase() {            |
|     counter++                      |         +--------------------------------------------+
|   }                                |         | // lib.js                                  |
|   module.exports = {               |         | export let counter = 3                     |
|     counter,                       |         | export function increase() {               |
|     increase                       |         |   counter++                                |
|   }                                |         | }                                          |
|                                    |    VS   |                                            |
|   // main.js                       |         | // main.js                                 |
|   var mod = require('./lib')       |         | import { counter, increase } from './lib'  |
|                                    |         |                                            |
|   console.log(mod.counter) // 3    |         | console.log(counter) // 3                  |
|   mod.increase()                   |         | increase()                                 |
|   console.log(mod.counter) // 3    |         | console.log(counter) // 4                  |
+------------------------------------+         +--------------------------------------------+
```

关于加载的对比：

```js
            CommonJs

+---------------------------------+
| // m1.js                        |
| var foo = 'aaa'                 |                      ES6 modules
| setTimeout(() => {              |
|   console.log('run m1.js...')   |        +-----------------------------------------+
|   foo = 'bbb'                   |        | // m1.js                                |
| }, 500)                         |        | export let foo = 'aaa'                  |
|                                 |        |                                         |
| module.exports = { foo }        |        | setTimeout(() => {                      |
|                                 |        |   console.log('run m1.js...')           |
| // m2.js                        |        |   foo = 'bbb'                           |
| const { foo } = require('./m1') |        | }, 500)                                 |
| console.log(foo)                |        |                                         |
|                                 |   VS   | // m2.js                                |
| setTimeout(() => {              |        | import { foo } from './m1'              |
|   console.log(foo)              |        |                                         |
| }, 500)                         |        | console.log(foo)                        |
|                                 |        | setTimeout(() => console.log(foo), 500) |
|                                 |        |                                         |
| aaa                             |        | aaa                                     |
| run m1.js...                    |        | run m1.js...                            |
| aaa                             |        | bbb                                     |
+---------------------------------+        +-----------------------------------------+
```

上面代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值。

## webpack 的打包机制

根据 `import` 引入等关键字，将依赖文件打包成一个文件。

输出的大体结构：

```JS
(function(modules) {
  var installedModules = {}

  function __webpack_require__(moduleId) {
    // SOME CODE
  }
  // ...
  return __webpack_require__(0) // entry file
})(([ /* modules array */]))
```

上述结构中的核心方法：

```js
// The require function
function __webpack_require__(moduleId) {
  // Check if module is in cache
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports
  }
  // Create a new module (and put it into the cache)
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
  })
  // Execute the module function
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
  // Flag the module as loaded
  module.l = true
  // Return the exports of the module
  return module.exports
}
```

## webpack 打包过程

1. 从入口文件开始，分析整个应用的依赖树
2. 将每个依赖模块包装起来，放到一个数组中等待调用
3. 实现模块加载的方法，并把它放到模块执行的环境中，确保模块间可以互相调用
4. 把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数

---

- [前端模块化的前世今生](https://juejin.im/post/5ca333c3f265da30c231a66f)
- [webpack 学习笔记：发展背景、工作机制、核心配置、性能优化](https://blog.csdn.net/z591391960/article/details/105612471)
- [前端模块化详解(完整版)](https://juejin.im/post/5c17ad756fb9a049ff4e0a62)
- [前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)
- [阮一峰 Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)
