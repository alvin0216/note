---
title: canvas 转化 url 为 base64
date: 2020-10-26 11:21:00
---

```js
function toBase64(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous') // 解决跨域问题 需要在图片资源控制头
    image.src = url + '?v=' + Date.now() // 缓存处理

    image.onload = function() {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0)
      const dataURL = canvas.toDataURL('image/png')
      resolve(dataURL)
    }
    image.onerror = reject
  })
}

const url = './avatar.jpeg' // 加载本地图片
toBase64(url).then(result => console.log(result))
```

加载网络资源，`canvas` 存在跨域问题，所以这里做了 `image.setAttribute('crossOrigin', 'anonymous')` 处理。

如果网络资源图片没有设置跨域的请求头，同样也会报错: `No 'Access-Control-Allow-Origin' header is present on the requested resource.`

这里做处理：

```js
const http = require('http')
const fs = require('fs')
const { resolve } = require('path')

http
  .createServer(function(req, res) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'image/jpeg'
    })
    const data = fs.readFileSync(resolve(__dirname, './avatar.jpeg'), 'binary')
    res.end(data.toString(), 'binary')
  })
  .listen(6060, () => {
    console.log('listen on http://localhost:6060')
  })
```

搞定
