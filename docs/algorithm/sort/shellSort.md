---
title: 希尔排序
date: 2020-05-19 15:05:55
sidebar: auto
tags:
  - 算法与数据结构
  - 排序算法
categories:
  - 算法与数据结构
---

希尔排序是插入排序的改进版，它**克服了插入排序只能移动一个相邻位置的缺陷**（希尔排序可以一次移动 `gap` 个距离），利用了插入排序在排序几乎已经排序好的数组的非常快的优点。

使用可以动态定义的 gap 来渐进式排序，先排序距离较远的元素，再逐渐递进，而实际上排序中元素最终位置距离初始位置远的概率是很大的，所以希尔排序大大提升了性能（**尤其是 reverse 的时候非常快**，想象一下这时候冒泡排序和插入排序的速度）。

而且希尔排序不仅效率较高（比冒泡和插入高），它的代码相对要简短，低开销（继承插入排序的优点），追求这些特点（效率要求过得去就好，代码简短，开销低，且数据量较小）的时候希尔排序是好的 `O(n·log(n))` 算法的替代品。

总而言之：希尔排序的性能优化来自增量队列的输入和 `gap` 的设定。

## 属性

- 不稳定
- 在快要排序完成的数组有 `O(n·log(n))` 的时间复杂度（并且它对于反转数组的速度非常快）
- `O(n^3/2)` time as shown (想要了解更多细节，请查阅 [wikipedia Shellsor](https://en.wikipedia.org/wiki/Shellsort#Applications))

::: warning 关于不稳定
我们知道, 单次直接插入排序是稳定的，它不会改变相同元素之间的相对顺序，但在多次不同的插入排序过程中, 相同的元素可能在各自的插入排序中移动，可能导致相同元素相对顺序发生变化。因此, 希尔排序并不稳定。
:::

## 核心概念

希尔排序是基于**插入排序**的以下两点性质而提出改进方法的：

1. **插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到 `O(n)` 的效率**；
2. 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位 ；

其中 `gap`（增量）的选择是希尔排序的重要部分。只要最终 `gap` 为 1 任何 `gap` 序列都可以工作。算法最开始以一定的 `gap` 进行排序。然后会继续以一定 `gap` 进行排序，直到 `gap = 1` 时，算法变为插入排序。

## 算法步骤

- 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
- 按增量序列个数 k，对序列进行 k 趟排序；
- 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/ShellSort.png)

## 第一版：基本实现

Donald Shell 的最初建议（`gap = n / 2`）版代码（方便理解）：

```js
function shellSort(arr) {
  const len = arr.length;
  let gap = Math.floor(len / 2);

  while (gap > 0) {
    // 注意下面这段 for 循环和插入排序极为相似
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let preIndex = i - gap;

      while (arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return arr;
}
```

## 第二版：Knuth's increment sequence

常见的、易生成的、优化 `gap` 的序列方法（来自 Algorithms (4th Edition) ，有些更快的方法但序列不容易生成，因为用到了比较深奥的数学公式）：

```js
function shellSort(arr) {
  const len = arr.length;
  let gap = 1;

  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let preIndex = i - gap;

      while (arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return arr;
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(shellSort(arr));
```

---

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
