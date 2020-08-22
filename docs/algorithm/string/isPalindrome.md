---
title: 回文数
date: 2020-07-26 17:28:48
---

[leetcode 9. 回文数](https://leetcode-cn.com/problems/palindrome-number/)

```js
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

输入: 121
输出: true

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。

进阶:
你能不将整数转为字符串来解决这个问题吗？

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {}
```

## 第一版

转为字符串 -> 数组 -> 反转数组 -> 字符串 -> 数字

```JS
var isPalindrome = function(x) {
  //  >> 0 取整
  return String(x).split('').reverse().join('') >> 0 === x
}
```

## 第二版

[极简数学解法](https://leetcode-cn.com/problems/palindrome-number/solution/ji-jian-jie-fa-by-ijzqardmbd-2/)

见 [数量级](../../algorithm/math/magnitude.md)

使用除法和求余获得对应位置的数字，无字符串操作。

- 首先获取当前数量级 `n`, 公式 $n = 10^{[lgX]}$，如：`x = 24, n = 10`；`x = 6234, n = 1000`。
  - **对数：$n = a^x$ --> $x=log_aN$**
- 通过 `x / n` 获取首位。
- 通过 `x % 10` 获取末位。
- `(x % n) / 10` 去除首位和末位，（`x % n` 去除首位，`x / 10` 去除末位），x 位数减 2。
- `n /= 100` x 位数减 2， 故 n 需要除 $10^2$

以 123421 为例，运算过程如下:

| x      | n      | x / n | x % 10 |
| ------ | ------ | ----- | ------ |
| 123421 | 100000 | 1     | 1      |
| 2342   | 1000   | 2     | 2      |
| 34     | 10     | 3     | 4      |

代码：

```js
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if (x < 0) return false
  if (x < 10) return true
  let n = 10 ** Math.floor(Math.log10(x))
  while (n > 1 && x > 0) {
    if (Math.floor(x / n) !== x % 10) return false
    x = Math.floor((x % n) / 10)
    n /= 100
  }
  return true
}
```
