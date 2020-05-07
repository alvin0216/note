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
function Father(name) {}

Father.prototype.say = function() {
  console.log(this.name)
}

function Child(name) {
  this.name = name
}

Child.prototype = new Father() // 子类型的原型为父类型的一个实例对象

var c1 = new Child('foo')

c1.say()
```

我们可以看到子类的实例 `c1.__proto` 可以访问到父类原型上的方法。

![](../../assets/javascript/extends.png)

- [JavaScript 对象封装、多态、继承](https://juejin.im/post/5e75e22951882549027687f9)
- [隔壁小孩也能看懂的 7 种 JavaScript 继承实现](https://juejin.im/post/5ceb468af265da1bd1463585)
