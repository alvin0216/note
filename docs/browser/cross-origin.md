---
title: 谈一谈跨域以及解决方案？
date: 2020-07-15 13:00:28
sidebar: auto
tags:
  - 跨域
  - 浏览器
categories:
  - 浏览器
---

## 什么是跨域

回顾一下 URI 的组成:

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/uri.png)

浏览器遵循同源政策(`scheme(协议)`、`host(主机)`和 `port(端口)`都相同则为同源)。非同源站点有这样一些限制:

- 不能读取和修改对方的 DOM
- 不读访问对方的 Cookie、IndexDB 和 LocalStorage
- 限制 XMLHttpRequest 请求。

接下来我们来说一说解决跨域问题的几种方案。

## jsonp

HTML 标签里，一些标签比如 script、img 这样的获取资源的标签是没有跨域限制的

jsonp 跨域其实也是 JavaScript 设计模式中的一种代理模式。方式为 **动态的创建 script 标签，再去请求一个带参网址来实现跨域通信**

:::: tabs

::: tab 前端代码

```html
<script>
  let script = document.createElement('script');
  script.src = 'http://127.0.0.1:6060/list?type=1&callback=onBack';
  document.body.appendChild(script);
  function onBack(res) {
    console.log(res);
  }
</script>
```

:::

::: tab 服务端代码

```js
const http = require('http');
const url = require('url');

http
  .createServer(function (req, res) {
    if (req.url !== '/favicon.ico') {
      const { query } = url.parse(req.url, true);
      const list = [{ name: 'alvin' }, { name: 'foo' }];

      // response
      res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      res.end(`${query.callback}(${JSON.stringify(list)})`); // 相当于返回 onBack({ list }}
    }
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060');
  });
```

:::

::::

虽然这种方式**兼容性好**，但是一个最大的缺陷是，**只能够实现 get 请求**

## cros

CORS 其实是 W3C 的一个标准，全称是**跨域资源共享**。它需要浏览器和服务器的共同支持，具体来说，非 IE 和 IE10 以上支持 CORS，服务器需要附加特定的响应头，后面具体拆解。不过在弄清楚 CORS 的原理之前，我们需要清楚两个概念:**简单请求**和**非简单请求**。

浏览器根据请求方法和请求头的特定字段，将请求做了一下分类，具体来说规则是这样，凡是满足下面条件的属于简单请求:

- 请求方式为 `HEAD`、`POST` 或者 `GET`
- HTTP 的头信息不超出以下几种字段：
  - `Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`
  - `Content-Type`：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

### 简单请求

:::: tabs

Access-Control-Allow-Origin

对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 `Origin` 字段，用来说明请求来自哪个**源**。服务器拿到请求之后，在回应时对应地添加 `Access-Control-Allow-Origin` 字段，如果 Origin 不在这个字段的范围中，那么浏览器就会将响应拦截。

因此，`Access-Control-Allow-Origin`字段是服务器用来决定浏览器是否拦截这个响应，这是必需的字段。与此同时，其它一些可选的功能性的字段，用来描述如果不会拦截，这些字段将会发挥各自的作用。

比如 `Access-Control-Allow-Credentials` 表示是否允许发送 `cookie`
:::

::: tab 代码

```js {5}
const http = require('http');

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
    res.end('hello world');
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060');
  });
```

```html
<script>
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://127.0.0.1:6060/data');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();
</script>
```

:::

::: tab cookie 跨域

CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定 `Access-Control-Allow-Credentials` 字段。

否则，即使服务器同意发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理。 但是，如果省略 `withCredentials` 设置，有的浏览器还是会一起发送 Cookie。这时，可以显式关闭 `withCredentials`。

需要注意的是，如果要发送 Cookie，**Access-Control-Allow-Origin 就不能设为星号**，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。

```js {7}
const http = require('http');

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500', // 只有 http://127.0.0.1:5500 才能访问
      'Access-Control-Allow-Credentials': true, // 允许携带 cookie
    });
    res.end('hello world');
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060');
  });
```

```html {3}
<script>
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open('GET', 'http://127.0.0.1:6060/data');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();
</script>
```

:::

::::

### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE`，或者 `Content-Type` 字段的类型是 `application/json`。

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为”预检”请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的 XMLHttpRequest 请求，否则就报错。

我们以 PUT 方法为例

:::: tabs

::: tab 页面

```html
<script>
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', 'http://127.0.0.1:6060/data');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();
</script>
```

:::

::: tab 服务端代码

```js
const http = require('http');

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500', // 只有 http://127.0.0.1:5500 才能访问
      'Access-Control-Allow-Methods': 'POST, PUT, DELETE', // 支持
      'Access-Control-Max-Age': '1000', // 指定本次预检请求的有效期，单位为秒
    });
    res.end('hello world');
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060');
  });
```

:::

::::

## nginx

转发代理，解决跨域问题。

```yml
server {
  #...

  location /api {
    proxy_pass http://127.0.0.1:6060;
  }
}
```

## iframe + postMessage

请看 [iframe 和 postMessage](../../html/iframe)
