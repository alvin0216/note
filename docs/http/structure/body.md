---
title: 请求体
---

在前面我们了解了 HTTP 报文的结构，知道一个 HTTP 报文是由“`header+body`”组成的。但那时我们主要研究的是 header，没有涉及到 body。这一节就谈谈 HTTP body。

## 数据格式

TCP、UDP 因为是传输层的协议，它们不会关心 body 数据是什么，只要把数据发送到对方就算是完成了任务。

而 HTTP 协议则不同，它是应用层的协议，数据到达之后工作只能说是完成了一半，还必须要告诉上层应用这是什么数据才行，否则上层应用就会“不知所措”。

具体体现在 `MIME`(Multipurpose Internet Mail Extensions, 多用途互联网邮件扩展)。它首先用在电子邮件系统中，让邮件可以发任意类型的数据，这对于 HTTP 来说也是通用的。

因此，HTTP 从 `MIME type` 取了一部分来标记报文 body 部分的数据类型，这些类型体现在 `Content-Type` 这个字段，当然这是针对于发送端而言，接收端想要收到特定类型的数据，也可以用 `Accept` 字段。

具体而言，这两个字段的取值可以分为下面几类:

- `text`: text/html, text/plain, text/css 等
- `image`: image/gif, image/jpeg, image/png 等
- `audio/video`: audio/mpeg, video/mp4 等
- `application`: application/json, application/javascript, application/pdf, application/octet-stream

## 压缩方式

但仅有 MIME type 还不够，因为 HTTP 在传输时为了节约带宽，有时候还会压缩数据，为了不要让浏览器继续“猜”，还需要有一个“Encoding type”，告诉数据是用的什么编码格式，这样对方才能正确解压缩，还原出原始的数据。

比起 MIME type 来说，Encoding type 就少了很多，常用的只有下面三种：

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
