---
title: 什么是闭包？
date: 2020-06-16 20:31:29
sidebar: 'auto'
tags:
  - Javascript
  - v8 引擎
  - 作用域
  - 闭包
categories:
  - Javascript
---

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures): 一个**函数**和对其周围状态（lexical environment，**词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。

闭包的作用：

1. 缓存变量，比如任务队列，累计叠加
2. 用闭包模拟私有方法

真题：

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}

var a = fun(0); // undefined
a.fun(1); // 0  [,0]
a.fun(2); // 0  [,0]
a.fun(3); // 0  [,0]
var b = fun(0).fun(1).fun(2).fun(3); // undefined012
var c = fun(0).fun(1); //undefined0
c.fun(2); // 1
c.fun(3); // 1

/**
 * a {
 *  闭包 n=0
 *  fun(m) {
 *    console.log(闭包 n)
 *  }
 * }
 * */
```
