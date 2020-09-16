---
title: 重绘与重排
date: 2020-09-16 11:32:34
---

怎么系统回答问题

dom 的**几何位置**发生变动，重排，只是对元素做绘制工作，比如 dom 背景色修改，即重绘。重排就导致重绘。

nonono...不合格

应该从 **浏览器的渲染过程** 分析 **重绘和重排**，再讲讲如何减少**重排**..

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/render.png)

1. HTML 被 HTML 解析器解析成 DOM 树；
2. CSS 被 CSS 解析器解析成 CSSOM 树；
3. 结合 DOM 树和 CSSOM 树，生成一棵渲染树(Render Tree)，这一过程称为 Attachment；
4. 生成布局(flow)，浏览器在屏幕上“画”出渲染树中的所有节点；
5. 将布局绘制(paint)在屏幕上，显示出整个页面。

balbalab...

- [重排(reflow)和重绘(repaint)](https://juejin.im/post/6844904083212468238)
