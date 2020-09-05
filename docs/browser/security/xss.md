---
title: 跨站脚本攻击 XSS
date: 2020-06-09 18:23:09
---

## XSS 跨站脚本攻击

`XSS` “跨站脚本”。**XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本**，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。

我们把 XSS 分为**反射型**、**存储型**、**DOM 型** 3 种类型。

### 反射型 XSS 攻击

举个例子

```js
const express = require('express')
const app = express()

app.get('/xss', (req, res) => {
  res.send(`你的搜索内容 ${req.query.search}`)
})

app.listen(3000, () => console.log(`请打开网址 http://localhost:3000/xss?search=Kobe`))
```

打开指定地址，是没问题的，那我们可以修改搜索参数：

```bash
http://localhost:3000/xss?search=<script>alert(document.cookie)</script>
```

可以发现脚本就被执行了，这是因为 Web 服务器接收到请求时，又将恶意代码反射给了浏览器端，这就是**反射型 XSS 攻击**。

另外需要注意的是，**Web 服务器不会存储反射型 XSS 攻击的恶意脚本，这是和存储型 XSS 攻击不同的地方。**

### 存储型 XSS 攻击

比如常见有评论功能、个人信息、表单类等功能，用户可以输入一段 `html`，也可以注入脚本进行攻击。比如下面的文本注入后会造成死循环，每个访问该页面的浏览器都会卡死。

```html
<script>
  while (true) {
    alert(1)
  }
</script>
```

### DOM 的 XSS 攻击

基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。具体来讲，黑客通过各种手段将恶意脚本注入用户的页面中，比如通过网络劫持在页面传输过程中修改 HTML 页面的内容，这种劫持类型很多，有通过 WiFi 路由器劫持的，有通过本地恶意软件来劫持的，**它们的共同点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据**。

比如

```jsx
<img srx='x' onerror='' />
```

## 解决问题

### 利用 CSP

充分利用 [Content Security Policy 内容安全策略](http://www.ruanyifeng.com/blog/2016/09/csp.html)

CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"
/>
```

上面代码中，CSP 做了如下配置。

- 脚本：只信任当前域名
- \<object\>标签：不信任任何 URL，即不加载任何资源
- 样式表：只信任 cdn.example.org 和 third-party.org
- 框架（frame）：必须使用 HTTPS 协议加载
- 其他资源：没有限制

### html 文本转义

比如我们输入恶意脚本 `<script>alert(你被xss攻击了)</script>` 后将一些关键的字符进行转码：

```js
&lt;script&gt;alert(&#39;你被xss攻击了&#39;)&lt;/script&gt
```

### Cookie http-only

如果不设置 `http-only` 属性，我们可以在控制台可以读取 `document.cookie`，如果这个属性设置为 true，就不能通过 js 脚本来获取 cookie 的值，能有效的防止 xss 攻击。

```js
// secure true 表示只能通过 https 传输 cookie
res.cookie('name', 'alvin', { maxAge: 900000, httpOnly: true, secure: true })
```
