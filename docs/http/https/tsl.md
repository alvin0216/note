---
title: TSL 1.2
date: 2020-06-08 21:40:01
---

## ECDHE 握手过程

开始加密通信之前，客户端和服务器首先必须建立连接和交换参数，这个过程叫做握手（handshake）。

握手阶段分成五步。

第一步，客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，服务端确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给服务端。

第四步，服务端使用自己的私钥，获取客户端发来的随机数（即 Premaster secret）。

第五步，客户端和服务端根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

如图：

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/https/tsl-connect2.png)

1. 在 TCP 建立连接之后，浏览器会首先发一个“**Client Hello**”消息，也就是跟服务器“打招呼”。里面有客户端的 TSL 版本号、支持的密码套件，还有一个随机数（**Client Random**），用于后续生成会话密钥。

```js
Handshake Protocol: Client Hello
    Version: TLS 1.2 (0x0303)
    Random: 1cbf803321fd2623408dfe…
    Cipher Suites (17 suites)
        Cipher Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 (0xc02f)
        Cipher Suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030)
```

2. 服务器收到“Client Hello”后，会返回一个“**Server Hello**”消息。把版本号对一下，也给出一个随机数（Server Random），然后从客户端的列表里选一个作为本次通信使用的密码套件，在这里它选择了“`TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`”。

```js
Handshake Protocol: Server Hello
    Version: TLS 1.2 (0x0303)
    Random: 0e6320f21bae50842e96…
    Cipher Suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030)
```

这个的意思就是：“版本号对上了，可以加密，你的密码套件挺多，我选一个最合适的吧，用椭圆曲线加 RSA、AES、SHA384。我也给你一个随机数，你也得留着。”

然后，服务器为了证明自己的身份，就把证书也发给了客户端（Server Certificate）。

接下来是一个关键的操作，因为服务器选择了 ECDHE 算法，所以它会在证书后发送“**Server Key Exchange**”消息，里面是**椭圆曲线的公钥（Server Params）**，用来实现密钥交换算法，再加上自己的私钥签名认证。

```js
Handshake Protocol: Server Key Exchange
    EC Diffie-Hellman Server Params
        Curve Type: named_curve (0x03)
        Named Curve: x25519 (0x001d)
        Pubkey: 3b39deaf00217894e...
        Signature Algorithm: rsa_pkcs1_sha512 (0x0601)
        Signature: 37141adac38ea4...
```

这相当于说：“刚才我选的密码套件有点复杂，所以再给你个算法的参数，和刚才的随机数一样有用，别丢了。为了防止别人冒充，我又盖了个章。”

之后是“S**erver Hello Done**”消息，服务器说：“我的信息就是这些，打招呼完毕。”

这样第一个消息往返就结束了（两个 TCP 包），结果是客户端和服务器通过明文共享了三个信息：**Client Random**、**Server Random** 和 **Server Params**。

客户端这时也拿到了服务器的证书，那这个证书是不是真实有效的呢？

开始走证书链逐级验证，确认证书的真实性，再用证书公钥验证签名，就确认了服务器的身份：“刚才跟我打招呼的不是骗子，可以接着往下走。”

然后，客户端按照密码套件的要求，也生成一个**椭圆曲线的公钥（Client Params）**，用“**Client Key Exchange**”消息发给服务器。

```js
Handshake Protocol: Client Key Exchange
    EC Diffie-Hellman Client Params
        Pubkey: 8c674d0e08dc27b5eaa…
```

现在客户端和服务器手里都拿到了密钥交换算法的两个参数（**Client Params、Server Params**），就用 ECDHE 算法一阵算，算出了一个新的东西，叫“**Pre-Master**”，其实也是一个随机数。

现在客户端和服务器手里有了三个随机数：**Client Random**、**Server Random** 和 **Pre-Master**。用这三个作为原始材料，就可以生成用于加密会话的主密钥，叫“**Master Secret**”。而黑客因为拿不到“**Pre-Master**”，所以也就得不到主密钥。

## 传统 RSA 握手

刚才说的其实是如今主流的 TLS 握手过程，这与传统的握手有两点不同。

第一个，使用 ECDHE 实现密钥交换，而不是 RSA，所以会在服务器端发出“Server Key Exchange”消息。

第二个，因为使用了 ECDHE，客户端可以不用等到服务器发回“Finished”确认握手完毕，立即就发出 HTTP 报文，省去了一个消息往返的时间浪费。这个叫“TLS False Start”，意思就是“抢跑”，和“TCP Fast Open”有点像，都是不等连接完全建立就提前发应用数据，提高传输的效率。

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/https/tsl-rsa.png)

大体的流程没有变，只是“Pre-Master”不再需要用算法生成，而是客户端直接生成随机数，然后用服务器的公钥加密，通过“Client Key Exchange”消息发给服务器。服务器再用私钥解密，这样双方也实现了共享三个随机数，就可以生成主密钥。

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
