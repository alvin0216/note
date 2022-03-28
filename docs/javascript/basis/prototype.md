---
title: 原型和原型链
date: 2019-07-17 13:00:28
sidebar: 'auto'
tags:
  - Javascript
  - 原型和原型链
categories:
  - Javascript
---

- [冴羽 JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)
- [【重点】图解：告诉面试官什么是 JS 原型和原型链?](https://juejin.cn/post/6844903976907997192)

每个函数都有一个特殊的属性叫作原型, `prototype`, 用于存放共享的属性和方法。怎么共享呢？

通过 new 一个构造函数生成实例，该实例通过 `__proto__` 指向该构造函数的原型，那么访问实例属性的时候先在实例上找，如果找不到会往构造函数的原型上找，这也就是原型链。

```js
function Person(name) {
  console.log('run Person')
  this.name = name
}
var p = new Person()

// 构造函数、实例原型、和实例之间的关系
1. Person 指代构造函数
2. Person.prototype 指向原型对象
3. p.__proto__ === Person.prototype 实例通过 __proto__ （原型链）指向原型
```

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/prototype5.png)
