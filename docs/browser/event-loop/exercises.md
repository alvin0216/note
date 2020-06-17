---
title: 练习题
date: 2020-06-17 22:16:58
---

## 题 1：基础

```JS
setTimeout(() => { // 宏任务
  console.log(1)
}, 0)
Promise.resolve().then(() => { // 微任务
  console.log(2)
})
console.log(3)
```

答案 3 2 1

解析：main script 运行结束后，检查是否有微任务，有则执行，等微任务执行完在执行下一个宏任务。

## 题 2：对于 Promise 的理解

```JS
setTimeout(() => { // 宏任务
  console.log(1)
}, 0)

let a = new Promise((resolve) => { // 同步任务
  console.log(2) // Promise 的 executor 仍然是同步的
  resolve()
}).then(() => { // 微任务
  console.log(3)
}).then(() => { // 微任务
  console.log(4)
})

console.log(5)
```

答案 2 5 3 4 1

## 题 3：promise 回调地狱

```js
new Promise((resolve, reject) => {
  console.log('promise1')
  resolve()
})
  .then(() => {
    console.log('then11')
    new Promise((resolve, reject) => {
      console.log('promise2')
      resolve()
    })
      .then(() => {
        console.log('then21')
      })
      .then(() => {
        console.log('then23')
      })
  })
  .then(() => {
    console.log('then12')
  })
```

---

摘自 [Eventloop 不可怕，可怕的是遇上 Promise](https://juejin.im/post/5c9a43175188252d876e5903)
