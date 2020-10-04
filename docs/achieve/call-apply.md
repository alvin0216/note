---
title: call apply
date: 2020-01-11 10:15:15
---

## Call 实现步骤

本文主要目的 模拟实现 `call/apply`， 掌握这两个函数的用法。

### 改变 this 的指向

call 可以改变 this 的指向，比如

```js
var person = { name: 'alvin' }
function log() {
  console.log(this.name)
}
log.call(person) // alvin
```

call 做了什么：

1. `call` 改变了 `this` 的指向，指向到 `person`
2. `log` 函数执行了

试想当调用 `call` 的时候，把 `person` 对象改造成如下：

```js
let foo = {
  name: 'alvin',
  log() {
    console.log(this.name)
  }
}

foo.log() // alvin
```

通过 <span class='mgreen'>隐式绑定</span> ，我们可以将 this 指向我们需要的对象中。

但是这样却给 `person` 对象本身添加了一个属性，不过不用担心，改完再通过 `delete` 删除即可。

所以可以把步骤归为：1. 添加属性 2. 执行函数 3. 删除属性

```js
Function.prototype.call2 = function(context) {
  context.fn = this // 添加到 context 的 fn 属性上
  context.fn() // 执行函数
  delete context.fn // 删除属性
}
```

测试一下

```js
var person = { name: 'alvin' }
function log() {
  console.log(this.name)
}
log.call2(person) // alvin
```

### 实现传参

`call` 是可以传参数的，且也可以有返回值.

```js
var person = { name: 'alvin' }
function log(age, hobby) {
  console.log(this.name, age, hobby)
  return null
}
log.call(person, 18, 'singing') // alvin 18 singing
```

我们完善一下代码：

```js
Function.prototype.call2 = function(context, ...args) {
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

### 不传对象，默认绑定到 window

```js
log.call(null) // log 函数的 this 指向 window
```

完善代码：

```js
Function.prototype.call2 = function(context = window, ...args) {
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

## 实现 apply

apply 和 call 的区别在于传参方式

```js
log.call(person, 18, 'singing')
log.apply(person, [18, 'singing'])
```

这里就直接给代码了：

```js
Function.prototype.apply2 = function(context = window, args) {
  if (!Array.isArray(args)) throw new TypeError('apply 参数必须为数组类型')
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

## ES5 版本的 call 实现

上面均用了 es6 的写法，有时候还需要 es5 的写法 如下

```js
Function.prototype.call2 = function(context) {
  var context = context || window
  context.fn = this

  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('context.fn(' + args + ')')

  delete context.fn
  return result
}
```

参考 [JavaScript 深入之 call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)
