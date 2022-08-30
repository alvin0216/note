---
title: 子集II
date: 2022-03-31 20:46:00
sidebar: auto
tags:
  - 回溯算法
categories:
  - leetcode
---

[力扣题目链接](https://leetcode-cn.com/problems/subsets-ii/)

给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

```js
- 输入: [1,2,2]
- 输出: [[2], [1], [1, 2, 2], [2, 2], [1, 2], []];
```

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  let result = [];
  nums.sort((a, b) => a - b);
  function backtrack(track, idx) {
    result.push([...track]);

    for (var i = idx; i < nums.length; i++) {
      if (nums[i] === nums[i - 1] && i > idx) continue;
      track.push(nums[i]);
      backtrack(track, i + 1);
      track.pop();
    }
  }

  backtrack([], 0);

  return result;
};
```
