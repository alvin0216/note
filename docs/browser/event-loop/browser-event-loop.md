---
title: 浏览器中的 EventLoop
date: 2020-06-17 18:21:16
---

```JS
console.log('start')
setTimeout(() => { // 宏任务
  console.log('timeout')
})
Promise.resolve().then(() => { // 微任务
  console.log('resolve')
})
console.log('end')
```

我们来分析一下:

1. 刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈。打印 `start` `end`
2. `setTimeout` 作为一个宏任务放入宏任务队列
3. `Promise.then` 作为一个为微任务放入到微任务队列
4. 当本次宏任务执行完，检查微任务队列，发现一个 `Promise.then`, 执行
5. 接下来进入到下一个宏任务——`setTimeout`, 执行

结果：

```bash
start end resolve timeout
```

这样就带大家直观地感受到了浏览器环境下 EventLoop 的执行流程。不过，这只是其中的一部分情况，接下来我们来做一个更完整的总结。

- 一开始整段脚本作为第一个宏任务执行
- 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
- 当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空
- 执行浏览器 UI 线程的渲染工作
- 检查是否有 Web worker 任务，有则执行
- 执行队首新的宏任务，回到 2，依此循环，直到宏任务和微任务队列都为空

练习题

```js
Promise.resolve().then(() => {
  console.log('Promise1')
  setTimeout(() => {
    console.log('setTimeout2')
  }, 0)
})
setTimeout(() => {
  console.log('setTimeout1')
  Promise.resolve().then(() => {
    console.log('Promise2')
  })
}, 0)
console.log('start')

// start
// Promise1
// setTimeout1
// Promise2
// setTimeout2
```

---

转自 [如何理解 EventLoop——浏览器篇](http://47.98.159.95/my_blog/js-v8/005.html)
