---
title: 打家劫舍
date: 2020-08-27 09:24:38
---

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

```js
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。

0 <= nums.length <= 100
0 <= nums[i] <= 400

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {}
```

<h3>题解</h3>

考虑 `base case`

- `length = 1` 的情况: `max = nums[0]`
- `length = 2` 的情况: `max = Math.max(nums[0], nums[1])`
- `length = 3` 的情况: `max = Math.max(nums[0] + nums[2], nums[1])` 称之为 max3
- `length = 4` 的情况: `max = Math.max(nums[i - 2] + nums[i], nums[i - 1])`, 依赖上一次结果

状态转移方程就是 `f(i) = max(f(i – 2) + nums[i], f(i – 1))`

```js
var rob = function(nums) {
  let len = nums.length
  if (len === 0) return 0
  if (len === 1) return nums[0]

  let dp = []
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  let res = dp[1]

  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    res = Math.max(dp[i], res)
  }

  return res // 或者 dp[len - 1]
}
```
