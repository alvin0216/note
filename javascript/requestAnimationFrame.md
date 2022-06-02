---
title: requestAnimationFrame
date: 2022-03-24 21:38:40
sidebar: auto
tags:
  - requestAnimationFrame
  - setTimeout
categories:
  - Javascript
---

## requestAnimationFrame

> window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

```js
// 回调列表中唯一的标识。
const timerId = window.requestAnimationFrame(callback);
```

## 基本用法

用法其实跟 setTimeout 完全一致，只不过当前的时间间隔是跟着系统的绘制频率走，是固定的

```js
// 调用的是系统的时间间隔
const element = document.getElementById('box');
let start;

function step(timestamp) {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) {
    // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

var timer1 = window.requestAnimationFrame(step);

//取消回调函数
// cancelAnimationFrame(timer1);
```

## setTimeout vs requestAnimationFrame

| -        | requestAnimationFrame                                                                                    | setTimeout                                                    |
| -------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 引擎层面 | 属于 `GUI` 引擎，发生在渲 染过程的中重绘重排部分，与电脑分辨路保持一致                                   | 属于 JS 引擎，存在事件轮询，存在事件队列                      |
| 性能层面 | 当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，`requestAnimationFrame` 也会停止。           | 当页面被隐藏或最小化时，定时器 `setTimeout` 仍在后台执行      |
| 应用层面 | 由浏览器专门为动画提供 的 API，在运行时浏览器会自动优化方法的调用，在特定性环境下可以有效节省了 CPU 开销 | 利用 `setTimeout`，这种定时机制去做动画，模拟固定时间刷新页面 |
| 调用周期 | 0.2 ~ 0.3 ms (大约 1 帧的时间)                                                                           | 1 ~ 3 ms (第二个参数传入 0 情况下)                            |

- [2022 年了,真的懂 requestAnimationFrame 么？](https://juejin.cn/post/7062178363800027173)

<!--
## setTimeout & setInterval 的区别

[为什么要用 setTimeout 模拟 setInterval ？](https://juejin.cn/post/6914201197620494350)

## requestAnimationFrame

**引擎层面**

- `setTimeout` 属于 JS 引擎，存在事件轮询，存在事件队列。

- `requestAnimationFrame` 属于 `GUI` 引擎，发生在渲 染过程的中重绘重排部分，与电脑分辨路保持一致。

**性能层面**

- 当页面被隐藏或最小化时，定时器 `setTimeout` 仍在后台执行动画任务。

- 当页面处于未激活的状态下，该页面的屏幕刷新任 务会被系统暂停，`requestAnimationFrame` 也会停止。

**应用层面**

- 利用 `setTimeout`，这种定时机制去做动画，模拟固定时间刷新页面。
- `requestAnimationFrame` 由浏览器专门为动画提供 的 API，在运行时浏览器会自动优化方法的调用，在特定性环境下可以有效节省了 CPU 开销。

## generator 返回什么 -->
