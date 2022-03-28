---
title: transform scale
date: 2021-08-30 14:56:42
sidebar: auto
tags:
  - transform
categories:
  - HTML & CSS
---

[MDN transform scale](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/scale)

demo：

:::demo

```html
<div class="container">
  <div class="box box1">box</div>
  <div class="box box2">box</div>
  <div class="box box3">box</div>
  <div class="box box4">box</div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 100px 100px;
    grid-row: auto auto;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  .box {
    height: 100px;
    background: yellow;
  }

  .box3 {
    transform: scaleX(-1);
  }

  .box2 {
    transform: scaleY(-1);
  }

  .box1 {
    transform: scale(-1);
  }
</style>
```

:::

`transform-origin` 可以用来设置变换的位置，比如

:::demo

```html
<div class="bb bb1">bb</div>
<div class="bb bb2">transform: scale(1.5)</div>
<div class="bb bb3">transform-origin: left</div>

<style>
  .bb {
    margin-left: 100px;
    width: 100px;
    height: 100px;
    background: yellow;
  }

  .bb1 {
    margin-bottom: 50px;
  }
  .bb2 {
    margin-bottom: 80px;
    transform: scale(1.5);
  }

  .bb3 {
    transform: scale(1.5);
    transform-origin: left;
  }
</style>
```

:::
