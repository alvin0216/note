---
title: 🌞 算法索引
date: 2020-07-22 09:23:33
sidebar: auto
---

## 二分法

二分查找的关键点是确定**循环截止条件**、**边界更新方式**、**边界更新条件**。

1. 循环截止条件无非两种，left <= right、left < right,
2. 边界更新为 `[left = mid + 1, right = mid - 1]`、`[left = mid + 1, right = mid]`。
3. 对于边界更新的条件，牢牢把握住，每次更新都是确定性地丢弃一半数据，缩小一半查找范围这一中心思想，就不会没有头绪了。

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
