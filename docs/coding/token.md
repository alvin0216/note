---
title: token 解析
date: 2020-09-09 10:16:16
---

这里仅讲 json web token，也即 JWT

## JWT 的数据结构

实际的 JWT 大概就像下面这样。

![](https://www.wangbase.com/blogimg/asset/201807/bg2018072304.jpg)

它是一个很长的字符串，中间用点（`.`）分隔成三个部分。注意，JWT 内部是没有换行的，这里只是为了便于展示，将它写成了几行。

JWT 的三个部分依次如下。

- Header（头部）
- Payload（负载）
- Signature（签名）

写成一行，就是下面的样子。

```js
Header.Payload.Signature
```

balabla...详细请查看相关资料

## 应用场景/注意点

- JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
- <span class='pink'>JWT 最大的缺点是一旦签发，在到期之前就会始终有效，除非服务器部署额外的逻辑。</span>
  - 可以在 token 存 sessionId...

---

- [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
