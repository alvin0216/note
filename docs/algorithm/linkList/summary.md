---
title: 总结
date: 2020-07-30 07:37:07
---

## 链表

- 链表中的元素存储不是连续的，通过 next 链接
- `Javascript` 中 `Object.__protot__` 也是一种链表结构
- 链表常用操作：修改 next，遍历链表

<span class='mgreen'>链表的常见应用</span>

比如遍历 json

```js
const json = {
  a: { b: { c: 1 } },
  d: { e: 2 }
}

const path = ['a', 'b', 'c']
```

沿着 `path` 找到 `json` 对应值，这和链表的遍历很像

```js
let result = null

let p = json // 定义指针指向 json
path.forEach(key => {
  p = p[key]
})

console.log(p)
```
