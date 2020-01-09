---
title: Javascript 中的 this 解析
date: 2020-01-09 11:02:16
---

`this` 是一个老生常谈的问题，也是一个容易混淆的知识点。这里再进行梳理一遍，以方便以后查阅。

`this` 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用（也就是函数的调用方法）。也可以理解为

> **this 的指向：this 永远指向最后调用它的那个对象**

## 默认绑定

- 独立函数调用时，应用 `this` 的默认绑定， `this` 指向全局对象

  - ```js
    var name = 'bar'
    function func() {
      var name = 'foo'
      console.log(this.name) // bar
    }

    func()
    ```

- 只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。

  - ```js
    var name = 'bar'
    function func() {
      'use strict'
      var name = 'foo'
      console.log(this.name) // Cannot read property 'name' of undefined
    }
    func()
    ```

在看一个例子

```js
var name = 'bar'
var obj = {
  name: 'foo'
  func: function(){
    console.log(this.name)
  }
}

obj.func() // bar
```

为什么是 `bar` 呢？依照我们前面所讲的 **this 的指向：this 永远指向最后调用它的那个对象** 倒也说得过去。其实这里发生了**隐式绑定**，让我们了解一下这是什么。

## 隐式绑定

在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 `this` 间接（隐式）绑定到这个对象上。
当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。

**对象属性引用链中只有最顶层或者说最后一层会影响调用位置。**

举个例子说明：

```js
var name = 'bar'

var obj2 = {
  name: 'obj2',
  func: func
}

var obj1 = {
  name: 'obj1',
  obj2: obj2
}

function func() {
  console.log(this.name)
}

func() // bar
obj2.func() // obj2
obj1.obj2.func() // obj2
```

## 参考

[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)
