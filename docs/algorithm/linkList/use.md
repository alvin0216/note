---
title: 链表的运用
date: 2020-07-30 07:37:07
---

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
