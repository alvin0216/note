---
title: 集合的实现与应用
date: 2020-05-11 20:09:24
---

## 集合简介

在上一篇学习[数据结构--链表](./linkedList)中我们说了链表这种数据结构，但归根结底，不论是栈，队列亦或是链表都是线性结构。他们都是一种很规矩的数据结构，就像幼儿园的小朋友排队乖乖的站在那不会动一样。

![](../../../assets/algorithm/set/1.png)

然而纷杂的数据并不会总是排队站在那里，幼儿园小朋友一旦下了课那可就撒欢了，乱糟糟一团。可我们的幼儿园老师却能分辨出这些小朋友，因为啥？因为每个小朋友都在一个班里，而且每一个小朋友都有自己的名字。老师自然很容易就找到小朋友了。

![](../../../assets/algorithm/set/2.png)

而本篇博文要说的集合正是一堆`乱糟糟的数据`，唯一的共同点是这些数据隶属于同一个`集合`

> 由一个或多个元素所构成的叫做集合

集合的特性 & 概念

1. 无重复性： 集合里的元素不允许重复。例如 集合 `A = {1, 2, 2, 3}` ❌ 2 重复了
2. 空集：`{}`
3. 子集：`A = {1, 2, 3}` `B = {1, 2}` >> `B ⊆ A`
4. 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
5. 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
6. 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合

在数学中，集合也有并集、交集、差集等基本操作，在下面的代码中也会实现这些操作。

## 代码实现

接下来我们是用 `ES5` 来实现集合，为啥子这么说呢……因为在 ES6 中已经新给出了 Set，Map 等几个集合类，更加方便快捷的锁定键值对。

集合的一些方法

| 方法                  | 说明                                                            |
| --------------------- | --------------------------------------------------------------- |
| add(value)            | 向集合添加一个新的项                                            |
| remove(value)         | 从集合移除一个值                                                |
| has(value)            | 如果值在集合中，返回 true,否则返回 false                        |
| clear()               | 移除集合中的所有项                                              |
| size()                | 返回集合所包含的元素数量，与数组的 length 属性相似              |
| values()              | 返回一个集合中所有值的数组                                      |
| union(setName)        | 并集，返回包含两个集合所有元素的新集合(元素不重复)              |
| intersection(setName) | 交集，返回包含两个集合中共有的元素的集合；                      |
| difference(setName)   | 差集，返回包含所有存在本集合而不存在 setName 集合的元素的新集合 |
| subset(setName)       | 子集，验证 setName 是否是本集合的子集；                         |

```js
class Set {
  constructor() {
    this.items = {}
  }

  add(value) {
    // 向集合中添加元素
    if (!this.has(value)) {
      this.items[value] = value
      return true
    }
    return false
  }

  delete(value) {
    // 从集合中删除对应的元素
    if (this.has(value)) {
      delete this.items[value]
      return true
    }
    return false
  }

  has(value) {
    // 判断给定的元素在集合中是否存在
    return this.items.hasOwnProperty(value)
  }

  clear() {
    // 清空集合内容
    this.items = {}
  }

  size() {
    // 获取集合的长度
    return Object.keys(this.items).length
  }

  values() {
    // 返回集合中所有元素的内容
    return Object.values(this.items)
  }

  union(otherSet) {
    let unionSet = new Set()
    this.values().forEach(value => unionSet.add(value))
    otherSet.values().forEach(value => unionSet.add(value))
    return unionSet
  }

  intersection(otherSet) {
    // 交集
    let intersectionSet = new Set()
    this.values().forEach(value => {
      if (otherSet.has(value)) intersectionSet.add(value)
    })
    return intersectionSet
  }

  difference(otherSet) {
    // 差集
    let differenceSet = new Set()
    this.values().forEach(value => {
      if (!otherSet.has(value)) differenceSet.add(value)
    })
    return differenceSet
  }

  subset(otherSet) {
    // 子集
    if (this.size() > otherSet.size()) return false

    let isSubset = true
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false
        return false
      }
      return true
    })

    return isSubset
  }
}
```

:::details 测试用例

测试代码

```js
let s1 = new Set()
let s2 = new Set()

s1.add(1)
s1.add(2)
s1.add(3)

s2.add(1)
s2.add(4)

console.log(s1.union(s2).values()) // [ '1', '2', '3', '4' ]
console.log(s1.intersection(s2).values()) // ['1']
console.log(s1.difference(s2).values()) // ['2', '3']
console.log(s1.subset(s2)) // false
```

:::

## es6 中的 Set 和 WeakSet

在 ES6 中，原生的 Set 类已经实现了集合的全部特性，让我们来看看它的一些使用方法：

```js
let set = new Set()
set.add(1)
set.add(2)
set.add(3)
console.log(set.values()) // [Set Iterator] { 1, 2, 3 }
console.log(set.has(1)) // true
console.log(set.size) // 2

set.delete(1)
console.log(set.values()) // [Set Iterator] { 2, 3 }

set.clear()
console.log(set.values()) // [Set Iterator] {  }
```

和前面我们自定义的 `Set` 类稍微有一点不同，values()方法返回的不是一个数组，而是 `Iterator` 迭代器。另一个就是这里的 `size` 是一个属性而不是方法，其它部分都和我们前面定义的 `Set` 类相同。由于 `ES6` 的 `Set` 类不包含对集合的数学运算，我们可以按照前面我们提供的方法来对其进行扩充。

详见 [ES6 Set 和 Map](../../javascript/set-map)

参考

- [学习 Javascript 数据结构之集合](https://blog.damonare.cn/2017/01/16/%E5%AD%A6%E4%B9%A0Javascript%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B9%8B%E9%9B%86%E5%90%88/)
