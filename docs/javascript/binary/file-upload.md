---
title: 文件上传
date: 2020-04-13 17:28:17
---

## 前置知识

原理很简单，就是根据 `http` 协议的规范和定义，完成请求消息体的封装和消息体的解析，然后将二进制内容保存到文件。

我们都知道如果要上传一个文件，需要把 `form` 标签的 `enctype` 设置为 `multipart/form-data`,同时 `method` 必须为 `post` 方法。

```html
<form action="" enctype="multipart/form-data" method="post">...</form>
```

### 什么是 multipart/form-data?

> Since file-upload is a feature that will benefit many applications, this proposes an extension to HTML to allow information providers to express file upload requests uniformly, and a MIME compatible representation for file upload responses.

由于文件上传功能将使许多应用程序受益，因此建议对 `HTML` 进行扩展，以允许信息提供者统一表达文件上传请求，并提供文件上传响应的 `MIME` 兼容表示。

总结就是原先的规范不满足啦，我要扩充规范了。

### 文件上传为什么要用 multipart/form-data？

> The encoding type application/x-www-form-urlencoded is inefficient for sending large quantities of binary data or text containing non-ASCII characters. Thus, a new media type,multipart/form-data, is proposed as a way of efficiently sending the values associated with a filled-out form from client to server.

1867 文档中也写了为什么要新增一个类型，而不使用旧有的 `application/x-www-form-urlencoded`：因为此类型不适合用于传输大型二进制数据或者包含非 `ASCII` 字符的数据。平常我们使用这个类型都是把表单数据使用 `url` 编码后传送给后端，二进制文件当然没办法一起编码进去了。所以 `multipart/form-data` 就诞生了，专门用于有效的传输文件。

#### 也许你有疑问？那可以用 `application/json` 吗?

我们知道了文件是以二进制的形式存在，`application/json` 是以文本形式进行传输，那么某种意义上我们确实可以将文件转成例如文本形式的 `Base64` 形式。但是呢，你转成这样的形式，后端也需要按照你这样传输的形式，做特殊的解析。并且文本在传输过程中是相比二进制效率低的，那么对于我们动辄几十 M 几百 M 的文件来说是速度是更慢的。

### multipart/form-data 规范是什么？

先看看一个文件上传的 `http` 请求了解一下

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/file-upload/upload.png)

#### 首先是请求体，请求类型为

```yml
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryHTefVDvk5B48iJT5
```

请求类型，然后是一个 `boundary` （分割符），这个东西是干啥的呢？

其实看名字就知道，分隔符，当时分割作用，因为可能有多文件多字段，每个字段文件之间，我们无法准确地去判断这个文件哪里到哪里为截止状态。因此需要有分隔符来进行划分。

每个表单项由`———XXX` 开始，以`———XXX` 结尾。

#### 消息体 - `Form Data` 部分

每一个表单项又由 `Content-Type` 和 `Content-Disposition` 组成。

- `Content-Disposition`: `form-data` 为固定值，表示一个表单元素，`name` 表示表单元素的 名称，回车换行后面就是 `name` 的值，如果是上传文件就是文件的二进制内容。
- `Content-Type`：表示当前的内容的 `MIME` 类型，是图片还是文本还是二进制数据。

### 浏览器文件上传总结

对于浏览器端的文件上传，可以归结出一个套路，所有东西核心思路就是构造出 `File` 对象。然后观察请求 `Content-Type`，再看请求体是否有信息缺失。而以上这些二进制数据类型的转化可以看以下表。

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/file-upload/upload-chart.png)

## form 表单上传文件

```html
<form method="post" action="http://localhost:8100/upload" enctype="multipart/form-data">
  <input type="file" name="file" />
  <!--  input 必须设置 name 属性，否则数据无法发送 -->

  <button type="submit" id="btn-submit">上 传</button>
</form>
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/file-upload/upload-form.gif)

后端代码详见：[服务端接收文件代码](#服务端接收文件代码)

这种方式上传文件，不需要 `js` ，而且没有兼容问题，所有浏览器都支持，就是体验很差，导致页面刷新，页面其他数据丢失。

ps 多文件上传只需要一个标签加个属性就搞定了,file 标签开启 `multiple`。

```html
<input type="file" name="file" multiple />
```

## 借助 iframe 实现无刷新上传

页面内放一个隐藏的 `iframe`，或者使用 js 动态创建，指定 `form` 表单的 `target` 属性值为 `iframe` 标签 的 `name` 属性值，这样 `form` 表单的 `shubmit` 行为的跳转就会在 `iframe` 内完成，整体页面不会刷新。

```html
<form target="upload-iframe" action="http://localhost:8100/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <button type="submit" id="btn-submit">上 传</button>
</form>

<iframe id="upload-iframe" name="upload-iframe" style="display: none;"></iframe>

<script>
  const iframe = document.getElementById('upload-iframe')
  iframe.addEventListener('load', function() {
    const result = iframe.contentWindow.document.body.innerText
    alert(result)
  })
</script>
```

## ajax 实现无刷新上传

`XMLHttpRequest` 可以读取和上传二进制数据, 使用 `FormData` 对象管理表单数据

```html
<input type="file" multiple id="input-upload" />
<button id="btn-submit">上传</button>

<script>
  const input = document.getElementById('input-upload')
  const button = document.getElementById('btn-submit')

  button.onclick = function() {
    const fileList = input.files
    const formData = new FormData()
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      formData.append('file', file)
    }

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:8100/upload', true)
    xhr.send(formData)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = JSON.parse(xhr.responseText) //返回值
        alert(result)
      }
    }
  }
</script>
```

## 实现上传进度监听

借助 `XMLHttpRequest2` 的能力，实现多个文件或者一个文件的上传进度条的显示。

在 `chrome` 的 `developer tools` 的 `console` 里 `new` 一个 `XHR` 对象，调用点运算符就可以看到智能提示出来一个 `onprogress` 事件监听器，那是不是我们只要绑定 `XHR` 对象的 `progress` 事件就可以了呢？

很接近了，但是 `XHR` 对象的直属 `progress` 事件并不是用来监听上传资源的进度的。`XHR` 对象还有一个属性 `upload`, 它返回一个 [XMLHttpRequestUpload](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) 对象，这个对象拥有下列下列方法：

| 事件        | 相应属性的信息类型               |
| ----------- | -------------------------------- |
| onloadstart | 获取开始                         |
| onprogress  | 数据传输进行中                   |
| onabort     | 获取操作终止                     |
| onerror     | 获取失败                         |
| onload      | 获取成功                         |
| ontimeout   | 获取操作在用户规定的时间内未完成 |
| onloadend   | 获取完成（不论成功与否）         |

其中 `onprogress` 事件回调方法可用于跟踪资源上传的进度，它的 `event` 参数对象包含两个重要的属性 `loaded` 和 `total`。分别代表当前已上传的字节数（`number of bytes`）和文件的总字节数。比如我们可以这样计算进度百分比：

```js
xhr.upload.onprogress = function(event) {
  if (event.lengthComputable) {
    var percentComplete = (event.loaded / event.total) * 100
    // 对进度进行处理
  }
}
```

其中事件的 `lengthComputable` 属性代表文件总大小是否可知。如果 `lengthComputable` 属性的值是 `false`，那么意味着总字节数是未知并且 `total` 的值为零。

```html
<input type="file" multiple id="input-upload" />
<button id="btn-submit">上传</button>
<br />

<progress id="progress" value="0" max="100"></progress>

<script>
  const input = document.getElementById('input-upload')
  const button = document.getElementById('btn-submit')
  const progress = document.getElementById('progress')

  button.onclick = function() {
    const fileList = input.files
    const formData = new FormData()
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      formData.append('file', file)
    }

    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        const completedPercent = ((event.loaded / event.total) * 100).toFixed(2)
        progress.value = completedPercent
      }
    }

    xhr.open('POST', 'http://localhost:8100/upload', true)
    xhr.send(formData)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = JSON.parse(xhr.responseText) //返回值
        alert(result)
      }
    }
  }
</script>
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/file-upload/upload-progress.gif)

## 多文件上传 + 进度 + 取消上传

> - 利用 `xhr.abort` 取消上传请求，达到停止上传的目的。
> - 利用 `xhr.upload.onprogress` `(event.loaded / event.total) * 100` 得到上传进度
> - 利用 `window.URL.createObjectURL` 可以获取预览地址

:::details 代码

```html {68,75}
<style>
  #img-box {
    display: flex;
    flex-wrap: wrap;
  }
  #img-box > div {
    width: 200px;
    margin: 10px;
    border: 1px solid #ccc;
  }
  #img-box div img {
    width: 100%;
    height: 160px;
  }
</style>

<input type="file" multiple id="input-upload" />
<button id="btn-submit">上传</button>
<br />

<div id="img-box"></div>

<script>
  const input = document.getElementById('input-upload')
  const button = document.getElementById('btn-submit')
  const imgBox = document.getElementById('img-box')

  let uploadList = []

  input.onchange = function(e) {
    const fileList = e.target.files
    imgBox.innerHTML = ''
    uploadList = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const div = document.createElement('div')
      const img = document.createElement('img')
      img.src = window.URL.createObjectURL(file)
      img.onload = function() {
        window.URL.revokeObjectURL(this.src)
      }
      const subDiv = document.createElement('div')
      subDiv.innerHTML = '<progress value="0" max="100"></progress><button>停止</button>'

      div.appendChild(img)
      div.appendChild(subDiv)
      imgBox.appendChild(div)

      uploadList.push({
        file,
        subDiv
      })
    }
  }

  function uploadFile({ file, subDiv }) {
    const progress = subDiv.querySelector('progress')
    const aborttButton = subDiv.querySelector('button')

    const formData = new FormData()
    formData.append('file', file)
    const xhr = new XMLHttpRequest()

    aborttButton.onclick = function(e) {
      if (xhr && xhr.readyState !== 4) {
        if (aborttButton.innerText === '上传成功') return false
        //取消上传
        xhr.abort()
        e.target.innerText = '已手动停止'
      }
    }

    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        progress.value = ((event.loaded / event.total) * 100).toFixed(2)
      }
    }
    xhr.open('POST', 'http://localhost:8100/upload', true)
    xhr.send(formData)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = JSON.parse(xhr.responseText) //返回值
        aborttButton.innerText = '上传成功'
      }
    }
  }

  button.onclick = function() {
    uploadList.forEach(uploadFile)
  }
</script>
```

:::

## 拖拽上传

`html5` 的出现，让拖拽上传交互成为可能，现在这样的体验也屡见不鲜。

```html
<style>
  .drop-box {
    width: 300px;
    height: 300px;
    font-size: 20px;
    line-height: 300px;
    background-color: green;
    text-align: center;
  }
</style>
<div class="drop-box" id="drop-box">
  拖动文件到这里,开始上传
</div>

<button type="button" id="btn-submit">上 传</button>

<script>
  const box = document.getElementById('drop-box')
  const button = document.getElementById('btn-submit')

  //禁用浏览器的拖放默认行为
  document.addEventListener('drop', function(e) {
    console.log('document drog')
    e.preventDefault()
  })

  box.ondragover = function(e) {
    console.log('拖动的图片在 box 移动')
    e.preventDefault()
  }

  box.ondragleave = function(e) {
    console.log('拖动的图片离开 box')
    e.preventDefault()
  }

  box.ondrop = function(e) {
    e.preventDefault() // 禁用浏览器的拖放默认行为
    const files = e.dataTransfer.files // 获取拖拽中的文件对象
    console.log('图片已放置，可以进行上传操作....', files)
  }
</script>
```

## 大文件分片上传以及断点续传

见 [大文件分片上传以及断点续传](./large-file-upload.md)

## 服务端接收文件代码

```js
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaStatic = require('koa-static')

const fs = require('fs')
const path = require('path')

const PORT = 8100
const uploadDir = path.resolve(__dirname, './static/uploads')

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

router.post('/upload', async ctx => {
  !fs.existsSync(uploadDir) && fs.mkdirSync(uploadDir)
  const file = ctx.request.files.file // 获取上传文件

  const saveFile = file => {
    return new Promise((resolve, reject) => {
      try {
        const reader = fs.createReadStream(file.path) // 创建可读流
        const fileName = file.name
        const filePath = `${uploadDir}/${fileName}`
        const upStream = fs.createWriteStream(filePath)
        reader.pipe(upStream)
        reader.on('end', () => {
          resolve(fileName) // 上传成功
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  const fileList = Array.isArray(file) ? file : [file]
  const uploadList = await Promise.all(fileList.map(saveFile))
  ctx.body = uploadList
})

app.listen(PORT, () => {
  console.log(`server listen on: http://localhost:${PORT}`)
})
```

## 参考文章

- [一文了解文件上传全过程](https://juejin.im/post/5e80511f51882573793e6428)
- [写给新手前端的各种文件上传攻略，从小图片到大文件断点续传](https://juejin.im/post/5da14778f265da5bb628e590)
- [前端大文件上传](https://juejin.im/post/5cf765275188257c6b51775f)
- [字节跳动面试官，我也实现了大文件上传和断点续传](https://juejin.im/post/5e367f6951882520ea398ef6)
