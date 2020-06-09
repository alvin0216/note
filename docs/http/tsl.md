---
title: TSL 1.2
date: 2020-06-08 21:40:01
---

## 传统 RSA 握手

见 [HTTPS 和 SSL/TSL](./https.md)

## ECDHE 握手过程

开始加密通信之前，客户端和服务器首先必须建立连接和交换参数，这个过程叫做握手（handshake）。

握手阶段分成五步。

<blockquote class='box'>

第一步，客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，服务端确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给服务端。

第四步，服务端使用自己的私钥，获取客户端发来的随机数（即 Premaster secret）。

第五步，客户端和服务端根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

</blockquote>

如图：

![](../../assets/http/https/tsl-connect.png)

1. HTTPS 协议会先与服务器执行 TCP 握手，然后执行 TLS 握手，才能建立安全连接；
2. 握手的目标是安全地交换对称密钥，需要三个随机数，第三个随机数“Pre-Master”必须加密传输，绝对不能让黑客破解；
3. “Hello”消息交换随机数，“Key Exchange”消息交换“Pre-Master”；

## 双向认证

不过上面说的是“**单向认证**”握手过程，只认证了服务器的身份，而没有认证客户端的身份。这是因为通常单向认证通过后已经建立了安全通信，用账号、密码等简单的手段就能够确认用户的真实身份。

实际上 TLS 握手是一个**双向认证**的过程

双向认证的流程也没有太多变化，只是在“**Server Hello Done**”之后，“**Client Key Exchange**”之前，客户端要发送“**Client Certificate**”消息，服务器收到后也把证书链走一遍，验证客户端的身份。

## RSA 握手和 ECDHE 握手的区别

1. ECDHE 握手，也就是主流的 TLS1.2 握手中，使用 ECDHE 实现 pre_random 的加密解密，没有用到 RSA。
2. 使用了 ECDHE，<span class='orange'>客户端可以不用等到服务器发回“Finished”确认握手完毕立即就发出 HTTP 报文</span>，省去了一个消息往返的时间浪费。这个叫“**TLS False Start**”，意思就是“抢跑”，和“TCP Fast Open”有点像，都是不等连接完全建立就提前发应用数据，提高传输的效率。

参考

- [SSL/TLS 握手过程详解](https://juejin.im/post/584b76d3a22b9d0058d5036)
- [神三元（建议精读）HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.im/post/5e76bd516fb9a07cce750746)
