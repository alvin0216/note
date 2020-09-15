---
title: performance 分析页面加载过程
date: 2020-07-02 15:23:35
---

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/performance/preview.png)

## Main 指标

本文结合 Performance Main 指标来分析页面的加载过程。我们先来分析一个简单的页面，代码如下所示：

```html
<html>
  <head>
    <title>Main</title>
    <style>
      area {
        border: 2px ridge;
      }

      box {
        background-color: rgba(106, 24, 238, 0.26);
        height: 5em;
        margin: 1em;
        width: 5em;
      }
    </style>
  </head>

  <body>
    <div class="area">
      <div class="box rAF"></div>
    </div>
    <br />
    <script>
      function setNewArea() {
        let el = document.createElement('div')
        el.setAttribute('class', 'area')
        el.innerHTML = '<div class="box rAF"></div>'
        document.body.append(el)
      }
      setNewArea()
    </script>
  </body>
</html>
```

观察这段代码，我们可以看出，它只是包含了一段 CSS 样式和一段 JavaScript 内嵌代码，其中在 JavaScript 中还执行了 DOM 操作了，我们就结合这段代码来分析页面的加载流程。

首先生成报告页，再观察报告页中的 Main 指标

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/performance/main.png)

通过上面的图形我们可以看出，加载过程主要分为三个阶段，它们分别是：

1. **导航阶段**，该阶段主要是从网络进程接收 HTML 响应头和 HTML 响应体。

2. **解析 HTML 数据阶段**，该阶段主要是将接收到的 HTML 数据转换为 DOM 和 CSSOM。

3. **生成可显示的位图阶段**，该阶段主要是利用 DOM 和 CSSOM，经过计算布局、生成层树 (LayerTree)、生成绘制列表 (Paint)、完成合成等操作，生成最终的图片。

那么接下来，我就按照这三个步骤来介绍如何解读 Main 指标上的数据。

## 导航阶段

我们先来看**导航阶段**，不过在分析这个阶段之前，我们简要地回顾下**导航流程**，大致的流程是这样的：

当你点击了 `Performance` 上的重新录制按钮之后，浏览器进程会通知网络进程去请求对应的 URL 资源；一旦网络进程从服务器接收到 URL 的响应头，便立即判断该响应头中的 `content-type` 字段是否属于 `text/html` 类型；如果是，那么浏览器进程会让当前的页面执行退出前的清理操作，比如执行 `JavaScript` 中的 `beforunload` 事件，清理操作执行结束之后就准备显示新页面了，这包括了解析、布局、合成、显示等一系列操作。

因此，在导航阶段，这些任务实际上是在老页面的渲染主线程上执行的。

回顾了导航流程之后，我们接着来分析第一个阶段的任务图形，最终效果如下图所示：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/performance/receive-html.png)

- 该任务的第一个子过程就是 Send request，该过程表示网络请求已被发送。然后该任务进入了等待状态。
- 接着由网络进程负责下载资源，当接收到响应头的时候，该任务便执行 Receive Respone 过程，该过程表示接收到 HTTP 的响应头了。
- 接着执行 DOM 事件：pagehide、visibilitychange 和 unload 等事件，如果你注册了这些事件的回调函数，那么这些回调函数会依次在该任务中被调用。
- 这些事件被处理完成之后，那么接下来就接收 HTML 数据了，这体现在了 Recive Data 过程，Recive Data 过程表示请求的数据已被接收，如果 HTML 数据过多，会存在多个 Receive Data 过程。

等到所有的数据都接收完成之后，渲染进程会触发另外一个任务，该任务主要执行 Finish load 过程，该过程表示网络请求已经完成。

## 解析 HTML 数据阶段 ✨

导航阶段结束之后，就进入到了**解析 HTML 数据阶段**了，这个阶段的主要任务就是通过解析 HTML 数据、解析 CSS 数据、执行 JavaScript 来生成 DOM 和 CSSOM。

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/performance/parse-html.png)

- 在 ParserHTML 的过程中，如果解析到了 script 标签，那么便进入了脚本执行过程，也就是图中的 Evalute Script。

- 我们知道，要执行一段脚本我们需要首先编译该脚本，于是在 Evalute Script 过程中，先进入了脚本编译过程，也就是图中的 Complie Script。脚本编译好之后，就进入程序执行过程，执行全局代码时，V8 会先构造一个 anonymous 过程，在执行 anonymous 过程中，会调用 setNewArea 过程，setNewArea 过程中又调用了 createElement，由于之后调用了 document.append 方法，该方法会触发 DOM 内容的修改，所以又强制执行了 ParserHTML 过程生成的新的 DOM。

- DOM 生成完成之后，会触发相关的 DOM 事件，比如典型的 DOMContentLoaded，还有 readyStateChanged。

DOM 生成之后，ParserHTML 过程继续计算样式表，也就是 Reculate Style，这就是生成 CSSOM 的过程

请参考

- [渲染进程上：HTML、CSS、JS 怎么变成页面](./../../browser/macro/rendering1.md)
- [渲染进程下：HTML、CSS、JS 怎么变成页面](./../../browser/macro/rendering2.md)

## 生成可显示位图阶段

生成了 DOM 和 CSSOM 之后，就进入了第三个阶段：生成页面上的位图。通常这需要经历 <span class='orange'>布局 (Layout)、分层、绘制、合成</span> 等一系列操作，如下图所示：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/performance/paint.png)

结合上图，我们可以发现，在生成完了 DOM 和 CSSOM 之后，渲染主线程首先执行了一些 DOM 事件，诸如 readyStateChange、load、pageshow。具体地讲，如果你使用 JavaScript 监听了这些事件，那么这些监听的函数会被渲染主线程依次调用。

接下来就正式进入显示流程了，大致过程如下所示。

1. 首先执行布局，这个过程对应图中的 `Layout`。

2. 然后更新层树 (LayerTree)，这个过程对应图中的 `Update LayerTree`。

3. 有了层树之后，就需要为层树中的每一层准备绘制列表了，这个过程就称为 `Paint`。

4. 准备每层的绘制列表之后，就需要利用绘制列表来生成相应图层的位图了，这个过程对应图中的 `Composite Layers`。

走到了 Composite Layers 这步，主线程的任务就完成了，接下来主线程会将合成的任务完全教给合成线程来执行，下面是具体的过程，你也可以对照着 Composite、Raster 和 GPU 这三个指标来分析，参考下图：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/performance/composite.png)

结合渲染流水线和上图，我们再来梳理下最终图像是怎么显示出来的。

1. 首先主线程执行到 Composite Layers 过程之后，便会将绘制列表等信息提交给合成线程，合成线程的执行记录你可以通过 `Compositor 指标`来查看。

2. 合成线程维护了一个 `Raster` 线程池，线程池中的每个线程称为 `Rasterize`，用来执行光栅化操作，对应的任务就是 `Rasterize Paint`。

3. 当然光栅化操作并不是在 `Rasterize` 线程中直接执行的，而是在 GPU 进程中执行的，因此 Rasterize 线程需要和 GPU 线程保持通信。

4. 然后 GPU 生成图像，最终这些图层会被提交给浏览器进程，浏览器进程将其合成并最终显示在页面上。

## 总结

在导航流程中，主要是处理响应头的数据，并执行一些老页面退出之前的清理操作。

在解析 HTML 数据阶段，主要是解析 HTML 数据、解析 CSS 数据、执行 JavaScript 来生成 DOM 和 CSSOM。

最后在生成最终显示位图的阶段，主要是将生成的 DOM 和 CSSOM 合并，这包括了布局 (Layout)、分层、绘制、合成等一系列操作。

## 相关链接

- [全新 Chrome Devtool Performance 使用指南](https://zhuanlan.zhihu.com/p/29879682)
- [狙杀页面卡顿 —— Performance 指北](https://juejin.im/post/5b65105f5188251b134e9778)
- [chrome devtools 使用详解——Performance](https://juejin.im/post/5c009115f265da612859d8e2)
- [使用 Performance 对页面进行分析优化(实战篇)](https://segmentfault.com/a/1190000016627791)
- [借助 performance 工具直观理解浏览器的渲染过程](https://juejin.im/post/5d0738465188256aa76bc8e7)
- [页面性能工具：如何使用 Performance？](https://time.geekbang.org/column/article/177070?code=NiCoaK-xsW6tErzSr6ZGB3jwgne3Pqg7v1UPGf9ApOI)
