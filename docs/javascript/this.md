---
title: this
date: 2020-01-09 11:02:16
---

## this 的作用域

- 默认指向：对于一个函数，如果没有被打点调用，则该函数里的 this 指向全局(window)
- 隐式指向：对于一个函数，如果被打点调用，则该函数里的 this 指向调用该函数的对象
- 显式指向：通过 call，apply，bind 改变函数里的 this 指向
- new 一个对象：构造函数的 this 指向该实例化对象

---

- 箭头函数没有 this，所以也不能 new
- **严格模式下，this 不默认指向全局**

## this 指的是函数运行时所在的环境

```js
var name = 'global'

var obj = {
  name: 'obj',
  foo() {
    console.log(this.name)
  }
}

obj.foo() // obj

var foo = obj.foo
foo() // global
```

对于 `obj.foo()` 来说，foo 运行在 obj 环境，所以 this 指向 obj；对于 `foo()` 来说，foo 运行在全局环境，所以 this 指向全局环境。所以，两者的运行结果不一样。

## 题目

### 题 1

```js
var length = 10
function func() {
  console.log(this.length)
}
var obj = {
  length: 5,
  run: function (func) {
    func()
    arguments[0]()
  }
}

obj.run(func, 123)
```

::: details 答案

`10`, `2`

- `func()` 执行环境是全局。
- `arguments[0]()`：arguments 也是对象，也有 `length` 属性

:::

### 题 2

```js
var name = 'global'

var obj = {
  name: 'obj',
  a() {
    return function () {
      console.log(this.name)
    }
  }
}

obj.a()()
```

:::details 答案

`global`

`obj.a()()` 执行环境是 `obj.a()` 也就是全局。

:::

### 题 3

```js
var name = 'windowsName'

var a = {
  name: 'Cherry',
  func1: function () {
    console.log(this.name)
  },
  func2: function () {
    setTimeout(function () {
      console.log(this.name) // windowsName
      this.func1() // this.func1 is not a function
    }, 100)
  }
}

a.func2()
```

this 的运行时是在一个定时器中，因为它是匿名函数被单独调用，其上下文是全局，所以没有 func1 这个方法。所以必然报错。

---

详见 [阮一峰 JavaScript 的 this 原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)
