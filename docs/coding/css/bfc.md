---
title: 什么是 BFC？
date: 2019-12-23 00:00:21
sidebar: 'auto'
tags:
  - HTML
  - BFC
categories:
  - HTML & CSS
---

`BFC` 直译为块级格式化范围，说白了就是形成一个独立的渲染区域，容器中的元素和容器外的元素布局互不影响。

通过为元素设置一些 CSS 属性就能创建 BFC，而最常用的触发规则有 4 种。

1. float 不为 none。
2. position 为 absolute 和 fixed。
3. overflow 为 auto、 scroll 和 hidden。
4. display 为 table-cell、inline-block、line-block、line-flex,flex。

现在就让我们来使用 BFC 去解决一些布局上的问题：

## 解决边距重叠问题

什么是边距重叠呢?

边界重叠是指两个或多个盒子(可能相邻也可能嵌套)的相邻边界(其间没有任何非空内容、补白、边框)重合在一起而形成一个单一边界。

:::: tabs
::: tab 父子元素边界重叠 (高度坍塌)

```html
<style>
  .parent {
    background: #e7a1c5;
  }
  .parent .child {
    background: #c8cdf5;
    height: 100px;
    margin-top: 10px;
  }
</style>
<div class="parent">
  <div class="child"></div>
</div>
```

效果：![](https://gitee.com/alvin0216/cdn/raw/master/images/bfc1.png)

在这里父元素的高度不是 110px，而是 100px，在这里发生了**高度坍塌**。

使用 BFC 解决：

```css {3}
.parent {
  background: #e7a1c5;
  overflow: scroll;
}
```

:::

::: tab 兄弟元素边界重叠 (取最大边距)

```html
<style>
  #margin {
    background: #e7a1c5;
    overflow: hidden;
    width: 300px;
  }
  #margin > p {
    background: #c8cdf5;
    margin: 20px auto 30px;
  }
</style>
<section id="margin">
  <p>1</p>
  <p>2</p>
  <p>3</p>
</section>
```

![](https://gitee.com/alvin0216/cdn/raw/master/images/bfc2.png)

可以看到 1 和 2,2 和 3 之间的间距不是 50px，发生了**边距重叠是取了它们之间的最大值** 30px。

兄弟元素的边界重叠，在第二个子元素创建一个 BFC 上下文：

```html
<section id="margin">
  <p>1</p>
  <div style="overflow:hidden;">
    <p>2</p>
  </div>
  <p>3</p>
</section>
```

![](https://image-static.segmentfault.com/235/486/2354863765-5a23c6b0a4041_articlex)

:::

::: tab 空元素边界重叠 [取空元素最大边距]

```html {8}
<style>
  p:nth-child(1),
  p:nth-child(3) {
    height: 20px;
    background-color: #c8cdf5;
  }
  p:nth-child(2) {
    margin: 20px 0 30px 0;
  }
</style>
<p>1</p>
<p></p>
<p>3</p>
```

![](https://gitee.com/alvin0216/cdn/raw/master/images/bfc3.png)

:::

::::

## 清除内部浮动

假设页面有一个父元素和几个子元素，这几个子元素都设置为浮动时，就会产生高度坍塌的现象，这是因为浮动的子元素脱离了文档流。

```html
<style>
  #float {
    background: #fec68b;
  }
  #float .float {
    float: left;
  }
</style>
<section id="float">
  <div class="float">我是浮动元素</div>
</section>
```

父元素`#float` 的高度为 0，解决方案为为父元素`#float` 创建 BFC，这样浮动子元素的高度也会参与到父元素的高度计算：

```css
#float {
  background: #fec68b;
  overflow: hidden; /*这里也可以用float:left*/
}
```

## 自适应两栏布局

```html
<section id="layout">
  <style>
    #layout {
      background: red;
    }
    #layout .left {
      float: left;
      width: 100px;
      height: 100px;
      background: pink;
    }
    #layout .right {
      height: 110px;
      background: #ccc;
    }
  </style>
  <!--左边宽度固定，右边自适应-->
  <div class="left">左</div>
  <div class="right">右</div>
</section>
```

在这里设置右边的高度高于左边，可以看到左边超出的部分跑到右边去了，这是由于由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样导致的。

![](https://gitee.com/alvin0216/cdn/raw/master/images/bfc4.png)

解决方案为给右侧元素创建一个 BFC，原理是 BFC 不会与 float 元素发生重叠。

```css
#layout .right {
  height: 110px;
  background: #ccc;
  overflow: auto;
}
```

![](https://gitee.com/alvin0216/cdn/raw/master/images/bfc5.png)

参考 [边距重叠与 BFC](https://segmentfault.com/a/1190000012265930)
