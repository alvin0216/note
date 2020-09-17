---
title: 1px 问题
---

## 1px 问题产生的原因

我们做移动端页面时一般都会设置 `meta` 标签 `viewport` 的 `content=width=device-width`，
这里就是把 html 视窗大小设置等于设备的大小，大多数手机的屏幕设备宽度都差不多。

以 iphoneX 为例，屏幕宽度 375px。而 UI 给设计图的时候基本上都是给的二倍图甚至三倍图。

假设设计图是 750px 的二倍图，**在 750px 上设计了 1px 的边框，要拿到 375px 宽度的手机来显示，就相当于缩小了一倍**，所以 1px 的边框要以 0.5px 来呈现才符合预期效果，然而 css 里最低只支持 1px 大小，不足 1px 就以 1px 显示，所以你看到的就显得边框较粗，实际上只是设计图整体缩小了，而边框粗细没有跟着缩小导致的。

简而言之就是：多倍的设计图设计了 1px 的边框，在手机上缩小呈现时，**由于 css 最低只支持显示 1px 大小**，导致边框太粗的效果。

解决方法有很多，根据项目环境和使用场景选择最合适的就行，下面整理了几种解决方式：

## 通过设置 meta 标签 viewport（不推荐）

分析 1px 像素产生原因时，有说到 meta 标签设置的 width=device-width，其实这也是产生 1px 像素问题的前提条件之一，无论你是 rem 适配方式还是媒体查询的响应式布局，你最终在 375px 的总宽度下，边框最小 css 单位也只能是 1px，而 750px 的设计图里 1px 占 1/750，375px 里 1px 占 1/375，比例大了一倍，视觉上肯定是粗了。

所以，如果设置 content 的 width 就等于设计图大小 750px，然后通过动态设置 maximum-scale 值让网页整体缩放，就能实现效果了，这也是适配移动端不同屏幕大小的一种思路。

```js
<meta name="viewport" content="width=750,initial-scale=1.0,maximum-scale=0.5">
```

这样就能让 iphoneX 完美还原 750px 的设计图了，maximum-scale 的值就等于 window.screen.width / 750，

不过这样设置后，在和其他 content 属性 width 值不同的页面间来回切换会产生横向及纵向滚动条，如果是公司同一项目里切换页面还好，一旦有和其他项目的跳转交互就会产生 bug，不推荐使用。

## viewport+rem

```html
<meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />

<script>
  var viewport = document.querySelector('meta[name=viewport]')
  //下面是根据设备像素设置viewport
  if (window.devicePixelRatio == 1) {
    viewport.setAttribute(
      'content',
      'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
    )
  }
  if (window.devicePixelRatio == 2) {
    viewport.setAttribute(
      'content',
      'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no'
    )
  }
  if (window.devicePixelRatio == 3) {
    viewport.setAttribute(
      'content',
      'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no'
    )
  }
  var docEl = document.documentElement
  var fontsize = 32 * (docEl.clientWidth / 750) + 'px'
  docEl.style.fontSize = fontsize
</script>
```

参见 [手淘](./flexible.md)

## 使用 transform: scale（推荐）

利用缩放，将 1px 缩放一半 ～

- [吃透移动端 1px ｜从基本原理到开源解决方案](https://juejin.im/post/6844904023145857038)
- [滴滴 1px 解决方案](https://github.com/dengwb1991/owl-ui/blob/master/src/styles/common/border.less)
