---
title: 继承
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - Javascript
categories:
  - Javascript
---

`javascript` 的继承是基于原型链上的继承，通过 `__proto__` 和 `prototype` 来模拟实现了这个概念。

## prototype 继承

1. 通过 `prototype` 实现继承，可以共享原型属性。

```js
function Fruit() {
  this.alias = '水果';
}

function Apple(name, count) {
  this.name = name;
  this.count = count;
}
Apple.prototype = new Fruit();
Apple.prototype.constructor = Apple;
// Fruit.prototype 构造函数指向 Fruit, 如果不改变 Apple 指向就会导致会导致继承链的紊乱

const apple1 = new Apple('🍏', 3);
console.log(apple1.alias, apple1);
```

执行结果：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/extends2.png)

<span class="red">缺点：引用类型的属性被所有实例共享，相互影响</span>

2. 也可以直接继承 `prototype`

```js
Apple.prototype = Fruit.prototype;
Apple.prototype.constructor = Apple;

// 缺点 Fruit.prototype.constructor 指向 Apple
```

与前一种方法相比，这样做的优点是效率比较高（不用执行和建立 `Fruit` 的实例了），比较省内存。缺点是 `Apple.prototype` 和 `Fruit.prototype` 现在指向了同一个对象，那么任何对 `Apple.prototype` 的修改，都会反映到 `Fruit.prototype`。

## 函数内执行 Parent.call 继承

> 通过在构造函数中，使用 `call` 或 `apply` 方法，将父对象的构造函数绑定在子对象上

```js
function Fruit(alias) {
  this.alias = alias;
}

function Apple(name, alias) {
  Fruit.call(this, alias);
  this.name = name;
}
const apple1 = new Apple('苹果', '水果');
```

优点就是属性独立不受影响啦。

<span class='red'>缺点：每 new 一次，都要执行一遍 Fruit 函数</span>

## 组合继承

既想有独立属性，也想有共享属性。

```js
function Fruit() {
  this.alias = '水果';
}

function Apple(name, count) {
  Fruit.call(this);
  this.name = name;
  this.count = count;
}

Apple.prototype = new Fruit();
Apple.prototype.constructor = Apple;
```

<span class='red'>组合继承最大的缺点是会调用两次父构造函数。 `new Fruit()` `Fruit.call(this)`, 然后实例化的时候又会执行一次 `Fruit.call(this)`。</span>

## 最终版

如果我们不使用 `Apple.prototype = new Fruit()` ，而是间接的让 `Apple.prototype` 访问到 `Fruit.prototype` 呢？

利用一个空函数作为中介：

```js
function Fruit() {
  this.alias = '水果';
}

function Apple(name, count) {
  Fruit.call(this);
  this.name = name;
  this.count = count;
}

// 关键的三步
var F = function () {};
F.prototype = Fruit.prototype;
Apple.prototype = new F();
```

最后我们封装一下这个继承方法：

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```

## Class 的继承

```js
class Fruit {
  constructor(unit) {
    this.unit = unit;
  }
  say() {
    console.log(this.unit);
  }
}

class Apple extends Fruit {
  constructor(name, unit) {
    super(unit); // super 调用父类的构造方法
    this.name = name;
  }

  log() {
    super.say(); // 调用父类的方法
  }
}

const apple1 = new Apple('苹果', '个');
apple1.say(); // 个
```
