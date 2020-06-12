---
title: 导航流程：从输入URL到页面展示，这中间发生了什么？
date: 2020-06-12 09:15:50
---

“从输入 URL 到页面展示完整流程示意图”：

![](../../../assets/browser/url-to-display.png)

从图中可以看出，**整个过程需要各个进程之间的配合**，所以在开始正式流程之前，我们还是先来快速回顾下浏览器进程、渲染进程和网络进程的主要职责。

- 浏览器进程主要负责用户交互、子进程管理和文件储存等功能。
- 网络进程是面向渲染进程和浏览器进程等提供网络下载功能。
- 渲染进程的主要职责是把从网络下载的 HTML、JavaScript、CSS、图片等资源解析为可以显示和交互的页面。因为渲染进程所有的内容都是通过网络获取的，会存在一些恶意代码利用浏览器漏洞对系统进行攻击，所以运行在渲染进程里面的代码是不被信任的。这也是为什么 Chrome 会让渲染进程运行在安全沙箱里，就是为了保证系统的安全。

回顾了浏览器的进程架构后，我们再结合上图来看下这个完整的流程，可以看出，整个流程包含了许多步骤，我把其中几个核心的节点用蓝色背景标记出来了。这个过程可以大致描述为如下。

<blockquote class='box'>

- 首先，浏览器进程接收到用户输入的 URL 请求，浏览器进程便将该 URL 转发给网络进程。
- 然后，在网络进程中发起真正的 URL 请求。
- 接着网络进程接收到了响应头数据，便解析响应头数据，并将数据转发给浏览器进程。
- 浏览器进程接收到网络进程的响应头数据之后，发送“提交导航 (CommitNavigation)”消息到渲染进程；
- 渲染进程接收到“提交导航”的消息之后，便开始准备接收 HTML 数据，接收数据的方式是直接和网络进程建立数据管道；
- 最后渲染进程会向浏览器进程“确认提交”，这是告诉浏览器进程：“已经准备好接受和解析页面数据了”。
- 浏览器进程接收到渲染进程“提交文档”的消息之后，便开始移除之前旧的文档，然后更新浏览器进程中的页面状态。

</blockquote>

这其中，**用户发出 URL 请求到页面开始解析的这个过程，就叫做导航**。

## 从输入 URL 到页面展示

### 检查用户输入

<blockquote class='box'>

当用户在地址栏中输入一个查询关键字时，地址栏会判断输入的关键字是**搜索内容**，还是请求的 **URL**。

- 如果是搜索内容，地址栏会使用浏览器默认的搜索引擎，来合成新的带搜索关键字的 URL。
- 如果判断输入内容符合 URL 规则，比如输入的是 time.geekbang.org，那么地址栏会根据规则，把这段内容加上协议，合成为完整的 URL，如 https://time.geekbang.org。

</blockquote>

当用户输入关键字并键入回车之后，这意味着当前页面即将要被替换成新的页面，不过在这个流程继续之前，浏览器还给了当前页面一次执行 beforeunload 事件的机会，beforeunload 事件允许页面在退出之前执行一些数据清理操作，还可以询问用户是否要离开当前页面，比如当前页面可能有未提交完成的表单等情况，因此用户可以通过 beforeunload 事件来取消导航，让浏览器不再执行任何后续工作。

当前页面没有监听 beforeunload 事件或者同意了继续后续流程，那么浏览器便进入下图的状态：

<div style="text-align: center;">
  <img src='https://static001.geekbang.org/resource/image/fa/30/fad33fc7c5f2bdf4e20cac7691484130.png' style="height: 300px;" />
  <div>开始加载 URL 浏览器状态</div>
</div>

从图中可以看出，当浏览器刚开始加载一个地址之后，标签页上的图标便进入了加载状态。但此时图中页面显示的依然是之前打开的页面内容，并没立即替换为极客时间的页面。因为需要**等待提交文档阶段**，页面内容才会被替换。

### URL 请求过程

接下来，便进入了页面资源请求过程。这时，浏览器进程会通过进程间通信（`IPC`）把 URL 请求发送至网络进程，网络进程接收到 URL 请求后，会在这里发起真正的 URL 请求流程。那具体流程是怎样的呢？

<blockquote class='box'>

1. **查找缓存**：pragma、Cache-Control、Expires 先查看强缓存是否命中，如果在缓存中没有查找到资源，那么直接进入网络请求流程。

2. **DNS 域名解析**：请求前的第一步是要进行 DNS 解析，以获取请求域名的服务器 IP 地址
   <br />按顺序查找 浏览器 DNS 缓存 -> 操作系统 DNS 缓存 -> 本地 hosts 域名记录 -> 非权威域名服务器 -> 根域名服务器-顶级域名服务器-二级域名服务器-权威域名服务器

3. **利用 IP 和服务器建立连接 TCP 连接**：
   <br />请求协议是 HTTP/1.1： 则经过 [TCP 三次握手](../../http/tcp-connection.md#三次握手)就可以建立连接了。
   <br />请求协议是 HTTPS：还需要经过 [TSL 握手](../../http/tsl.md#ecdhe-握手过程) 建立安全连接
   <br />请求协议是 HTTP/2：TSL 握手后客户端必须要发送一个“连接前言”用来确认建立 HTTP/2 连接。

4. **发送 HTTP 请求**：
   <br /> 建立好连接后，浏览器端会构建请求行、请求头等信息，并把和该域名相关的 Cookie 等数据附加到请求头中，然后向服务器发送构建的请求信息。

5. **响应连接**：服务器接收到请求信息后，会根据请求信息生成响应数据。

   - 返回状态码 `301`、`302`、`303`、`307`等：那么说明服务器需要浏览器重定向到其他 URL。这时网络进程会从响应头的 `Location` 字段里面读取重定向的地址，然后再发起新的 HTTP 或者 HTTPS 请求。
   - 返回状态码 `304 No Modified`：服务器根据请求报文的 `If-No-Match`、`If-Modified-Since` 分别和响应报文的 `Etag`，`If-Modified` 核实文件是否发生了修改。`304` 表示协商缓存，通知客户端缓存本地文件。
   - 返回状态码 `200`：这是告诉浏览器一切正常，可以继续往下处理该请求了。

6. **响应数据类型处理**：浏览器会根据 `Content-Type` 的值来决定如何显示响应体的内容。
   - `text/html`: 这就是告诉浏览器，服务器返回的数据是 HTML 格式。
   - `application/octet-stream`：下载类型，那么该请求会被提交给浏览器的下载管理器，同时该 URL 请求的导航流程就此结束。
   - 如果是 HTML，那么浏览器则会继续进行导航流程。由于 Chrome 的页面渲染是运行在渲染进程中的，所以接下来就需要准备渲染进程了。上面列举了两种类型，除此外还有...

</blockquote>

## 准备渲染进程

默认情况下，Chrome 会为每个页面分配一个渲染进程，也就是说，每打开一个新页面就会配套创建一个新的渲染进程。但是，也有一些例外，在某些情况下，浏览器会让多个页面直接运行在同一个渲染进程中。

比如我从极客时间的首页里面打开了另外一个页面——算法训练营，我们看下图的 Chrome 的任务管理器截图：

<img src='https://static001.geekbang.org/resource/image/d8/28/d8fe2afbd8ea2d4a8d8cc4bb14c50f28.png' style="height: 300px;" />

从图中可以看出，打开的这三个页面都是运行在同一个渲染进程中，进程 ID 是 23601。

<blockquote class='box'>

**什么情况下多个页面会同时运行在一个渲染进程中呢？**

要解决这个问题，我们就需要先了解下什么是同一站点（same-site）。具体地讲，我们将“**同一站点**”定义为**根域名**（例如，geekbang.org）加上**协议**（例如，https:// 或者 http://），还包含了该根域名下的所有子域名和不同的端口，比如下面这三个：

```js
https://time.geekbang.org
https://www.geekbang.org
https://www.geekbang.org:8080
```

它们都是属于**同一站点**，协议 HTTPS + 根域名 geekbang.org 一样

Chrome 的默认策略是，每个标签对应一个渲染进程。但 <span class='orange'>如果从一个页面打开了另一个新页面，而新页面和当前页面属于同一站点的话，那么新页面会复用父页面的渲染进程</span>。官方把这个默认策略叫 `process-per-site-instance`。

</blockquote>

<blockquote class='box'>

总结来说，打开一个新页面采用的**渲染进程策略**就是：

- 通常情况下，打开新的页面都会使用单独的渲染进程；
- 如果从 A 页面打开 B 页面，且 A 和 B 都属于**同一站点**的话，那么 B 页面复用 A 页面的渲染进程；如果是其他情况，浏览器进程则会为 B 创建一个新的渲染进程。

</blockquote>

渲染进程准备好之后，还不能立即进入文档解析状态，因为此时的文档数据还在网络进程中，并没有提交给渲染进程，所以下一步就进入了提交文档阶段。

## 提交文档

所谓提交文档，就是指浏览器进程将网络进程接收到的 HTML 数据提交给渲染进程，具体流程是这样的：

- 首先当浏览器进程接收到网络进程的响应头数据之后，便向渲染进程发起“提交文档”的消息；
- 渲染进程接收到“提交文档”的消息后，会和网络进程建立传输数据的“管道”；
- 等文档数据传输完成之后，渲染进程会返回“确认提交”的消息给浏览器进程；
- 浏览器进程在收到“确认提交”的消息后，会更新浏览器界面状态，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新 Web 页面。

其中，当浏览器进程**确认提交**之后，更新内容如下图所示：

![](https://static001.geekbang.org/resource/image/d3/b8/d3c5a6188b09b5b57af439005ae7dfb8.png)

这也就解释了为什么在浏览器的地址栏里面输入了一个地址后，之前的页面没有立马消失，而是要加载一会儿才会更新页面。

到这里，一个完整的导航流程就“走”完了，这之后就要进入渲染阶段了。

## 渲染阶段

一旦文档被提交，渲染进程便开始页面解析和子资源加载了，关于这个阶段的完整过程，我会在下一篇文章中来专门介绍。这里你只需要先了解一旦页面生成完成，渲染进程会发送一个消息给浏览器进程，浏览器接收到消息后，会停止标签图标上的加载动画。如下所示：

![](https://static001.geekbang.org/resource/image/be/58/bef45eb5b01c34e328486004feedd658.png)

至此，一个完整的页面就生成了。那文章开头的“从输入 URL 到页面展示，这中间发生了什么？”这个过程及其“串联”的问题也就解决了。