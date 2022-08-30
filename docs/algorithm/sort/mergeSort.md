---
title: 归并排序（分治）
date: 2020-05-19 15:05:55
sidebar: auto
tags:
  - 算法与数据结构
  - 排序算法
categories:
  - 算法与数据结构
---

<!-- ![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/merge.png) -->

用到分治算法，将大数组二分为一为两个小数组，递归去比较排序。算法复杂度 $O(nlog(n))$

```js
var mergeSort = function (arr) {
  const len = arr.length;
  if (len === 1) return arr;
  const mid = Math.floor(len / 2);

  // 分
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // 治
  let res = [];
  while (left.length > 0 || right.length > 0) {
    // shift 推出
    if (left.length > 0 && right.length > 0) {
      res.push(left[0] < right[0] ? left.shift() : right.shift());
    } else if (left.length > 0) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }

  return res;
};
```

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
