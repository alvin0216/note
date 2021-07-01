---
title: 模块化
date: 2019-07-15 13:00:28
sidebar: auto
tags:
  - webpack
  - 前端工程化
categories:
  - 前端工程化
---

- [阮一峰：Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)
- [你可能不知道的 JavaScript 模块化野史](https://juejin.cn/post/6844904056847073293)
- [《模块化系列》彻底理清 AMD,CommonJS,CMD,UMD,ES6](https://juejin.cn/post/6844904066233925639)
- [umd-learning](https://github.com/cumt-robin/umd-learning)

---

## Difference

- AMD 与 CMD：
  - AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
  - CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
  - CMD 推崇依赖就近，AMD 推崇依赖前置。
- ES Module 与 CommonJS:
  - CommonJS 模块是对象，是运行时加载，运行时才把模块挂载在 exports 之上（加载整个模块的所有），加载模块其实就是查找对象属性。
  - ES Module 不是对象，是使用 export 显示指定输出，再通过 import 输入。此法为编译时加载，编译时遇到 import 就会生成一个只读引用。等到运行时就会根据此引用去被加载的模块取值。所以不会加载模块所有方法，仅取所需。
  - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
- CommonJS 与 AMD/CMD:
  - AMD/CMD 是 CommonJS 在浏览器端的解决方案。
  - CommonJS 是同步加载（代码在本地，加载时间基本等于硬盘读取时间）。
  - AMD/CMD 是异步加载（浏览器必须这么做，代码在服务端）
- UMD 与 AMD/CMD
  - UMD（Universal Module Definition）是 AMD 和 CommonJS 的糅合，跨平台的解决方案。
  - AMD 模块以浏览器第一的原则发展，异步加载模块。
  - CommonJS 模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。
  - UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式。再判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。

## 浏览器加载 JS

```html
<!-- 普通加载，会阻塞 DOM 的渲染 -->
<script src="./foo.js"></script>
<!-- Async 一旦下载完，渲染引擎就会中断渲染 -->
<script async src="./foo.js"></script>
<!-- Defer 是“渲染完再执行” -->
<script defer src="./foo.js"></script>

<!-- type="module" 使用 ES Module -->
<script type="module">
  import { name } from './1.js';
  console.log(name);
</script>

<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

Node 是 CommonJS 最佳践行者，它有四个重要的环境变量为模块化的实现提供支持：`module`、`exports`、`require`、`global`。

commonJS 用同步的方式加载模块。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。

## CommonJS 与 ESModule 的区别

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- [CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段](https://es6.ruanyifeng.com/#docs/module-loader#CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)

> CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

```js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3

// ESModule
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

> CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

简单理解，在编程的时候 import 永远置顶，require 在任何地方都可以引用。

```jsx
import axios from 'axios'; // import 的地址错误了，整个程序编译就不通过了

function getUrl() {
  return require('./foo.png'); // 运行的时候 才去找路径的地址
}
```

**ES6 模块是编译时输出接口**：适合做 Tree shaking

## AMD 与 CMD 区别

1. **AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块**
2. **CMD 推崇就近依赖，只有在用到某个模块的时候再去 require**
