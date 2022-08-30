---
title: Cookie
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - 浏览器
  - cookie
categories:
  - 浏览器
---

- [看完这篇 Session、Cookie、Token，和面试官扯皮就没问题了](https://juejin.cn/post/6844904115080790023)
- [概念区分，什么是跨站，什么是跨域](https://cloud.tencent.com/developer/article/1751237)
- [当 CORS 遇到 SameSite](https://juejin.cn/post/6844904095271288840)
- [阮一峰：Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
- [✨ 当浏览器全面禁用三方 Cookie](https://juejin.cn/post/6844904128557105166)
- [✨ Chrome 80+以後的第三方 cookie 政策](https://www.youtube.com/watch?v=lrNwwcA9SKs)

## 什么是同站（跨站），第三方 cookie

- 跨域 cross-orgin：老生常谈，协议、域名、端口有一个不一样就跨域了
- 同站 cross-site：Cookie 与此息息相关，Cookie 实际上遵守的是“同站”策略，同站的 `cookie` 可以共享.

> **只要两个 URL 的 eTLD+1 相同即是同站, 也即有效顶级域名+二级域名**

- `eTLD`: 即 `effective top-level domain` (有效顶级域)。
- 公共后缀列表: [Public Suffix List（PSL）](https://publicsuffix.org/)

| URL                 | 是否同站 | 理由        |
| ------------------- | -------- | ----------- |
| sugarat.top         | ✅       | eTLD+1 一致 |
| ep.sugarat.top      | ✅       | eTLD+1 一致 |
| ep.sugarat.top:8080 | ✅       | eTLD+1 一致 |
| baidu.com           | ❌       | eTLD 不一致 |

举个例子：`web.alvin.com` 与 `service.alvin.com` 具有相同的二级域名，可以看作是同站不同源(same-site, cross-origin)。但，`web.github.io` 与 `service.github.io` 则是不同的站点不同的源(cross-site, cross-origin)，因为 github.io 属于公共后缀（[Public Suffix](https://github.com/publicsuffix/list)）。

第三方 cookie 的概念其实很简单，个人理解：同站内共享的 cookie ，都是第一方、其他例如跨域等产生的 cookie 属于第三方 cookie。

chrome 80+ 版本后默认 sameSite 为 `lax`, 也就是默认大部分第三方 cookie 无法被使用啦。

## Cookie 追踪用户行为，代码示例

了解 cookie 的一个重要的用法，比如我在百度搜索了喜欢的水果苹果，那么在水果购买网站通过 cookie 拿到用户喜好，自动推荐苹果的相关链接。

演示版本 chrome 80+，所以要禁用 samesite 属性才行，否则第三方 cookie 无法被携带！

**index.html**

```html
<h1>你的喜好</h1>
<button onclick="sendFav('apple')">apple</button>
<button onclick="sendFav('banana')">banana</button>

<script>
  function sendFav(item) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/api?fav=${item}`);
    xhr.withCredentials = true;
    xhr.send();
  }
</script>
```

**server.js**

```js
const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

router.get('/', (req, res) => {
  res.end(`hello world!, cookie: ${req.headers.cookie}`);
});

router.get('/api', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.cookie('fav', req.query.fav, {
    secure: true, //
    sameSite: 'none',
  });
  res.json({ status: 'ok' });
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

上面代码有几个注意点，

1. xhr 携带 cookie，需要设置 `withCredentials = true`, 服务端 `Access-Control-Allow-Origin` 不能为 `*`
2. 禁用 `samesite`，使得第三方 `cookie` 得以使用，需要设置 `secure = true`

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/samesite.png)

## Cookie 相关属性

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/cookie3.png)

重点讲一下：

- `httpOnly`: boolean，不能通过 document.cookie 访问到 cookie，有效防止 xss 攻击
- `secure`: true, cookie 只会在 https 和 ssl 等安全协议下传输
- `samesite`：第三方 cookie 的一些策略，后面讲到。
- `path`: 限制 cookie 的路由匹配，比如 `/test` `/test/aa`, 前者包容后者，默认是 `/`。
- `domain`: cookie 的 domain，比如 `.baidu.com`, 那么 `a.baidu.com`、`b.baidu.com` 可以共享。
- `expires/max-age`: 过期时间。

**sameSite 属性**

- `Strict`：完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。
- `Lax`:
  ![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/samesite-lax.png)
- `None`：显式关闭 `SameSite` 属性，不过，前提是必须同时设置 `Secure` 属性

## Cookie 一些概念 & Session

可能面试常问，这里简单列一下。

**1. 什么是 Cookie？**

HTTP 是无状态的协议（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）：每个请求都是完全独立的，服务端无法确认当前访问者的身份信息，无法分辨上一次的请求发送者和这一次的发送者是不是同一个人。所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。而这个状态需要通过 cookie 或者 session 去实现。

**2. Cookie 设置的过程。**

客户端发送请求 -> 服务端设置 `Cookie` -> 浏览器保存 `Cookie`, 以后每次请求都带上。

**3. Cookie 的作用。**

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

**4. 与 Session 的区别。**

首先注意。Session 是依赖于 Cookie 的，如果 Cookie 被禁用了，Session 也用不了。

客户端发送请求 -> 服务端设置 `Cookie`，里面可能只有 sessionId -> 浏览器保存 `Cookie`, 以后每次请求都带上。

最大区别莫过于一个是存储在浏览器端，显而易见不安全、而 Session 保存在服务端，相对安全。基于这一点，可见：

高并发的时候 Session 由于是在服务端的，所以压力大，所以简单的来说 session 一般设置失效时间较短。
