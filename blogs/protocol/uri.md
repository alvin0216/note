---
title: 如何理解 URI？
date: 2018-09-28 19:00:28
sidebar: 'auto'
tags:
  - http
categories:
  - 网络协议
---

URI, 全称为(Uniform Resource Identifier), 也就是**统一资源标识符**，它的作用很简单，就是区分互联网上不同的资源。

但是，它并不是我们常说的网址, 网址指的是 URL, 实际上 URI 包含了 URN 和 URL 两个部分，由于 URL 过于普及，就默认将 URI 视为 URL 了。

## URI 的结构

![](https://gitee.com/alvin0216/cdn/raw/master/images/uri.png)

- `scheme` 表示协议名，比如 http, https, file 等等。后面必须和://连在一起。
- `user:passwd@` 表示登录主机时的用户信息，不过很不安全，不推荐使用，也不常用。
- `host:port` 表示主机名和端口。
- `path` 表示请求路径，标记资源所在位置。
- `query` 表示查询参数，为 key=val 这种形式，多个键值对之间用&隔开。
- `fragment` 表示 URI 所定位的资源内的一个锚点，浏览器可以根据这个锚点跳转到对应的位置。

## URI 编码

URI 只能使用 ASCII, ASCII 之外的字符是不支持显示的，而且还有一部分符号是界定符，如果不加以处理就会导致解析出错。

因此，URI 引入了编码机制，将所有**非 ASCII 码字符**和**界定符**转为十六进制字节值，然后在前面加个 `%`。

如，空格被转义成了 `%20`，三元被转义成了`%E4%B8%89%E5%85%83`。
