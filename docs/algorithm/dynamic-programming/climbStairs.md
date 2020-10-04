---
title: 爬楼梯
date: 2020-08-26 22:29:12
---

## 斐波拉契数列

在写这道题之前，先了解什么是 <span class='mgreen'>斐波拉契数列</span>

```js
F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
```

简单来说，就是一位树等于前两位数之和。

`0 1 1 2 3 5 8 13...`

给定 N，计算 F(N)。实现：

```js
var fib = function(N) {
  if (N === 0 || N === 1) return N
  return fib(N - 1) + fib(N - 2)
}
```

## 题目

```js
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {}
```

<h3>题解</h3>

我们用 $f(x)$ 表示爬到第 x 级台阶的方案数，考虑最后一步可能跨了一级台阶，也可能跨了两级台阶，所以我们可以列出如下式子：

$$f(x) = f(x - 1) + f(x - 2)$$

它意味着爬到第 $x$ 级台阶的方案数是爬到第 $x - 1$ 级台阶的方案数和爬到第 $x−2$ 级台阶的方案数的和。

很好理解，因为每次只能爬 1 级或 2 级，所以 $f(x)$ 只能从 $f(x−1)$ 和 $f(x−2)$ 转移过来，而这里要统计方案总数，我们就需要对这两项的贡献求和。

![](https://assets.leetcode-cn.com/solution-static/70/70_fig1.gif)

```JS
var climbStairs = function(n) {
  let dp0 = 1
  let dp1 = 1
  for (let i = 2; i <= n; i++) {
    const temp = dp1
    dp1 = dp0 + dp1
    dp0 = temp
  }
  return dp1
}
```
