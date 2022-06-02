---
title: Token Cookie Session 的区别
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - token
  - cookie
  - session
categories:
  - 浏览器
---

- `cookie` 指的就是浏览器里面能存储的一种数据，仅仅是浏览器实现的一种数据存储功能。`cookie` 由服务器生成，发送给浏览器，浏览器以 `key-value` 形式保存到某个目录下的文本文件内，下次请求同一站点的网站时会把 `cookie` 发送到浏览器。由于 `cookie` 是存在客户端上的，所以浏览器加入了一些限制，确保 `cookie` 不被恶意使用，以及限制了大小。
- `session` 从字面上讲就是会话，服务器要知道当前发送请求的是谁，因此需要给每个客户端分配不同的身份标识，然后客户端每次香服务器请求的时候，都通过这个身份标识确认身份。一般 sessionId 是存储在 cookie 里面的。
  - `session` 的问题还有前端的 sessionId 是可以伪造的，所以还需要在服务器维护一个 `sessionId` 的白名单来验证 `sessionId` 的合法性, `token` 的改进之处就在这里
- `token` 通过签名机制，只要前端传来的 token 能通过签名认证就是合法的，不需要服务器维护任何东西
