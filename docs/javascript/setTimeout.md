---
title: setTimeout 和 setInterval 的区别
date: 2022-03-28 17:38:56
sidebar: auto
tags:
  - setTimeout
categories:
  - Javascript
---

## 区别

> 语法区别：`setTimeout` `setInterval` 都是在第二个时间间隔参数到了后，将回调函数推进任务队列里面（**注意并不是马上执行**），按照队列先进先出的性质，该回调事件到点之后是否能执行取决于是否属于队列首位，如果前头还有其他事件在等待，则不能按点执行，那么这样极有可能产生时间错乱执行的问题。

所以 `setInterval` 不能做到真正的每个程序执行完毕再执行下一个，我们可以用 `setTimeout` 来模拟 `setInterval` 的执行，因为 `setTimeout` 是运行完一次以后，进行延迟，再触发下一个任务。

## 时间偏差问题

首先，无论是 setTimeOut 和 setInterval 都会有时间偏差问题。

setTimeout 最小延迟时间

```js
console.time('ok');
setTimeout(() => {
  console.timeEnd('ok');
}, 0); // ok: 1.93115234375 ms 预期是 0ms 实际上 大于 1ms
```

实现倒计时 10 秒，产生的偏差值：

```js
let startTime = Date.now();
let count = 0;

const interval = setInterval(function () {
  count++;
  // 理想情况应该是0ms，但是我们可以看到在控制台中并不都是0ms
  console.log(Date.now() - (startTime + count * 1000) + 'ms');
  if (count === 10) {
    clearInterval(interval);
  }
}, 1000);
// 5ms 7ms 7ms 8ms 8ms 10ms 14ms 13ms 18ms 19ms
```

使用 `setTimeout` 同样会出现时间偏差的问题：

```js
let startTime = Date.now();
let count = 0;

let timeout = setTimeout(cb, 1000);

function cb() {
  count++;
  // 理想情况应该是0ms，但是我们可以看到在控制台中并不都是0m
  console.log(Date.now() - (startTime + count * 1000) + 'ms');
  if (count <= 10) {
    timeout = setTimeout(cb, 1000);
  }
}
// 5ms 15ms 16ms 17ms 21ms 26ms 27ms 30ms 36ms 35ms
```

## setTimeout 解决时间偏差

既然有时间偏差问题，我们想到的是能不能通过动态计算时间偏差值，并动态调整执行 setTimeout 的间隔，以尽量调整整体的时间偏差。

比如定时每隔 1000ms 倒计时，首次运行时候时间偏差 2ms，那么下一次执行时候就把时间参数提早 2ms，也就是 998ms，如果下次还出现偏差，继续调整……如此往复，并不能保证每一次间隔都相同，但能在整体上减少时间偏差。

```js
const interval = 1000;
let ms = 5000; // 从服务器和活动开始时间计算出的时间差，这里测试用 5000 ms
let count = 0;
const startTime = Date.now();
let timeCounter = setTimeout(countDownStart, interval);

function countDownStart() {
  count++;
  const offset = Date.now() - (startTime + count * interval); // A
  let nextTime = interval - offset;
  if (nextTime < 0) {
    nextTime = 0;
  }
  ms -= interval;
  console.log(`误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`);
  if (ms < 0) {
    clearTimeout(timeCounter);
  } else {
    timeCounter = setTimeout(countDownStart, nextTime);
  }
}

// 误差：6 ms，下一次执行：994 ms 后，离活动开始还有：4000 ms
// 误差：10 ms，下一次执行：990 ms 后，离活动开始还有：3000 ms
// 误差：5 ms，下一次执行：995 ms 后，离活动开始还有：2000 ms
// 误差：6 ms，下一次执行：994 ms 后，离活动开始还有：1000 ms
// 误差：5 ms，下一次执行：995 ms 后，离活动开始还有：0 ms
// 误差：1 ms，下一次执行：999 ms 后，离活动开始还有：-1000 ms
```

- [setTimeOut/setInterval 出现时间偏差问题原因及解决方案【每日一问 20210829】](https://juejin.cn/post/7001872097337311246)
- [JavaScript 前端倒计时纠偏实现](https://juejin.cn/post/6844903685458231303)
- [做一些动图，学习一下 EventLoop](https://juejin.cn/post/6969028296893792286)
