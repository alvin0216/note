---
title: DNS 预解析
date: 2020-07-15 13:00:28
sidebar: 'auto'
tags:
  - DNS
  - 性能优化
categories:
  - 技术漫谈
  - 性能优化
---

打开 DNS Prefetch 之后，浏览器会在空闲时间提前将这些域名转化为对应的 IP 地址，以达到优化网络请求的效果。

**浏览器自动解析**

浏览器引擎在解析 HTML 页面的时候，会自动获取当前页面所有的 a 标签 herf 属性当中的域名，然后进行 DNS Prefetch。这里需要注意的是如果你的页面是 HTTPS，那么浏览器为了确保安全是不会开启自动解析的，这个时候我们就需要在页面头部添加如下的 meta 标签：

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
```

**手动解析**：直接添加如下 link 标签即可

```html
<link rel="dns-prefetch" href="//www.baidu.com" />
```

那么我们可以在哪些具体的场景下使用呢，一般我们都是在整个站点的首页设置好 DNS Prefetch，这么做的原因一个是基于站点用到的大多数域名都会在首页当中出现，另外一个原因是我们可以把其他子页面用到的比较频繁的域名也可以放到首页进行预解析。

如果是新用户进行访问，合理地设置 `DNS Prefetch` 可以很好的提高访问速度。
