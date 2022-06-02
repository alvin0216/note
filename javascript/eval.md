---
title: eval 和 new Function 的区别
date: 2022-05-10 10:12:22
sidebar: auto
tags:
  - eval
categories:
  - Javascript
---

`eval` 和 `new Function` 都可以动态解析和执行字符串。但是它们对解析内容的运行环境判定不同。

```js
let foo = 'foo';
function bar() {
  let foo = 'bar';
  eval('console.log(foo)'); // 输出bar
  new Function('console.log(foo)')(); // 输出foo
}
bar();
```

同样都有安全问题。

`eval()`和 `Function` 构造不同的是 `eval()`可以干扰作用域链，而 `Function()`更安分守己些。不管你在哪里执行 `Function()`，它只看到全局作用域。所以其能很好的避免本地变量污染。在下面这个例子中，`eval()`可以访问和修改它外部作用域中的变量，这是 `Function` 做不来的（注意到使用 `Function` 和 `new Function` 是相同的）。

```js
function bar() {
  let obj = { age: 18 };
  eval('obj.age = 20');
  new Function('obj.age = 30')();
  console.log(obj); // { age: 20 }
}
```
