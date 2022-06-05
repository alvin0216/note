---
title: 实现 requestIdleCallback
date: 2021-06-29 10:54:23
sidebar: auto
tags:
  - React
categories: React
---

## 浏览器一帧

当前大多数的屏幕刷新率都是 `60hz`，也就是每秒屏幕刷新 `60` 次，低于 `60hz` 人眼就会感知卡顿掉帧等情况，同样我们前端浏览器所说的 `FPS（frame per second）`是浏览器每秒刷新的次数，理论上 `FPS` 越高人眼觉得界面越流畅，在两次屏幕硬件刷新之间，浏览器正好进行一次刷新（重绘），网页也会很流畅，当然这种是理想模式， 如果两次硬件刷新之间浏览器重绘多次是没意义的，只会消耗资源，如果浏览器重绘一次的时间是硬件多次刷新的时间，那么人眼将感知卡顿掉帧等， 所以浏览器对一次重绘的渲染工作需要在 `16ms（1000ms/60）`之内完成，也就是说每一次重绘小于 16ms 才不会卡顿掉帧。

**浏览器的一帧说的就是一次完整的重绘。**

一次重绘浏览器需要做哪些事情？

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/browser-frame.awebp)

## 认识 requestIdleCallback

在执行优先级较低的任务时，可以考虑使用 `window.requestIdleCallback()`，意为交予任务给浏览器，浏览器有空闲的时候执行而不是立即执行这些任务。

这样这些优先级较低的任务就不阻碍主线程的任务，以达到性能优化的效果。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/browser-frame2.webp)

```js
window.requestIdleCallback(workLoop, { timeout: 50 });

// 优先级较低的工作
function workLoop(deadline) {
  // 如果帧内有富余的时间，或者超时 则执行任务
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length > 0) {
    // 执行的函数....
  }

  // 有未完成的任务 则重新调度
  if (works.length > 0) {
    window.requestIdleCallback(workLoop, { timeout: 50 });
  }
}
```

- `callback`: 一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 `IdleDeadline` 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
  其中 `IdleDeadline` 对象包含：
  - `didTimeout`，布尔值，表示任务是否超时，结合 `timeRemaining` 使用。
  - `timeRemaining()`，表示当前帧剩余的时间，也可理解为留给任务的时间还有多少。
- `timeout`: 表示超过这个时间后，如果任务还没执行，则强制执行，不必等待空闲。尚未通过超时毫秒数调用回调，那么回调会在下一次空闲时期被强制执行。如果明确在某段时间内执行回调，可以设置 `timeout` `值。在浏览器繁忙的时候，requestIdleCallback` 超时执行就和 `setTimeout` 效果一样。

## 浏览器什么时候有空闲时段

#### 场景一

当浏览器一帧渲染所用时间小于屏幕刷新率（对于具有 60Hz 的设备，一帧间隔应该小于 16ms）时间，到下一帧渲染渲染开始时出现的空闲时间，如图 idle period，

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/browser-frame2.webp)

#### 场景二

当浏览器没有可渲染的任务，主线程一直处于空闲状态，事件队列为空。为了避免在不可预测的任务（例如用户输入的处理）中引起用户可察觉的延迟，这些空闲周期的长度应限制为最大值 `50ms`，也就是 `timeRemaining` 最大不超过 50（也就是 20fps，这也是 `react polyfill` 的原因之一），当空闲时段结束时，可以调度另一个空闲时段，如果它保持空闲，那么空闲时段将更长，后台任务可以在更长时间段内发生。如图:

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/browser-frame3.awebp)

## react 如何实现 requestIdleCallback

前面提到 `requestIdleCallback` 工作只有 `20FPS`，一般对用户来感觉来说，需要到 `60FPS` 才是流畅的, 即一帧时间为 `16.7 ms`，所以这也是 react 团队自己实现 `requestIdleCallback` 的原因。

**实现大致思路是在 requestAnimationFrame 获取一桢的开始时间，触发一个 postMessage，在空闲的时候调用 idleTick 来完成异步任务。**

:::: tabs

::: tab React polyfill

```js
export let requestHostCallback; // 类似requestIdleCallback
export let cancelHostCallback; // 类似cancelIdleCallback
export let requestHostTimeout; // 非dom环境的实现
export let cancelHostTimeout; // 取消requestHostTimeout
export let shouldYieldToHost; // 判断任务是否超时,需要被打断
export let requestPaint; //
export let getCurrentTime; // 获取当前时间
export let forceFrameRate; // 根据fps计算帧时间
// 非dom环境
if (typeof window === 'undefined' || typeof MessageChannel !== 'function') {
  let _callback = null; // 正在执行的回调
  let _timeoutID = null;
  const _flushCallback = function () {
    // 如果回调存在则执行，
    if (_callback !== null) {
      try {
        const currentTime = getCurrentTime();
        const hasRemainingTime = true;
        // hasRemainingTime 类似deadline.didTimeout
        _callback(hasRemainingTime, currentTime);
        _callback = null;
      } catch (e) {
        setTimeout(_flushCallback, 0);
        throw e;
      }
    }
  };

  // ...

  requestHostCallback = function (cb) {
    // 若_callback存在，表示当下有任务再继续，
    if (_callback !== null) {
      // setTimeout的第三个参数可以延后执行任务。
      setTimeout(requestHostCallback, 0, cb);
    } else {
      // 否则直接执行。
      _callback = cb;
      setTimeout(_flushCallback, 0);
    }
  };
  cancelHostCallback = function () {
    _callback = null;
  };
  requestHostTimeout = function (cb, ms) {
    _timeoutID = setTimeout(cb, ms);
  };
  cancelHostTimeout = function () {
    clearTimeout(_timeoutID);
  };
  shouldYieldToHost = function () {
    return false;
  };
  requestPaint = forceFrameRate = function () {};
} else {
  // 一大堆的浏览器方法的判断，有performance， requestAnimationFrame， cancelAnimationFrame
  // ...
  const performWorkUntilDeadline = () => {
    if (scheduledHostCallback !== null) {
      const currentTime = getCurrentTime();
      // yieldInterval每帧的时间，deadline为最终期限时间
      deadline = currentTime + yieldInterval;
      const hasTimeRemaining = true;
      try {
        const hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
        if (!hasMoreWork) {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        } else {
          // 如果有更多的工作，就把下一个消息事件安排在前一个消息事件的最后
          port.postMessage(null);
        }
      } catch (error) {
        // 如果调度任务抛出，则退出当前浏览器任务，以便观察错误。
        port.postMessage(null);
        throw error;
      }
    } else {
      isMessageLoopRunning = false;
    }
    needsPaint = false;
  };

  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;

  requestHostCallback = function (callback) {
    scheduledHostCallback = callback;
    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      port.postMessage(null);
    }
  };
}
```

:::

::: tab 自己实现一版

```js
class RequestIdle {
  deadlineTime = null;
  callback = () => {};
  channel = null;
  port1 = null;
  port2 = null;
  isWaitingAvailableFrame = true;

  constructor() {
    this.channel = new MessageChannel();
    this.port1 = this.channel.port1;
    this.port2 = this.channel.port2;
    this.port2.onmessage = () => {
      const timeRemaining = () => this.deadlineTime - performance.now();
      const _timeRemain = timeRemaining();
      if (_timeRemain > 0 && this.callback && this.isWaitingAvailableFrame) {
        const deadline = {
          timeRemaining,
          didTimeout: _timeRemain < 0,
        };
        this.callback(deadline);
        this.isWaitingAvailableFrame = false;
      } else if (this.isWaitingAvailableFrame) {
        this.RequestIdleCallback(this.callback);
      }
    };
  }

  RequestIdleCallback = function (cb) {
    const SECONDE_DURATION = 1000;
    const FRAME_DURATION = SECONDE_DURATION / 60;
    this.callback = cb;
    this.isWaitingAvailableFrame = true;
    if (!document.hidden) {
      requestAnimationFrame((rafTime) => {
        this.deadlineTime = rafTime + FRAME_DURATION;
        this.port1.postMessage(null);
      });
    } else {
      this.deadlineTime = performance.now() + SECONDE_DURATION;
      this.port1.postMessage(null);
    }
  };
}
```

调用：

```js
const idle = new RequestIdle();

idle.RequestIdleCallback(workLoop);

function workLoop(deadline) {
  console.log(`本帧剩余时间 ${parseInt(deadline.timeRemaining())}`);

  // 如果帧内有富余的时间，或者超时 则执行任务
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length > 0) {
    console.log(33);
  }

  // 有未完成的任务 则重新调度
  if (works.length > 0) {
    idle.RequestIdleCallback(workLoop);
  }
}

function sleep(delay) {
  for (let start = Date.now(); Date.now() - start <= delay; ) {
    // ...
  }
}

const works = [
  () => {
    console.log('第一个任务开始');
    sleep(20);
    console.log('第一个任务结束');
  },
  () => {
    console.log('第二个任务开始');
    sleep(20);
    console.log('第二个任务结束');
  },
  () => {
    console.log('第三个任务开始');
    sleep(20);
    console.log('第三个任务结束');
  },
];
```

:::

::::

## 总结

`requestIdleCallback` 需要注意的：

- `requestIdleCallback` 是屏幕渲染之后执行的。
- 一些低优先级的任务可使用 `requestIdleCallback` 等浏览器不忙的时候来执行，同时因为时间有限，它所执行的任务应该尽量是能够量化，细分的微任务（micro task）比较适合 `requestIdleCallback`。
- `requestIdleCallback` 不会和帧对齐，所以涉及到 DOM 的操作和动画最好放在 `requestAnimationFrame` 中执行，`requestAnimationFrame` 在重新渲染屏幕之前执行。
- `Promise` 也不建议在这里面进行，因为 `Promise` 的回调属性 `Event loop` 中优先级较高的一种微任务，会在 `requestIdleCallback` 结束时立即执行，不管此时是否还有富余的时间，这样有很大可能会让一帧超过 16 ms。
