---
title: 跨域
date: 2020-07-15 13:00:28
---

> 浏览器在请求非同源网站的时候，就会产生跨域问题。同源指的是同协议、同 IP、同端口。

## 为什么不能跨域请求资源

比如你打开了一个银行站点，然后又一不小心打开了一个恶意站点，如果没有安全措施，恶意站点就可以做很多事情：

- 修改银行站点的 DOM、CSSOM 等信息；
- 在银行站点内部插入 JavaScript 脚本；
- 劫持用户登录的用户名和密码；
- 读取银行站点的 Cookie、IndexDB 等数据；
- 甚至还可以将这些信息上传至自己的服务器，这样就可以在你不知情的情况下伪造一些转账请求等信息。

所以说，**在没有安全保障的 Web 世界中，我们是没有隐私的，因此需要安全策略来保障我们的隐私和数据的安全**。

跨域解决方案如下

## JSONP

HTML 标签里，一些标签比如 script、img 这样的获取资源的标签是没有跨域限制的

jsonp 跨域其实也是 JavaScript 设计模式中的一种代理模式。方式为 **动态的创建 script 标签，再去请求一个带参网址来实现跨域通信**

前端

```html
<script>
  let script = document.createElement('script')
  script.src = 'http://127.0.0.1:6060/list?type=1&callback=onBack'
  document.body.appendChild(script)
  function onBack(res) {
    console.log(res)
  }
</script>
```

服务端

```js
const http = require('http')
const url = require('url')

http
  .createServer(function (req, res) {
    if (req.url !== '/favicon.ico') {
      const { query } = url.parse(req.url, true)
      const list = [{ name: 'alvin' }, { name: 'foo' }]

      // response
      res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
      res.end(`${query.callback}(${JSON.stringify(list)})`) // 相当于返回 onBack({ list }}
    }
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060')
  })
```

虽然这种方式非常好用，但是一个最大的缺陷是，**只能够实现 get 请求**

## CORS

浏览器将 `CORS` 请求分成两类：简单请求（`simple request`）和非简单请求（`not-so-simple request`）。

:::tip 只要同时满足以下两大条件，就属于简单请求

- 请求方式为 `HEAD`、`POST` 或者 `GET`
- HTTP 的头信息不超出以下几种字段：
  - `Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`
  - `Content-Type`：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

:::

### 简单请求 (HEAD、GET、POST)

对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 `Origin` 字段。

```js {5}
const http = require('http')

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
    res.end('hello world')
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060')
  })
```

```html
<script>
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://127.0.0.1:6060/data')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send()
</script>
```

`Access-Control-Allow-Origin` : 该字段是必须的。它的值要么是请求时 Origin 字段的值，要么是一个 `*`，表示接受任意域名的请求。

### 发送 cookie

CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定 `Access-Control-Allow-Credentials` 字段。

否则，即使服务器同意发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理。 但是，如果省略 withCredentials 设置，有的浏览器还是会一起发送 Cookie。这时，可以显式关闭 withCredentials。

需要注意的是，如果要发送 Cookie，`Access-Control-Allow-Origin 就不能设为星号`，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。

```js {7}
const http = require('http')

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500', // 只有 http://127.0.0.1:5500 才能访问
      'Access-Control-Allow-Credentials': true // 允许携带 cookie
    })
    res.end('hello world')
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060')
  })
```

```html {3}
<script>
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = true
  xhr.open('GET', 'http://127.0.0.1:6060/data')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send()
</script>
```

### 非简单请求（会发送 options）

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者 `Content-Type` 字段的类型是 `application/json`。

<p className='mgreen'>非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为”预检”请求（preflight）。</p>

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的 XMLHttpRequest 请求，否则就报错。

服务端

```js
const http = require('http')

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500', // 只有 http://127.0.0.1:5500 才能访问
      'Access-Control-Allow-Credentials': true, // 允许携带 cookie
      'Access-Control-Allow-Methods': 'POST, PUT, DELETE', // 支持
      'Access-Control-Max-Age': '1000' // 指定本次预检请求的有效期，单位为秒
    })
    res.end('hello world')
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060')
  })
```

```html
<script>
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = true
  xhr.open('PUT', 'http://127.0.0.1:6060/data')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send()
</script>
```

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

## 其他方案

- `WebSocket`: WebSocket protocol 是 HTML5 一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是 server push 技术的一种很好的实现。
- node 代理中间件
- `postMessage`
- window.name + iframe

...
