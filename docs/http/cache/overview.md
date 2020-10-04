---
title: 浏览器缓存
---

实际上，HTTP 传输的每一个环节基本上都会有缓存，非常复杂。

HTTP Cache 是我们开发中接触最多的缓存，它分为强缓存和协商缓存。

- 强缓存：直接从本地副本比对读取，不去请求服务器，返回的状态码是 `200`。
- 协商缓存：会去服务器比对，若没改变才直接读取本地缓存，返回的状态码是 `304`。

缓存优先级

`Pragma` > `Cache-Control` > `Expires` > `ETag` > `Last-Modified`

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/series/cache/cache-progress.png)

## 强缓存

### Expires(HTTP/1.0)

当我们请求一个资源，服务器返回时，可以在 `Response Headers` 中增加 `expires` 字段表示资源的过期时间。是一个绝对时间。

我们用 `Expires` 做一个 demo:

```js
const http = require('http')

http
  .createServer(function (request, response) {
    console.log(request.url)
    if (request.url === '/') {
      //  指定 html 不然不识别为 html；指定编码 utf-8 不然中文乱码
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
      response.end(`<h2>强缓存</h2><script src="/script.js"></script>`)
    }

    if (request.url === '/script.js') {
      const now = new Date()
      now.setSeconds(now.getSeconds() + 60) // 获取当前时间的 60 秒后

      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        Expires: now.toGMTString()
      })
      response.end("console.log('script loaded')")
    }
  })
  .listen(3300)

console.log('http://127.0.0.1:3300')
```

这里定义了访问主页返回 html，html 中请求了 script.js 文件，这个 script.js 就是我们用来验证缓存的请求文件。这里我设置了访问时间的 60 秒后缓存失效。

node 跑这个文件，打开页面，60 秒内刷新一次。则得到如下结果（查看 `network` 面板找到请求 `script.js` 的一行）

| 响应                                                                                                                 | 60s 内刷新页面                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| <img className='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/http/series/cache/expires1.png' /> | <img className='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/http/series/cache/expires2.png' /> |

在 60 秒内修改返回值 `response.end("console.log('script loaded xxxx')")`，再刷新页面重新请求可以看到浏览器输出的仍然是 `script loaded` 说明浏览器并没有请求新的文件而是读取本地缓存。

:::danger

因为 Expires 表示资源的过期绝对时间，使用 Expires 需要保持服务器和客户端的时间一致，才可以保证缓存起到正确的作用。

:::

### Cache-Control(HTTP/1.1)

正由于上面说的可能存在的问题，HTTP1.1 新增了 `Cache-Control` 字段来解决该问题，所以当 Cache-Control 和 expires 都存在时，Cache-Control 优先级更高。

- `public`: 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存
- `private`: 用户的本地浏览器才可以缓存
- `no-store`: 不允许缓存，用于某些变化非常频繁的数据，例如秒杀页面； 浏览器和中间代理服务器都不能缓存资源。
- `no-cache`: 它的字面含义容易与 no-store 搞混，实际的意思并不是不允许缓存，而是`可以缓存`，但在使用之前必须要去服务器验证是否过期，是否有最新的版本；
- `must-revalidate`: 又是一个和 no-cache 相似的词，它的意思是如果缓存不过期就可以继续使用，但过期了如果还想用就必须去服务器验证。
- `max-age=[seconds]`: 单位秒，值为多少秒就缓存多久
- `s-maxage=[seconds]`: 覆盖 max-age 或者 Expires 头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它。

```js title="示例"
 'Cache-Control': 'max-age=2000' // 过期时间 2000s
```

:::note

1️⃣ **`max-age` 和 `s-maxage`**

两者是 cache-control 的主要字段，它们是一个数字，表示资源过了多少秒之后变为无效。在浏览器中，max-age 和 s-maxage 都起作用，<span class='orange'>而且 s-maxage 的优先级高于 max-age。在代理服务器中，只有 s-maxage 起作用</span>。 可以通过设置 max-age 为 0 表示立马过期来向服务器请求资源。

2️⃣ **`public` 和 `private`**

`public` 表示该资源可以被所有客户端和代理服务器缓存，而 `private` 表示该资源仅能客户端缓存。默认值是 private，当设置了 `s-maxage` 的时候表示允许代理服务器缓存，相当于 public。

3️⃣ **`no-cache` 和 `no-store`**

`no-cache` 表示的是不直接询问浏览器缓存情况，而是去向服务器验证当前资源是否更新（即协商缓存）。`no-store` 更是表示不缓存任何内容。由于两者都不考虑缓存情况而是直接与服务器交互，所以当 `no-cache` 和 `no-store` 存在时会直接忽略 `max-age` 等。

:::

### pragma

讲到了 `no-cache` 和 `no-store` 这里顺便提一下，他的值有 no-cache 和 no-store，表示意思同 cache-control，优先级高于 cache-control 和 expires，即三者同时出现时：

优先级 `pragma` -> `cache-control` -> `expires`。

```js
pragma: 'no-cache'
```

## 协商缓存

上面的 `expires` 和 `cache-control` 都会**访问本地缓存直接验证看是否过期**，如果没过期直接使用本地缓存，并返回 200。但如果设置了 no-cache 和 no-store 则本地缓存会被忽略，会去**请求服务器验证资源是否更新**，如果没更新才继续使用本地缓存，此时返回的是 `304`，这就是协商缓存。协商缓存主要包括 `last-modified` 和 `etag`。

### Last-Modified/If-Modified-Since

`last-modified` 记录资源最后修改的时间。启用后，请求资源之后的响应头会增加一个 `last-modified` 字段，当再次请求该资源时，请求头中会带有 `if-modified-since` 字段

服务端会对比该字段和资源的最后修改时间，若一致则证明没有被修改，告知浏览器可直接使用缓存并返回 `304`；若不一致则直接返回修改后的资源，并修改 `last-modified` 为新的值。

代码示例如下：

```js {20}
const http = require('http')

const now = new Date()

setTimeout(() => {
  now.setSeconds(now.getSeconds() + 1)
  console.log('Last-Modified change:', now.toGMTString())
}, 60000)

http
  .createServer(function (request, response) {
    if (request.url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
      response.end(`<h2>协商缓存</h2><script src="/script.js"></script>`)
    }

    if (request.url === '/script.js') {
      const isModifiedSince = request.headers['if-modified-since']
      const lastModified = now.toGMTString()
      if (isModifiedSince === lastModified) {
        // 如果资源未修改 则返回 304
        response.writeHead(304, {
          'Content-Type': 'text/javascript',
          'Cache-Control': 'no-cache',
          'Last-Modified': lastModified
        })
        response.end()
      } else {
        response.writeHead(200, {
          'Content-Type': 'text/javascript',
          'Cache-Control': 'no-cache', // no-cache 进行协商缓存
          'Last-Modified': lastModified // 设置上次修改时间 配合 If-Modified-Since 或者 If-Unmodified-Since 使用
        })
        response.end("console.log('script loadedxx')")
      }
    }
  })
  .listen(3300)

console.log('http://127.0.0.1:3300')
```

刷新主页，60s 内刷新页面，就可以看到:

| pic1                                                                                                                    | pic2                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img className='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/http/series/cache/if-modified.jpg' /> | <img className='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/http/series/cache/if-modified-since.jpg' /> |

:::warning 但 last-modified 有以下两个缺点：

1. 只要编辑了，不管内容是否真的有改变，都会以这最后修改的时间作为判断依据，当成新资源返回，从而导致了没必要的请求响应，而这正是缓存本来的作用即避免没必要的请求。
2. 时间的精确度只能到秒，如果在一秒内的修改是检测不到更新的，仍会告知浏览器使用旧的缓存。

:::

### Etag/If-No-Match

`ETagHTTP` 响应头是资源的特定版本的标识符。`Etag` 会基于资源的内容编码生成一串唯一的标识字符串，只要内容不同，就会生成不同的 `Etag`。示例如下：

```js
Etag: 'FllOiaIvA1f-ftHGziLgMIMVkVw_'
```

当再次请求该资源时，请求头会带有 `if-no-match` 字段，值是之前返回的 `Etag` 值，服务端会根据该资源当前的内容生成对应的标识字符串和该字段进行对比，若一致则代表未改变可直接使用本地缓存并返回 304；若不一致则返回新的资源（状态码 `200`）并修改返回的 `Etag` 字段为新的值。

可以看出 `Etag` 比 last-modified 更加精准地感知了变化，所以 `Etag` 优先级也更高。不过从上面也可以看出 `Etag` 存在的问题，就是每次生成标识字符串会增加服务器的开销。所以要如何使用 `last-modified` 和 `Etag` 还需要根据具体需求进行权衡。

## Etag 为何取代 last-Modified

Etag 比 lastModified 更加严谨，如果资源发生变化，Etag 就会发生变化，就会把最新的资源给客户端返回去，而 lastModified 不识别 s（秒）单位里的修改，所以如果资源在 s（秒）单位里发生了修改，那 lastModified 也不会发生改变，这样如果只用了 lastModified，`客户端得到的资源就不是最新的`；但是设定了 Etag 之后，每次客户端发出请求，服务端都会根据资源重新生成一个 Etag，对性能有影响
