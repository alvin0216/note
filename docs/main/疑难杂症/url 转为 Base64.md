---
title: url 转为 Base64
date: 2022-03-26 14:53:44
sidebar: auto
tags:
  - 加密
categories:
  - 技术漫谈
---

安全性不高，但也比明文高很多

[原来浏览器原生支持 JS Base64 编码解码](https://www.zhangxinxu.com/wordpress/2018/08/js-base64-atob-btoa-encode-decode/)

```js
window.btoa('a=0');
// 'YT0w'
window.atob('YT0w');
// 'a=0'
```
