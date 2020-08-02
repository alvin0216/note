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

注意，二进制数组并不是真正的数组，而是类似数组的对象。

很多浏览器操作的 API，用到了二进制数组操作二进制数据，下面是其中的几个。

`Canvas` `Fetch API` `File API` `WebSockets`

## ArrayBuffer 对象

`ArrayBuffer` 对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（`TypedArray` 视图和 `DataView` 视图)来读写，视图的作用是以指定格式解读二进制数据。

`ArrayBuffer` 也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

```js
const buf = new ArrayBuffer(32)
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/arraybuffer.png)

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

- **`ArrayBuffer.prototype.byteLength`**

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

- **`ArrayBuffer.prototype.slice()`**

`ArrayBuffer` 实例有一个 `slice` 方法，允许将内存区域的一部分，拷贝生成一个新的 `ArrayBuffer` 对象。

```js
const buffer = new ArrayBuffer(8)
const newBuffer = buffer.slice(0, 3)
```

上面代码拷贝 `buffer` 对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的 `ArrayBuffer` 对象。slice 方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个 `ArrayBuffer` 对象拷贝过去。

`slice` 方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原 `ArrayBuffer` 对象的结尾。

除了 `slice` 方法，`ArrayBuffer` 对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。

- **`ArrayBuffer.isView()`**

`ArrayBuffer` 有一个静态方法 `isView`，返回一个布尔值，表示参数是否为 `ArrayBuffer` 的视图实例。这个方法大致相当于判断参数，是否为 `TypedArray` 实例或 `DataView` 实例。

```js
const buffer = new ArrayBuffer(8)
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer)
ArrayBuffer.isView(v) // true
```

## TypedArray 视图

`ArrayBuffer` 对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。

`ArrayBuffer` 有两种视图，一种是 `TypedArray` 视图，另一种是 `DataView` 视图。前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

更多详见 [阮一峰 es6 ArrayBuffer](https://es6.ruanyifeng.com/#docs/arraybuffer)

## DataView 视图

如果一段数据包括多种类型（比如服务器传来的 HTTP 数据），这时除了建立 `ArrayBuffer` 对象的复合视图以外，还可以通过 `DataView` 视图进行操作。

`DataView` 视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，`ArrayBuffer` 对象的各种 TypedArray 视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而 `DataView` 视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。

`DataView` 视图本身也是构造函数，接受一个 `ArrayBuffer` 对象作为参数，生成视图。

```js
new DataView(ArrayBuffer buffer [, 字节起始位置 [, 长度]]);
```

更多详见 [阮一峰 es6 ArrayBuffer](https://es6.ruanyifeng.com/#docs/arraybuffer)
