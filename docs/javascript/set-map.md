---
title: Set 和 Map
date: 2020-05-11 23:32:29
---

建议先阅读 [阮一峰 Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)

## Set 集合

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


```js
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
let arr = [... new Set([1, 2, 3, 3])] // 去重

let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2]) 

let union = new Set([...a, ...b]) // 并集
let intersect = new Set([...a].filter(x => b.has(x))) // 交集
let difference = new Set([...a].filter(x => !b.has(x))) // 差集
```

## WeakSet <Badge text="弱集合" type="warning"/>

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

```js
const a = [[1, 2], [3, 4]]

const ws = new WeakSet(a) // WeakSet {[1, 2], [3, 4]}
```

上面代码中，a 是一个数组，它有两个成员，也都是数组。将 a 作为 `WeakSet` 构造函数的参数，a 的成员会自动成为 `WeakSet` 的成员。

注意，是 a 数组的成员成为 `WeakSet` 的成员，而不是 a 数组本身。这意味着，数组的成员只能是对象。

```js
const b = [3, 4]
const ws = new WeakSet(b) // Uncaught TypeError: Invalid value used in weak set(…)
```

### WeakSet 是弱引用

`WeakSet` 中的对象都是弱引用，即`垃圾回收机制`不考虑 `WeakSet` 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中。

这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为 0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。`WeakSet` 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，`WeakSet` 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 `WeakSet` 里面的引用就会自动消失。

---

举个例子

```js
var obj = { name: 'guodada' }
var c = obj
obj = null 
```

`{ name: 'guodada' }` 被 `obj`、`c` 同时引用

`obj = null` , 时候  引用次数 -1，但未被 js 垃圾回收机制回收。同理，`Set` 也是，而 `WeakSet` 则不一样，上面也有说明了。

```js
let obj = { name: 'guodada' }
let c = obj
let set = new Set()
let ws = new WeakSet()
set.add(obj)
ws.add(obj)
obj = null 
```

![](../../assets/javascript/es6/set-map.png)

#### WeakSet 不能遍历

`WeakSet` 的成员是不适合引用的，因为它会随时消失。另外，由于 `WeakSet` 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 `WeakSet` 不可遍历。

### WeakSet 的应用

`WeakSet` 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。`WeakSet` 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

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


参考 [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)
