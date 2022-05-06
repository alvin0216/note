---
title: 什么是 web 性能
date: 2022-04-06 22:57:08
sidebar: auto
tags:
  - 性能优化
categories:
  - 前端工程化
---

1. 输入 URL 到看到整个页面经历了什么过程，了解了这个过程后我们可以在哪里做性能优化！
2. 首先讨论性能的时候，需要**了解指标**，要了解指标那么我们需要了解如何**使用工具检测**这些指标！

<!-- 经过对网站页面性能的测量及渲染过程的了解，相信你对于糟糕性能体验的原因已经比较清楚了，那么接下来便是优化性能，

- **从发出请求到收到响应的优化**，比如 DNS 查询、HTTP 长连接、HTTP2、 HTTP 压缩、HTTP 缓存等。
- **关键渲染路径优化**,比如是否存在不必要的重绘和回流。
- **加载过程的优化**，比如延迟加载,是否有不需要在首屏展示的非关键信息，占用了页面加载的时间。
- **资源优**化，比如图片、视频等不同的格式类型会有不同的使用场景, 在使用的过程中是否恰当。
- **构建优化**，比如压缩合并、基于 webpack 构建优化方案等。 -->

## 检测指标的方式

- chrome 工具 `performance` `network` `lighthouse`
- 更专业的网站 [https://www.webpagetest.org](https://www.webpagetest.org/)
- 其他工具...

## FCP

First Contentful Paint 首次内容绘制 (FCP)

- [优化方案](https://web.dev/i18n/zh/fcp/)

## TTFB

- [到第一个字节的时间](https://web.dev/ttfb/)

## LCP

[Largest Contentful Paint 最大内容绘制 (LCP) ](https://web.dev/i18n/zh/lcp/)