---
title: 跨域以及解决方案
date: 2020-01-16 11:25:44
---

## 什么是跨域

> **跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 JavaScript 实施的安全限制。**

所谓的同源是指，协议、域名、端口均为相同。

|        源 URL         |        请求 URL         | 是否跨域 |                       说明                       |
| :-------------------: | :---------------------: | :------: | :----------------------------------------------: |
| http://127.0.0.1:1234 | http://127.0.0.1:1234/b |    否    | 同协议 `http`； 同 IP `127.0.0.1`；同端口 `1234` |
|     http://a.com      |     http://a.com/b      |    否    |          同协议 `http`； 同域名 `a.com`          |
|     http://a.com      |     https://a.com/b     |    是    |             不同协议 `http` `https`              |
|     http://a.com      |   http://temp.a.com/b   |    是    |           主域名相同，但是子域名不相同           |
|     http://a.com      |    http://temp.b.com    |    是    |                     域名不同                     |

我们可以简单的重现浏览器的跨域问题：

**客户端**

```html
<!-- index.html -->
<h2>跨域测试页面</h2>
<script>
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://127.0.0.1:6061')
  xhr.send()
</script>
```

让我们用 `http-server` 起一个服务, 访问地址一般为 `http://127.0.0.1:8080`

**服务端**

```js
const http = require('http')
const url = require('url')

http
  .createServer(function(req, res) {
    console.log('request：', req.url)
    res.end('callback string')
  })
  .listen(6061)

console.log('server listening on 6061')
```

`node server.js` 之后控制台报错

Access to XMLHttpRequest at '`http://127.0.0.1:6061/`' from origin '`http://127.0.0.1:8080`' has been blocked by CORS policy: **No 'Access-Control-Allow-Origin' header is present on the requested resource.**

这就是不同端口导致的跨域问题。

## jsonp

`HTML` 标签里，一些标签比如 `script`、`img` 这样的获取资源的标签是没有跨域限制的

**`jsonp` 的原理就是利用就是利用 `script` 标签没有跨域限制，可以通过 `script` 标签的 `src` 属性发送 `GET` 请求。**

基本思想：

1. 客户端利用 `script` 标签可以跨域请求资源的性质，向网页中动态插入 `script` 标签，来向服务端请求数据。
2. 服务端会解析请求的 `url`,至少拿到一个回调函数(比如 `callback=jsonCallback`)参数,之后将数据放入其中返回给客户端。
3. 当然 `jsonp` 不同于平常的 `ajax` 请求,它仅仅支持 `get` 类型的方式

### 实现 jsonp

**客户端**

```html
<h2>跨域测试页面</h2>
<script>
  var requestUrl = 'http://127.0.0.1:6061?username=guosw&callback=jsonCallback'
  var script = document.createElement('script')
  script.src = requestUrl
  document.body.appendChild(script)
  function jsonCallback(data) {
    console.log('recive data:', data)
  }
</script>
```

**服务端**

```js
const http = require('http')
const url = require('url')

http
  .createServer(function(req, res) {
    console.log('request：', req.url)
    const query = url.parse(req.url, true).query
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
    const json = { name: 'guosw' }
    // url = /?username=guosw&callback=onBack
    // 相当于 res.end('onBack({ "name": "guosw"})')
    res.end(`${query.callback}(${JSON.stringify(json)})`)
  })
  .listen(6061)

console.log('server listening on 6061')
```

虽然这种方式非常好用，但是一个最大的缺陷是，只能够实现 `get` 请求

### axios 下封装 jsonp

常规情况下前后分离用 `axios` 这个库多一些，所以做了个基于 `axios` 下的 `jsonp` 方法

```js
axios.jsonp = function(url) {
  if (typeof url !== 'string') {
    throw new Error('url must be string')
  }

  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script')
      script.src = `${url}&callback=jsonCallBack`

      document.body.appendChild(script)
      window.jsonCallBack = result => {
        resolve(result)
        document.body.removeChild(script)
      }
    } catch (error) {
      reject(error)
    }
  })
}
```

调用：

```js
axios.jsonp('http://127.0.0.1:6061?username=guos').then(res => {
  console.log(res)
})
```

## Cors

`CORS` 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE 浏览器不能低于 IE10。

整个 `CORS` 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，`CORS` 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些**附加的头信息**，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现 `CORS` 通信的关键是服务器。只要服务器实现了 `CORS` 接口，就可以跨源通信。

**浏览器将 CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。**

只要同时满足以下两大条件，就属于简单请求。

1. 请求方法是以下三种方法之一：`HEAD` `GET` `POST`
2. HTTP 的头信息不超出以下几种字段：

```yml
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain
```

凡是不同时满足上面两个条件，就属于非简单请求。

### 简单请求

#### 基本流程

对于简单请求，浏览器直接发出 `CORS` 请求。具体来说，就是**在头信息之中，增加一个 `Origin` 字段**。

还是第一个例子，我们进行改造：

```html
<!-- index.html -->
<h2>跨域测试页面</h2>
<script>
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://127.0.0.1:6061')
  xhr.send()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText)
      }
    }
  }
</script>
```

```js
// server.js
const http = require('http')
const url = require('url')

http
  .createServer(function(req, res) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
    })

    res.end('callback string')
  })
  .listen(6061)

console.log('server listening on 6061')
```

浏览器判断跨域为简单请求时候，会在 `Request Header` 中添加 **Origin （协议 + 域名 + 端口）**字段 ， 它表示我们的请求源，CORS 服务端会将该字段作为跨源标志。

`CORS` 接收到此次请求后 ， 首先会判断 `Origin` 是否在允许源（由服务端决定）范围之内，如果验证通过，服务端会在 `Response Header` 添加 `Access-Control-Allow-Origin`、`Access-Control-Allow-Credentials` 等字段。

![](../../assets/cross-domain/cors-simple.png)

#### 其他的字段

CORS 请求相关的字段，都以 `Access-Control-开头`。

**1. Access-Control-Allow-Origin**

该字段是必须的。它的值要么是请求时 `Origin` 字段的值，要么是一个`*`，表示接受任意域名的请求。

**2. Access-Control-Allow-Credentials**

该字段可选。它的值是一个布尔值，表示是否允许发送 `Cookie`。默认情况下，`Cookie` 不包括在 `CORS` 请求之中。设为 `true`，即表示服务器明确许可，`Cookie` 可以包含在请求中，一起发给服务器。这个值也只能设为 `true`，如果服务器不要浏览器发送 `Cookie`，删除该字段即可。

`CORS` 请求默认不发送 `Cookie` 和 `HTTP` 认证信息。如果要把 `Cookie` 发到服务器，一方面要服务器同意

```js
res.writeHead(200, {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
  'Access-Control-Allow-Credentials': true
})
```

另一方面，开发者必须在 `AJAX` 请求中打开 `withCredentials` 属性。

```js
xhr.withCredentials = true
```

需要注意的是，如果要发送 `Cookie`，`Access-Control-Allow-Origin` 就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，`Cookie` 依然遵循同源政策，只有用服务器域名设置的 `Cookie` 才会上传，其他域名的 `Cookie` 并不会上传，且（跨源）原网页代码中的 `document.cookie` 也无法读取服务器域名下的 `Cookie`。

**3. Access-Control-Expose-Headers**

该字段可选。`CORS` 请求时，`XMLHttpRequest` 对象的 `getResponseHeader()`方法只能拿到 6 个基本字段：`Cache-Control`、` Content-Language``、Content-Type `、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在 `Access-Control-Expose-Headers` `里面指定。上面的例子指定，getResponseHeader('FooBar')`可以返回 `FooBar` 字段的值。

### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE`，或者 `Content-Type` 字段的类型是 `application/json`。

非简单请求的 `CORS` 请求，会在正式通信之前，增加一次 `HTTP` 查询请求，称为"预检"请求（`preflight`）。
