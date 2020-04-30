---
title: this 解析
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

**例 1**

```js
var name = 'bar'
var obj = {
  name: 'foo'
  func: function(){
    console.log(this.name)
  }
}

obj.func() // foo
```

为什么是 `foo` 呢？依照我们前面所讲的 **this 的指向：this 永远指向最后调用它的那个对象** 倒也说得过去。其实这里发生了**隐式绑定**，让我们了解一下这是什么。

## 隐式绑定

在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 `this` 间接（隐式）绑定到这个对象上。

当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。

> **对象属性引用链中只有最顶层或者说最后一层会影响调用位置。**

**例 2**

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

> **【隐式丢失】当调用函数被重新赋值为新变量，是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上**

**例 3**

```js
var name = 'bar'

function func() {
  console.log(this.name)
}

var obj = {
  name: 'obj',
  func: func
}

var func2 = obj.func

func2() // bar
```

`func2` 是 `obj.func` 的一个引用，实际上引用的是 `func` 本身，此时的 `func2`是不带任何的函数调用，所以引用了默认绑定。

> **参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式的赋值。**

**例 4**

```js
var name = 'bar'

function func() {
  console.log(this.name)
}

var obj = {
  name: 'obj',
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
```

看到上面的例子，可以发现在日常使用回调函数丢失 `this` 的绑定是非常常见的。

来个经典案例：

```js
var length = 10
function fn() {
  console.log(this.length)
}
var obj = {
  length: 5,
  fn: function(fn) {
    fn()
    arguments[0]()
  }
}

obj.fn(fn, 123) // 10 2
```

分析：

- `fn()` 为函数 `fn` 的引用，独立函数调用 => 默认绑定全局对象。所以 `fn()` 结果为 10
- `arguments[0]()`,相当于下面的引用，数据隐式绑定，绑定对象为 `arguments`，其属性 `length` 值为参数数量 `2`
  - ```js
      arguments: {
        '0': function fn(){
            console.log(this.length);
        },
        '1': 123
    }
    ```

## 显式绑定

使用 `call` 、 `apply` 、 `bind` 或者**箭头函数**显示绑定函数调用的 `this`

### 箭头函数

众所周知，ES6 的箭头函数是可以避免 ES5 中使用 `this` 的坑的。

**箭头函数的 `this` 始终指向函数定义时的 `this`，而非执行时**。

箭头函数需要记着这句话：“箭头函数中没有 `this` 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 `this` 绑定的是最近一层非箭头函数的 `this`，否则，`this` 为 `undefined`”。

**例 5**

```js
var name = 'bar'
var obj = {
  name: 'foo',
  func1: function() {
    console.log(this.name)
  },
  func2: () => {
    console.log(this.name) // this === window
  },
  func3: function() {
    setTimeout(() => {
      console.log(this.name) // this 绑定的是最近一层非箭头函数的 this => obj
    }, 0)
  }
}
obj.func1() // foo
obj.func2() // bar
obj.func3() // foo
```

### apply/call/bind

**例 6**

```js
var name = 'bar'
var log = function() {
  console.log(this.name)
}

var obj = {
  name: 'foo',
  func1: function() {
    log()
    setTimeout(log, 0)
  },
  func2: function() {
    setTimeout(() => log.apply(obj), 1)
  },
  func3: function() {
    setTimeout(() => log.call(obj), 2)
  },
  func4: function() {
    setTimeout(log.bind(obj), 3)
  }
}

obj.func1() // bar bar
obj.func2() // foo
obj.func3() // foo
obj.func4() // foo
```

**bind apply call 区别**

`apply` 和 `call` 基本类似，他们的区别只是传入的参数不同。

- `apply(对象, 参数数组)`
- `call(对象, 参数)`

> bind()方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

也即：`bind`会创建一个新的函数，我们必须手动去调用它。

**例 7**

```js
var name = 'bar'
var obj = {
  name: 'foo',
  func: function(a, b) {
    console.log(this.name, a + b)
  }
}

var fn = obj.func

fn(1, 2) // bar 3
fn.apply(obj, [1, 2]) // foo 3
fn.call(obj, 1, 2) // foo 3
fn.bind(obj, 1, 2) // ƒ (a, b) { console.log(this.name, a + b) }
fn.bind(obj, 1, 2)() // foo 3
```

## new 绑定

> 如果函数调用前使用了 new 关键字, 则是调用了构造函数。
> 这看起来就像创建了新的函数，但实际上 JavaScript 函数是重新创建的对象：

**例 8**

```js
// 构造函数:
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

// This creates a new object
var p = new Person('bar', 'foo')
console.log(p.firstName) // bar
```

使用 `new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建一个新对象；
2. 将构造函数的作用域赋值给新对象；
3. 执行构造函数中的代码；
4. 返回新对象

伪代码表示：

```js
var obj = {} // 创建一个空对象
obj.__proto__ = constructor.prototype //添加__proto__属性，并指向构造函数的prototype 属性。
constructor.call(obj, 'bar', 'foo') // 绑定this
return obj
```

所以我们可以看到，在 new 的过程中，我们是使用 call 改变了 this 的指向。

## 参考

[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)
