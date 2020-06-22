---
title: 练习题
date: 2020-06-17 22:16:58
---

宏任务：渲染事件（如解析 DOM、计算布局、绘制），各种 I/O 操作，JavaScript 脚本执行事件等等

下面列出频繁出现在 js 常见的宏任务和微任务。

| 宏任务                                                                                     | 微任务                                                 |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| 整体代码 `script`、`setTimeout`、`setInterval`、`setImmediate`、 `promise` 中的 `executor` | `promise.then`、`process.nextTick`、`MutationObserver` |

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

解析：

- `setTimeout` 为宏任务，加入宏任务队列。
- `Promise.resolve` 为微任务，加入微任务队列
- `console.log(3)`: 输出 3
- 执行当前微任务队列的任务：输出 2
- 微任务队列已空，执行下一个宏任务，输出 1，完毕

## 题 2：Promise(executor)

```JS
setTimeout(() => { // 宏任务
  console.log(1)
}, 0)

let a = new Promise((resolve) => { // 同步任务
  console.log(2) // Promise 的 executor 仍然是同步的
  resolve() // 开启微任务
}).then(() => { // 微任务
  console.log(3)
}).then(() => { // 微任务
  console.log(4)
})

console.log(5)
```

`new Promise(executor)` 中的 `executor` 是同步执行的。

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

解析

1. 执行整体代码 `script`：输出 `promise1` , `resolve()` 加入到微任务队列 [`then11`]
2. 执行微任务 `then11`：输出 `then11`、`promise2`，`resolve()` 加入到微任务队列 [`then21`]

---

- 摘自 [Eventloop 不可怕，可怕的是遇上 Promise](https://juejin.im/post/5c9a43175188252d876e5903)
- 推荐 [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
- 推荐 [实现 promise A+ 规范的 promise](https://github.com/alvin0216/my-promise)
