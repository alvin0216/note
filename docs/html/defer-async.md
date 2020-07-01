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

async、defer 同时存在时，以 async 为主。

> 缩短白屏时长：将一些不需要在解析 HTML 阶段使用的 JavaScript 标记上 `sync` 或者 `defer`。

相关链接

- [defer 和 async 的区别](https://segmentfault.com/q/1010000000640869)
- [详解 defer 和 async 的原理及应用](https://blog.csdn.net/z9061/article/details/83011175)
- [浅谈 script 标签的 defer 和 async](https://segmentfault.com/a/1190000006778717)
