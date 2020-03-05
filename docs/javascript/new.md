---
title: New 的模拟实现
date: 2020-01-15 11:53:51
side: true
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

```js
// 第一版代码
function objectFactory() {
  var obj = new Object()
  var Constructor = [].shift.call(arguments) // 将第一个参数取出 相当于 arguments.shift() 只不过类数组不能用 shift 方法 此时 arguments 已经被改变

  obj.__proto__ = Constructor.prototype

  Constructor.apply(obj, arguments)

  return obj
}
```

在这一版中，我们：

1. 用 `new Object()` 的方式新建了一个对象 obj
2. **[].shift.call(arguments)**: 取出第一个参数，就是我们要传入的构造函数。此外因为 `shift` 会修改原数组，所以 `arguments` 会被去除第一个参数
3. **obj.`__proto__` = Constructor.prototype**:将 `obj` 的原型指向构造函数，这样 `obj` 就可以访问到构造函数原型中的属性
4. **Constructor.apply(obj, arguments)**: 使用 `apply`，改变构造函数 `this` 的指向到新建的对象，这样 `obj` 就可以访问到构造函数中的属性
5. 返回 `obj`

我们做个测试：

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

var p = objectFactory(Person, 'guosw', 18)
console.log(p.name) // guosw
console.log(p.age) // 18
console.log(p.sex) // 男
p.say() // I am guosw
```

[]~(￣ ▽ ￣)~\*\*

## 返回值效果测试

接下来我们再来看一种情况，假如构造函数有返回值，举个例子：

```js
function Person(name, age) {
  this.name = name
  this.age = age
  return {
    name,
    sex: '男'
  }
}

Person.prototype.say = function() {
  console.log('I am ' + this.name)
}

var p = objectFactory(Person, 'guosw', 18)
console.log(p.name) // guosw
console.log(p.age) // undefined
p.say() // I am guosw
```

在这个例子中，构造函数返回了一个对象，在实例 `person` 中只能访问返回的对象中的属性。

而且还要注意一点，在这里我们是返回了一个对象，假如我们只是返回一个基本类型的值呢？

```js
function Person(name, age) {
  this.name = name
  this.age = age
  return 'handsome boy'
}

var p = objectFactory(Person, 'guosw', 18)
console.log(p.name) // guosw
console.log(p.age) // 18
console.log(p.sex) // undefined
```

结果完全颠倒过来，这次尽管有返回值，但是相当于没有返回值进行处理。

所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。

再来看第二版的代码，也是最后一版的代码：

```js
// 第二版的代码
function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments)

  obj.__proto__ = Constructor.prototype

  var ret = Constructor.apply(obj, arguments)

  return typeof ret === 'object' ? ret : obj
}
```

## 文章出处

[JavaScript 深入之 new 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13)
