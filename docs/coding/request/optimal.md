---
title: 求依赖请求的最优解
date: 2020-09-27 13:09:40
---

> `ABCD` 四个请求，`C` 依赖 `B` 的结果，`D` 依赖 `ABC` 的结果，最终输出 `D`，请求出最短时间解

:::details ABCD 请求代码

```js
let A = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求完A')
      resolve('A')
    }, 1600)
  })
}

let B = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求完B')
      resolve('B')
    }, 500)
  })
}

let C = data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求完C，参数为', data)
      resolve(data + 'C')
    }, 500)
  })
}

let D = params => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求完D，参数为', params)
      resolve('D')
    }, 500)
  })
}
```

:::

```js
console.time()
Promise.all([A(), B().then(C)]).then(res => {
  D(res).then(() => {
    console.timeEnd()
  })
})
```
