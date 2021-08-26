---
title: 二分查找
date: 2020-05-24 23:37:51
---

## 算法思路

> 在一个有序的区间，不断缩小检索范围，类似于滑动窗口，时间复杂度：`O(logN)`

二分查找的关键点是确定**循环截止条件**、**边界更新方式**、**边界更新条件**。

1. 循环截止条件无非两种，left <= right、left < right,
2. 边界更新为 `[left = mid + 1, right = mid - 1]`、`[left = mid + 1, right = mid]`。
3. 对于边界更新的条件，牢牢把握住，每次更新都是确定性地丢弃一半数据，缩小一半查找范围这一中心思想，就不会没有头绪了。

该算法的大致逻辑如下：

```js
function search(nums, target) {
  let l = 0,
    r = nums.length - 1;

  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    else if (nums[mid] > target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return -1;
}
```

```js
var search = function(nums, target) {
  let l = 0,
    r = nums.length;

  while (l < r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    else if (nums[mid] > target) {
      r = mid; // [l, target, mid, r]
    } else {
      l = mid + 1;
    }
  }

  return -1;
};
```

## 278. 第一个错误的版本

[278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

```js
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    let l = 1,
      r = n;

    // 循环条件终止条件 l === r
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (isBadVersion(mid)) {
        r = mid; // 为什么不是 mid - 1？如果 mid 是最后一个错误版本，那么进入下一个循环之后 就会找不到该版本
      } else {
        l = mid + 1; // 为什么不是 mid？mid 都确定不是错误版本了，应该排除
      }
    }

    return l;
  };
};
```

<!--
鉴于 [我写了一首诗，把所有滑动窗口问题变成了默写题](https://leetcode-cn.com/problems/permutation-in-string/solution/wo-xie-liao-yi-shou-shi-ba-suo-you-hua-dong-chuang/) -->
