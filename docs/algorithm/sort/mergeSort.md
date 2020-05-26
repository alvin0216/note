---
title: 归并排序
date: 2020-05-19 15:05:55
---

## 简明解释

归并排序使用分而治之的思想，以折半的方式来递归/迭代排序元素，利用空间来换时间，做到了时间复杂度 `O(n·log(n))` 的同时保持了稳定。
这让它在一些更考虑排序效率和稳定性，次考虑存储空间的场合非常适用（如数据库内排序，和堆排序相比，归并排序的稳定是优点）。并且归并排序非常适合于**链表排序**。

## 属性

- 稳定 (在 O(n·log(n)) 时间复杂度的排序算法中，归并排序是唯一稳定的)
- 时间复杂度 O(n·log(n))
- 对于数组需要 Θ(n) 的额外空间 注意：归并排序需要额外的空间，这是它的不完美之处
- 对于链表需要 O(log(n)) 的额外空间，所以归并排序非常适合列表的排序
- Does not require random access to data 因为这个特点，归并排序很适合用来排序列表

## 核心概念

基本思想与过程：**先递归的分解数列，再合并数列**（分治思想的典型应用）

1. 将一个数组拆成 A、B 两个小组，两个小组继续拆，直到每个小组只有一个元素为止。
2. 按照拆分过程逐步合并小组，由于各小组初始只有一个元素，可以看做小组内部是有序的，合并小组可以被看做是合并两个有序数组的过程。
3. 对左右两个小数列重复第二步，直至各区间只有 1 个数。

下面对数组`【42,20,17,13,28,14,23,15】`进行归并排序，模拟排序过程如下：

第一步：拆分数组，一共需要拆分三次（logN）；

- 第一次拆成【42,20,17,13】，【28,14,23,15】，
- 第二次拆成【42,20】，【17,13】，【28,14】，【23,15】，、
- 第三次拆成【42】，【20】，【17】，【13】，【28】，【14】，【23】，【15】；

第二步：逐步归并数组，采用合并两个有序数组的方法，每一步其算法复杂度基本接近于 O(N)

- 第一次归并为【20,42】，【13,17】，【14,28】，【15,23】
- 第二次归并为【13,17,20,42】，【14,15,23,28】，
- 第三次归并为【13, 14, 15, 17, 20, 23, 28, 42】

## 算法步骤

- 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
- 设定两个指针，最初位置分别为两个已经排序序列的起始位置；
- 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
- 重复步骤 3 直到某一指针达到序列尾；
- 将另一序列剩下的所有元素直接复制到合并序列尾。

![](../../../assets/algorithm/sort/MergeSort.png)

## 第一版：基本实现

以迭代的方式来实现（但要注意防止函数调用过深导致 `JavaScript` 的运行栈溢出）：

```js
function mergeSort(arr) {
  const len = arr.length
  if (len < 2) return arr

  const mid = Math.floor(len / 2)

  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []

  while (left.length > 0 && right.length > 0) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift())
  }

  return result.concat(left, right)
}

// test
const arr = [42, 20, 17, 13, 28, 14, 23, 15]
console.log(mergeSort(arr))
```

## 第二版：空间优化

用 `array.splice` 取代 `array.slice`，减少一半的空间消耗。

```js
function mergeSort2(arr) {
  const len = arr.length

  if (len < 2) {
    return arr
  }

  const mid = Math.floor(len / 2)
  const left = arr.splice(0, mid)
  const right = arr

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []

  while (left.length > 0 && right.length > 0) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift())
  }

  return result.concat(left, right)
}

// test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]
console.log(mergeSort2(arr))
```

---

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
