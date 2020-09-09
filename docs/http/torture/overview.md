---
title: Question
date: 2020-08-31 11:50:47
---

## GET 和 POST 的区别？

- GET 在浏览器回退不会再次请求，POST 会再次提交请求
- GET 请求会被浏览器主动缓存，POST 不会，要手动设置
- GET 请求参数会被完整保留在浏览器历史记录里，POST 中的参数不会
- GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有限制
- GET 参数通过 URL 传递，POST 放在 Request body 中

## 简单讲解一下 http2 的多路复用

**HTTP 队头阻塞**：HTTP 请求是有先后顺序的，报文必须是一发一收， 里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。

**利用并发连接**：同个域名下可以并发多个长连接，chrome 是 6 个，可以一定程度上缓解**队头堵塞**的问题。并发连接只是增加了 TCP 连接，而且，多条 TCP 连接会竞争有限的带宽。

**HTTP2 的多路复用**：通过对 HTTP 报文进行了**头部压缩**和**二进制分帧**，二进制分帧：以流的方式进行乱序传输，多个请求 / 响应之间没有了顺序关系，不需要排队等待。解决了 HTTP 的传输排队问题，也就是解决了 <span class='pink'>HTTP 的队头阻塞</span> 问题。

---

**扩展：TCP 的队头阻塞如何解决**: HTTP2 的多路复用只是解决了 HTTP 层面上的队头阻塞，而基于 TCP 的收答模式上也会发生阻塞。那么就考虑换成 UDP 传输

> **QUIC 基于 UDP，而 UDP 是“无连接”的，根本就不需要“握手”和“挥手”，所以天生就要比 TCP 快。**

`QUIC` 是一个新的传输层协议，建立在 `UDP` 之上，实现了可靠传输；`HTTP/3` 就是使用了 `QUIC` 去解决 **TCP 层面的队头阻塞**。

## 谈谈 TCP 三次握手和四次挥手

见 [TCP 三次握手和四次挥手](../basis/tcp-connection.md)

## 介绍 HTTPS 握手过程

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/security/https.png)