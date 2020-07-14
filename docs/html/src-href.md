---
title: src 和 href 的区别
date: 2020-07-10 17:01:15
---

> src 用于替代这个元素，而 href 用于建立这个标签与外部资源之间的关系

```html
<link rel="stylesheet" href="./theme.css" />
<script src="./myscript.js"></script>

<a href="https://baidu.com">百度</a>
```

<h4>请求资源类型不同</h4>

- href 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。
- 在请求 src 资源时会将其指向的资源下载并应用到文档中，比如 JavaScript 脚本，img 图片。

<h4>作用结果不同</h4>

- href 用于在当前文档和引用资源之间确立联系；
- src 用于替换当前内容；

<h4>浏览器解析方式不同</h4>

- 若在文档中添加 ，浏览器会识别该文档为 CSS 文件，就会**并行下载资源并且不会停止对当前文档的处理**。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
- 当浏览器解析到 ，**会暂停其他资源的下载和处理**，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

---

- [简单介绍一下 url、href、src 到底是什么？可能好多人不太明白](https://blog.csdn.net/rocling/article/details/82954538)