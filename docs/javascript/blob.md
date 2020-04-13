---
title: Blob 与 FileAPI
date: 2020-04-09 22:38:19
---

## Blob

在一般的 Web 开发中，很少会用到 `Blob`，但 `Blob` 可以满足一些场景下的特殊需求。`Blob`，`Binary Large Object` 的缩写，代表二进制类型的大对象。

> 在 Web 中，`Blob` 类型的对象表示不可变的类似文件对象的原始数据，通俗点说，就是 `Blob` 对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作 `File` 对象一样操作 `Blob` 对象，**实际上，`File` 继承自 `Blob`。**

### 创建 blob 实例

```js
Blob(blobParts[, options])
```

- `blobParts`: 第一个参数，必选，是一个数组。数组中的每一项连接起来构成 `Blob` 对象的数据，数组中的每项元素可以是 `ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 。
- `options`: 第二个参数，可选项，字典格式类型，可以指定如下两个属性
  - `type`，默认值为 ""，它代表了将会被放入到 `blob` 中的数组内容的 `MIME` 类型。
  - `endings`，默认值为"`transparent`"，用于指定包含行结束符`\n` 的字符串如何被写入。 它是以下两个值中的一个： "`native`"，表示行结束符会被更改为适合宿主操作系统文件系统的换行符； "`transparent`"，表示会保持 `blob` 中保存的结束符不变。

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

### slice 方法

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

## 参考

- [blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
- [细说 Web API 中的 Blob](https://juejin.im/post/59e35d0e6fb9a045030f1f35)
- [为什么视频网站的视频链接地址是 blob？](https://juejin.im/post/5d1ea7a8e51d454fd8057bea)
- [字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.im/post/5dff8a26e51d4558105420ed)
