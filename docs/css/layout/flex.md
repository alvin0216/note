---
title: flex 布局
date: 2020-06-29 22:32:40
---

Flex 容器属性

```css
主轴方向：水平排列（默认）|水平反向排列|垂直排列|垂直反向排列flex-direction: row | row-reverse | column | column-reverse;

换行：不换行（默认）|换行|反向换行(第一行在最后面)flex-wrap: nowrap | wrap | wrap-reverse;

flex-direction属性和flex-wrap属性的简写形式，默认值为rownowrapflex-flow: <flex-direction> || <flex-wrap>;

主轴对齐方式：起点对齐（默认）|终点对齐|居中对齐|两端对齐|分散对齐
justify-content: flex-start | flex-end | center | space-between | space-around;

交叉轴对齐方式：拉伸对齐（默认）|起点对齐|终点对齐|居中对齐|第一行文字的基线对齐
align-items: stretch | flex-start | flex-end | center | baseline;

多根轴线对齐方式：拉伸对齐（默认）|起点对齐|终点对齐|居中对齐|两端对齐 | 分散对齐
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
```

Flex 项目属性

```css
顺序：数值越小越靠前，默认为0
order: <number>;

放大比例：默认为0，如果有剩余空间也不放大，值为1则放大，2是1的双倍大小，以此类推
flex-grow: <number>;

缩小比例：默认为1，如果空间不足则会缩小，值为0不缩小
flex-shrink: <number>;

项目自身大小：默认auto，为原来的大小，可设置固定值 50px/50%
flex-basis: <length> | auto;

flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
两个快捷值：auto (1 1 auto) 和 none (0 0 auto)
flex:none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

项目自身对齐：继承父元素（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 基线对齐 | 拉伸对齐
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

## 父容器

### justify-content

<img src='http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png' class='small' />

具体对齐方式与轴的方向有关。下面假设主轴为从左到右

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items

<img src='http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png' class='small' />

它可能取 5 个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。

### align-content

<img src='http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png' class='small'/>

## 设置项目

推荐

- [深入理解 flex-grow、flex-shrink、flex-basis](https://juejin.im/post/5dedb28ef265da33b12e98cd)

### order [项目排列顺序]

order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

```css
.item {
  order: <integer>;
}
```

### flex-grow [剩余空间放大比例]

flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

<img src='http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png' class='small'/>

假设默认三个项目中前两个个项目都是 0，最后一个是 1，最后的项目会沾满剩余所有空间。

```html {23}
<div class="box">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<style>
  .box {
    width: 400px;
    background-color: #ccc;
    display: flex;
  }
  .box div {
    width: 20px;
  }
  .box div:nth-child(1) {
    background-color: pink;
  }
  .box div:nth-child(2) {
    background-color: green;
  }
  .box div:nth-child(3) {
    flex-grow: 1;
    background-color: blue;
  }
</style>
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/css/flex/flex-grow1.png)

假设只有第一个项目默认为 0，后面两个项目 flex-grow 均为 1，那么后两个项目平分剩余空间。

```css {2}
.box div:nth-child(2) {
  flex-grow: 1;
  background-color: green;
}
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/css/flex/flex-grow2.png)

同理。。。

### flex-shrink [不足空间缩小比例]

用于决定项目在空间不足时是否缩小，默认项目都是 1，即**空间不足**时大家一起等比缩小；

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

但如果某个项目 flex-shrink 设置为 0，则即便空间不够，自身也不缩小。

![](https://img2018.cnblogs.com/blog/1213309/201908/1213309-20190808191100715-1387948858.gif)

### flex-basis [设置项目宽度]

取值：默认 auto，用于设置项目宽度，默认 auto 时，项目会保持默认宽度，或者以 width 为自身的宽度，但`如果设置了 flex-basis，权重会 width 属性高，因此会覆盖 widtn 属性`。

![](https://img2018.cnblogs.com/blog/1213309/201908/1213309-20190808192004493-824002338.png)

上图中先设置了 flex-basis 属性，后设置了 width 属性，但宽度依旧以 flex-basis 属性为准。

### flex [grow, shrink, basis] ✨

取值：默认 `0 1 auto`，flex 属性是 flex-grow，flex-shrink 与 flex-basis 三个属性的简写，用于定义项目放大，缩小与宽度。

```CSS
.item {flex: 2333 3222 234px;}
.item {
  flex-grow: 2333;
  flex-shrink: 3222;
  flex-basis: 234px;
}
```

当 flex 取值为 `none`，则计算值为 0 0 auto，如下是等同的：

```CSS
.item {flex: none;}
.item {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}

```

> `flex:1` 到底代表什么?

### align-self

取值：auto(默认) | flex-start | flex-end | center | baseline | stretch，表示继承父容器的 align-items 属性。如果没父元素，则默认 stretch。

![](https://img2018.cnblogs.com/blog/1213309/201908/1213309-20190808193900553-1175612273.png)

---

参考

- [一劳永逸的搞定 flex 布局](https://juejin.im/post/58e3a5a0a0bb9f0069fc16bb)
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [一篇文章弄懂 flex 布局](https://www.cnblogs.com/echolun/p/11299460.html)
- [深入理解 flex-grow、flex-shrink、flex-basis](https://juejin.im/post/5dedb28ef265da33b12e98cd)
- [flex 实战](./flex-examples.md)
