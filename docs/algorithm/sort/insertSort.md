---
title: 插入排序
date: 2020-05-19 15:05:55
sidebar: auto
tags:
  - 算法与数据结构
  - 排序算法
categories:
  - 算法与数据结构
---

## 算法步骤

1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
2. 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/insertSort.png)

## 基本实现

```js
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let prevIndex = i - 1;

    while (arr[prevIndex] > current) {
      arr[prevIndex + 1] = arr[prevIndex]; // 如果前一个比 current 大，则往后移动一位，prevIndex-- 继续循环
      prevIndex--;
    }
    arr[prevIndex + 1] = current; // 插入
  }

  return arr;
}
```

## 使用二分查找

首先把二分查找算法做一点小修改，以适应我们的插入排序：

```js
function binarySearch(arr, maxIndex, value) {
  let min = 0;
  let max = maxIndex;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (arr[mid] <= value) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return min;
}
```

然后在查找插入位置时使用二分查找的方式来优化性能：

```js
function insertionSort2(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const current = arr[i];
    const insertIndex = binarySearch(arr, i - 1, current); // 找到当前需要插入的 index

    for (let prevIndex = i - 1; prevIndex >= insertIndex; prevIndex--) {
      arr[prevIndex + 1] = arr[prevIndex];
    }
    arr[insertIndex] = current; // 恢复
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(insertionSort2(arr));
```

- 稳定
- 适合场景：对快要排序完成的数组时间复杂度为 O(n)
- 非常低的开销
- 时间复杂度 `O(n²)`

> 由于它的优点（自适应，低开销，稳定，几乎排序时的 `O（n）`时间），插入排序通常用作递归基本情况（当问题规模较小时）针对较高开销分而治之排序算法， 如希尔排序或快速排序。

- 高性能（特别是接近排序完毕时的数组），低开销，且稳定
- 利用二分查找来优化

---

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
