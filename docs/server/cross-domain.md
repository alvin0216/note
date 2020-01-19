---
title: HTTP - 跨域
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
