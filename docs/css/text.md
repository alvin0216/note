---
title: CSS 文本处理
date: 2020-07-03 11:02:26
---

## 实用

### 超出省略号

<h4>单行文本溢出省略</h4>

```css
.box {
  overflow: hidden; /* 文字长度超出限定宽度，则隐藏超出的内容 */
  white-space: nowrap； /* 设置文字在一行显示，不能换行 */
  text-overflow: ellipsis；/* 规定当文本溢出时，显示省略符号来代表被修剪的文本 */
}
```

<h4>多行文本溢出省略</h4>

```css
.box {
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 2; /* 用来限制在一个块元素显示的文本的行数, 2 表示最多显示 2 行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 单行文字居中多行文字居左

```html
<div class="content">
  <span class="text">这段文字能不能这样判断一下，当文字不足一行时，让它居中显示，当文字超过一行就让它居左</span>
</div>

<style>
  .content {
    text-align: center;
  }
  .text {
    display: inline-block;
    text-align: left;
  }
</style>
```

> 对于一个元素，如果其 `display` 属性值是 `inline-block`，那么其宽度由内部元素决定，但永远小于“包含块”容器的尺寸，也就是“包裹性（`shrink-to-fit`）”

更多方式查阅：[探索 CSS 单行文字居中，多行文字居左的实现方式](https://juejin.im/post/5e01bf03e51d45581b11f376)

### 文字两端对齐

```css
.box {
  text-align-last: justify;
}
```

## 概念

### 文字换行

<span class='orange'>word-break</span> 规定自动换行的处理方法。

| 值        | 描述                                     |
| --------- | ---------------------------------------- |
| normal    | 默认换行 中文文字换行 + 不允许单词内换行 |
| break-all | 允许在单词内换行                         |
| keep-all  | 只能在半角空格或连字符处换行             |

效果

<img src='https://gitee.com/alvin0216/cdn/raw/master/img/css/note/word-break.png' class='small center' />

<span class='orange'>white-space</span> 属性设置如何处理元素内的空白

见 [CSS 文字超出隐藏](https://juejin.im/post/5d35b380518825413a51d8d8)

### line-height & vertical-align

| 字段           | 计算规则                               |
| -------------- | -------------------------------------- |
| line-height    | font-size \* 数值                      |
| vertical-align | 百分比的计算值是 line-height \* 百分比 |

:::details example

```html {5,10}
<div>文字<img src="./delete.png" /></div>
<style>
  div {
    font-size: 20px;
    line-height: 1.5; /* font-size * 数值 ==> 20px * 1.5 = 30px */
  }
  div > img {
    width: 16px;
    height: 16px;
    vertical-align: 25%; /* line-height * 百分比 = 30px * 25% = 7.5px */
  }
</style>
```

:::

## 相关链接

- [CSS 进阶（17）—— CSS 中的文本处理（上）](https://juejin.im/post/5d12dcc0f265da1b7638b120)
- [可能是最全的 “文本溢出截断省略” 方案合集](https://juejin.im/post/5dc15b35f265da4d432a3d10)
