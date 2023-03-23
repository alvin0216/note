---
title: 请求体以及 Accept
date: 2018-09-18 13:00:28
sidebar: 'auto'
tags:
  - http
categories:
  - 网络协议
---

## 数据格式

HTTP 它支持非常多的数据格式，那么这么多格式的数据一起到达客户端，客户端怎么知道它的格式呢？

具体体现在 `MIME`(Multipurpose Internet Mail Extensions, 多用途互联网邮件扩展)。它首先用在电子邮件系统中，让邮件可以发任意类型的数据，这对于 HTTP 来说也是通用的。

因此，HTTP 从 `MIME type` 取了一部分来标记报文 body 部分的数据类型，这些类型体现在 `Content-Type` 这个字段，当然这是针对于发送端而言，接收端想要收到特定类型的数据，也可以用 `Accept` 字段。

具体而言，这两个字段的取值可以分为下面几类:

- `text`: text/html, text/plain, text/css 等
- `image`: image/gif, image/jpeg, image/png 等
- `audio/video`: audio/mpeg, video/mp4 等
- `application`: application/json, application/javascript, application/pdf, application/octet-stream

## 压缩方式

当然一般这些数据都是会进行编码压缩的，采取什么样的压缩方式就体现在了发送方的 `Content-Encoding` 字段上， 同样的，接收什么样的压缩方式体现在了接受方的 `Accept-Encoding` 字段上。这个字段的取值有下面几种：

- gzip：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
- deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
- br：一种专门为 HTTP 优化的新压缩算法（Brotli）。

```js
// 发送端
Content-Encoding: gzip
// 接收端
Accept-Encoding: gzip
```

## 支持语言

对于发送方而言，还有一个 `Content-Language` 字段，在需要实现国际化的方案当中，可以用来指定支持的语言，在接受方对应的字段为 `Accept-Language`。如:

```js
// 发送端
Content-Language: zh-CN, zh, en
// 接收端
Accept-Language: zh-CN, zh, en
```

## 字符集

最后是一个比较特殊的字段, 在接收端对应为 `Accept-Charset`，指定可以接受的字符集，而在发送端并没有对应的 `Content-Charset`, 而是直接放在了 `Content-Type` 中，以 `charset` 属性指定。如:

```js
// 发送端
Content-Type: text/html; charset=utf-8
// 接收端
Accept-Charset: charset=utf-8
```

最后以一张图来总结一下吧:

![](https://static001.geekbang.org/resource/image/b2/58/b2118315a977969ddfcc7ab9d26cb358.png)
