---
title: 不同路径
date: 2020-08-28 15:58:47
---

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

```js
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右

输入: m = 7, n = 3
输出: 28

1 <= m, n <= 100
题目数据保证答案小于等于 2 * 10 ^ 9

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {}
```

<h3>题解</h3>

以 `7 x 3` 为例 初始化 `DP`

|     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1   | 1   | 1   | 1   | 1   | 1   | 1   |
| 1   |
| 1   |

```js
let dp = []
for (let i = 0; i < n; i++) {
  if (i === 0) {
    dp.push(new Array(m).fill(1))
  } else {
    let arr = new Array(m).fill('')
    arr.unshift(1)
    dp.push(arr)
  }
}
```

推导状态转移方程: `dp[i][j] = dp[i - 1][j] + dp[i][j - 1]`

答案：

```js
var uniquePaths = function(m, n) {
  // let dp = new Array(m).fill(new Array(n))
  let dp = []
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      dp.push(new Array(m).fill(1))
    } else {
      let arr = new Array(m).fill('')
      arr.unshift(1)
      dp.push(arr)
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[n - 1][m - 1]
}
```

优化。。。