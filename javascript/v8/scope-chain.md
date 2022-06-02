---
title: 变量在作用域链上怎么查找？
date: 2020-06-16 20:31:29
sidebar: 'auto'
tags:
  - Javascript
  - v8 引擎
  - 作用域
categories:
  - Javascript
---

在[上一篇文章](./scope.md)中我们讲到了什么是作用域，以及 ES6 是如何通过变量环境和词法环境来同时支持变量提升和块级作用域，在最后我们也提到了如何通过词法环境和变量环境来查找变量，这其中就涉及到**作用域链**的概念。

当变量在函数内找不到对应的值时，会怎么找呢？

首先我们来看下面这段代码：

:::: tabs

::: tab 代码

```js
function bar() {
  console.log(myName); // ???
}
function foo() {
  var myName = '极客邦';
  bar();
}
var myName = '极客时间';
foo();
```

:::

::: tab 分析

全局上下文入栈 => 执行 foo 入栈 => 执行 bar 入栈

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-scope4.png)

上面那段代码在查找 `myName` 变量时，如果在当前的变量环境中没有查找到，那么 JavaScript 引擎会继续在 `outer` 所指向的执行上下文中查找。

从图中可以看出，bar 函数和 foo 函数的 outer 都是指向全局上下文的，这也就意味着如果在 bar 函数或者 foo 函数中使用了外部变量，那么 JavaScript 引擎会去全局执行上下文中查找。我们把这个查找的链条就称为**作用域链**。

:::

::::

你答对了吗？值得注意的一点：**词法作用域是静态的作用域。**

前面我们通过全局作用域和函数级作用域来分析了作用域链，那接下来我们再来看看块级作用域中变量是如何查找的？

我们还是先看下面这段代码：

```js
function bar() {
  var myName = '极客世界';
  let test1 = 100;
  if (1) {
    let myName = 'Chrome浏览器';
    console.log(test); // ？？？
  }
}
function foo() {
  var myName = '极客邦';
  let test = 2;
  {
    let test = 3;
    bar();
  }
}
var myName = '极客时间';
let myAge = 10;
let test = 1;
foo();
```

要想得出其执行结果，那接下来我们就得站在**作用域链**和**词法环境**的角度来分析下其执行过程。

ES6 是支持块级作用域的，当执行到代码块时，如果代码块中有 let 或者 const 声明的变量，那么变量就会存放到该函数的词法环境中。对于上面这段代码，当执行到 bar 函数内部的 if 语句块时，其调用栈的情况如下图所示：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-scope5.png)

首先是在 bar 函数的执行上下文中查找，但因为 bar 函数的执行上下文中没有定义 test 变量，所以根据词法作用域的规则，下一步就在 bar 函数的外部作用域中查找，也就是全局作用域。最终找到 test = 1。
