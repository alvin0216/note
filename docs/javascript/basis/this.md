---
title: this 解析
date: 2019-07-18 13:00:28
sidebar: 'auto'
tags:
  - Javascript
categories:
  - Javascript
---

this 指的是**函数运行时所在的环境**，详见 阮一峰 [JavaScript 的 this 原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)。

也就是说

```js
let env = 'window';

function log() {
  console.log(this.env);
}

let foo = {
  env: 'foo',
  log,
};

foo.log(); //  相当于 window.foo.log, 运行环境为 foo，读取内部环境变量 foo

log(); // 相当于 window.log, 运行环境为 window, 输出 window
```

`this` 的作用域如下：

- 默认指向：对于一个函数，如果没有被打点调用，则该函数里的 this 指向全局(window)
- 隐式指向：对于一个函数，如果被打点调用，则该函数里的 this 指向调用该函数的对象
- 显式指向：通过 call，apply，bind 改变函数里的 this 指向
- new 一个对象：构造函数的 this 指向该实例化对象

---

- 箭头函数没有 this，所以也不能 new
- **严格模式下，this 不默认指向全局**

推荐阅读：[JavaScript 深入之从 ECMAScript 规范解读 this](https://github.com/mqyqingfeng/Blog/issues/7)

这里用几个例子来求解 `this` 的指向：

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

<details>
  <summary>答案</summary>

- `func()` 执行环境是全局。`length = 10`
- `arguments[0]()`：arguments 也是对象，也有 `length` 属性. `length = 2`

</details>

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

<details>
  <summary>答案</summary>

`global`

`obj.a()()` 执行环境是 `obj.a()` 也就是全局。

</details>

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

真题解析：

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
    var a = () => {
      console.log(this);
    };
    a();
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
