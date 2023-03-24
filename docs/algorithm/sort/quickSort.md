---
title: 快速排序（基准）
date: 2020-05-19 15:05:55
sidebar: auto
tags:
  - 算法与数据结构
  - 排序算法
categories:
  - 算法与数据结构
---

和归并一样，采用分治思想。不同的是，快排不是将数组一分为二，而是采用一个 “基准” 值。

也即 `[...rec(left), 基准, ...rec(right)]`，算法复杂度 $O(nlog(n))$

```js
function quickSort(arr) {
  let len = arr.length;
  if (len < 2) return arr; // 临界条件

  const pivot = arr[0];
  const left = [];
  const right = [];

  // 分治
  for (let i = 1; i < len; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```
