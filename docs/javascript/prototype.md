---
title: 原型和原型链
date: 2020-05-01 10:15:33
---

## 构造函数

我们先使用构造函数创建一个对象：

```js
function Person() {}
var person = new Person()
person.name = 'Kevin'
console.log(person.name) // Kevin
```

在这个例子中，**Person 就是一个构造函数**，我们使用 `new` 创建了一个实例对象 `person`。

很简单吧，接下来进入正题：

## prototype <Badge text="构造函数.prototype >> 指向对象原型"/>

每个函数都有一个 `prototype` 属性，就是我们经常在各种例子中看到的那个 `prototype` ，比如：

```js
function Person() {}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin'
var person1 = new Person()
var person2 = new Person()
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

那这个函数的 `prototype` 属性到底指向的是什么呢？是这个函数的原型吗？

其实，**函数的 `prototype` 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型**，也就是这个例子中的 person1 和 person2 的原型。

那什么是原型呢？你可以这样理解：每一个 `JavaScript` 对象(null 除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

让我们用一张图表示构造函数和实例原型之间的关系：

![构造函数和实例原型的关系图](../../assets/javascript/prototype/1.png)

在这张图中我们用 `Object.prototype` 表示实例原型。

那么我们该怎么表示实例与实例原型，也就是 `person` 和 `Person.prototype` 之间的关系呢，这时候我们就要讲到第二个属性：`__proto__`

## \_\_proto\_\_ <Badge text="实例.__proto__ >> 指向实例原型"/>

这是每一个 `JavaScript` 对象(除了 null )都具有的一个属性，叫 \_\_proto\_\_，这个属性会指向该对象的原型。

为了证明这一点,我们可以在火狐或者谷歌中输入：

```js
function Person() {}
var person = new Person()
console.log(person.__proto__ === Person.prototype) // true
```

于是我们更新下关系图：

![实例与实例原型的关系图](../../assets/javascript/prototype/2.png)

既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

## constructor <Badge text="原型对象.constructor >> 指向构造函数"/>

指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：`constructor`，每个原型都有一个 `constructor` 属性指向关联的构造函数。

为了验证这一点，我们可以尝试：

```js
function Person() {}
console.log(Person === Person.prototype.constructor) // true
```

所以再更新下关系图：

![实例原型与构造函数的关系图](../../assets/javascript/prototype/3.png)

综上我们已经得出：

```js
function Person() {}

var person = new Person()

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

了解了构造函数、实例原型、和实例之间的关系，接下来我们讲讲实例和原型的关系：

## 实例与原型
