---
title: HTTP/2 内核剖析
date: 2020-06-10 16:01:15
---

下面的这张图对比了 HTTP/1、HTTPS 和 HTTP/2 的协议栈，你可以清晰地看到，HTTP/2 是建立在“HPack”“Stream”“TLS1.2”基础之上的，比 HTTP/1、HTTPS 复杂了一些。

![](../../assets/http/http2/http2.png)
