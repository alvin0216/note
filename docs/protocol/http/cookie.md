---
title: Cookie 有哪些属性和功能？
date: 2018-09-16 13:00:28
sidebar: 'auto'
tags:
  - http
  - cookie
categories:
  - 网络协议
---

## cookie 简介

基于 HTTP 传输是无状态的，也就是每次 HTTP 请求服务端和客户端都不知道数据是哪来的，而 `cookie` 服务器拥有“记忆能力”。

:::: tabs

::: tab 简述

第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会将 `cookie` 放入到响应请求中，在浏览器第二次发请求的时候，会把 `cookie` 带过去，服务端会辨别用户身份，当然服务器也可以修改 `cookie` 内容

:::

::: tab 流程图

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/cookie.png)

:::

::: tab 设置 cookie 代码示例

```js
const http = require('http');

http
  .createServer(function (request, response) {
    if (request.url === '/') {
      response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8',
        'Set-Cookie': 'id=123',
      });
      response.end(`
        <h2>Cookie</h2>
        <script>
          console.log(document.cookie)
        </script>
      `);
    }
  })
  .listen(3300);

console.log('http://127.0.0.1:3300');
```

如果你要设置多个 Cookie 可以这样

```js
response.writeHead(200, {
  'Content-Type': 'text/html;charset=utf-8',
  'Set-Cookie': ['id=123', 'age=18'],
});
```

:::

::: tab network 面板示例

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/cookie2.png)

:::

::::

## cookie 属性

### 生命周期

Cookie 的有效期可以通过 `Expires` 和`Max-Age` 两个属性来设置。

若 Cookie 过期，则这个 Cookie 会被删除，并不会发送给服务端。

### 作用域

关于作用域也有两个属性: `Domain` 和 `path`, 给 Cookie 绑定了域名和路径，在发送请求之前，发现域名或者路径和这两个属性不匹配，那么就不会带上 Cookie。值得注意的是，对于路径来说，`/` 表示域名下的任意路径都允许使用 Cookie。

### 安全相关

- **加强安全**: `Secure`，说明只能通过 HTTPS 传输 cookie。
- **预防 xss 攻击**：带上 `HttpOnly` 属性 如果这个属性设置为 true，就不能通过 js 脚本来获取 cookie 的值，能有效的防止 xss 攻击
- **预防 CSRF 攻击**：使用 `SameSite` 属性。

| SameSite | 作用                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| Strict   | 浏览器完全禁止第三方请求携带 Cookie                                                                                  |
| Lax      | 就宽松一点了，但是只能在 **get 方法提交表单**况或者 **a 标签发送 get 请求**的情况下可以携带 Cookie，其他情况均不能。 |
| None     | 默认自动携带 Cookie                                                                                                  |

## Cookie 的缺点

1. 容量缺陷。Cookie 的体积上限只有 **4KB**，只能用来存储少量的信息。
2. 性能缺陷。Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过 `Domain` 和 `Path` 指定作用域来解决。
3. 安全缺陷。由于 Cookie 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在 Cookie 的有效期内重新发送给服务器，这是相当危险的。另外，在 HttpOnly 为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。
