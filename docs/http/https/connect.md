---
title: 握手过程
date: 2020-06-09 13:10:34
---

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/security/https.png)

（1）Client Hello 客户端返回 protocol (譬如 tsl1.2)+ client-random + 支持的密码套件列表

（2）Server Hello 服务端收到后，确认信息。服务端收到后从支持的密码套件列表选择一个对称加密算法 比如 AES 和非对称加密 ECDHE

最终给客户端返回 证书 （包含了公钥） + server-random + 使用的密码套件 AES + ECDHE

（3）Client Key Exchange 客户端收到证书后，校验证书是否有效，用本地内置的公钥+对应的摘要算法解密，查看是否证书被窜改、证书是否被吊销，域名是否一致等。最终可以拿到公钥。

使用 ECDHE 算出 `pre-master`，最终给服务端返回 使用公钥 加密的 pre-master

因为使用了 ECDHE，客户端可以不用等到服务器发回“Finished”确认握手完毕，立即就发出 HTTP 报文，

最终两端可以通过 client-random + server-random + pre-master 生成会话密钥 `master sercet`，之后通过 AES 对称加密加密报文。
