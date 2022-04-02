---
title: tsl 握手的过程（1.2）
date: 2018-09-28 13:00:28
sidebar: 'auto'
tags:
  - https
categories:
  - 网络协议
---

> 最终是使用会话密钥的方式进行对称加密的密文传输，所以拿到服务器的公钥加密随机数，让两端生成绘话密钥尤为重要！

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tsl12-0.png)

- web `- client hellow ->` server
  - 客户端：我生成一个随机数 A，还有我支持的加密套件有哪些给你知道，当前我用的是 tsl 1.2 版本
- web `<- server hello -` server
  - 服务端：我也生成一个随机数 B，我挑了一个加密套件 咱们使用这个套件进行加密
- web `<- server key exchange -` server
  - 服务端：我给你发个证书，里面有我的公钥，你可以用公钥加密，黑客破解不了。
- web `<- server hello done -` server
  - 服务端：通知一下你 我完成啦
- web `- client key exchange ->` server
  - 客户端：检查了一下你的证书是有效的，拿到了公钥。我在生成了一个随机数 C，用你给我的公钥加密 发给你了
- 服务端：我拿到了第三个随机数，我们使用同样的加密方式生成我们的会话密钥。以后咱们使用这个密钥进行通信吧
- 客户端：好的，会话密钥只应用于当前会话，咱们传输很安全了。
