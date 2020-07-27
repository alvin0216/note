---
title: axios 取消请求
date: 2020-07-27 14:05:22
---

## axios 取消请求

[API 文档地址](https://github.com/axios/axios)：搜索 `cancelToken`

```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.20.0-0/axios.min.js"></script>
<script>
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  // GET 请求的取消
  axios.get('/user/12345', { cancelToken: source.token }).catch(function(thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message) // Request canceled Operation canceled by the user.
    } else {
      // handle error
    }
  })

  // POST 请求的取消
  axios.post('/user/12345', { name: 'new name' }, { cancelToken: source.token }).catch(error => {
    console.log('error:', error.message) // error: Operation canceled by the user.
  })

  // cancel the request (the message parameter is optional)
  source.cancel('Operation canceled by the user.')
</script>
```

You can also create a cancel token by passing an executor function to the `CancelToken` constructor：

也即 通过将执行程序函数传递给 `CancelToken` 构造函数来创建取消令牌：

```js
const CancelToken = axios.CancelToken
let cancel

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c
  })
})

// cancel the request
cancel()
```

## xhr 是如何取消请求的

使用的就是 `xhr.abort`

```html {16}
<button id="request">xhr</button>
<button id="abort">xhr.abort</button>
<script>
  const xhr = new XMLHttpRequest()

  const $request = document.getElementById('request')
  const $abort = document.getElementById('abort')

  $request.addEventListener('click', () => {
    xhr.open('GET', 'https://cdn.mdeer.com/data/yqstaticdata.js')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send()
  })

  $abort.addEventListener('click', () => {
    xhr.abort()
  })
</script>
```

我们知道 `Promise` 的话一旦被执行，就无法被中断的，而 `axios` 是如何做到取消请求的呢。

## axios 如何实现取消请求的

关键点在于如何获取 `Promise` 的控制权。

```js
let resolveHandle
new Promise((resolve, reject) => {
  resolveHandle = resolve
}).then(data => {
  console.log('resolve', data)
})

resolveHandle('通过外部控制 promise 的执行')
```

我们用 `resolveHandle` 获取了一个 `promise` 的 `resolve` 方法的控制权，这样，我们就可以在外部控制这个 `promise` 的成功了。要知道 `new Promise` 返回的对象是无法从外部决定它成功还是失败的。

再来看看 [CancelToken](https://github.com/axios/axios/blob/master/lib/cancel/CancelToken.js) 源码：

```js
var Cancel = require('./Cancel')

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 */
function CancelToken(executor) {
  var resolvePromise
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve
  })

  var token = this
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return
    }

    token.reason = new Cancel(message)
    resolvePromise(token.reason)
  })
}

CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason
  }
}

CancelToken.source = function source() {
  var cancel
  var token = new CancelToken(function executor(c) {
    cancel = c
  })
  return {
    token: token,
    cancel: cancel
  }
}

module.exports = CancelToken
```

比较一下， `source.cancel` 是不是就和 `resolveHandle` 很像呢

```js
+-------------------------------------------+       +-----------------------------------+
| CancelToken.source = function source() {  |       |                                   |
|   var cancel                              |       | let resolveHandle                 |
|   var token = new CancelToken(            |       | new Promise((resolve, reject) => {|
|     function executor(c) {                |       |   resolveHandle = resolve         |
|     cancel = c                            |   VS  | }).then(data => {                 |
|   })                                      |       |   console.log('resolve', data)    |
|   return {                                |       | })                                |
|     token: token,                         |       |                                   |
|     cancel: cancel                        |       | resolveHandle('ok')               |
|   }                                       |       |                                   |
+-------------------------------------------+       +-----------------------------------+
```

也就是说 `cancel` 代表的是上面的这个方法，有了这个方法，就可以在外部控制 `CancelToken` 内部的 `promise` 对象了。

在 source 方法中，除了 cancel，还有一个 token，这个 token 是 CancelToken 类的一个实例，<span class='pink'>可以访问到内部的 promise</span>。

因此 CancelToken 类如此封装的主要目的就是为了能够分离 promise 和 resolve 方法，让用户可以自己调用 resolve 方法。一旦 resolve 后，就会触发 promise 的 then 方法，现在看看内部 promise 后的 then 方法是什么：

[axios xhr.js 的处理](https://github.com/axios/axios/blob/ffea03453f77a8176c51554d5f6c3c6829294649/lib/adapters/xhr.js#L165)

```js
if (config.cancelToken) {
  // Handle cancellation
  config.cancelToken.promise.then(function onCanceled(cancel) {
    if (req.aborted) return

    req.abort()
    reject(cancel)
  })
}
```

上面是 `xhr.js` 的关于 `cancelToken` 部分相关代码，可以看到，当用户调用 `cancel` 后，就会立即执行 `abort` 方法取消请求，同时调用 `reject` 让外层的 `promise` 失败。

---

参考 [axios 之 cancelToken 原理以及使用](https://www.cnblogs.com/ysk123/p/11544211.html)
