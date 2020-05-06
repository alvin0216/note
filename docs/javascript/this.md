---
title: JavaScript 中的 this
date: 2020-01-09 11:02:16
---

`this` 说白了就是找拥有当前上下文（`context`）的对象（`context object`）。

## 默认绑定

作为独立函数调用时，应用 `this` 的默认绑定， `this` 指向全局对象

而只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。

```js
function showThis() {
  console.log(this)
}

function showStrictThis() {
  'use strict'
  console.log(this)
}

showThis() // window
showStrictThis() // undefined
```

## 隐式绑定

在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 `this` 间接（隐式）绑定到这个对象上。

当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。

```js
var name = 'bar'

function func() {
  console.log(this.name)
}

var obj1 = {
  name: 'foo',
  func: func
}

var obj2 = {
  name: 'kee',
  func: obj1.func
}

func() // bar
obj1.func() // foo
obj2.func() // kee
```

### 隐式丢失

> 当调用函数被重新赋值为新变量，是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上

```js
var name = 'bar'

function func() {
  console.log(this.name)
}

var obj = {
  name: 'foo',
  func: func
}

var func2 = obj.func

func2() // bar
```

`func2` 是 `obj.func` 的一个引用，实际上引用的是 `func` 本身，此时的 `func2`是不带任何的函数调用，所以引用了默认绑定。

> 参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式的赋值。

```js
var name = 'bar'

function func() {
  console.log(this.name)
}

var obj = {
  name: 'foo',
  func: func
}

function doCallbck(cb) {
  cb()
}

function doSetTimeout(func) {
  setTimeout(func, 0) //  内置的 setTimeout 也相当于间接赋值
}

doCallbck(func) // bar
doCallbck(obj.func) // bar
doSetTimeout(func) // bar
doSetTimeout(obj.func) // bar
setTimeout(obj.func, 0) // bar
```

到上面的例子，可以发现在日常使用回调函数丢失 `this` 的绑定是非常常见的。

来个经典案例：

```js {8,9}
var length = 10
function func() {
  console.log(this.length)
}
var obj = {
  length: 5,
  run: function(func) {
    func()
    arguments[0]()
  }
}

obj.run(func, 123) // 10 2
```

- 第 8 行，`func()` 输出 10 不难理解，独立函数调用 => 默认绑定全局对象
- 第 9 行，`arguments[0]()` 实际相当于

```js
arguments: {
  '0': function() {
    console.log(this.length)
  },
  '1': 123
}
```

`arguments[0]()` 运行结果为 `arguments.length` === 2

## 显示绑定 <Badge text="call" /> <Badge text="apply" /> <Badge text="bind" /> <Badge text="new" /> <Badge text="箭头函数" type="warning"/>

### call、apply、bind

call、apply、bind 都可以强制绑定 this

```js
var name = 'bar'
function log(age) {
  console.log(this.name)
  console.log(age)
}

var obj = { name: 'abc' }
log.call(obj, 18) // call 和 apply 区别在于传入参数不同，apply 传参为数组类型
log.apply(obj, [18])
log.bind(obj)(18) // bind 返回一个新的函数
```

### new

```js
var name = 'bar'
function Person(name) {
  this.name = name
}

var p = new Person('foo')
console.log(p.name) // bar
```

使用 `new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

```js
var obj = {} // 1. 创建一个空对象
obj.__proto__ = constructor.prototype //  2 设置原型链: 添加__proto__属性，并指向构造函数的prototype 属性
var result = constructor.call(obj, 'foo') // 3 绑定this
// 4 返回值是 object 类型 则直接返回这个结果 如果没有返回值或者其他 则默认返回创建的对象
if (typeof result === 'object') {
  return result
} else {
  return obj
}
```

### 箭头函数

> 箭头函数的 `this` 始终指向函数定义时的 `this`，而非执行时

箭头函数需要记着这句话：“箭头函数中没有 `this` 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 `this` 绑定的是最近一层非箭头函数的 `this`，否则，`this` 为 `undefined`”。

```js
var name = 'bar'

function log() {
  console.log(this.name)
}
var obj = {
  name: 'foo',
  func1: log,
  func2: () => log(),
  func3: function() {
    var f1 = () => console.log(this.name)
    f1()
    var f2 = () => log()
    f2()
  }
}
obj.func1() // foo
obj.func2() // bar
obj.func3() // foo bar
```

## 题目

再看看其他的稍微比较深奥的问题

```js
var value = 1

var foo = {
  value: 2,
  bar: function() {
    return this.value
  }
}

console.log(foo.bar())
// console.log((foo.bar)())
console.log((foo.bar = foo.bar)())
console.log((false || foo.bar)())
console.log((foo.bar, foo.bar)())
```

:::details 答案

```js
console.log(foo.bar()) // 2
// console.log((foo.bar)()) // 2
console.log((foo.bar = foo.bar)()) // 1
console.log((false || foo.bar)()) // 1
console.log((foo.bar, foo.bar)()) // 1
```

用我们上面所讲的知识却难以解释这道题的答案，到此建议阅读

- [JavaScript 深入之从 ECMAScript 规范解读 this](https://github.com/mqyqingfeng/Blog/issues/7)
- [换个角度看 JavaScript 中的 (this) => { 整理 (JavaScript 深入之从 ECMAScript 规范解读 this ) }](https://juejin.im/post/5c1c5bfcf265da614c4cc40e)

:::
