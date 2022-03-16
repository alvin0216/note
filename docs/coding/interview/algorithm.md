---
title: 简单算法
date: 2021-07-22 09:23:33
sidebar: auto
tags:
  - 面试
categories: 面试
---

## 二分

1. 排序，快排

```js
// 实现数组的排序，插入，逆转，删除元素，去重
const arr = [1, 2, 3, 4, 5, 4, 10, 9, 7];

function quickSort(arr) {
  if (arr.length < 2) return arr;

  const pv = arr[0];
  const l = [];
  const r = [];

  // 注意 i = 1
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pv ? l.push(arr[i]) : r.push(arr[i]);
  }

  return [...quickSort(l), pv, ...quickSort(r)];
}

const res = quickSort(arr); // [1, 2, 3, 4, 4, 5, 7, 9, 10]

// 插入元素8，并保证顺序不乱

// 寻找插入位置
function insert(nums, target) {
  let l = 0,
    r = nums.length;

  while (l < r) {
    const mid = (l + r) >>> 1;
    if (nums[mid] > target) {
      // target mid r
      r = mid;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      nums.splice(mid, 0, target);
      return;
    }
  }

  nums.splice(l, 0, target);
}

// 删除略
```

- 连续子数组的最大和
- K 个一组翻转链表
- 数组中的第 K 个最大元素
- LRU 缓存机制
- 接雨水
