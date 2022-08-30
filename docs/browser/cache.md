---
title: 谈一谈浏览器缓存？
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - 浏览器缓存
categories:
  - 浏览器
---

实际上，HTTP 传输的每一个环节基本上都会有缓存，非常复杂。

HTTP Cache 是我们开发中接触最多的缓存，它分为强缓存和协商缓存。

- 强缓存：直接从本地副本比对读取，不去请求服务器，返回的状态码是 `200`。
- 协商缓存：会去服务器比对，若没改变才直接读取本地缓存，返回的状态码是 `304`。

缓存优先级

`Pragma` > `Cache-Control` > `Expires` > `ETag` > `Last-Modified`

:::details 流程图

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/cache-progress.png)

:::

## 强缓存

### Expires

当我们请求一个资源，服务器返回时，可以在 `Response Headers` 中增加 `expires` 字段表示资源的过期时间。是一个绝对时间。

::::tabs

::: tab 效果示例

| 响应                                                                                    | 60s 内刷新页面                                                                          |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| <img alt='' src='https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/expires1.png' /> | <img alt='' src='https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/expires2.png' /> |

在 60 秒内修改返回值 `response.end("console.log('script loaded xxxx')")`，再刷新页面重新请求可以看到浏览器输出的仍然是 `script loaded` 说明浏览器并没有请求新的文件而是读取本地缓存。

:::

::: tab 代码示例

```js
const http = require('http');

http
  .createServer(function (request, response) {
    console.log(request.url);
    if (request.url === '/') {
      //  指定 html 不然不识别为 html；指定编码 utf-8 不然中文乱码
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      response.end(`<h2>强缓存</h2><script src="/script.js"></script>`);
    }

    if (request.url === '/script.js') {
      const now = new Date();
      now.setSeconds(now.getSeconds() + 60); // 获取当前时间的 60 秒后

      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        Expires: now.toGMTString(),
      });
      response.end("console.log('script loaded')");
    }
  })
  .listen(3300);

console.log('http://127.0.0.1:3300');
```

:::

::::

因为 Expires 表示资源的过期绝对时间，**使用 Expires 需要保持服务器和客户端的时间一致**，才可以保证缓存起到正确的作用。不好，所以基本被摒弃了。

### Cache-Control

正由于上面说的可能存在的问题，HTTP1.1 新增了 `Cache-Control` 字段来解决该问题，所以当 Cache-Control 和 expires 都存在时，Cache-Control 优先级更高。

```js
'Cache-Control': 'max-age=2000' // 过期时间 2000s
```

- `public`: 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存
- `private`: 用户的本地浏览器才可以缓存
- `no-store`: 不允许缓存，用于某些变化非常频繁的数据，例如秒杀页面； 浏览器和中间代理服务器都不能缓存资源。
- `no-cache`: 跳过当前的强缓存，发送 HTTP 请求，即直接进入**协商缓存**阶段。
- `must-revalidate`: 如果缓存不过期就可以继续使用，但过期了如果还想用就必须去服务器验证。
- `max-age=[seconds]`: 单位秒，值为多少秒就缓存多久
- `s-maxage=[seconds]`: 覆盖 max-age 或者 Expires 头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它。

## 协商缓存

强缓存失效之后，浏览器在请求头中携带相应的缓存 `tag` 来向服务器发请求，由服务器根据这个 `tag`，来决定是否使用缓存，这就是协商缓存。

### Last-Modified

::::tabs

::: tab Last-Modified/If-Modified-Since

`last-modified` 记录资源最后修改的时间。启用后，请求资源之后的响应头会增加一个 `last-modified` 字段，当再次请求该资源时，请求头中会带有 `if-modified-since` 字段

服务端会对比该字段和资源的最后修改时间，若一致则证明没有被修改，告知浏览器可直接使用缓存并返回 `304`；若不一致则直接返回修改后的资源，并修改 `last-modified` 为新的值。

:::

::: tab 代码示例

```js {20}
const http = require('http');

const now = new Date();

setTimeout(() => {
  now.setSeconds(now.getSeconds() + 1);
  console.log('Last-Modified change:', now.toGMTString());
}, 60000);

http
  .createServer(function (request, response) {
    if (request.url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      response.end(`<h2>协商缓存</h2><script src="/script.js"></script>`);
    }

    if (request.url === '/script.js') {
      const isModifiedSince = request.headers['if-modified-since'];
      const lastModified = now.toGMTString();
      if (isModifiedSince === lastModified) {
        // 如果资源未修改 则返回 304
        response.writeHead(304, {
          'Content-Type': 'text/javascript',
          'Cache-Control': 'no-cache',
          'Last-Modified': lastModified,
        });
        response.end();
      } else {
        response.writeHead(200, {
          'Content-Type': 'text/javascript',
          'Cache-Control': 'no-cache', // no-cache 进行协商缓存
          'Last-Modified': lastModified, // 设置上次修改时间 配合 If-Modified-Since 或者 If-Unmodified-Since 使用
        });
        response.end("console.log('script loadedxx')");
      }
    }
  })
  .listen(3300);

console.log('http://127.0.0.1:3300');
```

:::

::: tab network 面板

刷新主页，60s 内刷新页面，就可以看到:

| pic1                                                                                | pic2                                                                                      |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| <img src='https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/if-modified.jpg' /> | <img src='https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/if-modified-since.jpg' /> |

:::

::::

:::warning 但 last-modified 有以下两个缺点：

1. 只要编辑了，不管内容是否真的有改变，都会以这最后修改的时间作为判断依据，当成新资源返回，从而导致了没必要的请求响应，而这正是缓存本来的作用即避免没必要的请求。
2. 时间的精确度只能到秒，如果在一秒内的修改是检测不到更新的，仍会告知浏览器使用旧的缓存。

:::

### Etag

`ETag` 是服务器根据当前文件的内容，给文件生成的唯一标识，只要里面的内容有改动，这个值就会变。服务器通过响应头把这个值给浏览器。

浏览器接收到 ETag 的值，会在下次请求时，将这个值作为 `If-None-Match` 这个字段的内容，并放到请求头中，然后发给服务器。

服务器接收到 `If-None-Match` 后，会跟服务器上该资源的 ETag 进行比对:

- 如果两者不一样，说明要更新了。返回新的资源，跟常规的 HTTP 请求响应的流程一样。
- 否则返回 304，告诉浏览器直接用缓存。

:::warning 两者对比

**在精准度上，ETag 优于 Last-Modified**。优于 ETag 是按照内容给资源上标识，因此能准确感知资源的变化。而 Last-Modified 就不一样了，它在一些特殊的情况并不能准确感知资源变化，主要有两种情况:

- 编辑了资源文件，但是文件内容并没有更改，这样也会造成缓存失效。
- Last-Modified 能够感知的单位时间是秒，如果文件在 1 秒内改变了多次，那么这时候的 Last-Modified 并没有体现出修改了。

**在性能上，Last-Modified 优于 ETag**，也很简单理解，Last-Modified 仅仅只是记录一个时间点，而 Etag 需要根据文件的具体内容生成哈希值。

:::

## 缓存位置

前面我们已经提到，当强缓存命中或者协商缓存中服务器返回 304 的时候，我们直接从缓存中获取资源。那这些资源究竟缓存在什么位置呢？

浏览器中的缓存位置一共有四种，按优先级从高到低排列分别是

- Service Worker
- Memory Cache
- Disk Cache
- Push Cache

### Service Worker

Service Worker 借鉴了 Web Worker 的 思路，即让 JS 运行在主线程之外，由于它脱离了浏览器的窗体，因此无法直接访问 DOM。虽然如此，但它仍然能帮助我们完成很多有用的功能，比如离线缓存、消息推送和网络代理等功能。其中的离线缓存就是 `Service Worker Cache`。

Service Worker 同时也是 PWA 的重要实现机制...

### Memory Cache 和 Disk Cache

Memory Cache 指的是内存缓存，从效率上讲它是最快的。但是从存活时间来讲又是最短的，当渲染进程结束后，内存缓存也就不存在了。

Disk Cache 就是存储在磁盘中的缓存，从存取效率上讲是比内存缓存慢的，但是他的优势在于存储容量和存储时长。稍微有些计算机基础的应该很好理解，就不展开了。

好，现在问题来了，既然两者各有优劣，那浏览器如何决定将资源放进内存还是硬盘呢？主要策略如下：

- 比较大的 JS、CSS 文件会直接被丢进磁盘，反之丢进内存
- 内存使用率比较高的时候，文件优先进入磁盘

### Push Cache

即推送缓存，这是浏览器缓存的最后一道防线。它是 HTTP/2 中的内容，虽然现在应用的并不广泛，但随着 HTTP/2 的推广，它的应用越来越广泛。关于 Push Cache，有非常多的内容可以挖掘，不过这已经不是本文的重点，大家可以参考这篇[扩展文章](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)。
