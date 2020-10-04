---
title: new
date: 2020-01-15 11:53:51
side: true
---

## new 做了什么？

我们在模拟 `new` 之前，先看看 `new` 实现了哪些功能。

```js
function Person(name) {
  console.log('run Person')
  this.name = name
}
Person.prototype.age = 18
var p = new Person('alvin') // run Person
console.log(p, p.age) // Person { name: 'alvin' } 18
```

从这个例子中，我们可以看到，实例 p 可以：

1. 访问到 `Person` 构造函数里的属性
2. 访问到 `Person.prototype` 中的属性

以上面的为例，模拟一下 new 的操作

```js
var obj = new Object() // 1. 创建一个空对象
obj.__proto__ = Person.prototype // 2 设置原型链
var result = Person.call(obj) // 3 让 Person 中的 this 指向 obj，并执行 Person 的函数体
// 4 返回值是 object 类型 则直接返回这个结果 如果没有返回值或者其他 则默认返回创建的对象
if (typeof result === 'object') {
  return result
} else {
  return obj
}
```

## new 的实现

接下来就让我们使用 `objectFactory` 模拟实现 new 操作吧

```js
function Person() {
  // ...
}

// 使用 new
var p = new Person(...)

// 使用 objectFactory
var p = objectFactory(Person, ...)
```

使用 new 操作时会默认返回一个对象，也就是说先创建一个空对象再返回。

实例 p 可以访问到 `Person` 构造函数里的属性，也即 `p.name` ，也就是说 this 会指向 p 实例

```js
function objectFactory(Constructor, ...args) {
  let obj = new Object()
  let ret = Constructor.apply(obj, args)
  return obj
}
```

此时，p 实例还无法访问到 `Person.prototype.age` 上的属性，也即 `p.age`，那么还需要将 `obj.__proto__` 指向构造函数的原型

```diff
function objectFactory(Constructor, ...args) {
  let obj = new Object()
+ obj.__proto__ = Constructor.prototype // 指向原型 可以让实例访问到构造函数的原型上的属性
  let ret = Constructor.apply(obj, args)
  return obj
}
```

构造函数也有返回值，假如返回的是一个对象，则实例就是该对象，其他情况默认返回创建的原型对象

```js
function objectFactory(Constructor, ...args) {
  let obj = new Object() // 创建一个新对象
  obj.__proto__ = Constructor.prototype // 指向原型 可以让实例访问到构造函数的原型上的属性
  let ret = Constructor.apply(obj, args) // 指向构造函数，并将 this 绑定到新创建的 obj 对象上
  return typeof ret === 'object' ? ret : obj // 默认返回新对象
}
```

大功告成

[JavaScript 深入之 new 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13)
