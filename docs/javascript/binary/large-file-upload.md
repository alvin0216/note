---
title: 大文件上传和断点续传
date: 2020-04-13 15:57:04
---

## 整体思路

如果太大的文件，比如一个视频 1g 2g 或者更大， 直接上传的方式可能会出现**链接超时**的情况，而且也会**超过服务端允许上传文件的大小限制**，所以解决这个问题我们可以将文件进行分片上传，每次只上传很小的一部分 比如 `2M`。

前端

---

切片上传大文件的核心则是利用 [Blob.prototype.slice](./blob.md#blob-prototype-slice), 和数组的 `slice` 方法相似，调用的 `slice` 方法可以返回`原文件的某个切片`

这样我们就可以根据预先设置好的切片最大数量将文件切分为一个个切片，然后借助 `http` 的可并发性，同时上传多个切片，这样从原本传一个大文件，变成了同时传多个小的文件切片，可以大大减少上传时间

另外由于是并发，传输到服务端的顺序可能会发生变化，所以我们还需要给每个切片记录顺序

服务端

---

服务端需要负责接受这些切片，并在接收到所有切片后`合并切片`

这里又引伸出两个问题

1. 何时合并切片，即切片什么时候传输完成
2. 如何合并切片

第一个问题需要前端进行配合，前端在每个切片中都携带切片最大数量的信息，当服务端接受到这个数量的切片时自动合并，也可以额外发一个请求主动通知服务端进行切片的合并

第二个问题，具体如何合并切片呢？这里可以使用 `nodejs` 的 读写流（`readStream/writeStream`），将所有切片的流传输到最终文件的流里

## 大文件上传 - 前端部分

由于演示这里还是使用原生的 html 而不使用用框架。

首先创建选择文件的控件，点击上传按钮触发上传的请求。

```html
<input type="file" id="input-upload" />
<button id="btn-submit">上传</button>

<script>
  const input = document.getElementById('input-upload')
  const button = document.getElementById('btn-submit')
  button.onclick = function () {
    const file = input.files[0]
    const chunkList = createFileChunk(file) // 创建切片数组
    uploadChunks(file, chunkList) // 上传分片数据
  }
</script>
```

:::details 文件结构
![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/large-file-upload/upload-project.png)
:::

### 封装请求

这里没有用第三方的请求库，而是用原生 `XMLHttpRequest` 做一层简单的封装来发请求

```js
function ajax({ url, data, method = 'POST', headers = {} }) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    xhr.send(data)

    // 监听请求成功事件，触发后执行事件函数
    xhr.onload = function (e) {
      resolve(e.target.response)
    }
  })
}
```

### 上传切片

接着实现比较重要的上传功能，上传需要做两件事

1. 对文件进行切片
2. 将切片传输给服务端

```js
const SIZE = 10 * 1024 * 1024 // 切片 10M

function createFileChunk(file, piece = SIZE) {
  const chunkList = []
  let cur = 0
  while (cur < file.size) {
    const blob = file.slice(cur, cur + piece)
    chunkList.push(blob)
    cur += piece
  }
  return chunkList
}

function uploadChunks(file, chunkList) {
  Promise.all(
    chunkList.map((chunk, index) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('filename', file.name)
      formData.append('hash', index)
      return ajax({ url: '/uploadChunk', data: formData })
    })
  )
}
```

当点击上传按钮时，调用 `createFileChunk` 将文件切片，切片数量通过文件大小控制，这里设置 10MB，也就是说 100 MB 的文件会被分成 10 个切片.

在生成文件切片时，需要给每个切片一个标识作为 `hash`，这里暂时使用`文件名 + 下标`，这样后端可以知道当前切片是第几个切片，用于之后的合并切片

随后调用 `uploadChunks` 上传所有的文件切片，将文件切片，切片 `hash`，以及文件名放入 `FormData` 中，再调用上一步的 `ajax` 函数返回一个 `proimise`，最后调用 `Promise.all` 并发上传所有的切片

### 发送合并请求

这里使用整体思路中提到的第二种合并切片的方式，即前端主动通知服务端进行合并，所以前端还需要额外发请求，服务端接受到这个请求时主动合并切片

```jsx
function uploadChunks(file, chunkList) {
  Promise.all(
    chunkList.map((chunk, index) => {
      //...
    })
  ).then(res => {
    ajax({
      url: '/merge',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({ filename: file.name, size: SIZE })
    })
  })
}
```

:::details 此时整个 html 代码

```html
<input type="file" id="input-upload" />
<button id="btn-submit">上传</button>

<script>
  const SIZE = 2 * 1024 * 1024 // 切片 2M

  /**
   * ajax 请求
   */
  function ajax({ url, data, method = 'POST', headers = {} }) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
      xhr.send(data)

      // 监听请求成功事件，触发后执行事件函数
      xhr.onload = function (e) {
        resolve(e.target.response)
      }
    })
  }

  /**
   * 生成文件切片
   */
  function createFileChunk(file, piece = SIZE) {
    const chunkList = []
    let cur = 0
    while (cur < file.size) {
      const blob = file.slice(cur, cur + piece)
      chunkList.push(blob)
      cur += piece
    }
    return chunkList
  }

  /**
   * 上传切片
   */
  function uploadChunks(file, chunkList) {
    Promise.all(
      chunkList.map((chunk, index) => {
        const formData = new FormData()
        formData.append('chunk', chunk)
        formData.append('filename', file.name)
        formData.append('hash', index)

        return ajax({ url: '/uploadChunk', data: formData })
      })
    ).then(res => {
      ajax({
        url: '/merge',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify({ filename: file.name, size: SIZE })
      })
    })
  }

  const input = document.getElementById('input-upload')
  const button = document.getElementById('btn-submit')

  button.onclick = function () {
    const file = input.files[0]
    const chunkList = createFileChunk(file)
    uploadChunks(file, chunkList)
  }
</script>
```

:::

## 大文件上传 - 服务端部分

这里用了 `koa` 搭建服务端

:::details 基础代码

```js
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaStatic = require('koa-static')

const fs = require('fs')
const path = require('path')

const PORT = 8100
const uploadDir = path.resolve(__dirname, './static/uploads')
!fs.existsSync(uploadDir) && fs.mkdirSync(uploadDir)

const app = new Koa()
const router = new Router()

app.use(
  koaBody({
    multipart: true, // 开启文件上传，默认是关闭
    formidable: {
      keepExtensions: true, //保留原始的文件后缀
      maxFileSize: 2000 * 1024 * 1024 // 设置上传文件大小最大限制，默认20M
    }
  })
)

app.use(router.routes()).use(router.allowedMethods())

//开启静态文件访问
app.use(koaStatic(path.resolve(__dirname, './static')))

router.post('/uploadChunk', async ctx => {
  // ...
})

router.post('/merge', async ctx => {
  // ...
})

app.listen(PORT, () => {
  console.log(`server listen on: http://localhost:${PORT}`)
})
```

:::

主要流程为

- 服务端保存各段文件
- 浏览器端所有分片上传完成，发送给服务端一个合并文件的请求
- 服务端根据文件标识、类型、各分片顺序进行文件合并
- 删除分片文件

### 接受切片

1. 创建保存块的目录 `chunkDir`
2. 将块文件写入目录

```js
router.post('/uploadChunk', async ctx => {
  const { filename, hash } = ctx.request.body
  const chunk = ctx.request.files.chunk
  const fileExtName = path.extname(filename) // 文件扩展名

  const chunkDir = `${uploadDir}/${filename.replace(fileExtName, '')}`

  !fs.existsSync(chunkDir) && fs.mkdirSync(chunkDir)

  const saveChunk = (chunk, filename, hash) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = fs.createReadStream(chunk.path) // 创建可读流
        const chunkName = `${filename}-hash-${hash}`
        const chunkPath = `${chunkDir}/${chunkName}`
        const writeStream = fs.createWriteStream(chunkPath)
        reader.pipe(writeStream)
        reader.on('end', () => {
          resolve(chunkName) // 上传成功
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  const chunkName = await saveChunk(chunk, filename, hash)
  ctx.body = `received file chunk: ${chunkName}`
})
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/large-file-upload/upload-chunk.png)

### 合并切片

在接收到前端发送的合并请求后，服务端将文件夹下的所有切片进行合并

```js
router.post('/merge', async ctx => {
  const { filename, size } = ctx.request.body
  const fileExtName = path.extname(filename) // 文件扩展名
  const filePath = `${uploadDir}/${filename}` // 写入的文件路径

  const chunkDir = `${uploadDir}/${filename.replace(fileExtName, '')}` // chunk 存放路径

  const chunkPahtList = fs.readdirSync(chunkDir)
  chunkPahtList.sort((x, y) => x.split('-hash-')[1] - y.split('-hash-')[1])

  await Promise.all(
    chunkPahtList.map((chunkName, index) => {
      return new Promise(resolve => {
        const chunkPath = `${chunkDir}/${chunkName}` // chunk 块的路径
        const reader = fs.createReadStream(chunkPath) // 创建可读流
        const writeStream = fs.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
        reader.pipe(writeStream)
        reader.on('end', () => {
          // 写入成功 删除切片
          fs.unlinkSync(chunkPath)
          resolve() // resolve 异步删除成功
        })
      })
    })
  )

  fs.rmdirSync(chunkDir) // 删除 chunk 目录
  ctx.body = '合并成功'
})
```

由于前端在发送合并请求时会携带文件名，服务端根据文件名可以找到上一步创建的切片文件夹

接着使用 `fs.createWriteStream` 创建一个可写流，可写流文件名就是**切片文件夹名 + 后缀名**组合而成

随后遍历整个切片文件夹，将切片通过 `fs.createReadStream` 创建可读流，传输合并到目标文件中

值得注意的是每次可读流都会传输到可写流的指定位置，这是通过 `createWriteStream` 的第二个参数 `start/end` 控制的，目的是能够并发合并多个可读流到可写流中，这样即使流的顺序不同也能传输到正确的位置，所以这里还需要让前端在请求的时候多提供一个 `size` 参数

其实也可以等上一个切片合并完后再合并下个切片，这样就不需要指定位置，但传输速度会降低，所以使用了并发合并的手段，接着只要保证每次合并完成后删除这个切片，等所有切片都合并完毕后最后删除切片文件夹即可

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/large-file-upload/upload-result.png)

## 显示上传进度条

`XMLHttpRequest` 原生支持上传进度的监听，只需要监听 `upload.onprogress` 即可，我们在原来的 `ajax` 基础上传入 `onProgress` 参数，给 `XMLHttpRequest` 注册监听事件

```js
/**
 * ajax 请求
 */
function ajax({ url, data, method = 'POST', headers = {}, onProgress = e => e }) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    xhr.upload.onprogress = onProgress
    xhr.send(data)
    // 监听请求成功事件，触发后执行事件函数
    xhr.onload = function (e) {
      resolve(e.target.response)
    }
  })
}
```

通过每个切片的 `upload.onprogress` 我们可以清楚的知道切片上传的进度。在 `uploadChunks` 添加进度监听

```html
<input type="file" id="input-upload" />
<button id="btn-submit">上传</button>
<progress id="progress" value="0" max="100"></progress>

<script>
  let loaded = 0
  let progress = 0
  const progressDom = document.getElementById('progress')

  function handleChunkProgress(event, file) {
    if (event.lengthComputable) {
      loaded += event.loaded
      progress = ((loaded / file.size) * 100).toFixed(2)
      if (progress > 100) progress = 100
      progressDom.value = progress
    }
  }

  function uploadChunks(file, chunkList) {
    Promise.all(
      chunkList.map((chunk, index) => {
        const formData = new FormData()
        formData.append('chunk', chunk)
        formData.append('filename', file.name)
        formData.append('hash', index)

        return ajax({
          url: '/uploadChunk',
          data: formData,
          onProgress: e => handleChunkProgress(e, file)
        })
      })
    ).then(res => {
      // ...
    })
  }
</script>
```

最终效果

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/large-file-upload/upload-progress2.gif)

## 断点续传

### 生成 hash

无论是前端还是服务端，都必须要生成文件和切片的 `hash`，之前我们使用文件名 + 切片下标作为切片 `hash`，这样做文件名一旦修改就失去了效果，而事实上只要文件内容不变，`hash` 就不应该变化，所以正确的做法是根据文件内容生成 `hash`，所以我们修改一下 `hash` 的生成规则

这里用到另一个库 `spark-md5`，它可以根据文件内容计算出文件的 `hash` 值，另外考虑到如果上传一个超大文件，读取文件内容计算 `hash` 是非常耗费时间的，并且会引起 UI 的阻塞，导致页面假死状态，所以我们使用 `web-worker` 在 `worker` 线程计算 hash，这样用户仍可以在主界面正常的交互

新建 `static/work.js`

```js
self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.min.js')

self.addEventListener(
  'message',
  function (e) {
    const { chunkList } = e.data
    const spark = new self.SparkMD5.ArrayBuffer()
    let percentage = 0
    let count = 0

    function calcFileHash(chunkList) {
      let progress = 0
      let count = 0

      const loadNext = index => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(chunkList[index])
        reader.onload = e => {
          count++
          spark.append(e.target.result)

          if (count === chunkList.length) {
            self.postMessage({ chunkList, progress: 100, hash: spark.end() })
            self.close()
          } else {
            progress += 100 / chunkList.length
            self.postMessage({ progress })
            // 递归计算下一个切片
            loadNext(count)
          }
        }
      }

      loadNext(0)
    }

    calcFileHash(chunkList)
  },
  false
)
```

在 `worker` 线程中，接受文件切片 `fileChunkList`，利用 `FileReader` 读取每个切片的 `ArrayBuffer` 并不断传入 `spark-md5` 中，每计算完一个切片通过 `postMessage` 向主线程发送一个进度事件，全部完成后将最终的 `hash` 发送给主线程

> `spark-md5` 需要根据所有切片才能算出一个 `hash` 值，不能直接将整个文件放入计算，否则即使不同文件也会有相同的 `hash`，具体可以看官方文档

### 暂停上传

断点续传顾名思义即断点 + 续传，所以我们第一步先实现“断点”，也就是暂停上传

原理是使用 XMLHttpRequest 的 abort 方法，可以取消一个 xhr 请求的发送，为此我们需要将上传每个切片的 xhr 对象保存起来，我们再改造一下 request 方法

这样在上传切片时传入 requestList 数组作为参数，request 方法就会将所有的 xhr 保存在数组中了

每当一个切片上传成功时，将对应的 xhr 从 requestList 中删除，所以 requestList 中只保存正在上传切片的 xhr

```html
<input type="file" id="input-upload" />
<button id="btn-submit">上传</button>
<button id="btn-abort" disabled>暂停上传</button>

<h3>计算 hash 进度</h3>
<progress id="hash-progress" value="0" max="100"></progress>
<span id="hash-progress-text">0%</span>

<h3>上传进度</h3>
<progress id="progress" value="0" max="100"></progress>
<span id="progress-text">0%</span>

<script>
  const SIZE = 10 * 1024 * 1024 // 切片 10M
  let loaded = 0
  let progress = 0
  let requestList = []
  const progressDom = document.getElementById('progress')
  const progressDomText = document.getElementById('progress-text')
  const hashProgressDom = document.getElementById('hash-progress')
  const hashProgressDomText = document.getElementById('hash-progress-text')
  const input = document.getElementById('input-upload')
  const button = document.getElementById('btn-submit')
  const abortButton = document.getElementById('btn-abort')
  /**
   * ajax 请求
   */
  function ajax({ url, data, method = 'POST', headers = {}, onProgress = e => e }) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
      xhr.upload.onprogress = onProgress
      xhr.send(data)
      // 监听请求成功事件，触发后执行事件函数
      xhr.onload = function (e) {
        resolve(e.target.response)
        const index = requestList.findIndex(item => item === xhr)
        requestList.splice(index, 1)
      }
      requestList.push(xhr)
    })
  }

  function createFileChunk(file, piece = SIZE) {
    const chunkList = []
    let cur = 0
    while (cur < file.size) {
      const blob = file.slice(cur, cur + piece)
      chunkList.push(blob)
      cur += piece
    }
    return chunkList
  }

  function uploadChunks(file, chunkList, hash) {
    Promise.all(
      chunkList.map((chunk, index) => {
        const formData = new FormData()
        formData.append('chunk', chunk)
        formData.append('filename', file.name)
        formData.append('hash', hash)
        formData.append('index', index)

        return ajax({
          url: '/uploadChunk',
          data: formData,
          onProgress: e => handleChunkProgress(e, file)
        })
      })
    ).then(res => {
      ajax({
        url: '/merge',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify({ filename: file.name, size: SIZE })
      })
    })
  }

  function handleChunkProgress(event, file) {
    if (event.lengthComputable) {
      loaded += event.loaded
      progress = ((loaded / file.size) * 100).toFixed(2)
      if (progress > 100) progress = 100
      progressDom.value = progress
      progressDomText.innerText = `${progress}%`
    }
  }

  button.onclick = function () {
    const file = input.files[0]
    const chunkList = createFileChunk(file) // 创建切片数组

    const worker = new Worker('work.js')
    worker.postMessage({ chunkList })
    worker.onmessage = function (event) {
      const { progress, hash } = event.data
      hashProgressDom.value = progress
      hashProgressDomText.innerText = `${progress}%`
      if (progress === 100) {
        console.log('work hash', hash)
        abortButton.removeAttribute('disabled')
        uploadChunks(file, chunkList, hash)
      }
    }
  }

  abortButton.onclick = {}
</script>
```

## 参考文章

- [字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.im/post/5dff8a26e51d4558105420ed)
- [写给新手前端的各种文件上传攻略，从小图片到大文件断点续传](https://juejin.im/post/5da14778f265da5bb628e590)
- [字节跳动面试官，我也实现了大文件上传和断点续传](https://juejin.im/post/5e367f6951882520ea398ef6)
