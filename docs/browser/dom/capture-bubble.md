---
title: 捕获与冒泡
date: 2020-09-16 10:35:15
---

事件冒泡和事件捕获分别由微软和网景公司提出，这两个概念都是为了解决页面中**事件流**（事件发生顺序）的问题。

## 区别

**顺序：先捕获后冒泡**

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/chrome/capture-bubble.png)

- **捕获**：事件的传递方向为根到叶子节点
- **冒泡**：事件的传递方向为叶子节点到根

:::tip 冒泡兼容性好，不同浏览器版本还是有区别

所有现代浏览器都支持事件冒泡，不过还是有所区别

- IE9、Firefox、chrome、Safari: 目标元素-->外层元素….-->body-->html-->document--> `window`
- IE9 以下：目标元素-->外层元素….-->body-->html--> `document`

:::

:::warning 事件捕获具有兼容性问题

由于老版本的浏览器（IE8 及更早版本）不支持捕获，因为很少有人使用事件捕获.推荐大家放心使用冒泡，因为现代浏览器都支持，在有特殊需要时再使用事件捕获。

:::

## addEventListener

在添加事件监听，可以使用 `addEventListener`, IE 下则是 `attachEvent/detachEvent`

```js
// 第三个参数是 useCapture 是否启用捕获 默认false
addEventListener('click', function() {}, false)
```

举个例子：

```html
<div id="box1">
  <div id="box2">
    <button>click</button>
  </div>
</div>
```

添加事件监听

```js
const $box1 = document.querySelector('#box1')
const $box2 = document.querySelector('#box2')
const $button = document.querySelector('button')

$button.addEventListener('click', () => console.log('$button'))
$box1.addEventListener('click', () => console.log('$box1'))
$box2.addEventListener('click', () => console.log('$box2'))
```

默认冒泡，那么顺序为 `button -> box2 -> box1`

如果我们对 `box2` 启用捕获，那么先执行的事件就会变成 `box2`

```diff
$button.addEventListener('click', () => console.log('$button'))
$box1.addEventListener('click', () => console.log('$box1'))
- $box2.addEventListener('click', () => console.log('$box2'))
+ $box2.addEventListener('click', () => console.log('$box2'), true)
```

那么顺序为 `box2 -> button -> box1`

- [DOM 事件流和冒泡、捕获](https://juejin.im/post/6857800122563035150)
