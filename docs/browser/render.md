---
title: 浏览器解析 html 的过程
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - 重绘 重排
categories:
  - 浏览器
---

从 HTML 到 DOM、样式计算、布局、图层、绘制、光栅化、合成和显示:

![](https://static001.geekbang.org/resource/image/97/37/975fcbf7f83cc20d216f3d68a85d0f37.png)

1. status code 301 302 浏览器发生重定向
2. Content-Type：stream / html

## 渲染流程

1. 因为浏览器无法直接理解和使用 HTML，所以需要**将 HTML 转换为浏览器能够理解的结构——DOM 树。**

2. **转换样式表中的属性值，使其标准化** blue -> rgb(0,0,255)

- 通过 link 引用的外部 CSS 文件
- 通过 link 引用的外部 CSS 文件
- 元素的 style 属性内嵌的 CSS

3. 计算出 DOM 树中每个节点的具体样式

我们有 DOM 树和 DOM 树中元素的样式，但这还不足以显示页面，因为我们还不知道 DOM 元素的几何位置信息。那么接下来**需要计算出 DOM 树中可见元素的几何位置，我们把这个计算过程叫做布局。**

计算层叠，图层绘制
