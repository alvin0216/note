---
title: TLS1.2 握手的过程是怎样的？
date: 2018-09-28 13:00:28
sidebar: 'auto'
tags:
  - https
categories:
  - 网络协议
---

主流的 TLS 1.2 版本所采用的方式为 **ECDHE 握手**，除此外还有 **RSA 握手**。本文主要讲主流的 ECDHE 握手过程。

| ECDHE 握手过程流程图                                                          | ECDHE 握手过程流程图 2                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img src='https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tsl12.png' /> | <img src='https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tsl12-0.png' /> |

## step 1: Client Hello

1. 在 TCP 建立连接之后，浏览器会首先发一个“`Client Hello`”消息。里面有客户端的 TSL 版本号、支持的密码套件，还有一个随机数（**Client Random），用于后续生成会话密钥**。

```js
Handshake Protocol: Client Hello
    Version: TLS 1.2 (0x0303)
    Random: 1cbf803321fd2623408dfe…
    Cipher Suites (17 suites)
        Cipher Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 (0xc02f)
        Cipher Suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030)
```

## step 2: Server Hello

服务器收到“Client Hello”后，会返回一个“`Server Hello`”消息。把版本号对一下，也给出一个随机数（Server Random），然后从客户端的列表里选一个作为本次通信使用的密码套件，在这里它选择了“`TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`”。

**Server Random 也用于后续生成会话密钥。**

```js
Handshake Protocol: Server Hello
    Version: TLS 1.2 (0x0303)
    Random: 0e6320f21bae50842e96…
    Cipher Suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030)
```

这个的意思就是：“版本号对上了，可以加密，你的密码套件挺多，我选一个最合适的吧，用椭圆曲线加 RSA、AES、SHA384。我也给你一个随机数，你也得留着。”

然后，服务器为了证明自己的身份，就把证书也发给了客户端（`Server Certificate`）。

## step 3: Client 验证证书，生成 secret

客户端验证服务端传来的证书和签名是否通过，如果验证通过，则传递 `client_params` 这个参数给服务器。

接着客户端通过 ECDHE 算法计算出 pre_random，其中传入两个参数:server_params 和 client_params。现在你应该清楚这个两个参数的作用了吧，由于 ECDHE 基于椭圆曲线离散对数，这两个参数也称作椭圆曲线的公钥。

**客户端现在拥有了 client_random、server_random 和 pre_random，接下来将这三个数通过一个伪随机数函数来计算出最终的 secret。**

## step4: Server 生成 secret

刚刚客户端不是传了 client_params 过来了吗？

现在服务端开始用 ECDHE 算法生成 pre_random，接着用和客户端同样的伪随机数函数生成最后的 secret。

## RSA 握手和 ECDHE 握手的区别

1. ECDHE 握手，也就是主流的 TLS1.2 握手中，使用 ECDHE 实现 pre_random 的加密解密，没有用到 RSA。
2. 使用了 ECDHE，客户端可以不用等到服务器发回“Finished”确认握手完毕立即就发出 HTTP 报文，省去了一个消息往返的时间浪费。这个叫“**TLS False Start**”，意思就是“**抢跑**”，和“TCP Fast Open”有点像，都是不等连接完全建立就提前发应用数据，提高传输的效率。
