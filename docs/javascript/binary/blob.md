---
title: Blob 与 FileReader
date: 2020-04-09 22:38:19
---

## Blob 基本语法

在一般的 Web 开发中，很少会用到 `Blob`，但 `Blob` 可以满足一些场景下的特殊需求。`Blob`，`Binary Large Object` 的缩写，代表二进制类型的大对象。

> 在 Web 中，`Blob` 类型的对象表示不可变的类似文件对象的原始数据，通俗点说，就是 `Blob` 对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作 `File` 对象一样操作 `Blob` 对象，**实际上，`File` 继承自 `Blob`。**

### 创建 Blob 实例

```js
Blob(blobParts[, options])
// example
let blob = new Blob(['hello world'], { type: 'text/plain' })
```

- `blobParts`: 第一个参数，必选，是一个数组。数组中的每一项连接起来构成 `Blob` 对象的数据，数组中的每项元素可以是 `ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 。
- `options`: 第二个参数，可选项，字典格式类型，可以指定如下两个属性
  - `type`，默认值为 ""，它代表了将会被放入到 `blob` 中的数组内容的 `MIME` 类型。
  - `endings`，默认值为"`transparent`"，用于指定包含行结束符`\n` 的字符串如何被写入。 它是以下两个值中的一个： "`native`"，表示行结束符会被更改为适合宿主操作系统文件系统的换行符； "`transparent`"，表示会保持 `blob` 中保存的结束符不变。

:::details Demo

```js
const b1 = new Blob(['a'], { type: 'text/html' }) // Blob {size: 1, type: "text/html"}
const b2 = new Blob(['b']) // Blob {size: 2, type: ""}
const b3 = new Blob([`<div style='color:red;'>This is a blob</div>`]) // Blob {size: 44, type: ""}

const b4 = new Blob([JSON.stringify({ name: 'abc' })]) // Blob {size: 14, type: ""}
const b5 = new Blob([{ name: 'abc' }]) // Blob {size: 15, type: ""}

const b6 = new Blob(['a', 'b']) // Blob {size: 2, type: ""}
```

- `size` 代表 `Blob` 对象中所包含数据的字节数。
- 这里要注意，使用字符串和普通对象创建 `Blob` 时的不同
  - `b4` 使用通过 `JSON.stringify` 把对象转换成 json 字符串，`b5` 则直接使用对象直接创建，两个对象的 `size` 分别为 `14` 和 `15`
  - `b5` 的 size 等于 15 是如何计算而来的呢？实际上，当使用普通对象创建 `Blob` 对象时，相当于调用了普通对象的 `toString()`方法得到字符串数据，然后再创建 `Blob` 对象。所以，`b5` 保存的数据是`"[object Object]"`，是 15 个字节(不包含最外层的引号)。

:::

### Blob.prototype.slice

> `Blob.prototype.slice` 多用于大文件的分片上传。

`Blob` 对象有一个 `slice` 方法，返回一个新的 `Blob` 对象，包含了源 `Blob` 对象中指定范围内的数据。

```js
slice([start[, end[, contentType]]])
```

- `start`： 可选，代表 `Blob` 里的下标，表示第一个会被会被拷贝进新的 `Blob` 的字节的起始位置。如果传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。
- `end`： 可选，代表的是 `Blob` 的一个下标，这个下标-1 的对应的字节将会是被拷贝进新的 `Blob` 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。
- `contentType`： 可选，给新的 `Blob` 赋予一个新的文档类型。这将会把它的 `type` 属性设为被传入的值。它的默认值是一个空的字符串。

```js
var data = 'abcdef'
var blob1 = new Blob([data])
var blob2 = blob1.slice(0, 3)

console.log(blob1) //输出：Blob {size: 6, type: ""}
console.log(blob2) //输出：Blob {size: 3, type: ""}
```

## Blob 应用场景

### 文件下载

**代码**

```html {5,10,13}
<script>
  window.onload = function () {
    function download(blobContent, filename) {
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blobContent)
      link.download = filename || Date.now()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    }

    let blob = new Blob(['hello world'], { type: 'text/plain' })
    download(blob, '1.txt')
  }
</script>
```

#### window.URL.createObjectURL

[URL.createObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL) 静态方法会创建一个 `DOMString`，其中包含一个表示参数中给出的对象的 `URL`。这个 `URL` 的生命周期和创建它的窗口中的 `document` 绑定。这个新的 `URL` 对象表示指定的 `File` 对象或 `Blob` 对象。相当于这个方法创建了一个传入对象的内存引用地址

```js
/**
 * 参数说明： object 是用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象
 * @return 一个可以引用到指定对象的 DOMString 比如 blob:null/e3d559c7-xxx...
 */
const objectURL = URL.createObjectURL(object)
```

:::tip
如果是以文件协议打开的 html 文件（即 url 为 `file://`开头），则地址中`http://localhost:1234`会变成`null`，而且此时这个`Blob URL` 是无法直接访问的。
:::

#### window.URL.revokeObjectURL

```js
/**
 * 参数说明：objectURL 是一个 DOMString，表示通过调用 URL.createObjectURL() 方法产生的 URL 对象。
 */
window.URL.revokeObjectURL(objectURL)
```

在每次调用 `createObjectURL()` 方法时，都会创建一个新的 `URL` 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 `URL.revokeObjectURL()` 方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

### 上传图片、视频预览

有时我们通过 `input` 上传图片文件之前，会希望可以预览一下图片，这个时候就可以通过前面所学到的东西实现，而且非常简单。

```html
<input id="upload" type="file" />
<img id="preview" src="" alt="预览" />

<script>
  const input = document.querySelector('#upload')
  const img = document.querySelector('#preview')

  input.onchange = function () {
    const file = upload.files[0] //File对象
    const src = URL.createObjectURL(file)
    preview.src = src
  }
</script>
```

这样一个图片上传预览就实现了，同样这个方法也适用于上传视频的预览。

### 大文件上传和断点续传

详见 [大文件上传和断点续传](./large-file-upload.md)

## FileReader

> `FileReader` 对象允许 Web 应用程序异步读取存储在用户计算机上的文件或原始数据缓冲区）的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。

其中 `File` 对象可以是来自用户在一个 `input` 元素上选择文件后返回的 `FileList` 对象,也可以来自拖放操作生成的 `DataTransfer` 对象,还可以是来自在一个 `HTMLCanvasElement` 上执行 `mozGetAsFile()`方法后返回结果。

```js
let reader = new FileReader()
```

`FileReader` 接口有 4 个方法，其中 3 个用来读取文件，另一个用来中断读取。无论读取成功或失败，方法并不会返回读取结果，这一结果存储在 `result` 属性中。

**方法**

|       方法名       |      参数       |          描述          |
| :----------------: | :-------------: | :--------------------: |
| readAsBinaryString |      file       | 将文件读取为二进制编码 |
|     readAsText     | file,[encoding] |    将文件读取为文本    |
|   readAsDataURL    |      file       |  将文件读取为 DataURL  |
|       abort        |     (none)      |      终端读取操作      |

**事件处理程序**

| 事件        | 调用时机                                                                          |
| ----------- | --------------------------------------------------------------------------------- |
| onabort     | 当读取操作被中止时调用                                                            |
| onerror     | 当读取操作发生错误时调用                                                          |
| onload      | 当读取操作成功完成时调用                                                          |
| onloadend   | 当读取操作完成时调用,不管是成功还是失败.该处理程序在 onload 或者 onerror 之后调用 |
| onloadstart | 当读取操作将要开始之前调用                                                        |
| onprogress  | 在读取数据过程中周期性调用                                                        |

### 读取文本

对于 `type="file"`的 `input` 元素，用户选择文件上传后会生成一个 `FileList` 对象，结构如下：

```json
{
  0: {
    lastModified: 1482289489971，
    lastModifiedDate: Wed Dec 21 2016 11:04:49 GMT+0800，
    name: "index.html"，
    size: 1325，
    type: "text/html"，
  },
  1: {
    ...
  },
  length: 2
}
```

我们从中可以获取文件名、修改时间、大小和文件类型等信息，文件内容也是包含在里面的，不过需要 FileReader 的读取文件方法才能获取，对于纯文本，我们使用 `readAsText` 方法，如下：

```js
//FileReader读取文件内容
const reader = new FileReader()
reader.readAsText(files[0], 'UTF-8')
reader.onload = function (e) {
  const urlData = this.result // urlData就是对应的文件内容
}
```

**代码**

```html
<input id="upload" type="file" accept="text/javascript, text/plain, application/json" />

<script>
  const input = document.querySelector('#upload')
  input.onchange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function () {
      console.log(reader.result)
    }
  }
</script>
```

### 图片预览

`FileReader` 的另一个文件读取方法 `readAsDataURL`，可以将图片文件转换为 `base64` 编码。可以实现本地图片预览。

```html
<input id="upload" type="file" />
<img id="preview" src="" alt="预览" />
<script>
  const input = document.querySelector('#upload')
  const img = document.querySelector('#preview')
  input.onchange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      img.src = reader.result
    }
  }
</script>
```

## URL.createObjectURL 和 FileReader 实现图片预览的比较

`readAsDataURL` 将图片文件转换为 `base64` 编码，当文件过大时，生成的 64 位编码过长可能会导致浏览器崩溃。总体来说 `URL.createObjectURL` 更加推荐使用。

## 参考

- [blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
- [细说 Web API 中的 Blob](https://juejin.im/post/59e35d0e6fb9a045030f1f35)
- [为什么视频网站的视频链接地址是 blob？](https://juejin.im/post/5d1ea7a8e51d454fd8057bea)
- [字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.im/post/5dff8a26e51d4558105420ed)
- [createObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)
- [revokeObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL)
- [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
- [在 web 应用程序中使用文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)
- [使用 FileReader 进行文件读取](https://dumengjie.github.io/2017/07/13/%E4%BD%BF%E7%94%A8FileReader%E8%BF%9B%E8%A1%8C%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96)
