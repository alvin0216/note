---
title: setState 异步？
date: 2021-06-29 10:54:23
sidebar: auto
tags:
  - React
categories: React
---

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/setState-async.png)

- [React 中 setState 是一个宏任务还是微任务？](https://juejin.cn/post/6992006476558499853?from=main_page)
- [React 架构的演变 - 从同步到异步](https://blog.shenfq.com/posts/2020/React%20%E6%9E%B6%E6%9E%84%E7%9A%84%E6%BC%94%E5%8F%98%20-%20%E4%BB%8E%E5%90%8C%E6%AD%A5%E5%88%B0%E5%BC%82%E6%AD%A5.html)

react 多次执行 setState 后，react 会合并进行一次更新，这样就可以提高性能，这就是**批处理**的概念。

批处理是如何实现的呢？

在 react 源码中，`reactFiberWorkLoop` 文件中，有个 `isBatchedUpdate` 变量来标示当前是否需要批处理，

1. 当前执行环境 & 当前模式

react mode：

- Legacy 模式
- blocking 模式
- concurrent 模式：创建的更新拥有不同的优先级，并且更新的过程是可以打断的
