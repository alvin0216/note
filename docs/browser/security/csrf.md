---
title: CSRF：跨站请求伪造
date: 2020-06-26 23:30:24
---

## CSRF

CSRF：跨站请求伪造，在用户登录后，黑客诱导你点击进入他的页面，在黑客的网站中，利用用户的登录状态发起的跨站请求（恶意攻击）。

```js
+-------------------+
| 用户登录网站 A      |     给 Kobe 转账 '/pay?name=Kobe'
+---------+---------+
          |
       黑客诱导
          |
+---------v----------+
| 用户打开黑客网站 B    |    黑客网站里 img 标签指向转账的请求
+--------------------+    修改转账对象为黑客本身.. '/pay?name=黑客'
                                  +
                                  |
                                  v
                          +-------+-------+
                          | 转账到黑客本身  |
                          +---------------+
```

### GET 请求的 CSRF

```bash
├── client
│   ├── index.html
│   └── login.html
├── hacker
│   └── index.html
├── package.json
├── server.js
```

```js
npm i express body-parser cookie-parser
```

- client

index.html

```html
<a href="/pay?name=Kobe&money=100">点击向 Kobe 转账</a>
```

login.html

```html
<head>
  <title>登录页面</title>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.1.0/axios.min.js"></script>
</head>

<body>
  <h2>输入用户名登录</h2>
  <input type="text" />
  <button>登录</button>
  <script>
    window.onload = function() {
      const $input = document.querySelector('input')
      const $button = document.querySelector('button')
      $button.onclick = function() {
        axios.post('/api/login', { username: $input.value }).then(res => {
          window.location.href = '/'
        })
      }
    }
  </script>
</body>
```

- 黑客页面

```html
<h2>图片上的地址指向原网站</h2>
<img src="http://127.0.0.1:3000/pay?name=黑客&money=100" />
```

- server.js

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cookieParser())

app.get('/', (req, res) => {
  const username = req.cookies.username

  // 未登录跳转到登录页
  if (!username) res.redirect('/login')
  else res.sendFile(path.resolve(__dirname, './client/index.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/login.html'))
})

app.post('/api/login', (req, res) => {
  const { username } = req.body
  res.cookie('username', username)
  res.end('success')
})

app.get('/pay', (req, res) => {
  const username = req.cookies.username
  const { name, money } = req.query
  console.log(`${username} 给 ${name} 转账 ${money} 成功`)
  res.send(`${username} 给 ${name} 转账 ${money} 成功`)
})

app.listen(3000, () => console.log(`请打开网址 http://localhost:3000`))
```

`node server.js`，用户登录转账，然后打开黑客页面一刷新也可以给黑客转账了。

```js
alvin 给 Kobe 转账 100 成功
alvin 给 黑客 转账 100 成功
```

### POST 请求的 CSRF

除了自动发送 Get 请求之外，有些服务器的接口是使用 POST 方法的，所以黑客还需要在他的站点上伪造 POST 请求，当用户打开黑客的站点时，是自动提交 POST 请求，具体的方式你可以参考下面示例代码：

```html
<form id="hacker-form" action="http://127.0.0.1:3000/pay' method="POST">
  <input type="hidden" name="name" value="黑客" />
  <input type="hidden" name="money" value="100" />
</form>
<script>
  document.getElementById('hacker-form').submit()
</script>
```

## 防止 CSRF 攻击

### Cookie SameSite

从第三方站点发送请求时禁止 Cookie 的发送。

SameSite 选项通常有 Strict、Lax 和 None 三个值。

- Strict 最为严格：完全禁止
- Lax 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。
- 而如果使用 None 的话，在任何情况下都会发送 Cookie 数据。

还可以添加 `Secure`.

### Referer、Origin

在服务器端验证请求来源的站点。

### CSRF Token

如果是从第三方站点发出的请求，那么将无法获取到 CSRF Token 的值，所以即使发出了请求，服务器也会因为 CSRF Token 不正确而拒绝请求。

### 利用验证码等

体验就不友好了。
