---
title: 'ES6: Set 和 Map'
date: 2020-05-11 23:32:29
---

建议先阅读 [阮一峰 Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)

## Set

> `Set` 即集合，不了解集合的概念请自行百度。重点是 `Set` 内部成员是唯一的，记住这点。

- 实例的属性和方法
  - `add`: 添加元素
  - `delete`: 删除某个值，返回一个布尔值，表示删除是否成功
  - `has`: 返回一个布尔值，表示该值是否为 Set 的成员
  - `size`: 返回 `Set` 实例的成员总数
  - `clear`: 清除所有成员，没有返回值
- 遍历方法
  - `values`: 返回键值的遍历器
  - `keys`: 返回键名的遍历器
  - `entries`: [返回键值对的遍历器](https://es6.ruanyifeng.com/#docs/iterator)
  - `forEach`: 使用回调函数遍历每个成员

```TS
let s = new Set()

s.add(1).add(2).add(2).add(3) // Set(3) { 1, 2, 3 }

s.forEach((key, value, set) => {
  console.log(`key: ${key}, value: ${value}`, set)
})
// result >> 键值对相等
// key 1 value 1 Set(3) { 1, 2, 3 }
// key 2 value 2 Set(3) { 1, 2, 3 }
// key 3 value 3 Set(3) { 1, 2, 3 }

let interator = s.entries() // SetIterator {1 => 1, 2 => 2, 3 => 3}
interator.next() // { value: [ 1, 1 ], done: false }
interator.next() // { value: [ 2, 2 ], done: false }
interator.next() // { value: [ 3, 3 ], done: false }
interator.next() // { value: undefined, done: true }
```

Set 常用的方法

```js
let arr = [...new Set([1, 2, 3, 3])] // 去重

let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

let union = new Set([...a, ...b]) // 并集
let intersect = new Set([...a].filter(x => b.has(x))) // 交集
let difference = new Set([...a].filter(x => !b.has(x))) // 差集
```

接下来讲 `WeakSet`, 在讲弱应用前我们先了解一下 `Javascript` 的垃圾回收机制：

## WeakSet 预备知 - 垃圾回收机制

JavaScript 具有自动垃圾收集机制。也就是说开发人员无需关心内存使用问题，执行环境会负责管理代码执行过程中使用的内存，找出不再继续使用的变量，然后释放其占用的内存。

这里我们简单了解 `JavaScript` 的垃圾回收算法：**引用计数法**

顾名思义，让所有对象实现记录下有多少“程序”在引用自己，让各对象都知道自己的“人气指数”。

```js
var a = new Object() // 此时'这个对象'的引用计数为1（a在引用）
var b = a // ‘这个对象’的引用计数是2（a,b）
a = null // reference_count = 1
```

虽然 a 访问不到对象了，但 `new Object()` 仍然被 b 引用，引用次数未清理，所以内存不会得到释放。除非我们将 `b = null`!

同理，Set 也会引用加入的成员，因为 Set 也是强引用。

```js
let a = new Object() // 此时'这个对象'的引用计数为1（a在引用）
let set = new Set()
set.add(a) // ‘这个对象’的引用计数是2（a,set)
a = null // reference_count = 1
```

而 `WeakSet` 不会引用计数，这也是两者的明显区别之一。

## WeakSet

`WeakSet` 只有 3 个方法

- `add`: 添加元素
- `delete`: 删除某个值，返回一个布尔值，表示删除是否成功
- `has`: 返回一个布尔值，表示该值是否为 Set 的成员

`WeakSet` 结构与 `Set` 类似，也是不重复的值的集合。但是，它与 Set 有两个区别

### WeakSet 的成员只能是对象

首先 `WeakSet` 的成员只能是对象，而不能是其他类型的值。

```js
const ws = new WeakSet()

ws.add(1) // TypeError: Invalid value used in weak set
```

```TS
const a = [[1, 2], [3, 4]]

const ws = new WeakSet(a) // WeakSet {[1, 2], [3, 4]}
```

上面代码中，a 是一个数组，它有两个成员，也都是数组。将 a 作为 `WeakSet` 构造函数的参数，a 的成员会自动成为 `WeakSet` 的成员。

注意，是 a 数组的成员成为 `WeakSet` 的成员，而不是 a 数组本身。这意味着，数组的成员只能是对象。

```js
const b = [3, 4]
const ws = new WeakSet(b) // Uncaught TypeError: Invalid value used in weak set(…)
```

### WeakSet 是弱引用也不能遍历

:::tip 关于弱引用

`WeakSet` 中的对象都是弱引用，即垃圾回收机制不考虑 `WeakSet` 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中。

这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为 0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。`WeakSet` 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。
:::

:::tip 关于不能遍历
`WeakSet` 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
:::

:::warning 补充：什么是内存泄漏
一个没有用的临时变量没有被及时销毁，就会发生内存泄漏。一般是写代码的时候，不小心在全局保存了对临时变量的引用，使得 `GC` 无法回收变量。
:::

## WeakSet 的应用

借用`弱引用`的特性，`WeakSet` 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 `WeakSet` 里面的引用就会自动消失。

`WeakSet` 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

下面是 `WeakSet` 的另一个例子。

```js
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method() {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！')
    }
  }
}
```

上面代码保证了 `Foo` 的实例方法，只能在 `Foo` 的实例上调用。这里使用 `WeakSet` 的好处是，`foos` 对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑 `foos`，也不会出现内存泄漏。

## Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

```js
const data = {}
const element = document.getElementById('myDiv')

data[element] = 'metadata'
data['[object HTMLDivElement]'] // "metadata"
```

上面代码原意是将一个 DOM 节点作为对象 data 的键，但是由于对象只接受字符串作为键名，所以 element 被自动转为字符串`[object HTMLDivElement]`。

为了解决这个问题，ES6 提供了 `Map` 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 `Hash` 结构实现。如果你需要“键值对”的数据结构，`Map` 比 `Object` 更合适。

```js
const m = new Map()
const o = { p: 'Hello World' }

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()] // [1, 2, 3]

[...map.values()]  // ['one', 'two', 'three']

[...map.entries()] // [[1,'one'], [2, 'two'], [3, 'three']]

[...map] // [[1,'one'], [2, 'two'], [3, 'three']]
```

其他方法自查。。。

### WeakMap 的应用

和 WeakSet 一般无二，区别就是键值对

WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子

```TS
let myWeakmap = new WeakMap()

myWeakmap.set(document.getElementById('logo'), { timesClicked: 0 })

document.getElementById('logo').addEventListener('click', function() {
    let logoData = myWeakmap.get(document.getElementById('logo'))
    logoData.timesClicked++
  }, false)
```

WeakMap 的另一个用处是部署私有属性。用法可见 [使用-weakmap-私有化-items](../algorithm/data-structure/stack.md#使用-weakmap-私有化-items)

参考 [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)
