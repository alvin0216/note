---
title: 渲染流程
date: 2020-06-13 20:39:22
---

## 如果下载 CSS 文件阻塞了，会阻塞 DOM 树的合成吗？会阻塞页面的显示吗？

当从服务器接收 HTML 页面的第一批数据时，DOM 解析器就开始工作了，在解析过程中，如果遇到了 JS 脚本，如下所示：

```html
<html>
  <body>
    极客时间
    <script>
      document.write('--foo')
    </script>
  </body>
</html>
```

那么 DOM 解析器会先执行 JavaScript 脚本，执行完成之后，再继续往下解析。

那么第二种情况复杂点了，我们内联的脚本替换成 js 外部文件，如下所示：

```js
<html>
  <body>
    极客时间
    <script type='text/javascript' src='foo.js'></script>
  </body>
</html>
```

这种情况下，当解析到 JavaScript 的时候，会先暂停 DOM 解析，并下载 foo.js 文件，下载完成之后执行该段 JS 文件，然后再继续往下解析 DOM。这就是 JavaScript 文件为什么会阻塞 DOM 渲染。

我们再看第三种情况，还是看下面代码：

```html
<html>
  <head>
    <style type="text/css" src="theme.css" />
  </head>
  <body>
    <p>极客时间</p>
    <script>
      let e = document.getElementsByTagName('p')[0]
      e.style.color = 'blue'
    </script>
  </body>
</html>
```

当我在 JavaScript 中访问了某个元素的样式，那么这时候就需要等待这个样式被下载完成才能继续往下执行，所以在这种情况下，CSS 也会阻塞 DOM 的解析。

**所以 JS 和 CSS 都有可能会阻塞 DOM 解析**

[css 加载是否会阻塞 dom 树渲染](https://www.cnblogs.com/crith/p/9961301.html)
