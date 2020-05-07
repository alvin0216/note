---
title: 【未完成】Javascript 中的继承
date: 2020-05-07 16:07:38
---

JavaScript 没有类，原型链来实现继承。

继承就是子类可以使用父类的所有功能，并且对这些功能进行扩展。例如

```js
class Animal {
  constructor(name) {
    this.name = name
  }
  say() {
    console.log(this.name)
  }
}

class Dog extends Animal {}

var dog = new Dog('foo')

dog.say() // 调用继承 Animal 的方法
```

## 原型链继承 <Badge text="Child.prototype = new Father()" />

这种方式关键在于: **子类型的原型为父类型的一个实例对象。**

```js {11}
function Father() {
  this.arr = [1, 2, 3]
}

Father.prototype.say = function() {
  console.log(this.arr.join(', '))
}

function Child() {}

Child.prototype = new Father() // 子类型的原型为父类型的一个实例对象

var c1 = new Child()
c1.say()
```

我们可以看到子类的实例 `c1.__proto` 可以访问到父类原型上的方法。

![](../../assets/javascript/extends.png)

**子类继承父类的属性和方法是将父类的私有属性和公有方法都作为自己的公有属性和方法，**

```js {5}
var c1 = new Child()
var c2 = new Child()

c2.say() // 1, 2, 3
c1.arr.push(4)
c2.say() // 1, 2, 3, 4
```

这就表示，原型链继承里面，使用的都是同一个内存里的值，这样修改该内存里的值，其他继承的子类实例里的值都会变化。

---

- 特点
  - 父类新增原型方法/原型属性，子类都能访问到
  - 简单，易于实现
- 缺点：
  - 无法实现多继承
  - 来自原型对象的所有属性被所有实例共享
  - 创建子类实例时，无法向父类构造函数传参
  - 要想为子类新增属性和方法，必须要在 `Child.prototype = new Father()` 之后执行，不能放到构造器中

## 借用构造函数继承 <Badge text="Father.call(this, ...)"/>

这种方式关键在于: **在子类型构造函数中通用 call()调用父类型构造函数**

```js {6}
function Father(name) {
  this.arr = [1, 2, 3]
}

function Child(name) {
  Father.call(this, name)
}

var c1 = new Child('foo')
var c2 = new Child('bar')

c1.arr.push(4)
console.log(c2.arr) // [1, 2, 3]
```

---

- 特点：
  - 解决了原型链继承中子类实例共享父类引用属性的问题
  - 创建子类实例时，可以向父类传递参数
  - 可以实现多继承(call 多个父类对象)
- 缺点：
  - 实例并不是父类的实例，只是子类的实例
  - 只能继承父类的实例属性和方法，不能继承原型属性和方法
  - 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

## 组合继承

这种方式关键在于: **通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。**

我们发现，
通过原型链实现的继承，都是复用同一个属性和方法；
通过构造函数实现的继承，都是独立的属性和方法。于是我们大打算利用这一点，将两种方式组合起来：通过在原型上定义方法实现对**函数的复用**，通过构造函数的方式保证每个实例都有它**自己的属性**。

---

- [JavaScript 对象封装、多态、继承](https://juejin.im/post/5e75e22951882549027687f9)
- [隔壁小孩也能看懂的 7 种 JavaScript 继承实现](https://juejin.im/post/5ceb468af265da1bd1463585)
- [JavaScript 常见的六种继承方式](https://segmentfault.com/a/1190000016708006)
