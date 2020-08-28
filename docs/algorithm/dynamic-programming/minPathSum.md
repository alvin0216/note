---
title: 最小路径和
date: 2020-08-28 11:36:46
---

给定一个包含非负整数的 `m x n`网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

```js
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {}
```

<h3>题解</h3>

区间动态规划

思路

- 状态定义：
  - 设 `dp[i][j]` 为走到当前位置的最小路径和
- 递推公式：
  - 只能向下或向右走，意味着当前格子只能由上边或者左边走过来
  - `dp[i][j] = Min(dp[i-1][j],dp[i][j-1]) + grid[i][j]`
- 初始化
  - 第一行第 n 列和第一列第 n 行为均原数组值
- 边界条件
  - 格子有边界，因此当 `i===0` 或 `j===0` 时，`i-1` 和 `j-1` 会越界
- 返回值
  - dp 最后一个元素值

```js
var minPathSum = function(grid) {
  const m = grid.length
  const n = grid[0].length

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        grid[i][j] = grid[i][j]
      } else if (i === 0 && j > 0) {
        grid[i][j] += grid[i][j - 1] // 只能从上面来
      } else if (i > 0 && j === 0) {
        grid[i][j] += grid[i - 1][j]
      } else {
        grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1])
      }
    }
  }

  return grid[m - 1][n - 1]
}
```
