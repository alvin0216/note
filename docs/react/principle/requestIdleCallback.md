---
title: requestIdleCallback
date: 2020-07-06 22:36:49
---

![](https://gitee.com/alvin0216/pv-client/raw/master/public/img/icons/android-chrome-192x192.png)

## 概述

在执行优先级较低的任务时，可以考虑使用 `window.requestIdleCallback()`，意为交予任务给浏览器，浏览器有空闲的时候执行而不是立即执行这些任务。

这样这些优先级较低的任务就不阻碍主线程的任务，以达到性能优化的效果。

`window.requestIdleCallback(callback[, options])`

| 参数     | 描述                                                                                                                                                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callback | 回调，即空闲时需要执行的任务。该回调函数接收一个 IdleDeadline 对象作为入参。其中 IdleDeadline 对象包含：<br /> **didTimeout**: 布尔值，表示任务是否超时，结合 `timeRemaining` 使用。<br /> **timeRemaining()**: 表示当前帧剩余的时间，也可理解为留给任务的时间还有多少。 |
| options  | **timeout**: 任务超时时间，过了超时时间，表示任务还没执行，则立即执行。                                                                                                                                                                                                  |

requestIdleCallback 用法示例

```js
const TIME_OUT = 1000 // 任务超时时间 1000ms
window.requestIdleCallback(workLoop, { timeout: TIME_OUT })

// 优先级较低的工作
function workLoop(deadline) {
  // 如果帧内有富余的时间，或者超时 则执行任务
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length > 0) {
    // 执行的函数....
  }

  // 有未完成的任务 则重新调度
  if (works.length > 0) {
    window.requestIdleCallback(workLoop, { timeout: TIME_OUT })
  }
}
```

我们定义一个 sleep 函数用于测试任务的调度过程，代码如下：

```js
const TIME_OUT = 1000

function sleep(delay) {
  for (let start = Date.now(); Date.now() - start <= delay; ) {
    // ...
  }
}

const works = [
  () => {
    console.log('第一个任务开始')
    sleep(20)
    console.log('第一个任务结束')
  },
  () => {
    console.log('第二个任务开始')
    sleep(20)
    console.log('第二个任务结束')
  },
  () => {
    console.log('第三个任务开始')
    sleep(20)
    console.log('第三个任务结束')
  }
]

window.requestIdleCallback(workLoop, { timeout: TIME_OUT })

function workLoop(deadline) {
  console.log(`本帧剩余时间 ${parseInt(deadline.timeRemaining())}`)

  // 如果帧内有富余的时间，或者超时 则执行任务
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length > 0) {
    performUnitOfWork()
  }

  // 有未完成的任务 则重新调度
  if (works.length > 0) {
    window.requestIdleCallback(workLoop, { timeout: TIME_OUT })
  }
}

function performUnitOfWork() {
  works.shift()()
}
```

<details>
  <summary>注意 requestIdleCallback 兼容性较差，因此 React 专门写了一套任务调度来实现这个 API。</summary>
  <img src='https://gitee.com/alvin0216/cdn/raw/master/img/browser/requestIdleCallback.png' />
</details>

## 页面流畅与 FPS

**网页动画的每一帧（frame）都是一次重新渲染。每秒低于 24 帧的动画，人眼就能感受到停顿**。一般的网页动画，需要达到每秒 30 帧到 60 帧的频率，才能比较流畅。如果能达到每秒 70 帧甚至 80 帧，就会极其流畅。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015091509.jpg)

大多数显示器的刷新频率是 60Hz，为了与系统一致，以及节省电力，浏览器会自动按照这个频率，刷新动画（如果可以做到的话）。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015091510.jpg)

所以，如果网页动画能够做到每秒 60 帧，就会跟显示器同步刷新，达到最佳的视觉效果。

这意味着，<span class='orange'>一秒之内进行 60 次重新渲染，每次重新渲染的时间不能超过 16.66 毫秒</span>。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015091511.png)

**一秒之间能够完成多少次重新渲染，这个指标就被称为"刷新率"，英文为 FPS（frame per second）**。60 次重新渲染，就是 60FPS。

如果想达到 60 帧的刷新率，就意味着 JavaScript 线程每个任务的耗时，必须少于 16 毫秒。

## 链接

- [阮一峰 网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)
- [要实现 60FPS 动画, 你需要了解这些](https://juejin.im/post/5d1f01ba6fb9a07f0b03e22e)
- [你应该知道的 requestIdleCallback](https://juejin.im/post/5ad71f39f265da239f07e862)
- [requestIdleCallback 和 requestAnimationFrame 详解](https://www.jianshu.com/p/2771cb695c81)
