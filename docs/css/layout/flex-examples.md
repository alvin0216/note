---
title: flex 实战
date: 2020-06-30 09:42:49
---

## 常用的 flex 1 到底是啥意思？

```css
/* 放大比例 缩小比例 项目宽度 */
flex: flex-grow, flex-shrink, flex-basis;
```

默认值 `0 1 auto`, 也即剩余空间不放大，等比例缩小，宽度自动

### flex: 1 也即 1 1 auto

当 flex 取值为一个**非负数字**，则 flex-grow 数字，flex-shrink 取 1，flex-basis 取 0%（最常用）

```css
.item {
  flex: 1;
}

/* 等同于 */
.item {
  flex: 1 1 auto;
}

/** 也等同于 **/
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

`flex-grow: 1` 也就是说父容器有多余的空间，如果只有一个 `item` 设置为 1，则这个 `item` 占满整个剩余空间，

如果两个 `item` 为 1，则这两个 `item` 平分剩余空间，详见 [flex-grow](./flex.md#flex-grow-剩余空间放大比例)

### 当 flex 取值为 none，则计算值为 0 0 auto

```css {3}
.item {
  flex-grow: 0;
  flex-shrink: 0; /* 默认 1 等比例缩小，0 代表不缩小*/
  flex-basis: auto;
}
```

### 当 flex 取值为 auto，则计算值为 1 1 auto

```css {2}
.item {
  flex-grow: 1; /* 空间分配比例为 1*/
  flex-shrink: 1;
  flex-basis: auto;
}
```

### 当 flex 取值为一个长度或百分比，则视为 flex-basis 值

```css
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

## 实战

### 等分布局

```html {10,13,17}
<div class="box">
  <div class="item1">1</div>
  <div class="item2">2</div>
</div>

<style>
  .box {
    width: 400px;
    height: 30px;
    display: flex;
  }
  .item1 {
    flex: 1; /* 或者 flex-grow: 1 */
    background-color: green;
  }
  .item2 {
    flex: 1;
    background-color: red;
  }
</style>
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/css/flex/flex-demo1.png)

### 垂直水平居中对齐

```css
.box {
  width: 400px;
  height: 400px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- `justify-content: center`: 水平对齐
- `align-items: center`: 居中对齐

### 左边固定右边自适应

```css
.box {
  display: flex;
  height: 200px;
}
.left {
  flex-basis: 200px;
  background-color: red;
}
.right {
  flex: 1;
  background-color: green;
}
```

[flex 深度剖析-解决移动端适配问题！](https://juejin.im/post/5e72eca86fb9a07cd80f410f)
