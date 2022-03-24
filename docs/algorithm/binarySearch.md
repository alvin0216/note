---
title: 二分查找
date: 2020-05-24 23:37:51
sidebar: auto
---

## 模板 1 【左区右闭】

```js
function binarySearch(nums, target) {
  let l = 0,
    r = target.length - 1,
    mid = undefined;

  while (l <= r) {
    mid = (l + r) >>> 1;
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  return -1;
}
```

## 模板 2 【左区右开】

主要是找极值用的多，比如找元素最左的位置

```js
function getTargetLeft(nums, target) {
  let l = 0,
    r = nums.length,
    mid = undefined;

  while (l < r) {
    mid = (l + r) >>> 1;
    // target <= mid  r
    if (nums[mid] >= target) r = mid;
    else l = mid + 1;
  }

  return nums[l] === target ? l : -1;
}

getTargetLeft([5, 7, 7, 8, 8, 10], 8); // 3
```

找元素最右的位置

```js
function getTargeRight(nums, target) {
  let l = 0,
    r = nums.length,
    mid = undefined;

  while (l < r) {
    mid = (l + r) >>> 1;
    // target < mid  r
    if (nums[mid] > target) r = mid;
    else l = mid + 1;
  }
  // 终止条件 l = r
  return nums[l - 1] === target ? l - 1 : -1;
}

getTargeRight([5, 7, 7, 8, 8, 10], 8); // 4
```

## 搜索旋转排序数组

[题目链接](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1,
    mid = undefined;

  while (l <= r) {
    mid = (l + r) >>> 1;
    if (nums[mid] === target) return mid;
    // 右递增
    if (nums[mid] < nums[r]) {
      // 注意 target <= nums[r]
      if (nums[mid] < target && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    } else {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    }
  }

  return -1;
};
```
