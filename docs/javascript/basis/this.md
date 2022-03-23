---
title: this 解析
date: 2019-07-18 13:00:28
sidebar: 'auto'
tags:
  - Javascript
categories:
  - Javascript
---

## 概念

this 指的是**函数运行时所在的环境**，详见 阮一峰 [JavaScript 的 this 原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)。

- 默认指向：默认函数里的 this 指向全局(window) 【非严格模式】
- 隐式指向：函数被对象调用，this 指向调用该函数的对象
- 显式指向：通过 call，apply，bind 改变函数里的 this 指向
- new 一个对象：构造函数的 this 指向该实例化对象

---

- **箭头函数没有 this，所以也不能 new**
- **严格模式下，this 不默认指向全局**

```js
var env = 'window';

function log() {
  console.log(this.env);
}
log(); // window 默认指向

var obj = { env: 'foo', log };
obj.log(); // foo 函数被对象调用，指向调用该函数的对象

log.call(obj); // foo 通过 call 改变了 this 指向
```

## 题目 1

:::: tabs

::: tab 题目

```js
var length = 10;
function func() {
  console.log(this.length);
}
var obj = {
  length: 5,
  run: function (func) {
    func();
    arguments[0]();
  },
};

obj.run(func, 123);
```

:::

::: tab 答案

- `func()` 执行环境是全局。`length = 10`
- `arguments[0]()`：arguments 也是对象，也有 `length` 属性. `length = 2`

:::

::::

## 题目 2

:::: tabs

::: tab 题目

```js
var name = 'global';

var obj = {
  name: 'obj',
  a() {
    return function () {
      console.log(this.name);
    };
  },
};

obj.a()();
```

:::

::: tab 答案

`global`

`obj.a()()` 执行环境是 `obj.a()` 也就是全局。

:::

::::

## 题目 3

:::: tabs

::: tab 题目

```js
var name = 'windowsName';

var a = {
  name: 'Cherry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(function () {
      console.log(this.name);
      this.func1();
    }, 100);
  },
};

a.func2();
```

:::

::: tab 答案

```js
var name = 'windowsName';

var a = {
  name: 'Cherry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(function () {
      console.log(this.name); // windowsName
      this.func1(); // this.func1 is not a function
    }, 100);
  },
};

a.func2();
```

this 的运行时是在一个定时器中，因为它是匿名函数被单独调用，其上下文是全局，所以没有 func1 这个方法。所以必然报错。

:::

::::

## 题目 4

:::: tabs

::: tab 题目

```js
var a = {
  b: function () {
    console.log(this);
  },
  c: () => {
    console.log(this);
  },
  d: {
    e: () => {
      console.log(this);
    },
    g: {
      i: () => {
        console.log(this);
      },
    },
  },
  f: function () {
    var func = () => {
      console.log(this);
    };
    func();
  },
};

a.b();
a.c();
a.d.e();
a.d.g.i();
a.f();
```

:::

::: tab 答案

```js
var a = {
  b: function () {
    console.log(this);
  },
  c: () => {
    console.log(this);
  },
  d: {
    e: () => {
      console.log(this);
    },
    g: {
      i: () => {
        console.log(this);
      },
    },
  },
  f: function () {
    var func = () => {
      console.log(this);
    };
    func();
  },
};

a.b(); // a
a.c(); // window
a.d.e(); // window
a.d.g.i(); // window
a.f(); // a
```

1. 箭头函数里面的 this 就是定义时上层作用域中的 this！
2. 注意 this 指的是**函数**运行时所在的环境，a 对象并没有被函数包裹，所以输出 window 是默认只想上一级环境，也就是 window

:::

::::

## 题目 5

:::: tabs

::: tab 题目

```js
var name = 'Nicolas';
function Person() {
  this.name = 'Smiley';
  this.sayName = function () {
    console.log(this.name);
  };
  setTimeout(this.sayName, 2000);
}

var person = new Person();
person.sayName();
```

```js
var name = 'Nicolas';
function Person() {
  this.name = 'Smiley';
  this.sayName = () => {
    console.log(this.name);
  };
}

let person = new Person();
person.sayName();
person.sayName.call({ name: 'Nicolas2' });
```

:::

::: tab 答案

```js
var name = 'Nicolas';
function Person() {
  this.name = 'Smiley';
  this.sayName = function () {
    console.log(this.name);
  };
  setTimeout(this.sayName, 2000);
}

var person = new Person();
person.sayName();
```

`Smiley`
`undefined`
`Nicolas`

---

```js
var name = 'Nicolas';
function Person() {
  this.name = 'Smiley';
  this.sayName = () => {
    console.log(this.name);
  };
}

let person = new Person();
person.sayName();
person.sayName.call({ name: 'Nicolas2' });
```

`Smiley` `Smiley`

:::
::::
