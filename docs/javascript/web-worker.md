---
title: Web Worker
date: 2020-04-16 21:34:25
---

## 概述

`JavaScript` 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

`Web Worker` 的作用，就是为 `JavaScript` 创造多线程环境，允许主线程创建 `Worker` 线程，将一些任务分配给后者运行。在主线程运行的同时，`Worker` 线程在后台运行，两者互不干扰。等到 `Worker` 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 `Worker` 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

`Worker` 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 `Worker` 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

`Web Worker` 有以下几个使用注意点。

|   注意点   |                                                                                               简述                                                                                               |
| :--------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  同源限制  |                                                                 分配给 `Worker` 线程运行的脚本文件，必须与主线程的脚本文件同源。                                                                 |
| `DOM` 限制 | `Worker` 线程所在的全局对象，与主线程不一样，无法读 取主线程所在网页的 `DOM` 对象，也无法使用 `document`、`window`、`parent`这些对象。但是，`Worker` 线程可以`navigator`对象和 `location` 对象。 |
|  通信联系  |                                                         `Worker` 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。                                                          |
|  脚本限制  |                                            `Worker` 线程不能执行 `alert()`方法和 c`onfirm()` 方法，但可以使用 `XMLHttpRequest` 对象发出 `AJAX` 请求。                                            |
|  文件限制  |                                               `Worker` 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。                                               |

## 基本用法

🔍

:::details 预览

| <Badge text="主线程" /> API       | 简述                                                                 |
| --------------------------------- | -------------------------------------------------------------------- |
| const worker = new Worker(xxx.js) | 新建一个 `Worker` 线程。                                             |
| worker.postMessage()              | 就是主线程传给 `Worker` 的数据。它可以是各种数据类型，包括二进制数据 |
| worker.onmessage                  | 监听函数，接收子线程发回来的消息                                     |
| worker.onerror                    | 主线程可以监听 `Worker` 是否发生错误                                 |
| worker.terminate()                | 主进程关闭 `worker`                                                  |

| <Badge text="Worker 线程" type="warning"/> API   | 简述                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| self.addEventListener('message', function (e) {} | 监听主线程 `postMessage` 事件                                      |
| self.postMessage()                               | 就是`Worker`传给主线程的数据。它可以是各种数据类型，包括二进制数据 |
| self.close()                                     | `Worker` 内部关闭自身                                              |
| self.importScripts(xx.js, xx.js)                 | 加载其他脚本                                                       |

:::

### 主线程

主线程采用 `new` 命令，调用 `Worker()` 构造函数，新建一个 `Worker` 线程。

```js
const worker = new Worker('work.js')
```

`Worker()` 构造函数的参数是一个脚本文件，该文件就是 `Worker` 线程所要执行的任务。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如 404 错误），`Worker` 就会默默地失败。

然后，主线程调用 `worker.postMessage()` 方法，向 `Worker` 发消息。

```js
worker.postMessage('Hello World')
```

`worker.postMessage()`方法的参数，就是主线程传给 `Worker` 的数据。它可以是各种数据类型，包括二进制数据。

接着，主线程通过 `worker.onmessage` 指定监听函数，接收子线程发回来的消息。

```js
worker.onmessage = function(event) {
  console.log('index.html listening: ', event.data)
}
```

上面代码中，事件对象的 `data` 属性可以获取 `Worker` 发来的数据。

`Worker` 完成任务以后，主线程就可以把它关掉。

```js
worker.terminate()
```

### Worker 线程

`Worker` 线程内部需要有一个监听函数，监听 `message` 事件。

```js
self.addEventListener(
  'message',
  function(e) {
    self.postMessage('You said: ' + e.data)
  },
  false
)
```

上面代码中，`self` 代表子线程自身，即子线程的全局对象。因此，等同于下面两种写法。

```js
// 写法一
this.addEventListener(
  'message',
  function(e) {
    this.postMessage('You said: ' + e.data)
  },
  false
)

// 写法二
addEventListener(
  'message',
  function(e) {
    postMessage('You said: ' + e.data)
  },
  false
)
```

除了使用 `self.addEventListener()` 指定监听函数，也可以使用 `self.onmessage` 指定。监听函数的参数是一个事件对象，它的 `data` 属性包含主线程发来的数据。`self.postMessage()` 方法用来向主线程发送消息。

### Worker 加载脚本

Worker 内部如果要加载其他脚本，有一个专门的方法 `importScripts()`。

```js
importScripts('script1.js')
```

该方法可以同时加载多个脚本。

```js
importScripts('script1.js', 'script2.js')
```

### 错误处理

主线程可以监听 `Worker` 是否发生错误。如果发生错误，`Worker` 会触发主线程的 `error` 事件

```jsx
worker.onerror(function(event) {
  console.log(['ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message].join(''))
})

// 或者
worker.addEventListener('error', function(event) {
  // ...
})
```

`Worker` 内部也可以监听 `error` 事件。

### 关闭 Worker

使用完毕，为了节省系统资源，必须关闭 `Worker`。

```js
// 主线程
worker.terminate()

// Worker 线程
self.close()
```

## 数据通信

前面说过，主线程与 `Worker` 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，`Worker` 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 `Worker`，后者再将它还原。

主线程与 `Worker` 之间也可以交换二进制数据，比如 `File`、`Blob`、`ArrayBuffer` 等类型，也可以在线程之间发送。下面是一个例子。

## 文末

转自 [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
