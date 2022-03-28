---
title: 选择排序
date: 2020-05-19 15:05:55
sidebar: auto
tags:
  - 算法与数据结构
  - 排序算法
categories:
  - 算法与数据结构
---

选择排序是外层循环，内循环找到最小或者最大的值的 index, 如果当前的元素不等于 index，则交换位置，算法复杂度 $O(n^2)$

```TS
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }

    if (minIndex !== i) swap(arr, minIndex, i)
  }
  return arr
}


// test
let arr = [4, 2, 3, 6, 5]
console.log(selectionSort(arr)) // [ 2, 3, 4, 5, 6 ]
```

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/selectionSort.png)

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
