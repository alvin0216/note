---
title: 防抖函数的实现
date: 2020-01-07 21:35:59
---

## 前言

在前端开发中会遇到一些频繁的事件触发，比如：

1. `window` 的 `resize`、`scroll`
2. `mousedown`、`mousemove`
3. `keyup`、`keydown`

举个例子：

```html
<div id="container"></div>
<style>
  #container {
    width: 100%;
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    background-color: #444;
    font-size: 30px;
  }
</style>

<script>
  window.onload = function() {
    var counter = 1
    var container = document.getElementById('container')

    function getUserAction(e) {
      container.innerHTML = counter++
    }
    container.onmousemove = getUserAction
  }
</script>
```

我们来看看效果：

![](../../assets/debounce.gif)

从左边滑到右边就触发了 165 次函数！

因为这个例子很简单，所以浏览器完全反应的过来，可是如果是复杂的回调函数或是 ajax 请求呢？假设 1 秒触发了 60 次，每个回调就必须在 1000 / 60 = 16.67ms 内完成，否则就会有卡顿出现。

为了解决这个问题，一般有两种解决方案：

1. `debounce` 防抖
2. `throttle` 节流

## 防抖的原理

> 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行

根据这段表述，我们可以写第一版的代码：

## 第一版

```js
// 第一版
function debounce(func, wait) {
  var timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
```

如果我们要使用它，以最一开始的例子为例：

```js
container.onmousemove = debounce(getUserAction, 1000)
```

现在随你怎么移动，反正你移动完 1000ms 内不再触发，我才执行事件。看看使用效果：

![](https://github.com/mqyqingfeng/Blog/raw/master/Images/debounce/debounce-1.gif)

顿时就从 165 次降低成了 1 次!

棒棒哒，我们接着完善它。

## this

如果我们在 `getUserAction` 函数中 `console.log(this)`，在不使用 `debounce` 函数的时候，`this` 的值为：

```html
<div id="container"></div>
```

但是如果使用我们的 `debounce` 函数，`this` 就会指向 `Window` 对象！

所以我们需要将 `this` 指向正确的对象。

我们修改下代码：

```js
// 第二版
function debounce(func, wait) {
  var timeout

  return function() {
    var context = this

    clearTimeout(timeout)
    timeout = setTimeout(function() {
      func.apply(context)
    }, wait)
  }
}
```

## 文章出处

[JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
