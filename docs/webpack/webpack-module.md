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

我们可以使用 IIFE（自执行函数来隔离作用域，避免变量冲突。）从而避免变量名泄漏到全局作用域中：

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
