---
title: h5 history 和 location
date: 2020-07-24 20:51:28
sidebar: 'auto'
tags:
  - React Router
categories:
  - React
---

## History

可以**在不刷新页面的前提下动态改变浏览器地址栏中的 URL 地址**，动态修改页面上所显示资源。

```html
<a onclick="push('/a')">Link A</a> | <a onclick="push('/b')">Link B</a>
<script>
  function push(path) {
    history.pushState({ p: path }, null, path);
  }
</script>
```

![h5-history](https://gitee.com/alvin0216/cdn/raw/master/images/h5-history.gif)

```js
//返回
window.history.back();
window.history.go(-1);
//向前跳转
window.history.foward();
window.history.go(1);

//历史记录中页面总数
history.length;
```

---

<h4>pushState</h4>

[pushState](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState): 添加和替换历史记录的条目

语法：`history.pushState(state, title[, url])`

- state: 一个于指定网址相关的状态对象，popstate 事件触发时，该对象会传入回调函数中。如果不需要这个对象，此处可以填 null。
- title : 新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填 null。
- url : 新的网址，必须与前页面处在同一个域。浏览器的地址栏将显示这个网址。

demo2:

```js
history.pushState(null, null, './demo.html');
```

<h4>replaceState</h4>

`history.replaceState(state, title, url)`; 替换当前的历史记录，不刷新页面

```js
//demo.html
history.replaceState(null, null, '?one');
```

<h4>事件</h4>

1. `popstate` 事件：历史记录发生改变时触发，调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件
2. `hashchange` 事件：当页面的 `hash` 值改变的时候触发，常用于构建单页面应用

## Location

当然，当我们更改 URL 时，可能会出现这样一种情况：我们只更改了 URL 的片段标识符 (跟在＃符号后面的 URL 部分，包括＃符号)，这种情况下将触发 hashchange 事件，使用方法如下：

```html
<a href="#/a">页面A</a>
<a href="#/b">页面B</a>

<script>
  window.addEventListener('hashchange', () => {
    console.log(window.location.hash);
  });
</script>
```

| 属性     | 描述                                          | 值                                                      |
| -------- | --------------------------------------------- | ------------------------------------------------------- |
| hash     | 设置或返回从井号 (#) 开始的 URL（锚）。       | "#first"                                                |
| host     | 设置或返回主机名和当前 URL 的端口号。         | "b.a.com:88"                                            |
| hostname | 设置或返回当前 URL 的主机名。                 | "b.a.com"                                               |
| href     | 设置或返回完整的 URL。                        | "http://b.a.com:88/index.php?name=kang&when=2011#first" |
| pathname | 设置或返回当前 URL 的路径部分。               | "/index.php"                                            |
| port     | 设置或返回当前 URL 的端口号。                 | 88                                                      |
| protocol | 设置或返回当前 URL 的协议。                   | "http:"                                                 |
| search   | 设置或返回从问号 (?) 开始的 URL（查询部分）。 | "?name=kang&when=2011"                                  |

---

参考

- [HTML5 : History API](https://juejin.im/post/5aebc4a26fb9a07acc11924d)
- [HTML5 History API 和 Location 对象剖析](https://github.com/hijiangtao/hijiangtao.github.io/blob/master/_posts/2017-08-20-History-API-and-Location-Object.md)
