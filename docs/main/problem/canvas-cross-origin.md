---
title: 缓存导致 canvas 跨域问题
date: 2021-06-29 10:54:23
sidebar: auto
tags:
  - canvas 跨域问题
categories:
  - 技术漫谈
---

## 首先看看 canvas 怎么将图片转化为 base64 的

::::tabs

::: tab canvas 转 base 64

```js
function toBase64(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); // 解决跨域问题 需要在图片资源控制头
    image.src = url + '?v=' + Date.now(); // 缓存处理

    image.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    image.onerror = reject;
  });
}

const url = './avatar.jpeg'; // 加载本地图片
toBase64(url).then((result) => console.log(result));
```

加载网络资源，`canvas` 存在跨域问题，所以这里做了 `image.setAttribute('crossOrigin', 'anonymous')` 处理。

如果网络资源图片没有设置跨域的请求头，同样也会报错: `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
:::

::: tab 资源也需要允许跨域请求

```js
const http = require('http');
const fs = require('fs');
const { resolve } = require('path');

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'image/jpeg',
    });
    const data = fs.readFileSync(resolve(__dirname, './avatar.jpeg'), 'binary');
    res.end(data.toString(), 'binary');
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060');
  });
```

:::

::::

## 读了缓存会发生什么事？

注意 上面有个细节处理 `image.src = url + '?v=' + Date.now(); // 缓存处理`。

同事在 canvas 层加载图片资源的时候 没有加上，也就是说有可能读取到的资源就是缓存资源，而缓存资源上的响应头并没有 `access-control-allow-origin` 字段，导致了跨域问题

## 怎么解决？

1. 不建议

cdn 资源设置 `no-cache`

2. 不是很建议

在其他地方加载资源的时候，请求路径上加指定的随机数 `?v=1` , 那么浏览器第一次不会缓存到 `canvas` 读取的资源，

注意，这里是 `canvas` 是通过接口拿资源的。这里有个弊端，就算第一次没加载缓存，`canvas` 加载过对应的图片资源了。再下次在打开时，就发现又读的是缓存，会存在一样的问题

3. 最佳

`canvas` 层加处理 `image.src = url + '?v=' + Date.now(); // 缓存处理`
