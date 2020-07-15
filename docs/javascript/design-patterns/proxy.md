---
title: 代理模式
date: 2020-07-15 10:56:32
---

常见占位图：

```js
const myImage = (function() {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

const proxyImage = (function() {
  const img = new Image()

  // http 图片加载完毕后才会执行
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('loading.gif') // 本地 loading 图片
      img.src = src
    }
  }
})()

proxyImage.setSrc('https://gitee.com/alvin0216/cdn/raw/master/img/charles/phone-proxy.png')
```

- [JavaScript 中常见设计模式整理](https://juejin.im/post/5afe6430518825428630bc4d)
