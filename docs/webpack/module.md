---
title: 模块化
date: 2020-07-14 17:48:09
---

## ES6 模块与 CommonJS 模块的差异

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

## AMD

CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD 规范则是非同步加载模块，允许指定回调函数。

由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。

但是，**如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范**。此外 AMD 规范比 CommonJS 规范在浏览器端实现要来着早。

## CMD

CMD 规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD 规范整合了 CommonJS 和 AMD 规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD 模块定义规范。

---

- [前端模块化详解(完整版)](https://juejin.im/post/5c17ad756fb9a049ff4e0a62)
- [前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)
- [阮一峰 Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)
