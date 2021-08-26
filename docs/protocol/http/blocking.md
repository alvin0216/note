---
title: 如何解决 HTTP 的队头阻塞问题？
date: 2018-09-15 13:00:28
sidebar: 'auto'
tags:
  - http
  - 队头阻塞
categories:
  - 网络协议
---

## 什么是队头阻塞

**http1.x 采用长连接(Connection:keep-alive)，可以在一个 TCP 请求上，发送多个 http 请求。**

因为 HTTP 规定报文必须是 “**一发一收**”，这就形成了一个先进先出的“串行”队列。

队列里的请求没有轻重缓急的优先级，只有入队的先后顺序，排在最前面的请求被最优先处理。

如果队首的请求因为处理的太慢耽误了时间，那么队列里后面的所有请求也不得不跟着一起等待，结果就是其他的请求承担了不应有的时间成本。

## 并发连接

浏览器一个域名采用 `6-8` 个 TCP 连接，并发 `HTTP` 请求.

但其实，即使是提高了并发连接，还是不能满足人们对性能的需求。

## 域名分片

一个域名不是可以并发 6 个长连接吗？那我就多分几个域名。比如 content1.alvin.run 、content2.alvin.run。

这样一个 `alvin.run` 域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。

:::danger http1.1 没有真正解决了队头阻塞问题

即使使用上面的方式，也是治标不治本，http2 采用了**多路复用的方式**解决了这个问题，请看后续。

:::