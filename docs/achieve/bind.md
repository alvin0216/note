---
title: bind
date: 2020-01-15 09:46:31
---

`bind` 和 `call`、`apply` 区别之一是他不立即执行函数，而是绑定完 `this` 后再返回一个新的函数。

```js
let person = { name: 'alvin' }
function log() {
  console.log(this.name)
}
let logFunc = log.bind(person) // alvin
logFunc()
```

## 改变 this 的指向

返回一个新的函数，那么 `this` 的指向如何改变呢。借助 `call` 可以显式改变 `this`，那么如果改变呢？

在返回的函数里使用 `call` 绑定并执行函数，可以通过 <span class='mgreen'>闭包 + call </span> 达到我们的目的。

```js
Function.prototype.bind2 = function(context) {
  let closure = this // 使用闭包保存 this
  return () => closure.call(context)
}
```

## 实现传参

`bind` 是如何传参的，如下：

```js
let person = { name: 'alvin' }
function log(age, hobby) {
  console.log(this.name, age, hobby)
}
let logFunc = log.bind(person, 18)
logFunc('dance') // alvin 18 dance
```

实现：

```js
Function.prototype.bind2 = function(context = window, ...bindArgs) {
  let closure = this // 使用闭包保存 this
  return (...args) => closure.call(context, ...bindArgs, ...args)
}
```

## 考虑当 bind 被 new 调用时

> 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

```js
// new 的模拟实现
function objectFactory(Constructor, ...args) {
  let obj = new Object() // 创建一个新对象
  obj.__proto__ = Constructor.prototype // 指向原型 可以让实例访问到构造函数的原型上的属性
  let ret = Constructor.apply(obj, args) // 指向构造函数，并将 this 绑定到新创建的 obj 对象上
  return typeof ret === 'object' ? ret : obj // 默认返回新对象
}
```

也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：

```js
let person = { name: 'alvin' }
function log(age, hobby) {
  console.log(this.name, age, hobby)
}
log.prototype.friend = 'kevin'

let logFunc = log.bind(person, 18)
const p = new logFunc('dance') // undefined 18 dance ==> this 指向了 p
console.log(p.friend) // kevin
```

我们可以通过修改返回的函数的原型来实现，让我们写一下

```js
Function.prototype.bind2 = function(context = window, ...bindArgs) {
  let closure = this // 使用闭包保存 this

  let fBound = function(...args) {
    // 当作为构造函数时，this 指向实例
    // 当作为普通函数时，this 指向 context
    return closure.call(this instanceof fBound ? this : context, ...bindArgs, ...args)
  }

  fBound.prototype = this.prototype // 实例就可以继承绑定函数的原型中的值
  return fBound
}
```

我们直接将 `fBound.prototype = this.prototype`，我们直接修改 `fBound.prototype` 的时候，也会直接修改绑定函数的 `prototype`。

这个时候，我们可以通过一个空函数来进行中转：

```diff
Function.prototype.bind2 = function(context = window, ...bindArgs) {
  let closure = this // 使用闭包保存 this

  let fBound = function(...args) {
    // 当作为构造函数时，this 指向实例
    // 当作为普通函数时，this 指向 context
    return closure.call(this instanceof fBound ? this : context, ...bindArgs, ...args)
  }

- // fBound.prototype = this.prototype // 实例就可以继承绑定函数的原型中的值
+ let fNOP = function() {}
+ fNOP.prototype = this.prototype
+ fBound.prototype = new fNOP()
  return fBound
}

```

参考 [JavaScript 深入之 bind 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)
