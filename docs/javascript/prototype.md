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

## prototype

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
