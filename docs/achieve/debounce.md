---
title: debounce 防抖
date: 2020-01-07 21:35:59
---

> 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要**等你触发完事件 n 秒内不再触发事件**，我才执行

```js
// demo
var count = 1
var container = document.getElementById('container')

function getUserAction() {
  container.innerHTML = count++
}

// container.onmousemove = getUserAction
container.onmousemove = debounce(getUserAction, 1000)
```

## 简单实现

可以通过定时器简单实现

```js
function debounce(func, delay) {
  var timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(func, delay)
  }
}
```

现在随你怎么移动，反正你移动完 1000ms 内不再触发，我才执行事件。效果：

![debounce](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/debounce/1.gif)

## this 指向问题

如果我们在 `getUserAction` 函数中 `console.log(this)`.

- 在不使用 `debounce` 函数的时候，`this` 的值为 `<div id="container"></div>`
- 使用我们的 `debounce` 函数，`this` 就会指向 `Window` 对象！

```js
function getUserAction() {
  console.log(this)
}

container.onmousemove = getUserAction // <div id="container"></div>
container.onmousemove = debounce(getUserAction, 1000) // window
```

我们修改下代码：

```js
function debounce(func, delay) {
  let timer
  return function () {
    let ctx = this
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(ctx)
    }, delay)
  }
}
```

## 函数参数

`JavaScript` 在事件处理函数中会提供事件对象 `event`

```js
function getUserAction(e) {
  console.log(e) // MouseEvent {...}
  container.innerHTML = count++
}
```

我们也修改一下代码：

```js
function debounce(func, delay) {
  let timer
  return function (...args) {
    let ctx = this
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(ctx, args)
    }, delay)
  }
}
```

## 考虑函数可以立即执行

如果有个新需求：我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。

让我们实现它：

```js
function debounce(func, wait, immediate = false) {
  let timer

  return function (...args) {
    let that = this
    if (timer) clearTimeout(timer)
    if (immediate) {
      func.apply(that, args)
    } else {
      timer = setTimeout(function () {
        func.apply(that, args)
      }, wait)
    }
  }
}
```

上面代码是有问题的，如果 `immediate` 为 `true` 的情况下，永远返回 `func.apply(that, args)` 防抖毫无意义。

在执行一次后，将 `immediate = false`，下次进入又没有立即执行的效果。

我们可以这样写：

```diff
function debounce(func, delay, immediate = false) {
  let timer
  return function(...args) {
    let ctx = this
    if (timer) clearTimeout(timer)
+   if (immediate) {
+     let doNow = !timer
+     timer = setTimeout(() => {
+       timer = null
+     }, delay)
+     if (doNow) func.apply(ctx, args)
    } else {
      timer = setTimeout(function() {
        func.apply(ctx, args)
      }, delay)
    }
  }
}
```

立即触发。在计时器时间内不触发。。。

## 考虑到可以随时取消

```js
function debounce(func, delay, immediate = false) {
  let timer, result

  let debounced = function (...args) {
    let ctx = this
    if (timer) clearTimeout(timer)
    if (immediate) {
      let doNow = !timer
      timer = setTimeout(function () {
        timer = null // 重置 timer 为 null，已开启下次调用
      }, delay)
      if (!doNow) result = func.apply(ctx, args)
    } else {
      timer = setTimeout(function () {
        func.apply(ctx, args)
      }, delay)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}
```

test:

```js
var setUseAction = debounce(getUserAction, 1000, true)

container.onmousemove = setUseAction

document.getElementById('button').addEventListener('click', function () {
  setUseAction.cancel()
})
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/debounce/4.gif)

参考 [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
