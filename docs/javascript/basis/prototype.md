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

通常 Java 生成对象是通过 new 的方式，通过类生成一个实例对象的过程。但是 JS 中并没有类，那 JS 的设计者要怎么做？

Java 的 new 的过程内部其实调用了**构造函数**。但是 JS 是没有“类”的概念的，于是 JS 就把 new 一个“类”设计成了 new 一个**构造函数**，于是构造函数成为了一个实例对象的**原型对象**。

> JS 声明构造函数(用来实例化对象的函数)时，会在内存中创建一个对应的对象，这个对象就是原函数的原型。构造函数默认有一个 `prototype` 属性，`prototype` 的值指向函数的原型。同时原型中也有一个 `constructor` 属性，`constructor` 的值指向函数对象。
> 通过构造函数实例化出来的对象，并不具有 `prototype` 属性，其默认有一个 `__proto__` 属性，`__proto__` 的值指向构造函数的原型。在原型对象上添加或修改的属性，在所有实例化出的对象上都可共享。

![](https://gitee.com/alvin0216/cdn/raw/master/images/prototype5.png)

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
