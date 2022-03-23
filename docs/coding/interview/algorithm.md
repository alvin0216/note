---
title: 简单算法
date: 2021-07-22 09:23:33
sidebar: auto
tags:
  - 面试
categories: 面试
---

- ✅ [连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/) `easy`
- ✅ [K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/) `hard`
- ✅ [反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/) `medium`
- [数组中的第 K 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
- LRU 缓存机制
- [接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)
- [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
- [最短单词距离](https://leetcode-cn.com/problems/shortest-word-distance/)
- [二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)
- [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)
- 蛇形遍历二叉树
- 合并 K 个排序链表

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
