---
title: 全排列II
date: 2022-03-31 20:46:00
sidebar: auto
tags:
  - 回溯算法
categories:
  - leetcode
---

[力扣题目链接](https://leetcode-cn.com/problems/permutations-ii/)

给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

```js
示例 1：

- 输入：nums = [1,1,2]
- 输出：[[1,1,2],[1,2,1],[2,1,1]]

示例 2：

- 输入：nums = [1,2,3]
- 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

提示：

- 1 <= nums.length <= 8
- -10 <= nums[i] <= 10

## 思路

[代码随想录](https://programmercarl.com/0047.%E5%85%A8%E6%8E%92%E5%88%97II.html#_47-%E5%85%A8%E6%8E%92%E5%88%97-ii)

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 *
 * ! 不同于全排列1 这里需要考虑重复的情况，所以回溯的时候加入
 * ! nums[i] == nums[i - 1] && !visited[i - 1] 进行判断（需要对数组先行排序）
 *
 */
var permuteUnique = function (nums) {
  let result = [],
    len = nums.length,
    visited = new Array(len).fill(false); // 用于剪枝

  nums.sort((a, b) => a - b); // 排序

  function backtrack(path) {
    // 判断终止条件
    if (path.length === len) {
      result.push(path.slice());
      return;
    }

    for (let i = 0; i < len; i++) {
      if (visited[i] || (nums[i] == nums[i - 1] && !visited[i - 1])) continue; // 跳过

      // 加入当前数字并置状态位为已加入选择
      path.push(nums[i]);
      visited[i] = true;
      // 继续回溯
      backtrack(path);

      // 撤销选择并还原状态位
      path.pop();
      visited[i] = false;
    }
  }

  backtrack([]);

  return result;
};
```
