---
title: Promise 的拷问
date: 2020-07-25 23:24:25
---

## 你能说一下 Promise 的作用、用法、以及优缺点吗？

- `Promise` 是异步编程的一种解决方案。 主要是解决了异步回调地狱的问题。
- 怎么解决异步回调地狱的问题？<span class='orange'>链式调用</span>，执行完一个任务后才进行下一个任务。
- 优缺点分析
  - 相对回调地狱：`Promise` 的写法更为直观，并且能够在外层捕获异步函数的异常信息。
  - 缺点就是
    - `promise` 一旦新建就会立即执行，无法中途取消
    - 当处于 `pending` 状态时，无法得知当前处于哪一个状态，是刚刚开始还是刚刚结束。
    - `promise` 封装 ajax 时，由于 `promise` 是异步微任务，发送请求的三步会被延后到整个脚本同步代码执行完，并且将响应回调函数延迟到现有队列的最后，如果大量使用会大大降低了请求效率
- 内部机制
  - 一共有 `pendding` `fulfilled` `rejected` 三种状态，不可逆。

## 你实现过 Promise 吗

balabala。。。。。

## Promise.all 介绍一下

`Promise.all` 中其中有一个请求失败了 请问这个 `Promise` 会马上失败吗 还是等所有的 `Promise` 完成后再执行回调？

执行第一个失败后，以第一个失败的原因再执行回调。

## Promise.race 介绍一下

## 能不能在 then 模拟 catch 效果

可以的

```js
let promise = Promise.reject()

promise.then(
  () => {},
  error => {
    console.log('这里捕捉错误')
  }
)
```

## Promise.finally

balabala。。。。。

## axios 怎么做到取消请求的

`promise` 不可以中途取消，那 `axios` 怎么做到取消请求的？
