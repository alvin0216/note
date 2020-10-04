---
title: 常见性能优化
date: 2020-07-31 16:30:33
---

- [35 条前端性能优化军规](https://learnku.com/docs/f2e-performance-rules)
- [前端性能优化原理与实践](https://juejin.im/book/6844733750048210957/section/6844733750031417352)
- [你不知道的前端性能优化技巧](http://www.imooc.com/read/41)

## CSS

### 将 CSS 放在页面顶部

CSS 的加载不阻碍 DOM-Tree 的合成，但会阻碍渲染树的形成。即使 DOM 已经解析完毕了，只要 CSSOM 不 OK，那么渲染这个事情就不 OK。

- [渲染进程上：HTML、CSS、JS 怎么变成页面](../browser/macro/rendering1.md)
- [渲染进程下：HTML、CSS、JS 怎么变成页面](../browser/macro/rendering2.md)

### 使用 link 而不是 @import

- 加载顺序区别：加载页面时，`link` 标签引入的 CSS 被同时加载；`@import` 引入的 CSS 将在页面加载完毕后被加载。
- 兼容性：link 是 html 标签，没兼容性问题，@import 是后面引入的，有兼容性问题

其他资料可看 [你真的理解@import 和 link 引入样式的区别吗](https://juejin.im/post/6844903581649207309)

### 不写嵌套太深的选择器

<span class='mgreen'>CSS 引擎查找样式表，对每条规则都按从右到左的顺序去匹配</span>

```CSS
#myList li {}
```

CSS 选择符是从右到左进行匹配的。我们这个看似“没毛病”的选择器，实际开销相当高：浏览器必须遍历页面上每个 li 元素，并且每次都要去确认这个 li 元素的父元素 id 是不是 myList，你说坑不坑！

在看看通配符

```CSS
* {}
```

入门 CSS 的时候，不少同学拿通配符清除默认样式（我曾经也是通配符用户的一员）。但这个家伙很恐怖，它会匹配所有元素，所以浏览器必须去遍历每一个元素！大家低头看看自己页面里的元素个数，是不是心凉了——这得计算多少次呀！

好的 CSS 选择器书写习惯，可以为我们带来非常可观的性能提升。根据上面的分析，我们至少可以总结出如下性能提升的方案：

- 避免使用通配符，只对需要用到的元素进行选择。
- 关注可以通过继承实现的属性，避免重复匹配重复定义。
- 减少嵌套。后代选择器的开销是最高的，因此我们应该尽量将选择器的深度降到最低（最高不要超过三层），尽可能使用类来关联每一个标签元素。
- 少用标签选择器。如果可以，用类选择器替代，举个 🌰：

```CSS
#myList li {}
/* better */
.myList_li {}

.myList#title {}
/* better */
.title {}
```

## 图片

### 雪碧图+压缩

这是最基本的优化手段了。其他还有 转 base64 等。

### 避免图片 src 为空

图片标签的 src 属性值为空字符串可能以下面两种形式出现：

```JSX
// html
<img src='' />

// js
var img = new Image()
img.src = ''
```

虽然 src 属性为空字符串，但浏览器仍然会向服务器发起一个 HTTP 请求：

- IE 向页面所在的目录发送请求；
- Safari、Chrome、Firefox 向页面本身发送请求；
- Opera 不执行任何操作。

空 src 产生请求的后果不容小觑：

- 给服务器造成意外的流量负担，尤其时日 PV 较大时；
- 浪费服务器计算资源；
- 可能产生报错。

```js
空的 href 属性也存在类似问题。用户点击空链接时，浏览器也会向服务器发送 HTTP 请求，
可以通过 JavaScript 阻止空链接的默认的行为。
```

### 不要在 HTML 中缩放图片

<span class='mgreen'>设置图片的宽和高，以免浏览器按照「猜」的宽高给图片保留的区域和实际宽高差异，产生重绘。</span>

不要使用 \<img\> 的 width、height 缩放图片，如果用到小图片，就使用相应大小的图片。如果需要

```html
<img width="100" height="100" src="mycat.jpg" alt="My Cat" />
```

那么图片本身（mycat.jpg）应该是 100x100px 的，而不是去缩小 500x500px 的图片。

### 懒加载和预加载

请看 [lazy-load](./lazyload-img.md)

## Javascript

### 将 js 放在页面底部或者使用 defer

脚本会阻塞并行下载，所以一般 js 会被放在 body 的底部，以避免下载 js 阻碍 dom-tree 的构成。

defer 模式下，JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、<span class='mgreen'>DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行。</span>

如果 js 文件并没有对 dom 进行操作，强烈推荐使用 defer

### 减少/缓存 DOM 操作

首先

JS 是很快的，在 JS 中修改 DOM 对象也是很快的。在 JS 的世界里，一切是简单的、迅速的。但 DOM 操作并非 JS 一个人的独舞，而是两个模块之间的协作。

JS 引擎和渲染引擎（浏览器内核）是独立实现的。当我们用 JS 去操作 DOM 时，本质上是 JS 引擎和渲染引擎之间进行了“跨界交流”。这个“跨界交流”的实现并不简单，它依赖了桥接接口作为“桥梁”。

其次

很多时候，我们对 DOM 的操作都不会局限于访问，而是为了修改它。当我们对 DOM 的修改会引发它外观（样式）上的改变时，就会**触发回流或重绘**。

怎么做呢 举个例子：

```js
// 只获取一次container
let container = document.getElementById('container')
for (let count = 0; count < 10000; count++) {
  container.innerHTML += '<span>我是一个小测试</span>'
}

// better
let container = document.getElementById('container')
let content = ''
for (let count = 0; count < 10000; count++) {
  // 先对内容进行操作
  content += '<span>我是一个小测试</span>'
}
// 内容处理好了,最后再触发DOM的更改
container.innerHTML = content
```

这个思路，在 [DOM Fragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 中体现得淋漓尽致。

> DocumentFragment 接口表示一个没有父级文件的最小文档对象。它被当做一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的 XML 片段。因为 DocumentFragment 不是真实 DOM 树的一部分，它的变化不会引起 DOM 树的重新渲染的操作（reflow），且不会导致性能等问题。

### 防抖与节流

## 网络请求

### 给 Cookie 减肥

<span class='mgreen'>过量的 Cookie 会带来巨大的性能浪费</span>

- 去除不必要的 Cookie；
- 尽量压缩 Cookie 大小；
- 注意设置 Cookie 的 domain 级别，如无必要，不要影响到 sub-domain；
- 设置合适的过期时间。

### 使用 gzip

压缩组件通过减少 HTTP 请求产生的响应包的大小，从而降低传输时间的方式来提高性能。从 HTTP1.1 开始，Web 客户端可以通过 HTTP 请求中的 `Accept-Encoding` 头来标识对压缩的支持

```yml
accept-encoding: gizp
```

配置 nginx 可以轻松实现 gzip：

```yml
server {
   .....
    gzip on; # 开启压缩
    gzip_buffers 32 4k; # 设置用于处理请求压缩的缓冲区数量和大小
    gzip_comp_level 6; # 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大
    gzip_min_length 200; # 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
   .....
}
```

### 减少 http 请求或域名分片

Chrome 一个域名最多可以并发 6 个长连接，比如我有 10 个连接，那么 Chrome 会先并发 6 个连接，等完成一个后才慢慢加载后面的 4 个连接。

所以通过将文件分别存放在不同域名上，可以增加请求队列。但是，也治标不治本。

### 使用 HTTP2

<span class='mgreen'>HTTP2 使用了头部压缩算法，多路复用、二进制分帧，解决了 解决队头阻塞问题，也加快了请求速度。</span>

在 nginx 上配置也很简单：

```bash
listen  443 http2 ssl;
```

### 避免 301/302 重定向

[避免 301/302 重定向](https://learnku.com/docs/f2e-performance-rules/avoid-redirects/6371).

仔细想想。重定向后浏览器还要重新解析域名。

### 使用 GET 方法

![](https://cdn.learnku.com/uploads/images/201912/13/1/PmETKZFicM.png!large)

### DNS Prefetch

<span class='mgreen'>打开 DNS Prefetch 之后，浏览器会在空闲时间提前将这些域名转化为对应的 IP 地址</span>

<span class='mgreen'>浏览器自动解析</span>

浏览器引擎在解析 HTML 页面的时候，会自动获取当前页面所有的 a 标签 herf 属性当中的域名，然后进行 DNS Prefetch。这里需要注意的是如果你的页面是 HTTPS，那么浏览器为了确保安全是不会开启自动解析的，这个时候我们就需要在页面头部添加如下的 meta 标签：

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
```

<span class='mgreen'>手动解析</span>

直接添加如下 link 标签即可

```html
<link rel="dns-prefetch" href="//www.imooc.com" />
```

那么我们可以在哪些具体的场景下使用呢，一般我们都是在整个站点的首页设置好 DNS Prefetch，这么做的原因一个是基于站点用到的大多数域名都会在首页当中出现，另外一个原因是我们可以把其他子页面用到的比较频繁的域名也可以放到首页进行预解析。

如果是新用户进行访问，合理地设置 DNS Prefetch 可以很好的提高访问速度。

## 缓存

### 多使用 CDN

### 协商缓存

一般来说设置 `etag`

## webpack

webpack 可以优化点较多，如构建优化，使用 dll、使用 cdn、压缩 css、压缩 js 等等。

## 服务端渲染

这个涉及的内容也比较多，建议单独了解。
