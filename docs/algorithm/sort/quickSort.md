---
title: 快速排序
date: 2020-05-19 15:05:55
---

## 算法步骤

- 从数列中挑出一个元素，称为 “基准”（pivot）;
- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
- 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序；

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/sort/quickSort.png)

## 第一版：基本实现

```js
function quickSort(arr) {
  const pivot = arr[0]
  const left = []
  const right = []

  if (arr.length < 2) {
    return arr
  }

  for (let i = 1, len = arr.length; i < len; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }

  return quickSort(left).concat([pivot], quickSort(right))
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]
console.log(quickSort(arr))
```

## 第二版：函数式编程

函数式编程：结构清晰，一目了然。

```js
function quickSort2(arr) {
  const pivot = arr.shift()
  const left = []
  const right = []

  if (arr.length < 2) {
    return arr
  }

  arr.forEach(element => {
    element < pivot ? left.push(element) : right.push(element)
  })

  return quickSort2(left).concat([pivot], quickSort2(right))
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]
console.log(quickSort2(arr))
```

## 第三版：in-place

等等，有没有觉得第一、二版中的代码虽然看起来简洁，但是却对空间消耗很大呢？

由此有了 in-place 版本：

```js
function quickSort3(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivot = partition(arr, left, right)

    quickSort3(arr, left, pivot - 1)
    quickSort3(arr, pivot + 1, right)
  }
  return arr
}

function partition(arr, left, right) {
  let pivot = left // 以第一个元素为 pivot

  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < arr[left]) {
      swap(arr, i, pivot)
      pivot += 1
    }
  }
  swap(arr, left, pivot) //将 pivot 值移至中间

  return pivot
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]
console.log(quickSort3(arr))
```

## 第四版：关于 pivot 的选取

这一版的亮点是 pivot 的选取，不再是简单的取 arr[0]，而是：

```js
const pivot = left + Math.ceil((right - left) * 0.5)
```

```js
function quickSort4(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    // const pivot = left + Math.ceil((right - left) * 0.5);
    const pivot = Math.floor((right + left) / 2)
    const newPivot = partition(arr, pivot, left, right)

    quickSort4(arr, left, newPivot - 1)
    quickSort4(arr, newPivot + 1, right)
  }

  return arr
}

function partition(arr, pivot, left, right) {
  const pivotValue = arr[pivot]
  let newPivot = left

  swap(arr, pivot, right)
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, newPivot)
      newPivot += 1
    }
  }
  swap(arr, right, newPivot)

  return newPivot
}

const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]
console.log(quickSort4(arr))
```

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
