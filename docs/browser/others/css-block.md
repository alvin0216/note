---
title: css加载会造成阻塞吗？
date: 2020-07-05 21:15:58
---

1. CSS 加载不会阻塞 DOM 树的解析
2. CSS 加载会阻塞 DOM 树的渲染
3. CSS 加载会阻塞后面 JS 语句的执行

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/render.png)

先看宏观下的浏览器渲染过程。

第一步 `parse html`: 从网络传给渲染引擎的 HTML 文件字节流是无法直接被渲染引擎理解的，所以要将其转化为渲染引擎能够理解的内部结构，这个结构就是 DOM。这一步也就是生成`DOM-Tree` 的过程

第二步 `Reculate Style`，和 HTML 文件一样，浏览器也是无法直接理解这些纯文本的 CSS 样式，所以当渲染引擎接收到 CSS 文本时，会执行一个转换操作，由上图可看出， `Style-Rules` 和 `DOM-Tree` 的构建是并行的。也就是说 <span class='orange'> CSS 加载不会阻塞 DOM 树的解析</span>

第三步 `DOM-Tree` + `Style-Rules` 生成 `Render-Tree`, 这其中包含 `Layout` 的绘制和 `UpdateLayoutTree` （布局树）。`Render-Tree` 依赖于`DOM-Tree` + `Style-Rules` 的，也就是说 <span class='orange'>CSS 加载会阻塞 DOM 树的渲染</span>

在布局阶段，绘制 (`Painting`) 、合成位图等将图层显示出来。

js 要操作 dom 节点和 css 样式，需要等到 css 和 dom 渲染就位后才能工作，所以 css 会阻塞 js 语句的执行。

<h2>相关链接</h2>

[css 加载会造成阻塞吗？](https://juejin.im/post/5b88ddca6fb9a019c7717096)

<!--

## HTML 的解析

第一步 parse html，从网络传给渲染引擎的 HTML 文件字节流是无法直接被渲染引擎理解的，所以要将其转化为渲染引擎能够理解的内部结构，这个结构就是 DOM。

- 通过分词器将字节流转换为 Token
- 需要将 Token 解析为 DOM 节点
- 并将 DOM 节点添加到 DOM 树中。

## CSS 样式计算

第二步 Reculate Style， 样式计算的目的是为了计算出 DOM 节点中每个元素的具体样式，这个阶段大体可分为三步来完成。

<span class='orange'>1. 把 CSS 转换为浏览器能够理解的结构</span>

和 HTML 文件一样，浏览器也是无法直接理解这些纯文本的 CSS 样式，所以当渲染引擎接收到 CSS 文本时，会执行一个转换操作，

将 link 引用的外部 CSS 文件、 style 标记内的 CSS、元素的 style 属性内嵌的 CSS 转换为浏览器可以理解的结构——styleSheets。

<span class='orange'>2. 转换样式表中的属性值，使其标准化</span>


 -->
