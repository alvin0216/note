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

> 跨域：浏览器的安全策略，**协议、ip、端口**有一个不同就会产生跨域问题.

常见解决方案：

1. jsonp
2. cors
3. iframe + postMessage
4. nginx 转发
5. websocket...

## jsonp

HTML 标签里，一些标签比如 script、img 这样的获取资源的标签是没有跨域限制的

jsonp： **动态的创建 script 标签，再去请求一个带参网址来实现跨域通信**

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

## cors

**兼容性：非 IE 和 IE10 以上支持**

通过后端在响应头加 `Access-Control-Allow-Origin`, 以及请求头 `orgin` 字段进行对比，符合规格则允许跨域。

我们需要清楚两个概念:**简单请求**和**非简单请求**。

简单请求不需要进行**预检 options 请求操作**，非简单请求需要。

浏览器根据请求方法和请求头的特定字段，将请求做了一下分类，具体来说规则是这样，凡是满足下面条件的属于简单请求:

- 请求方式为 `HEAD`、`POST` 或者 `GET`
- HTTP 的头信息不超出以下几种字段：
  - `Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`
  - `Content-Type`：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

### 简单请求

:::: tabs

::: tab Access-Control-Allow-Origin

对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 `Origin` 字段，用来说明请求来自哪个**源**。服务器拿到请求之后，在回应时对应地添加 `Access-Control-Allow-Origin` 字段，如果 Origin 不在这个字段的范围中，那么浏览器就会将响应拦截。

因此，`Access-Control-Allow-Origin`字段是服务器用来决定浏览器是否拦截这个响应，这是必需的字段。与此同时，其它一些可选的功能性的字段，用来描述如果不会拦截，这些字段将会发挥各自的作用。

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

### 为什么要对非简单跨域请求做预检？

1. 减少非简单跨域请求对服务器的影响（开始时就提到，服务器有时候不想理睬跨域请求），比如 PUT、DELETE 请求可以直接新建或者修改、删除服务器中的资源。预检请求可以防止该情况发生。
2. 减少服务器对于是否跨域的计算量

对于非简单请求的跨域请求，服务器对于是否跨域的计算是在预检请求上，如果预检请求通过之后，正式请求都不用再次计算。而且一次预检请求通过后，之后的每次请求都只会发正式请求。节约了很多服务端的计算量。

## 如果一个请求跨域了，这个请求会在服务端被执行吗

简单请求 会！

非简单请求、option 请求不允许不会、允许就会！
