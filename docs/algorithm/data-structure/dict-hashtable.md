---
title: 字典和散列表的实现
date: 2020-05-12 16:00:33
---

## 什么是字典结构？

在[前一篇文章](./set)中，我们介绍了如何在 `JavaScript` 中实现集合。字典和集合的主要区别就在于，集合中数据是以`[值，值]`的形式保存的，我们只关心值本身；而在字典和散列表中数据是以`[键，值]`的形式保存的，键不能重复，我们不仅关心键，也关心键所对应的值。

```js
// 使用上一节封装的 Set。和本节封装的 Dictionary
let set = new Set()
set.add(1)

let dict = new Dictionary()
dict.set(1, 2)

console.log(set) // Set { items: { '1': 1 } }
console.log(dict) // Dictionary { items: { '1': 2 } }
```

这两种数据结构的存取所耗费的性能比链表等有顺序的结构低：

比如你有 2 亿 条数据，如果使用链表等这种有顺序的数据进行查找，要查找的数据刚好在最后一条。岂不是要循环 `2亿-1次` 才可以找到，如果使用字典机构，那么就可以很轻松的找到我们需要的数据。

## 字典

我们也可以把字典称之为映射表。由于字典和集合很相似，我们可以在前一篇文章中的集合类 `Set` 的基础上来实现我们的字典类 `Dictionary`。与 `Set` 类相似，ES6 的原生 `Map` 类已经实现了字典的全部功能，稍后我们会介绍它的用法。

下面是我们的 `Dictionary` 字典类的实现代码：

```js
class Dictionary {
  constructor() {
    this.items = {}
  }

  set(key, value) {
    // 向字典中添加或修改元素
    this.items[key] = value
  }

  get(key) {
    // 通过键值查找字典中的值
    return this.items[key]
  }

  delete(key) {
    // 通过使用键值来从字典中删除对应的元素
    if (this.has(key)) {
      delete this.items[key]
      return true
    }
    return false
  }

  has(key) {
    // 判断给定的键值是否存在于字典中
    return this.items.hasOwnProperty(key)
  }

  clear() {
    // 清空字典内容
    this.items = {}
  }

  size() {
    // 返回字典中所有元素的数量
    return Object.keys(this.items).length
  }

  keys() {
    // 返回字典中所有的键值
    return Object.keys(this.items)
  }

  values() {
    // 返回字典中所有的值
    return Object.values(this.items)
  }

  getItems() {
    // 返回字典中的所有元素
    return this.items
  }
}
```

与 `Set` 类很相似，只是把其中 value 的部分替换成了 `key`。我们来看看一些测试用例：

```js
let dictionary = new Dictionary()
dictionary.set('A', 'A.com')
dictionary.set('B', 'B.com')
dictionary.set('C', 'C.com')
console.log(dictionary.has('A')) // true
console.log(dictionary.size()) // 3
console.log(dictionary.keys()) // [ 'A', 'B', 'C' ]
console.log(dictionary.values()) // [ 'A.com', 'B.com', 'C.com' ]
console.log(dictionary.get('C')) // C.com

dictionary.delete('B')
console.log(dictionary.keys()) // [ 'A', 'C' ]
console.log(dictionary.values()) // [ 'A.com', 'C.com' ]
console.log(dictionary.getItems()) // { A: 'A.com', C: 'C.com' }
```

相应地，下面是使用 ES6 的原生 `Map` 类的测试结果：

```js
let es6Map = new Map()
es6Map.set('A', 'A.com')
es6Map.set('B', 'B.com')
es6Map.set('C', 'C.com')
console.log(es6Map.has('A')) // true
console.log(es6Map.size) // 3
console.log(es6Map.keys()) // [Map Iterator] { 'A', 'B', 'C' }
console.log(es6Map.values()) // [Map Iterator] { 'A.com', 'B.com', 'C.com' }
console.log(es6Map.get('C')) // C.com

es6Map.delete('B')
console.log(es6Map.keys()) // [Map Iterator] { 'A', 'C' }
console.log(es6Map.values()) // [Map Iterator] { 'A.com', 'C.com' }
console.log(es6Map.entries()) // [Map Iterator] { [ A: 'A.com' ], [ C: 'C.com' ] }
```

和前面我们自定义的 `Dictionary` 类稍微有一点不同，`values()`方法和 `keys()`方法返回的不是一个数组，而是 `Iterator` 迭代器。另一个就是这里的 `size` 是一个属性而不是方法，然后就是 `Map` 类没有 `getItems()`方法，取而代之的是 `entries()`方法，它返回的也是一个 `Iterator`。

### WeakSet & WeakMap

在 ES6 中，除了原生的 `Set` 和 `Map` 类外，还有它们的弱化版本，分别是 `WeakSet` 和 `WeakMap`，我们在[栈的实现与应用](./stack.md#使用-weakmap-私有化-items)一文中已经见过 `WeakMap` 的使用了。`Map` 和 `Set` 与它们各自的弱化版本之间的主要区别是：

1. `WeakSet` 或 `WeakMap` 类没有`entries`、`keys` 和 `values` 等迭代器方法，只能通过 `get` 和 `set` 方法访问和设置其中的值。这也是为什么我们在[栈的实现与应用](./stack.md#使用-weakmap-私有化-items)一文中要使用 `WeakMap` 类来定义类的私有属性的原因。
2. 只能用对应作为键值，或者说其中的内容只能是对象，而不能是数字、字符串、布尔值等基本数据类型。

弱化的 `Map` 和 `Set` 类主要是为了提供 JavaScript 代码的性能。

## 散列（hash）

> 哈希表(`Hash table`，也叫散列表)，是根据关键码值(`Key value`)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做`散列函数`，存放记录的数组叫做散列表。

哈希表的做法其实很简单:

1. Key 通过一个固定的算法函数既所谓的`哈希函数`转换成一个整型数字，
2. 将该数字对数组长度进行取余，取余结果就当作数组的下标，将 value 存储在以该数字为下标的数组空间里。

参考 [JavaScript 数据结构——字典和散列表的实现](https://www.cnblogs.com/jaxu/p/11302315.html)
