---
title: 前端监控
date: 2022-03-29 22:15:14
sidebar: auto
tags:
  - 错误监控
categories:
  - 前端工程化
---

学习 🀄️....

- [前端监控和前端埋点方案设计](https://juejin.cn/post/6844903650603565063)
- [一篇讲透自研的前端错误监控](https://juejin.cn/post/6987681953424080926)
- [前端代码异常监控实战](https://github.com/happylindz/blog/issues/5)
- [前端错误监控指南](https://juejin.cn/post/6844904122844446733)

## 常见错误

- 脚本错误
  - 语法错误
  - 运行时错误
    - 同步错误
    - 异步错误
    - Promise 错误
- 网络错误
  - 资源加载错误
  - 自定义请求错误

## 错误捕获

1. 语法错误 通常在编译阶段就能发现
2. 运行时错误

### 常规捕获 try/catch （不能捕获异步错误）

3. try/catch 能捕获常规运行时错误，**语法错误和异步错误**不行

```js
// 常规运行时错误，可以捕获 ✅
try {
  console.log(notdefined);
} catch (e) {
  console.log('捕获到异常：', e);
}

// 异步错误，不能捕获 ❌
try {
  setTimeout(() => {
    console.log(notdefined);
  }, 0);
} catch (e) {
  console.log('捕获到异常：', e);
}
```

### window.onerror 捕获异步错误

```js
// 常规运行时错误，可以捕获 ✅

window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
console.log(notdefined);

// 语法错误，不能捕获 ❌
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
const notdefined,

// 异步错误，可以捕获 ✅
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
setTimeout(() => {
  console.log(notdefined);
}, 0)

// 资源错误，不能捕获 ❌
<script>
  window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
  return true;
}
</script>
<img src="https://yun.tuia.cn/image/kkk.png">
```

### window.addEventListener 捕获资源加载错误

3. window.addEventListener

> 当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，这些 error 事件不会向上冒泡到 window，但能被捕获。而 window.onerror 不能监测捕获。

```js
// 图片、script、css加载错误，都能被捕获 ✅
<script>
  window.addEventListener('error', (error) => {
     console.log('捕获到异常：', error);
  }, true)
</script>
<img src="https://yun.tuia.cn/image/kkk.png">
<script src="https://yun.tuia.cn/foundnull.js"></script>
<link href="https://yun.tuia.cn/foundnull.css" rel="stylesheet"/>

// new Image错误，不能捕获 ❌
<script>
  window.addEventListener('error', (error) => {
    console.log('捕获到异常：', error);
  }, true)
</script>
<script>
  new Image().src = 'https://yun.tuia.cn/image/lll.png'
</script>

// fetch错误，不能捕获 ❌
<script>
  window.addEventListener('error', (error) => {
    console.log('捕获到异常：', error);
  }, true)
</script>
<script>
  fetch('https://tuia.cn/test')
</script>
```

### unhandledrejection 也可以捕获 Promise 错误

try/catch 不能捕获 Promise 中的错误 =》Promise 错误，可以通过 unhandledrejection 捕获

```js
// 全局统一处理Promise
window.addEventListener('unhandledrejection', function (e) {
  console.log('捕获到异常：', e);
});
fetch('https://tuia.cn/test');
```
