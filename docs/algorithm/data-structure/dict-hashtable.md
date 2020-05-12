---
title: 字典和散列表
date: 2020-05-12 16:00:33
---

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
