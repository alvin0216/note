---
title: Javascript 中的继承
date: 2020-05-07 16:07:38
---

## 借用构造函数

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

## 原型链继承

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

## 组合继承

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
Parent.prototype.log = function() {
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

Parent.prototype.log = function() {
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

参考自 [JavaScript 深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16) -->
