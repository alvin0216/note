---
title: 手淘方案
---

根据 rem 做适配

:::details rem 与 em 的区别

- rem 是根据根元素的 `font-size` 计算像素大小，
- em 和 rem 很像，是根据父元素的 `font-size` 计算像素大小，父元素找不到就再往上一层找，直到找到根元素的 `font-size`

:::

这次咱们还是拿 iPhone5（640px）的设计稿举例，淘宝的思想是无论当前页面多宽，让 10rem = 页面宽度 = 100%，所以 1rem = 64px 然后通过 dpr 设置缩放整个页面，以达到高保真的效果。

iPhone5 的宽度是 640px，页面最终完成效果也是 640px，iPhone 的 dpr 是 2，所以设置

```HTML
<meta
  name="viewport"
  content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no" />
```

就可以了适配 iPhone5 了。当然这些东西 lib-flexible 都帮我们做好了。

- [淘宝、网易移动端 px 转换 rem 原理，Vue-cli 实现 px 转换 rem](https://juejin.im/post/6844903623999094791)
- [关于移动端适配，你必须要知道的](https://juejin.im/post/5cddf289f265da038f77696c)
- [web 移动端布局的那些事儿](https://juejin.im/post/5b6575b0518825196b01fd85)
