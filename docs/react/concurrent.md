---
title: concurrent 模式
date: 2022-03-29 14:21:19
sidebar: auto
tags:
  - React
categories:
  - React
---

- [The Plan for React 18](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html)
- 为数据获取挂起——描述了一种在 React 组件中获取数据的新机制。[https://reactjs.org/docs/concurrent-mode-suspense.html](https://reactjs.org/docs/concurrent-mode-suspense.html)
- 并发用户界面模式——展示了一些基于并发模式和挂起模式的用户界面模式。[https://reactjs.org/docs/concurrent-mode-patterns.html](https://reactjs.org/docs/concurrent-mode-patterns.html)
- 采用并发模式——说明了如何在项目中尝试并发模式。[https://reactjs.org/docs/concurrent-mode-adoption.html](https://reactjs.org/docs/concurrent-mode-adoption.html)
- 并发模式 API 参考——实验版本中可用的新 API 文档。[https://reactjs.org/docs/concurrent-mode-reference.html](https://reactjs.org/docs/concurrent-mode-reference.html)

## 什么是可中断的异步更新

我们知道 js 和 浏览器 gui 的渲染进程是互斥的
