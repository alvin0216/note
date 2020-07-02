---
title: script中defer和async的区别
date: 2020-07-02 01:20:07
---

```js
<script async src='./foo.js'></script>
```

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

- `async`: 脚本下载完成后，立即停止 HTML 的 DOM 解析，执行脚本，脚本解析完继续 HTML 解析。
- `defer`: 脚本下载完成后，不立即执行，而是等到文档解析完也即在 `DOMContentLoaded` 事件之前执行脚本。

🔔 注意

- async、defer 同时存在时，以 async 为主。
- async、defer 不可用于内联 script 比如 `<script>console.log(1)</scrript>`
- async 异步加载脚本，先加载完的先执行，也就是无法保证脚本的执行顺序。

> 缩短白屏时长：将一些不需要在解析 HTML 阶段使用的 JavaScript 标记上 `sync` 或者 `defer`。

## 白屏问题

在渲染引擎内部，有一个叫 **HTML 解析器**（HTMLParser）的模块，它的职责就是负责将 HTML 字节流转换为 DOM 结构。

**HTML 解析器**在解析 HTML 的时候，如果遇到解析到解析到 `script` 标签时，渲染引擎判断这是一段脚本，此时 HTML 解析器就会暂停 DOM 的解析，因为接下来的 JavaScript 可能要修改当前已经生成的 DOM 结构。

看一段 `demo`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="./1.js"></script>
  </head>
  <body>
    <h2>hello</h2>
  </body>
</html>

<!-- 1.js -->
alert(1)
```

![渲染图](../../assets/html/browser-render.gif)

可见，执行到 `script` html 会暂停解析，下载脚本，执行脚本，所以先弹出 1，然后继续解析 html，渲染出 hello.

**即使 script 放在 body 底部，结果也是一样**：先弹出 1，然后继续解析 html，渲染出 hello.

```html
<body>
  <h2>hello</h2>
  <script src="./1.js"></script>
</body>
```

## JS 的阻塞渲染

相关链接

- [defer 和 async 的区别](https://segmentfault.com/q/1010000000640869)
- [详解 defer 和 async 的原理及应用](https://blog.csdn.net/z9061/article/details/83011175)
- [浅谈 script 标签的 defer 和 async](https://segmentfault.com/a/1190000006778717)
- [浏览器的渲染：过程与原理](https://zhuanlan.zhihu.com/p/29418126)
