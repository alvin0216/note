---
title: 数组差集的优化策略
date: 2020-09-10 09:16:55
---

题目：allKeys 和 usedKeys 都是数字数组，求 allKeys 中不包含 usedKeys 的 key 的结果。

```js
let allKeys = []
let usedKeys = []

for (let i = 0; i < 9999; i++) {
  allKeys.push(i)
  if (i < 5000) usedKeys.push(i)
}

// 方法1 O(n^2)
allKeys.filter(key => !usedKeys.includes(key))

// 方法2 利用 set，set 的查找效率是 O(1), 最终复杂度 O(n)
let set = new Set(usedKeys)
allKeys.filter(key => !set.has(key))

// 方法3 利用哈希表 查找效率是 O(1), 最终复杂度 O(n)
const hash = usedKeys.reduce((hash, key) => {
  hash[key] = 1
  return hash
}, {})
allKeys.filter(key => !hash[key])
```

- 利用双层遍历，算法复杂度 $O(n^2)$，不可取
- 利用 set，set 的查找效率是 O(log2N), 最终复杂度 $O(n)$
- 利用哈希表 查找效率是 O(1), 最终复杂度 $O(n)$

运算结果

```js
normal: 62.321ms
set: 1.369ms
hash: 0.609ms

// 有时候也可能是 哈希快
set: 1.369ms
hash: 2.609ms
```

总结：寻址算法最好采用 set、哈希、字典表的方式，可以有效降低算法复杂度。
