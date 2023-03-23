---
title: 谈一谈 EventLoop？
date: 2020-05-16 20:31:29
sidebar: 'auto'
tags:
  - Javascript
  - EventLoop
categories:
  - Javascript
---

`EventLoop` 简单来说是一个用于统筹调度任务的一种机制。

我们知道 `Javascript` 是单线程的，当然这句话说的不是很对，应该说**它的主线程是单线程的**。例如：`ajax` 和 `setTimeout` 在浏览器中就会多开一条线程。

## 为什么是 JS 是单线程的？

相对的是 JS 如果是多线程，假如我们在线程 A 和线程 B 里同时对 DOM 进行修改，那么浏览器要以哪个修改为主呢？

所以 JS 一开始就被设定为单线程的运行方式。

> 我们其实可以通过 `WebWorker` 的方式来开启多线程

## 什么是宏仁务？

- 宏任务：setTimeout   setInterval   setImmediate（ie 下生效）   MessageChannel（消息通道）
- 微任务：Promise.then    MutationObserver（监听 dom 节点更新完毕)    process.nextTick()（node 的文法，比 Promise.then 执行的快）

在 JS 中，大部分的任务都是在主线程上执行，常见的任务有:

- 渲染事件
- 用户交互事件
- js 脚本执行
- 网络请求、文件读写完成事件等等。

为了让这些事件有条不紊地进行，JS 引擎需要对之执行的顺序做一定的安排，V8 其实采用的是一种队列的方式来存储这些任务，的方式来存储这些任务， 即先进来的先执行。模拟如下:

```ts
bool keep_running = true;
void MainTherad(){
  for(;;){
    //执行队列中的任务
    Task task = task_queue.takeTask();
    ProcessTask(task);

    //执行延迟队列中的任务
    ProcessDelayTask()

    if(!keep_running) //如果设置了退出标志，那么直接退出线程循环
        break;
  }
}
```

基于 `Javascript` 是单线程的这个缺点来看，如果我们在进行渲染事件（如解析 DOM、计算布局、绘制），或者我们执行一个 JS 脚本，而这个脚本又进行复杂的计算，这时候会发生什么呢？

**任务执行阻塞进程**

于是 `setTimeout` 等就可以发挥它的功效了，我们完全可以通过 `setTimeout` 将耗时任务延迟，以免阻塞到其他任务的执行。

## 有了宏仁务为什么还要微任务？

对于每个宏任务而言，其内部都有一个微任务队列。那为什么要引入微任务？微任务在什么时候执行呢？

其实引入微任务的初衷是为了解决异步回调的问题。想一想，对于异步回调的处理，有多少种方式？

像之前那样将任务放在队列的最后，那么如果**任务队列很长，那么就迟迟无法执行到这个任务了。**

于是，为了规避这样的问题，V8 引入了第二种方式，这就是微任务的解决方式。**在每一个宏任务中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列**，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。

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

setTimeout(function() {
  console.log('settimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
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
