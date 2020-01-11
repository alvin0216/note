---
title: Some Question
date: 2020-01-06 14:02:40
---

## JavaScript

### 模拟实现下 call/apply/bind

- [Call Apply 的模拟实现](/javascript/call-apply)

#### Call 的模拟实现

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

#### Apply 的模拟实现

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

### JSON.stringify

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

### 什么是防抖和节流？有什么区别？如何实现？

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
