---
title: 灵魂拷问系列 - Javascript
date: 2020-01-06 14:02:40
---

## 判断 this 的指向

```js
var value = 1

var foo = {
  value: 2,
  bar: function() {
    return this.value
  }
}

//示例1
console.log(foo.bar()) // 2
//示例2
console.log(foo.bar()) // 2
//示例3
console.log((foo.bar = foo.bar)()) // 1
//示例4
console.log((false || foo.bar)()) // 1
//示例5
console.log((foo.bar, foo.bar)()) // 1
```

详见 [JavaScript 深入之从 ECMAScript 规范解读 this](https://github.com/mqyqingfeng/Blog/issues/7)

## 模拟实现下 call/apply/bind

- [Call Apply 的模拟实现](/javascript/call-apply)
- [Bind 的模拟实现](/javascript/bind)
- [New 的模拟实现](/javascript/new)

### Call 的模拟实现

思路：改变 this 指向，可以通过[隐性绑定](/javascript/this.html#%E9%9A%90%E5%BC%8F%E7%BB%91%E5%AE%9A)实现：

```js
var obj = {
  name: 'foo'
}

function func() {
  console.log(this.name)
}

func.call(obj) // foo

// solution
obj.func = func
obj.func()
delete obj.func
```

实现代码如下

```js
Function.prototype.call2 = function(obj) {
  var context = obj || window
  context.fn = this // 1. obj.fn = func

  var args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }

  // context.fn() // obj.fn this === obj
  var result = eval('context.fn(' + args + ')')

  delete context.fn // remove fn

  return result
}

var obj = {
  name: 'foo'
}

function func(age) {
  console.log(this.name, age)
}

func.call2(obj, 18) // foo 18
func.call2(null, 18) // undefined 18
```

### Apply 的模拟实现

```js
Function.prototype.apply2 = function(obj, args) {
  var context = obj || window
  context.fn = this // 1. obj.fn = func

  var result
  var args = Array.isArray(args) ? args : []
  result = eval('context.fn(' + args + ')')

  delete context.fn // remove fn

  return result
}

var obj = {
  name: 'foo'
}

function func(age) {
  console.log(this.name, age)
}

func.apply2(obj, [18])
```

### Bind 的模拟实现

```js
Function.prototype.bind2 = function(context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function() {}

  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```

### New 的模拟实现

```js
function objectFactory() {
  var obj = new Object()
  var Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype

  var ret = Constructor.apply(obj, arguments)

  return typeof ret === 'object' ? obj : ret
}
```

## JSON.stringify

以下代码会输出什么？

```js
const obj = { a: 3, b: 4, c: null, d: undefined, get e() {} }
console.log(JSON.stringify(obj))
```

> 答案是

```bash
{"a":3,"b":4,"c":null,"today":"2020-01-06T06:20:10.183Z"}
```

`JSON.stringify` 会将 `function` `undefined` 等过滤，其他规则详见 [JSON.stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## 什么是防抖和节流？有什么区别？如何实现？

- [防抖函数的实现](/javascript/debounce)
- [节流函数的实现](/javascript/throttle)

简述：

- 防抖：动作发生后一定时间后触发事件，在这段时间内，如果该动作又发生，则重新等待一定时间再触发事件
  - ```js
    function debounce(func, wait) {
      var timer = null
      return function() {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function() {
          func.apply(context, args)
        }, wait)
      }
    }
    ```
- 节流：，动作发生后一段时间后触发事件，在这段时间内，如果动作又发生，则无视该动作，直到事件执行完后，才能重新触发

  - ```js
    function throtte(func, wait) {
      var context, args
      var previous = 0
      return function() {
        var now = +new Date()
        context = this
        args = arguments
        if (now - previous > wait) {
          func.apply(context, args)
          previous = now
        }
      }
    }
    ```
