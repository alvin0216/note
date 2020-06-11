---
# sidebar: false
date: 2019-10-16 09:07:08
---

## 大纲

- 浏览器是多进程的
  - 浏览器都包含哪些进程？
  - 浏览器多进程的优势
  - 重点是浏览器内核（渲染进程）
  - Browser 进程和浏览器内核（Renderer 进程）的通信过程
- 梳理浏览器内核中线程之间的关系
  - GUI 渲染线程与 JS 引擎线程互斥
  - JS 阻塞页面加载
  - WebWorker，JS 的多线程？
  - WebWorker 与 SharedWorker
- 简单梳理下浏览器渲染流程
  - load 事件与 DOMContentLoaded 事件的先后
  - css 加载是否会阻塞 dom 树渲染？
  - 普通图层和复合图层
- 从 Event Loop 谈 JS 的运行机制
  - 事件循环机制进一步补充
  - 单独说说定时器
  - setTimeout 而不是 setInterval
  - 事件循环进阶：macrotask 与 microtask

---

- 摘自 [从浏览器多进程到 JS 单线程，JS 运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872)
- 知识源自 [浏览器工作原理与实践](https://time.geekbang.org/column/intro/216?utm_source=pinpaizhuanqu&utm_medium=geektime&utm_campaign=guanwang&utm_term=guanwang&utm_content=0511)

## 列表

<MainIndex path='browser' />
