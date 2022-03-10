---
title: 网络协议
date: 2021-07-22 09:23:33
sidebar: auto
tags:
  - 面试
categories: 面试
---

[HTTPS 是什么？加密原理和证书。SSL/TLS 握手过程](https://www.bilibili.com/video/BV1KY411x7Jp?spm_id_from=333.337.search-card.all.click)

## ssl/tsl2

[图片链接](https://gitee.com/alvin0216/cdn/raw/master/images/tsl.png)

![](https://gitee.com/alvin0216/cdn/raw/master/images/tsl.png)

- web `- client hellow ->` server
  - 客户端：我生成一个随机数 A，还有我支持的加密套件有哪些给你知道，当前我用的是 tsl 1.2 版本
- web `<- server hello -` server
  - 服务端：我也生成一个随机数 B，我挑了一个加密套件 咱们使用这个套件进行加密
- web `<- server key exchange -` server
  - 服务端：我给你发个证书还有公钥，你可以用公钥加密
- web `<- server hello done -` server
  - 服务端：通知一下你 我完成啦
- web `- client key exchange ->` server
  - 客户端：检查了一下你的证书是有效的。我在生成了一个随机数 C，用你给我的公钥加密 发给你了
- 服务端：我拿到了第三个随机数，我们使用同样的加密方式生成我们的会话密钥。以后咱们使用这个密钥进行通信吧
- 客户端：好的，会话密钥只应用于当前会话，咱们传输很安全了。

## cdn

代理源服务器的相关内容，通过用户请求 ip 去附近的站点拿资源，除此之外还可以做到内容压缩、内容加速、负载均衡等。

[前端必需了解的 CDN 知识](https://juejin.cn/post/6913704568325046279)

## dns 解析
