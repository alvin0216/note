---
title: 理解 meta 标签
date: 2020-07-10 12:51:42
---

## 概述

举个常见例子，设置文档的字符编码 utf-8 这是最常见的 `meta` 标签了：

```html
<meta charset="UTF-8" />
```

除此以外还有很多用法例如：

```html
<meta charset="utf-8" />
<meta name="keywords" content="blog" />
<meta name="description" content="alvin's blog" />
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
```

---

让我们开始了解 `meta` 标签

> Meta elements are typically used to specify page description, keywords, author of the document, last modified, and other metadata.

**翻译过来就是：meta 常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。**

meta 元素定义的元数据的类型包括以下几种：

| 属性       | 描述                                                                  |
| ---------- | --------------------------------------------------------------------- |
| name       | meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。 |
| http-equiv | meta 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。         |
| charset    | 告诉文档使用哪种字符编码。                                            |
| itemprop   | meta 元素提供用户定义的元数据                                         |

## name ✨

name 属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为 content，content 中的内容是对 name 填入类型的具体描述，便于搜索引擎抓取。

语法：

```html
<meta name="参数" content="具体的描述" />
```

| name        | content                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------ |
| author      | 文档的作者名称                                                                             |
| description | 页面内容的简短和精确的描述。 一些浏览器，如 Firefox 和 Opera，将其用作书签页面的默认描述。 |
| keywords    | 包含与逗号分隔的页面内容相关的单词。                                                       |
| viewport    | 它提供有关视口初始大小的提示，仅供移动设备使用                                             |
| robots      | 定义搜索引擎爬虫的索引方式                                                                 |
| generator   | 包含生成页面的软件的标识符                                                                 |
| referrer    | 控制所有从该文档发出的 HTTP 请求中 HTTP Referer 首部的内容.                                |

### author

说明：用于标注网页作者

举例：

```html
<meta name="author" content="Alvin, alvin00216@163.com" />
```

### keywords(关键字)

说明：用于告诉搜索引擎，你网页的关键字。

举例：

```html
<meta name="keywords" content="alvin's blog, front-end, html, javascript, react, vue" />
```

### description(网站内容的描述)

说明：用于告诉搜索引擎，你网站的主要内容。

举例：

```html
<meta name="description" content="alvin's blog, Front-end knowledge sharing" />
<meta name="description" content="alvin's blog, 前端知识分享、个人笔记" />
```

### viewport(定义视口信息)

用于定义视口信息，比较重要的知识点，这里简单举例：

```html
<!-- 禁用 移动端缩放 -->
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
```

### robots(定义搜索引擎爬虫的索引方式)

说明：robots 用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。

content 的参数有 all,none,index,noindex,follow,nofollow。默认是 all。

```html
<meta name="robots" content="none" />
```

## http-equiv ✨

| http-equiv              | content                                                                                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content-security-policy | 它允许页面作者定义当前页的 [内容策略](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives)。 内容策略主要指定允许的服务器源和脚本端点，这有助于防止跨站点脚本攻击。 |
| content-type            |                                                                                                                                                                                                 |
| default-style           | 设置默认 CSS 样式表组的名称。                                                                                                                                                                   |
| x-ua-compatible         | 设置浏览器的兼容性模式                                                                                                                                                                          |
| refresh                 | 页面载入方式，常用与跳转                                                                                                                                                                        |

meta 标签中 http-equiv 属性语法格式是：

```html
<meta http-equiv="参数" content="具体的描述" />
```

### refresh(自动刷新并指向某页面)

- 如果 content 只包含一个正整数,则是重新载入页面的时间间隔(秒);
- 如果 content 包含一个正整数并且跟着一个字符串 ';url=' 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)

举例

```html
<!-- Redirect page after 3 seconds -->
<meta http-equiv="refresh" content="3;url=https://alvin.run" />
```

## property 开放图谱协议

在天猫首页的源码中发现了下面的内容：

```html
<meta property="og:title" content="天猫" />
<meta property="og:type" content="website" />
<meta property="og:url" content=" https://www.tmall.com/" />
<meta property="og:image" content=" https://img.alicdn.com/tfs/TB1MaLKRXXXXXaWXFXXXXXXXXXX-480-260.png" />
```

[The Open Graph protocol](https://ogp.me/): Facebook 制订的一个社交网络分享协议

---

- [MDN： meta 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)
- [关于 HTML 中 meta 标签的理解和总结](https://juejin.im/entry/588074c62f301e00696b481d#comment)
