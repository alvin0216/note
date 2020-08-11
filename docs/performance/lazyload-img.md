---
title: 实现图片懒加载
date: 2020-07-15 15:43:44
---

![](https://gitee.com/alvin0216/cdn/raw/master/img/html/lazyload.png)

> 判断图片是否进入了可视区域 替换图片地址即可

## 方案 1 el.offsetTop < clientHeight + scrollTop

定义 html

```html
<!-- data-src 最终的图片地址 -->
<img src="./loading.gif" data-src="https://gitee.com/alvin0216/cdn/raw/master/img/html/lazyload.png" />
```

> Tips: data-\* 全局属性：构成一类名称为自定义数据属性的属性，可以通过 HTMLElement.dataset 来访问。

```js
window.onload = function() {
  // 判断图片是否进入了可视区域
  function isInSight(el) {
    const clientHeight = window.innerHeight // 视口高度，也就是窗口的高度。
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    return el.offsetTop < clientHeight + scrollTop
  }

  let $imgs = document.querySelectorAll('img')

  function lazyLoad() {
    for (let i = 0; i < $imgs.length; i++) {
      const img = $imgs[i]
      if (isInSight(img)) {
        if (img.src !== './loading.gif') img.src = img.dataset.src
      }
    }
  }

  lazyLoad() //首次加载别忘了显示图片
  window.addEventListener('scroll', lazyLoad)
}
```

当然，最好对 scroll 事件做节流处理，以免频繁触发:

```js
window.addEventListener('scroll', throttle(lazyload, 200))
```

## 方案 2 getBoundingClientRect

现在我们用另外一种方式来判断图片是否出现在了当前视口, 即 DOM 元素的 getBoundingClientRect API。

```js
function isInSight(el) {
  const viewHeight = document.body.clientHeight // 视口高度，也就是窗口的高度。
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

  // return el.offsetTop < clientHeight + scrollTop
  return el.getBoundingClientRect().top < viewHeight + scrollTop
}
```

## 方案 3 IntersectionObserver

这是浏览器内置的一个 API，实现了监听 window 的 scroll 事件、判断是否在视口中以及节流三大功能。

```js
let $imgs = document.querySelectorAll('img')

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 目标元素出现在 root 可视区，返回 true
      const $target = entry.target
      $target.src = $target.dataset.src
      io.unobserve($target)
    }
  })
})

Array.prototype.forEach.call($imgs, item => {
  io.observe(item)
})
```
