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
参考 [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)
