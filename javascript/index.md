---
title: JavaScript
date: 2021-07-22 09:23:33
sidebar: auto
---

## 基本操作

```js
var a = { name: 'Sam' };
var b = { name: 'Tom' };
var o = {};
o[a] = 1;
o[b] = 2;
console.log(o[a]); // 输出什么？
```

输出 `2`, `o[a] = 1` => `{ '[object Object]': 1 }`, 同理变成了 `2`。

```js
const promise1 = Promise.resolve('First');
const promise2 = Promise.resolve('Second');
const promise3 = Promise.reject('Third');
const promise4 = Promise.resolve('Fourth');
const runPromises = async () => {
  const res1 = await Promise.all([promise1, promise2]);
  const res2 = await Promise.all([promise3, promise4]);
  return [res1, res2];
};
runPromises()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// Third
```
