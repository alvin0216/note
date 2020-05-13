---
title: 字典和散列表
date: 2020-05-12 16:00:33
---

## 什么是字典结构？

字典是以键值对形式存储数据的数据结构，就像电话号码薄里的名字和电话号码那样的一一对应的关系。

`javascript` 的 `Object` 类就是以这样的一种字典形式设计的。

键值对在字典中以这样的方式标记：`d = {key1 : value1, key2 : value2 }`。字典中的键/值对是没有顺序的。如果你想要一个特定的顺序，那么你应该在使用前自己对它们排序。

这种结构的意义在哪了！？

比如你有 2 亿 条数据，如果使用链表等这种有顺序的数据进行查找，要查找的数据刚好在最后一条。岂不是要循环 `2亿-1次` 才可以找到，如果使用字典机构，那么就可以很轻松的找到我们需要的数据。

## 字典

字典存储的是`[键，值]`对，其中键名是用来查询特定元素的。字典和集合很相似，集合以`[值，值]`的形式存储元素，字典则是以`[键，值]`的形式来存储元素。字典也称映射。示例代码如下:

字典主要操作

- `set(key, value)`: 添加键值对
- `delete(key)` : 删除键值对
- `has(key)` : 检查是否键
- `get(key)` : 通过键获取值
- `clear` 、`size`、`keys`、`values`、`each`

```js
function Dictionary() {
  var items = {}

  this.set = function(key, value) {
    items[key] = value
  }

  this.delete = function(key) {
    if (this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }

  this.has = key => items.hasOwnProperty(key)

  this.get = key => items[key]

  this.clear = function() {
    items = {}
  }

  this.size = () => Object.keys(items).length

  this.values = () => Object.values(items)

  this.each = function(fn) {
    for (var k in items) {
      if (this.has(k)) {
        fn(k, items[k])
      }
    }
  }
}
```

## 散列（hash）

> 哈希表(`Hash table`，也叫散列表)，是根据关键码值(`Key value`)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做`散列函数`，存放记录的数组叫做散列表。

哈希表的做法其实很简单:

1. Key 通过一个固定的算法函数既所谓的`哈希函数`转换成一个整型数字，
2. 将该数字对数组长度进行取余，取余结果就当作数组的下标，将 value 存储在以该数字为下标的数组空间里。
