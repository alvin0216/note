---
title: ArrayBuffer 对象
date: 2020-04-08 21:24:27
---

## 前言

`ArrayBuffer` 对象、`TypedArray` 视图和 `DataView` 视图是 `JavaScript` 操作二进制数据的一个接口。它们都是以数组的语法处理二进制数据，所以统称为二进制数组。

这个接口的原始设计目的，与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个 32 位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像 C 语言那样，直接操作字节，将 4 个字节的 32 位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。

二进制数组就是在这种背景下诞生的。它很像 C 语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了 JavaScript 处理二进制数据的能力，使得开发者有可能通过 JavaScript 与操作系统的原生接口进行二进制通信。

二进制数组由三类对象组成。

1. `ArrayBuffer` 对象： 代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
2. `TypedArray` 视图：共包括 9 种类型的视图，比如 Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。
3. `DataView` 视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。

> 简单说，`ArrayBuffer` 对象代表原始的二进制数据，`TypedArray` 视图用来读写简单类型的二进制数据，`DataView` 视图用来读写复杂类型的二进制数据。

:::details TypedArray 支持的数据类型
| 数据类型 | 字节长度 | 含义 | 对应的 C 语言类型 |
| -------- | -------- | -------------------------------- | ----------------- |
| Int8 | 1 | 8 位带符号整数 | signed char |
| Uint8 | 1 | 8 位不带符号整数 | unsigned char |
| Uint8C | 1 | 8 位不带符号整数（自动过滤溢出） | unsigned char |
| Int16 | 2 | 16 位带符号整数 | short |
| Uint16 | 2 | 16 位不带符号整数 | unsigned short |
| Int32 | 4 | 32 位带符号整数 | int |
| Uint32 | 4 | 32 位不带符号的整数 | unsigned int |
| Float32 | 4 | 32 位浮点数 | float |
| Float64 | 8 | 64 位浮点数 | double |
:::

注意，二进制数组并不是真正的数组，而是类似数组的对象。

很多浏览器操作的 API，用到了二进制数组操作二进制数据，下面是其中的几个。

`Canvas` `Fetch API` `File API` `WebSockets`

## ArrayBuffer 对象

`ArrayBuffer` 对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（`TypedArray` 视图和 `DataView` 视图)来读写，视图的作用是以指定格式解读二进制数据。

`ArrayBuffer` 也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

```js
const buf = new ArrayBuffer(32)
```

上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。可以看到，`ArrayBuffer` 构造函数的参数是所需要的内存大小（单位字节）。

为了读写这段内容，需要为它指定视图。`DataView` 视图的创建，需要提供 `ArrayBuffer` 对象实例作为参数。

```js
const buf = new ArrayBuffer(32)
const dataView = new DataView(buf)
dataView.getUint8(0) // 0
```

上面代码对一段 32 字节的内存，建立 `DataView` 视图，然后以不带符号的 8 位整数格式，从头读取 8 位二进制数据，结果得到 0，因为原始内存的 `ArrayBuffer` 对象，默认所有位都是 0。

另一种 `TypedArray` 视图，与 `DataView` 视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。

```js
const buffer = new ArrayBuffer(12)

const x1 = new Int32Array(buffer)
x1[0] = 1
const x2 = new Uint8Array(buffer)
x2[0] = 2

x1[0] // 2
```

上面代码对同一段内存，分别建立两种视图：32 位带符号整数（`Int32Array` 构造函数）和 8 位不带符号整数（`Uint8Array` 构造函数）。由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图。

`TypedArray` 视图的构造函数，除了接受 `ArrayBuffer` 实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的 `ArrayBuffer` 实例，并同时完成对这段内存的赋值。

```js
const typedArray = new Uint8Array([0, 1, 2])
typedArray.length // 3

typedArray[0] = 5
typedArray // [5, 1, 2]
```

上面代码使用 `TypedArray` 视图的 `Uint8Array` 构造函数，新建一个不带符号的 8 位整数视图。可以看到，`Uint8Array` 直接使用普通数组作为参数，对底层内存的赋值同时完成。

### ArrayBuffer.prototype.byteLength

`ArrayBuffer` 实例的 `byteLength` 属性，返回所分配的内存区域的字节长度。

```js
const buffer = new ArrayBuffer(32)
buffer.byteLength // 32
```

如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。

```js
if (buffer.byteLength === n) {
  // 成功
} else {
  // 失败
}
```

### ArrayBuffer.prototype.slice()

## 文末

转自 [阮一峰 es6 ArrayBuffer](https://es6.ruanyifeng.com/#docs/arraybuffer)
