---
title: 冒泡排序
date: 2020-05-19 15:05:55
sidebar: auto
tags:
  - 算法与数据结构
  - 排序算法
categories:
  - 算法与数据结构
---

稳定 时间复杂度 `O(n²)`

## 算法步骤

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/bubbleSort.png)

## 第一版：基本实现

定义一个辅助函数，用于交换数组中的值。

```TS
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```

```js
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}
```

测试

```js
let array = [5, 2, 4, 3, 8];

console.log(bubbleSort(array)); // [ 2, 3, 4, 5, 8 ]
```

## 第二版：缓存 pos

设置一标志性变量 pos,用于记录每趟排序中最后一次进行交换的位置。 由于 pos 位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到 pos 位置即可。

```js {5,9,14}
function bubbleSort2(arr) {
  let i = arr.length - 1;

  while (i > 0) {
    let pos = 0;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        swap(arr, j, j + 1);
      }
    }

    i = pos;
  }

  return arr;
}
```

- 如果循环一次，发现没有发生交换事件，代表数组升序，pos = 0，算法复杂度 `O(n)`
- 只要有交换，pos 值就更新，直到没有发生交换为止。所以可以大大地简化了算法复杂度。

## 第三版：双向遍历

传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值, 我们可以 **在每趟排序中进行正向和反向两遍冒泡** ， 一次可以得到两个最终值（最大和最小） , 从而使外排序趟数几乎减少了一半。

```js
function bubbleSort3(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    for (let i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
      }
    }

    end--;

    for (let j = end; j > start; j--) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j, j - 1);
      }
    }

    start++;
  }
  return arr;
}
```

## 第四版：结合 2&3

前两种优化方式`（缓存 pos、双向遍历）`的结合：

```js
function bubbleSort4(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let startPos = 0;
    let endPos = 0;

    for (let i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        startPos = i;
      }
    }
    start = startPos;

    for (let j = end; j > 0; j--) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j, j - 1);
        endPos = j;
      }
    }
    end = endPos;
  }
  return arr;
}
```

## 蚂蚁金服面试 模拟 Array.prototype.sort

来自于蚂蚁金服的一道面试题：

> 对于冒泡排序来说，能不能传入第二个参数（参数为函数），来控制升序和降序？（联想一下 `array.sort()`）

```js
function bubbleSort(arr, compareFunc) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (compareFunc(arr[j], arr[j + 1]) > 0) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

console.log(bubbleSort(array, (a, b) => a - b));
console.log(bubbleSort(array, (a, b) => b - a));
```

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
