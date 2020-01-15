---
title: New 的模拟实现
date: 2020-01-15 11:53:51
---

**new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一**

也许有点难懂，我们在模拟 `new` 之前，先看看 `new` 实现了哪些功能。

举个例子：

```js
function Person(name, age) {
  this.name = name
  this.age = age
  this.sex = '男'
}

Person.prototype.footer = 2

Person.prototype.say = function() {
  console.log('I am ' + this.name)
}

var p = new Person('guosw', 18)

console.log(p.name) // guosw
console.log(p.age) // 18
console.log(p.footer) // 2

p.say() // I am guosw
```

从这个例子中，我们可以看到，实例 p 可以：

1. 访问到 `Person` 构造函数里的属性
2. 访问到 `Person.prototype` 中的属性

接下来，我们可以尝试着模拟一下了。

因为 `new` 是关键字，所以无法像 `bind` 函数一样直接覆盖，所以我们写一个函数，命名为 `objectFactory`，来模拟 `new` 的效果。用的时候是这样的：

```js
function Person() {
  // ...
}

// 使用 new
var p = new Person(...)

// 使用 objectFactory
var p = objectFactory(Person, ...)
```

## 初步实现

分析：

因为 `new` 的结果是一个新对象，所以在模拟实现的时候，我们也要建立一个新对象，假设这个对象叫 `obj`，因为 `obj` 会具有 `Person` 构造函数里的属性，想想经典继承的例子，我们可以使用 `Person.apply(obj, arguments)`来给 `obj` 添加新的属性。

原型与原型链，我们知道实例的 `__proto__` 属性会指向构造函数的 `prototype`，也正是因为建立起这样的关系，实例可以访问原型上的属性。

现在，我们可以尝试着写第一版了：
