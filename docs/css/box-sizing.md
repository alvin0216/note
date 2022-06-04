---
title: 盒子模型
date: 2022-06-04 12:45:16
sidebar: auto
tags:
  - box-sizing
  - 盒子模型
categories:
  - HTML & CSS
---

```html
<style>
  .box {
    width: 10px;
    height: 10px;
    padding: 2px;
    border: 1px solid red;
    margin: 2px;
    background-color: blue;
  }
  .border {
    box-sizing: border-box;
  }

  .content {
    box-sizing: content-box;
  }
</style>

<div class="box border"></div>
<div class="box content"></div>
```

求 `border` `content` 蓝色区域的宽高！

1. content: 14px
2. border: 8px

- content: `10px + 2px * 2 (两个 padding)`
- 蓝色区域 border-box: `10px - 1px * 2 (两个 border)`
