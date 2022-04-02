---
title: call apply
date: 2020-01-15 09:46:30
sidebar: 'auto'
tags:
  - Javascript
  - 写作中
  - 代码实现
categories:
  - Javascript
---

## call

```js
function func(age) {
  console.log(this.name, age);
}
func.call({ name: 'avlin' }, 18); // alvin 18
```

原理比较简单，通过显式绑定，比如

```js
let obj = {
  name: 'alvin',
  log() {
    console.log(this.name);
  },
};

obj.log(); // alvin
```

我们在 call 传入的对象里面，绑定一个虚拟函数，调用的时候 this 就指向该对象了。

```js
Function.prototype.call2 = function (obj = window, ...args) {
  obj.fn = this;
  let result = obj.fn(...args);
  delete obj.fn;
  return result;
};
```

## apply

一样

```js
Function.prototype.call2 = function (obj = window, args) {
  obj.fn = this;
  let result = obj.fn(...args);
  delete obj.fn;
  return result;
};
```
