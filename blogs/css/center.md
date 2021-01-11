---
title: 水平垂直居中解决方案
date: 2019-12-23 00:00:21
sidebar: 'auto'
tags:
  - CSS
  - 水平垂直居中
categories:
  - HTML & CSS
---

![](https://gitee.com/alvin0216/cdn/raw/master/images/css-center.png)

:::: tabs

::: tab 绝对定位 + 负边距

```html
<div class="box">
  <div class="center"></div>
</div>
```

```css
.box {
  width: 300px;
  height: 300px;
  border: 2px solid #ccc;
  position: relative;
}
.center {
  height: 10px;
  width: 20px;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -5px; /* height 的一半 */
  margin-left: -10px; /* width 的一半 */
}
```

:::

::: tab 绝对定位 + transform

```css
.center {
  height: 10px;
  width: 20px;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  /* margin-top: -5px; */
  /* margin-left: -10px; */
  transform: translate(-10px, -5px);
}
```

:::

::: tab flex 解决方案

```css
.box {
  width: 300px;
  height: 300px;
  border: 2px solid #ccc;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

:::

::: tab 文本（text-align + line-height）

:::

::::
