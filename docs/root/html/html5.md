---
title: HTML5 和 HTML4 究竟有哪些不同
date: 2020-04-30 10:42:40
---

## 声明方面

1. HTML5 文件类型声明（<!DOCTYPE>）变成下面的形式：

```html
<!DOCTYPE html>
```

## 标准方面

2. HTML5 的文档解析不再基于 SGML(Standard Generalized Markup Language) 标准，而是形成了自己的一套标准

## 标签方面

3. 新增语义化标签

```html
<header>、<footer>、<section>、<article>、<nav>、<hgroup>、<aside>、<figure>
```

4. 废除一些网页美化方面的标签，使样式与结构分离更加彻底, 包括

```html
<big>、<u>、<font>、<basefont>、<center>、<s>、<tt>
```

5. 通过增加了`<audio>`、`<video>`两个标签来实现对多媒体中的音频、视频使用的支持。

## 属性方面

6. 增加了一些表单属性, 主要是其中的 `input` 属性的增强

```html
<!-- 此类型要求输入格式正确的email地址 -->
<input type=email >
<!-- 要求输入格式正确的URL地址  -->
<input type=url >
<!-- 要求输入格式数字，默认会有上下两个按钮 -->
<input type=number >
<!-- 时间系列，但目前只有 Opera和Chrome支持 -->
<input type=date >
<input type=time >
<input type=datetime >
<input type=datetime-local >
<input type=month >
<input type=week >
<!-- 默认占位文字 -->
<input type=text placeholder="your message" >
<!-- 默认聚焦属性 -->
<input type=text autofacus="true" >
```

7. 其他标签新增了一些属性

```html
<!-- meta标签增加charset属性 -->
<meta charset="utf-8">
<!-- script标签增加async属性 -->
<script async></script>
```

8. 使部分属性名默认具有 `boolean` 属性

```html
<!-- 只写属性名默认为true -->
<input type="checkbox"  checked/>
<!-- 属性名="属性名"也为true -->
<input type="checkbox"  checked="checked"/>
```

## 存储方面

9. 新增 `WebStorage`, 包括 `localStorage` 和 `sessionStorage`
10. 引入了 `IndexedDB` 和` Web SQL`，允许在浏览器端创建数据库表并存储数据, 两者的区别在于 `IndexedDB` 更像是一个 `NoSQL` 数据库，而 `WebSQL` 更像是关系型数据库。W3C 已经不再支持` WebSQL`。
11. 引入了应用程序缓存器(`application cache`)，可对 `web` 进行缓存，在没有网络的情况下使用，通过创建 `cache manifes`t 文件,创建应用缓存，为 `PWA`(Progressive Web App)提供了底层的技术支持。

:::tip 总结
对于 HTML5 与 HTML4 的区别，这些基本的概念是要有印象的，也许现在还比较粗略，但后面会一步步追问细节，慢慢深入，达到知其然也其所以然的效果。
:::

转自 [HTML5和HTML4究竟有哪些不同？](http://47.98.159.95/my_blog/html/001.html)