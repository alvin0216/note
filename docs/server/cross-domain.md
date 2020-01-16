---
title: HTTP - 跨域
date: 2020-01-16 11:25:44
---

## 什么是跨域

> **跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 JavaScript 实施的安全限制。**

同源策略限制了一下行为：

1. `Cookie`、`LocalStorage` 和 `IndexDB` 无法读取
2. `DOM` 和 `JS` 对象无法获取
3. `Ajax` 请求发送不出去

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

`node server.js` 之后可以发现

Access to XMLHttpRequest at '`http://127.0.0.1:6061/`' from origin '`http://127.0.0.1:8080`' has been blocked by CORS policy: **No 'Access-Control-Allow-Origin' header is present on the requested resource.**

### 常见的跨域场景

所谓的同源是指，域名、协议、端口均为相同。

```js
URL                                      说明                    是否允许通信
http://www.domain.com/a.js
http://www.domain.com/b.js         同一域名，不同文件或路径           允许
http://www.domain.com/lab/c.js

http://www.domain.com:8000/a.js
http://www.domain.com/b.js         同一域名，不同端口                不允许

http://www.domain.com/a.js
https://www.domain.com/b.js        同一域名，不同协议                不允许

http://www.domain.com/a.js
http://192.168.4.12/b.js           域名和域名对应相同ip              不允许

http://www.domain.com/a.js
http://x.domain.com/b.js           主域相同，子域不同                不允许
http://domain.com/c.js

http://www.domain1.com/a.js
http://www.domain2.com/b.js        不同域名                         不允许
```

## jsonp 跨域

`HTML` 标签里，一些标签比如 `script`、`img` 这样的获取资源的标签是没有跨域限制的

**`JSONP` 的基本思想是，网页通过添加一个`<script`>元素，向服务器请求 `JSON` 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来**

让我们用 `jsonp` 解决跨域问题

**客户端**

```html
<h2>跨域测试页面</h2>
<script>
  var requestUrl = 'http://127.0.0.1:6061?username=guosw&callback=onBack'
  var script = document.createElement('script')
  script.src = requestUrl
  document.body.appendChild(script)
  function onBack(data) {
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
