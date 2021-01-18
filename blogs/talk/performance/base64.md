---
title: 谈谈 base64 和雪碧图？
date: 2019-09-28 17:00:28
sidebar: 'auto'
tags:
  - CDN
  - 性能优化
categories:
  - 性能优化
  - 技术漫谈
---

base64 这么好为什么不都使用 base64 呢？而是雪碧图呢？

## 什么是 base64 编码?　　

直接切入正题，图片的 base64 编码就是可以将一副图片数据编码成一串字符串，**使用该字符串代替图像地址**。

这样做有什么意义呢？我们知道，我们所看到的网页上的每一个图片，都是需要消耗一个 http 请求下载而来的（所有才有了 csssprites 技术的应运而生，但是 csssprites 有自身的局限性，下文会提到）。

没错，不管如何，图片的下载始终都要向服务器发出请求，要是图片的下载不用向服务器发出请求，而可以随着 HTML 的下载同时下载到本地那就太好了，而 base64 正好能解决这个问题。

那么图片的 base64 编码长什么样子呢？举个栗子。

在 css 里的写法

```css
#fkbx-spch,
#fkbx-hspch {
  background: url(data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP///yH5B…EoqQqJKAIBaQOVKHAXr3t7txgBjboSvB8EpLoFZywOAo3LFE5lYs/QW9LT1TRk1V7S2xYJADs=)
    no-repeat center;
}
```

在 html 代码 img 标签里的写法

```html
<img
  src="data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP///yH5B…EoqQqJKAIBaQOVKHAXr3t7txgBjboSvB8EpLoFZywOAo3LFE5lYs/QW9LT1TRk1V7S2xYJADs="
/>
```

## 为什么要使用 Base64 编码？

那么为什么要使用 base64 传输图片文件？上文也有提及，因为这样可以**节省一个 http 请求**。图片的 base64 编码可以算是前端优化的一环。效益虽小，但却缺能积少成多。

说到这里，不得不提的是 CssSprites 技术，后者也是为了减少 http 请求，而将页面中许多细小的图片合并为一张大图。那么图片的 base64 编码和 CssSprites 有什么异同，又该如何取舍呢？

所以，在这里要明确使用 base64 的一个前提，那就是被 base64 编码的图片足够尺寸小。以博客园的 logo 为例.

博客园的 Logo 只有 3.27KB，已经很小了，但是如果将其制作转化成 base64 编码，生成的 base64 字符串编码足足有 4406 个,也就是说，图片被编码之后，**生成的字符串编码大小一般而言都会比原文件稍大一些**。

即便 base64 编码能够被 gzip 压缩，压缩率能达到 50% 以上，想象一下，一个元素的 css 样式编写居然超过了 2000 个 字符，那对 css 整体的可读性将会造成十分大的影响，代码的冗余使得在此使用 base64 编码将得不偿失。

那么，是不是表示 base64 编码无用武之地呢？不然。当页面中的图片满足以下要求，base64 就能大显身手。

**如果图片足够小且因为用处的特殊性无法被制作成雪碧图（CssSprites），在整个网站的复用性很高且基本不会被更新。**

那么此时使用 base64 编码传输图片就可谓好钢用在刀刃上，思前想后，符合这个规则的，有一个是我们经常会遇到的，就是页面的背景图 background-image 。在很多地方，我们会制作一个很小的图片大概是几 px\*几 px，然后平铺它页面当背景图。因为是背景图的缘故，所以无法将它放入雪碧图，而它却存在网站的很多页面，这种图片往往只有几十字节，却需要一个 http 请求，十分不值得。那么此时将它转化为 base64 编码，何乐而不为？

## CssSprites 与 Base64 编码　　

简单陈述一下我对何时这使用这两种优化方法的看法。

使用 CssSprites 合并为一张大图：

- 页面具有多种风格，需要换肤功能，可使用 CssSprites
- 网站已经趋于完美，不会再三天两头的改动（例如 button 大小、颜色等）
- 使用时无需重复图形内容
- 没有 Base64 编码成本，降低图片更新的维护难度。（但注意 Sprites 同时修改 css 和图片某些时候可能造成负担）
- 不会增加 CSS 文件体积

使用 base64 直接把图片编码成字符串写入 CSS 文件：

- 无额外请求
- 对于极小或者极简单图片
- 可像单独图片一样使用，比如背景图片重复使用等
- 没有跨域问题，无需考虑缓存、文件头或者 cookies 问题

## 一些误区

Base64 虽有优点，但是缺点也很明显，在使用上存在一些明显的缺陷。

### 使用 Base64 不代表性能优化

**是的，使用 Base64 的好处是能够减少一个图片的 HTTP 请求，然而，与之同时付出的代价则是 CSS 文件体积的增大。**

而 CSS 文件体积的增大意味着什么呢？意味着 CRP 的阻塞。

:::tip

CRP（Critical Rendering Path，关键渲染路径）：当浏览器从服务器接收到一个 HTML 页面的请求时，到屏幕上渲染出来要经过很多个步骤。浏览器完成这一系列的运行，或者说渲染出来我们常常称之为“关键渲染路径”。

:::

通俗而言，就是图片不会导致关键渲染路径的阻塞，而转化为 Base64 的图片大大增加了 CSS 文件的体积，CSS 文件的体积直接影响渲染，导致用户会长时间注视空白屏幕。HTML 和 CSS 会阻塞渲染，而图片不会。

### 页面解析 CSS 生成的 CSSOM 时间增加

Base64 跟 CSS 混在一起，大大增加了浏览器需要解析 CSS 树的耗时。其实解析 CSS 树的过程是很快的，一般在几十微妙到几毫秒之间。

::: tip

CSS 对象模型 (CSSOM)：CSSOM 是一个建立在 web 页面上的 CSS 样式的映射，它和 DOM 类似，但是只针对 CSS 而不是 HTML。

:::

参考 [图片 Base64 编码的利与弊分析](https://www.imooc.com/article/27804)
