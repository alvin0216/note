---
title: icon 图片变色处理
date: 2021-07-22 11:41:49
sidebar: auto
tags:
  - drop-shadow
categories:
  - HTML & CSS
---

- [drop-shadow 详解](https://blog.csdn.net/csdn_yudong/article/details/79364638)
- [被低估的 CSS 滤镜：drop-shadow](https://zhuanlan.zhihu.com/p/195792157)

:::demo

```html
<h4>原图标</h4>
<img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/icon64.png" />

<h4>变色后</h4>
<div class="png-icon">
  <img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/icon64.png" />
</div>

<style>
  .png-icon {
    display: inline-block;
    overflow: hidden;
  }
  .png-icon img {
    width: 64px;
    height: 64px;
    transform: translateX(-100%);
    filter: drop-shadow(64px 0 red);
  }
</style>
```

:::

遇到的坑，最外层超出滚动，整个就不显示了，mac 下有问题而 window 确没问题。

:::demo

```html
<div class="box">
  <div class="png-icon">
    <img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/icon64.png" />
  </div>
  <div class="png-icon">
    <img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/icon64.png" />
  </div>
  <div class="png-icon">
    <img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/icon64.png" />
  </div>
  <div class="png-icon">
    <img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/icon64.png" />
  </div>
  <div class="png-icon">
    <img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/icon64.png" />
  </div>
</div>

<style>
  .box {
    width: 200px;
    height: 200px;
    overflow-y: scroll;
    /* transform: rotate(0deg); */
  }
  .box .png-icon {
    display: inline-block;
    overflow: hidden;
    border: 1px solid #ccc;
  }

  .box .png-icon img {
    width: 64px;
    height: 64px;
    transform: translateX(-100%);
    filter: drop-shadow(64px 0 red);
  }
</style>
```

:::

解决方案，如上 `transform: rotate(0deg);` 注释打开即可。
