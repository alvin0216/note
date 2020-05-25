---
title: 插入排序
date: 2020-05-19 15:05:55
---

## 算法步骤

1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
2. 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

![](../../../assets/algorithm/sort/insertSort.png)

## 第一版：基本实现

```js
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]
    let prevIndex = i - 1

    while (arr[prevIndex] > current) {
      arr[prevIndex + 1] = arr[prevIndex]
      prevIndex--
    }
    arr[prevIndex + 1] = current // 恢复最后一项
  }

  return arr
}
```

## 二分查找算法

因为对于插入排序的优化方法是二分查找优化，这里补充一下二分查找的算法的实现。

核心概念是：**折半**。

```js
function binarySearch(arr, value) {
  let min = 0
  let max = arr.length - 1

  while (min <= max) {
    const mid = Math.floor((min + max) / 2)

    if (arr[mid] === value) {
      return mid
    } else if (arr[mid] > value) {
      max = mid - 1
    } else {
      min = mid + 1
    }
  }

  return 'Not Found'
}

// test
const arr = [1, 2, 3]
console.log(binarySearch(arr, 2)) // 1
console.log(binarySearch(arr, 4)) // Not Found
```

## 第二版：使用二分查找

首先把二分查找算法做一点小修改，以适应我们的插入排序：

```js
function binarySearch(arr, maxIndex, value) {
  let min = 0
  let max = maxIndex

  while (min <= max) {
    const mid = Math.floor((min + max) / 2)

    if (arr[mid] <= value) {
      min = mid + 1
    } else {
      max = mid - 1
    }
  }

  return min
}
```

然后在查找插入位置时使用二分查找的方式来优化性能：

```js
function insertionSort2(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const current = arr[i]
    const insertIndex = binarySearch(arr, i - 1, current) // 找到当前需要插入的 index

    for (let prevIndex = i - 1; prevIndex >= insertIndex; prevIndex--) {
      arr[prevIndex + 1] = arr[prevIndex]
    }
    arr[insertIndex] = current // 恢复
  }

  return arr
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]
console.log(insertionSort2(arr))
```

## 属性

- 稳定
- 适合场景：对快要排序完成的数组时间复杂度为 O(n)
- 非常低的开销
- 时间复杂度 `O(n²)`

> 由于它的优点（自适应，低开销，稳定，几乎排序时的 `O（n）`时间），插入排序通常用作递归基本情况（当问题规模较小时）针对较高开销分而治之排序算法， 如希尔排序或快速排序。

## 核心概念

- 高性能（特别是接近排序完毕时的数组），低开销，且稳定
- 利用二分查找来优化

---

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
