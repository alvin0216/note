---
title: 重定向和跳转
date: 2020-06-05 17:12:04
---

“`Location`”字段属于响应字段，必须出现在响应报文里。但只有配合 `301/302` 状态码才有意义，它标记了服务器要求重定向的 `URI`

```TS {7}
const http = require('http')

http
  .createServer(function(request, response) {
    if (request.url === '/') {
      response.writeHead(301, { // 301 使用请慎重，通常用 302
        Location: '/new'
      })
      response.end()
    }

    if (request.url === '/new') {
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
      response.end('<h2>new Page!</h2>')
    }
  })
  .listen(3300)

console.log('http://127.0.0.1:3300')
```

![](../../assets/http/series/redirect.png)

`301` 俗称“<span class='orange'>永久重定向</span>”（Moved Permanently），意思是原 URI 已经“永久”性地不存在了，今后的所有请求都必须改用新的 URI。

`302` 俗称“<span class='orange'>临时重定向</span>”（“Moved Temporarily”），意思是原 URI 处于“临时维护”状态，新的 URI 是起“顶包”作用的“临时工”。
