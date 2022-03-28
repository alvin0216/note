---
title: 堆排序
date: 2020-05-19 15:05:55
sidebar: auto
tags:
  - 算法与数据结构
  - 排序算法
categories:
  - 算法与数据结构
---

## 简明解释

堆的定义

堆其实是一种特殊的树。只要满足这两点，它就是一个堆。

堆排序可以认为是选择排序的改进版，像选择排序一样将输入划分为已排序和待排序。

不一样的是堆排序利用堆这种近似完全二叉树的良好的数据结构来实现排序，本质上使用了二分的思想。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/heapSort.png)

## 算法步骤

- 创建一个堆 H[0……n-1]；
- 把堆首（最大值）和堆尾互换；
- 把堆的尺寸缩小 1，并调用 shift_down(0)，目的是把新的数组顶端数据调整到相应位置；
- 重复步骤 2，直到堆的尺寸为 1。

## 基本实现

```js
function heapSort(arr) {
  let size = arr.length;

  // 初始化堆，i 从最后一个父节点开始调整，直到节点均调整完毕
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(arr, i, size);
  }
  // 堆排序：先将第一个元素和已拍好元素前一位作交换，再重新调整，直到排序完毕
  for (let i = size - 1; i > 0; i--) {
    swap(arr, 0, i);
    size -= 1;
    heapify(arr, 0, size);
  }

  return arr;
}

function heapify(arr, index, size) {
  let largest = index;
  let left = 2 * index + 1;
  let right = 2 * index + 2;

  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== index) {
    swap(arr, index, largest);
    heapify(arr, largest, size);
  }
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(heapSort(arr));
```

---

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
