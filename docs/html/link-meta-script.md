---
title: 标签的妙用
date: 2020-08-21 09:43:02
---

## 交互实现

**Less code, less bug!**

下面介绍几个标签，来看看如何帮助我们更简单地实现一些页面交互效果。

### meta 标签：自动刷新/跳转

假设要实现一个类似 PPT 自动播放的效果，你很可能会想到使用 JavaScript 定时器控制页面跳转来实现。但其实有更加简洁的实现方法，比如通过 meta 标签来实现：

```html
<meta http-equiv="Refresh" content="5; URL=page2.html" />
```

上面的代码会在 5s 之后自动跳转到同域下的 page2.html 页面。我们要实现 PPT 自动播放的功能，只需要在每个页面的 meta 标签内设置好下一个页面的地址即可。

另一种场景，比如每隔一分钟就需要刷新页面的大屏幕监控，也可以通过 meta 标签来实现，只需去掉后面的 URL 即可：

```html
<meta http-equiv="Refresh" content="60" />
```

如果用 js 去写，是不是代码量会增加，而且还要实现复杂的逻辑，这些用 `meta` 就可以轻松实现。

使用 `meta` 后，刷新和跳转操作是**不可取消的**，所以对刷新时间间隔或者需要手动取消的，还是推荐使用 JavaScript 定时器来实现。

## 性能优化

性能优化是前端开发中避不开的问题，性能问题无外乎两方面原因：渲染速度慢、请求时间长。性能优化虽然涉及很多复杂的原因和解决方案，但其实只要通过合理地使用标签，就可以在一定程度上提升渲染速度以及减少请求时间。

### script 标签：调整加载顺序提升渲染速度

浏览器下载 js 文件，会阻碍 DOM 的渲染，为了减少这些时间损耗，可以借助 script 标签的 3 个属性来实现。

- **async 属性**：立即请求文件，但不阻塞渲染引擎，而是文件加载完毕后阻塞渲染引擎并立即执行文件内容。
- **defer 属性**：立即请求文件，但不阻塞渲染引擎，等到解析完 HTML 之后再执行文件内容。
- **HTML5 标准**：type 属性，对应值为“module”。让浏览器按照 ECMA Script 6 标准将文件当作模块进行解析，默认阻塞效果同 defer，也可以配合 async 在请求完成后立即执行。

```html
<script src="xxx" async />
<script src="xxx" defer />
<script src="xxx" type="module" async />
```

当渲染引擎解析 HTML 遇到 script 标签引入文件时，会立即进行一次渲染，这也是为什么通常会把 script 标签放入到 body 标签底部，因为当渲染引擎执行到 body 底部时会先将已解析的内容渲染出来，然后再去请求相应的 JavaScript 文件。

如果是内联脚本（即不通过 src 属性引用外部脚本文件直接在 HTML 编写 JavaScript 代码的形式），渲染引擎则不会渲染。

### link 标签：通过预处理提升渲染速度

在我们对大型单页应用进行性能优化时，也许会用到按需懒加载的方式，来加载对应的模块，但如果能合理利用 link 标签的 rel 属性值来进行预加载，就能进一步提升渲染速度。

- `dns-prefetch`。当 link 标签的 rel 属性值为“dns-prefetch”时，浏览器会对某个域名预先进行 DNS 解析并缓存。这样，当浏览器在请求同域名资源的时候，能省去从域名查询 IP 的过程，从而减少时间损耗。下图是淘宝网设置的 DNS 预解析。

![dns-fetch](https://gitee.com/alvin0216/cdn/raw/master/img/html/dns-fetch.png)

- `preconnect`。让浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作，这包括 DNS 解析、TLS 协商、TCP 握手，通过消除往返延迟来为用户节省时间。
- `prefetch/preload`。两个值都是让浏览器预先下载并缓存某个资源，但不同的是，prefetch 可能会在浏览器忙时被忽略，而 preload 则是一定会被预先下载。
- `prerender`。浏览器不仅会加载资源，还会解析执行页面，进行预渲染。

![](https://gitee.com/alvin0216/cdn/raw/master/img/html/lin-pre.png)

## 搜索优化

合理地使用 meta 标签和 link 标签，以及语义化标签，恰好能让搜索引擎更好地理解和收录我们的页面。

### meta 标签：提取关键信息

```html
<meta name="参数" content="具体的描述" />

<!-- 比如 -->
<meta name="keywords" content="alvin's note" />
```

详见 [理解 meta](../html/meta.md)

### link 标签：减少重复

有时候为了用户访问方便或者出于历史原因，对于同一个页面会有多个网址，又或者存在某些重定向页面，比如：

- https://baidu.com/a.html
- https://baidu.com/detail?id="abcd"

那么在这些页面中可以这样设置：

```html
<link href="https://baidu.com/a.html" rel="canonical" />
```

这样可以让搜索引擎避免花费时间抓取重复网页。不过需要注意的是，它还有个限制条件，那就是指向的网站不允许跨域。

当然，要合并网址还有其他的方式，比如使用站点地图，或者在 HTTP 请求响应头部添加 rel="canonical"。。。。

---

参考 [前端高手进阶](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/detail/pc?id=3196)
