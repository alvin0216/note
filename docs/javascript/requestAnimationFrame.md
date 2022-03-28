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

## generator 返回什么
