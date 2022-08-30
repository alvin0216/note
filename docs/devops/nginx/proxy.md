---
title: nginx 代理
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - nginx
  - 技术漫谈
categories:
  - 技术漫谈
---

- `X-Forwarded-For`: 字面意思是“为谁而转发”，追加的是请求方的 IP 地址。
- `X-Real-IP`: 另一种获取客户端真实 IP 的手段，它的作用很简单，就是记录客户端 IP 地址，没有中间的代理信息，相当于是“X-Forwarded-For”的简化版。如果客户端和源服务器之间只有一个代理，那么这两个字段的值就是相同的。
- `X-Forwarded-Proto`: 它作用与“X-Real-IP”类似，只记录客户端的信息, 记录原始协议名
- `X-Forwarded-Host`: 它作用与“X-Real-IP”类似，只记录客户端的信息, 记录原始域名。

demo:

```bash
server {
  listen  1234;
  server_name localhost;

  root /work/4003-test-react-blog/build;

  index index.html;

  location / {
      try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_set_header X-Real-IP          $remote_addr:$remote_port; # 客户端真实 IP + PORT
    proxy_set_header X-Forwarded-Host   $http_host; # 访问的服务器的 IP + PORT
    proxy_set_header X-Forwarded-Proto  $scheme; # 协议
    proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for; #
    proxy_pass http://127.0.0.1:9000;
  }
}
```

添加了 `proxy_set_header` 服务端在请求就可以通过请求头拿到设置的信息。 如

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  console.log('====> ', ctx.req.headers);

  ctx.body = ctx.ip;
});

app.listen(9000, () => {
  console.log('http://127.0.0.1:9000');
});

// 'x-real-ip': '192.168.1.74:59999',
// 'x-forwarded-host': '192.168.1.117:1234',
// 'x-forwarded-proto': 'http',
// 'x-forwarded-for': '192.168.1.74',
```

<!-- server {
  listen  1234;
  server_name localhost;

  root /Users/guosw/Desktop/temp/http_study/www/conf/http; #服务默认启动目录
  index  index.html index.htm; #默认访问文件

  location / {

     # proxy_pass http://127.0.0.1:4040;
  }

  location /api {
    proxy_set_header X-Real-IP          $remote_addr:$remote_port; # 客户端真实 IP + PORT
    proxy_set_header X-Forwarded-Host   $http_host; # 访问的服务器的 IP + PORT
    proxy_set_header X-Forwarded-Proto  $scheme; # 协议
    proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for; #
    proxy_pass http://127.0.0.1:9000;
  }
}


'x-real-ip': '192.168.1.74:59999',
'x-forwarded-host': '192.168.1.117:1234',
'x-forwarded-proto': 'http',
'x-forwarded-for': '192.168.1.74', -->
