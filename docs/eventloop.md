---
title: 关于 EventLoop
date: 2020-05-16 20:31:29
---

## EventLoop 是什么？

`EventLoop` 简单来说是一个用于统筹调度任务的一种机制。

`Javascript` 是单线程，同一时刻只能执行特定的任务。一旦遇到大量任务或者遇到一个耗时的任务，那么就很可能造成阻塞，`EventLoop` 就是为了解决这个问题而提出的。

## 宏仁务 & 微任务

常见的宏任务和微任务有：

- 宏任务：`setTimeout`  `setInterval`  `MessageChannel` `setImmediate（ie 下生效）`
- 微任务：` Promise.then`` MutationObserver ` `process.nextTick`

## 科普：为什么是 JS 是单线程的？

相对的是 JS 如果是多线程，假如我们在线程 A 和线程 B 里同时对 DOM 进行修改，那么浏览器要以哪个修改为主呢？

## 思考：有了宏任务为什么还要有微任务？

## 经典面试题

```ts
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('settimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
```

:::details 答案

- `script start`
- `async1 start`
- `async2`
- `promise1`
- `script end`
- `async1 end`
- `promise2`
- `settimeout`

:::
