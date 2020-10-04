---
title: 继承
date: 2020-05-07 16:07:38
---

## 借用构造函数（创建多次函数）

<span class='green'>在子类构造函数中调用 `Parent.call(this)` </span>

```js
function Parent(name) {
  this.name = name
  this.log = () => console.log(this.name)
}

function Child(name) {
  Parent.call(this, name) // ✨ 这样子就可以往 Parent 传参了
}

let c1 = new Child('alvin')
let c2 = new Child('Kobe')

c1.log() // alvin
c2.log() // Kobe
```

在 `new Child()` 的时候调用 `Parent.call(this, name)`, 也就是 this 指向了 Child，实现了继承。

缺点每次都要创建一次函数，我们希望的是函数可以共享，而不是每次都为实例创建多一个属性去存储函数。

## 原型链继承（不能向子类传参）

<span class='green'>子类的 prototype 指向父类的实例对象 `Child.prototype = new Parent()`</span>

```js
function Parent() {}
Parent.prototype.nums = [1]

function Child() {}

Child.prototype = new Parent() // ✨ 子类的 prototype 指向父类的实例对象
Child.prototype.constructor = Child // 注意构造函数指向回 C

let c1 = new Child()
c1.nums // [ 1 ]

// 优点 引用类型的属性被所有实例共享
// 缺点 在创建 Child 的实例时，不能向Parent传参

// 引用类型的属性被所有实例共享 ==>
let c2 = new Child()
c2.nums.push(2) // c1 的 nums 属性值也受影响了
```

## 组合继承（调用了两次父类构造函数）

- **原型链继承**：继承一些函数，公用的属性值等等。
  - `Child.prototype = new Parent()`
  - 因为子类的实例可能要公用方法，而不是一个实例一个方法。
- **借用构造函数继承**：分别继承一些私有的属性，各个子实例之间互不影响。
  - 在子构造函数中执行 `Parent.call(this, name)`

```js
function Parent(name) {
  this.name = name
}
// 共享属性放在原型对象上
Parent.prototype.log = function () {
  console.log(this.name)
}

function Child(name) {
  Parent.call(this, name)
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

let c1 = new Child('alvin')
let c2 = new Child('Kobe')

c1.log() // alvin
c2.log() // Kobe
```

缺点：调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

```js
// 调用了两次父类构造函数
Child.prototype = new Parent()
Parent.call(this, name)
```

## 寄生组合继承

<span class='green'>实现 Child.prototype -> Parent.prototype</span>

思路就是建立一个临时的函数，函数原型指向父类原型，然后子类原型指向该函数的实例。

```js
function Parent(name) {
  this.name = name
}

Parent.prototype.log = function () {
  console.log(this.name)
}

function Child(name) {
  Parent.call(this, name)
}

function F() {} // 1. 新建立一个中转函数
F.prototype = Parent.prototype // 函数原型指向 Parent
Child.prototype = new F() // 将子类的原型指向 F 的实例
Child.prototype.constructor = Child

let c1 = new Child('alvin')
c1.log()
```

可以简单封装成：

```js
function inherit(Child, Parent) {
  function F() {} // 1. 新建立一个中转函数
  F.prototype = Parent.prototype // 函数原型指向 Parent
  Child.prototype = new F() // 将子类的原型指向 F 的实例
  Child.prototype.constructor = Child
}

// 调用继承
inherit(Child, Parent)
```

## Class 的继承

super 代表的是父类的构造函数。

### super 关键字

```js
class A {}

class B extends A {
  constructor() {
    super() // 相当于 A.call(this)
  }
}

// 可以看成是
function A() {}
function B() {
  A.call(this) // super()
}
```

super 既可以当作函数使用，也可以当作对象使用。

- 作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。
- 当对象用是可以调用父类的方法，比如 `super.log()`

**在 `constructor` 在调用 `super` 前使用 `this` 会报错。**

```js
class A {}

class B extends A {
  constructor(name) {
    this.name = name // ReferenceError
    super() // 这里调用了
    this.name = name // 正确
  }
}
let c = new B('alvin')
```

### React 中不写 super

React 类组件不写 constructor 是没事的，因为会默认添加 constructor。

如果写了，一定要写，否则会报错。

```js
constructor(props) {
  super(props)
  // 在这里可以开始调用 this
}
```

super 中的 props 是否必要？ 作用是什么？？

- 可以不写 constructor，一旦写了 constructor，就必须在此函数中写 super()
- 此时组件才有自己的 this，在组件的全局中都可以使用 this 关键字，
- 否则如果只是 constructor 而不执行 super() 那么以后的 this 都是错的！！！

可以不写 `super(props)`，这样只是组件读取不到父组件传来的 `props` 而已。

- 参考自 [JavaScript 深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16) -->
