---
title: Javascript 中的 this 解析
date: 2020-01-09 11:02:16
---

## this 的指向

`this` 是一个老生常谈的问题，也是一个容易混淆的知识点。这里再进行梳理一遍，以方便以后查阅。

> this 的指向：this 永远指向最后调用它的那个对象

再阐述一遍，**this 永远指向最后调用它的那个对象**

我们来看一个最简单的例子

**例 1：**

```js
var name = 'bar'
function func() {
  var name = 'foo'
  console.log(this.name)
}

func() // bar
```

我们看最后调用 `func` 的地方 `func()`，这就相当于是 `window.func()`, 所以 `name = 'bar'`。

**注意：**

- 在 `node` 环境中上面的全局变量不为 `window`, 输出的值也为 `undefined`。
- 只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。在严格模式下调用函数则不影响默认绑定。

  - ```js
    var name = 'bar'
    function func() {
      'use strict'
      var name = 'foo'
      console.log(this.name) // Cannot read property 'name' of undefined
    }
    func()
    ```

在看下一个例子

**例 2：**

```js
var name = 'bar'
var obj = {
  name: 'foo',
  fn: function() {
    console.log(this.name) // foo
  }
}
obj.fn()
```

在这个例子中，函数 `fn` 是对象 `obj` 调用的，所以打印的值就是 `obj` 中的 `name` 的值。

我们做一个小小的改动：

**例 3：**

```js
var name = 'bar'
var obj = {
  name: 'foo',
  fn: function() {
    console.log(this.name) // foo
  }
}
window.obj.fn()
```

这里打印 `foo` 的原因也是因为刚刚那句话“**this 永远指向最后调用它的那个对象**”，最后调用它的对象仍然是对象 `obj`。

我们再来看一下这个例子：

**例 4：**

```js
var name = 'bar'
var obj = {
  // name: 'foo',
  fn: function() {
    console.log(this.name) // undefined
  }
}
window.obj.fn()
```

这里为什么会打印 `undefined` 呢？这是因为正如刚刚所描述的那样，调用 `fn` 的是 `obj` 对象，也就是说 `fn` 的内部的 `this` 是对象 `obj`，而对象 `obj` 中并没有对 `name` 进行定义，所以 `log` 的 `this.name` 的值是 `undefined`。

这个例子还是说明了：**this 永远指向最后调用它的那个对象**，因为最后调用 `fn` 的对象是 `obj`，所以就算 `obj` 中没有 `name` 这个属性，也不会继续向上一个对象寻找 `this.name`，而是直接输出 `undefined`。

再来看一个比较坑的例子：

**例 5：**

```js
var name = 'bar'
var obj = {
  name: 'foo',
  fn: function() {
    console.log(this.name) // bar
  }
}
var f = obj.fn

f()
```

这里为什么不是 `foo` 呢？这是因为虽然将 `obj.fn` 赋值给了 `f`, 但是并没有调用。

**this 永远指向最后调用它的那个对象**，最后调用的是 `f`, 也即`window.f`, 所以 `this` 指向的也就是 `window`

由以上五个例子我们可以看出，`this` 的指向并不是在创建的时候就可以确定的，在 `es5` 中，永远是 **this 永远指向最后调用它的那个对象**。

再来看一个例子：

**例 6：**

```js
var name = 'bar'

function fn() {
  var name = 'foo'
  innerFunction()
  function innerFunction() {
    console.log(this.name) // bar
  }
}

fn()
```

或者

```js
var name = 'bar'
var obj = {
  name: 'foo',
  fn: function() {
    innerFunc()
    function innerFunc() {
      console.log(this.name) // bar
    }
  }
}
obj.fn()
```

最终调用的都是 `window` 对象，所以 `this` 指向 `window`

## 参考

[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)
