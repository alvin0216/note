---
title: 响应式布局基础：REM
date: 2020-06-16 17:42:44
---

- [关于移动端适配，你必须要知道的](https://juejin.im/post/5cddf289f265da038f77696c)
- [web 移动端布局的那些事儿](https://juejin.im/post/5b6575b0518825196b01fd85)

## <span class='orange'>r</span>em 和 em 的差别

很明显多了一个 `r`，可以理解为 `root` 也即根。理解一下，

- rem 是根据根元素的 `font-size` 计算像素大小，
- em 和 rem 很像，是根据父元素的 `font-size` 计算像素大小，父元素找不到就再往上一层找，直到找到根元素的 `font-size`

demo：

```html
<div class="box">
  <div class="item">
    <div class="inner"></div>
  </div>
</div>

<style>
  .box {
    width: 4rem; /* 浏览器默认字体大小 16px, 所以 1rem 代表 16px，4rem = 64px */
    height: 4rem;
    background-color: gray;
    font-size: 32px; /* 设置 font-size 24，box 下的子元素设置 em 会以这个值为基准 */
  }
  .item {
    width: 1em; /* 32px */
    height: 1em;
    background-color: red;
  }
  .inner {
    width: 1em; /* 32px */
    height: 1em;
    position: relative;
    left: 1em;
    background-color: green;
  }
</style>
```

## 移动端适配基础

- `分辨率` 一个屏幕具体由多少个像素点组成

  - `像素` 图像显示的基本单位 一个个小方块
  - `屏幕分辨率` 一个屏幕具体由多少个像素点组成
  - `图像分辨率` 指图片含有的像素数
  - `PPI` 每英寸包括的像素数 越高越清晰。
    - 计算公式：√（水平像素点^2+垂直像素点^2）/ 尺寸
    - 如 iphone6 尺寸为 4.7 寸，也即对角线长度
  - `DPI` 每英寸包括的点数。

- `设备独立像素`
  - `dpr`: 物理像素和设备独立像素的比值。

....[关于移动端适配，你必须要知道的](https://juejin.im/post/5cddf289f265da038f77696c)

## 手淘方案

1. 设置 meta

```html
<!-- 视觉视窗大小设置成和布局视窗大小相等，这样我们在代码设置css像素时，设置的跟渲染出来效果也是一样的。 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
/>
```

2. head 引入 [flexible](https://github.com/amfe/lib-flexible/blob/master/src/flexible.js)
