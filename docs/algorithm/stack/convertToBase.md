---
title: 栈-十进制转二进制
date: 2020-07-26 17:28:48
---

## 十进制转二进制

<img class='small' alt='convertToBase' src='https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/convertToBase.png' />

化为步骤：

1. 35 % 2 商 17 余数 1
2. 17 % 2 商 8 余数 1
3. 8 % 2 商 4 余数 0
4. 4 % 2 商 2 余数 0
5. 2 % 2 商 1 余数 0
6. 1 % 2 商 0 余数 1

截止条件 商为 0。

35 - 二进制 -> 100011，余数是倒序的结果。典型的栈的应用：先进后出。

实现：

```js
function convertToBase2(num) {
  let stack = []
  let quotient = num // 商
  while (quotient !== 0) {
    stack.push(quotient % 2) // 入栈
    quotient = Math.floor(quotient / 2) // 装逼可以用位运算 quotient >> 1, 也即 n 的二分之一
  }

  let result = ''
  let len = stack.length
  for (let i = 0; i < len; i++) {
    result += stack.pop() // 出栈
  }

  return Number(result)
}
```

当然这里不是最优解，只是一个展示的例子

## leetcode 原题

[leetcode 504. 七进制数](https://leetcode-cn.com/problems/base-7/) <Badge text='简单' />

给定一个整数，将其转化为 7 进制，并以字符串形式输出。

```js
输入: 100
输出: '202'

输入: -7
输出: '-10'
```

注意: 输入范围是 [-1e7, 1e7] 。

```js
/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {}
```

### 思路 1 使用堆栈

```js
function convertToBase7(num) {
  let stack = []
  let quotient = Math.abs(num) // 商
  while (quotient !== 0) {
    stack.push(quotient % 7) // 入栈
    quotient = Math.floor(quotient / 7)
  }

  let result = ''
  if (num === 0) result = '0'
  if (num < 0) result = '-'

  let len = stack.length
  for (let i = 0; i < len; i++) {
    result += stack.pop() // 出栈
  }

  return result
}
```

1：0 特殊处理下
2：负数记录是负数的状态，然后转化为其绝对值处理，最后返回加上符号位’-‘
3：不断除以 7 取余数直至为 0

```js
let result = ''
if (num === 0) result = '0'
if (num < 0) result = '-'
```

```bash
执行用时：88 ms, 在所有 JavaScript 提交中击败了 18.99% 的用户
内存消耗：37.8 MB, 在所有 JavaScript 提交中击败了 100.00% 的用户
```

### 思路 2 常规操作

使用数组

```js
function convertToBase7(num) {
  if (num === 0) return '0'
  let radix = 7
  let stack = []
  let isPositiveNum = true
  if (num < 0) {
    num = -num
    isPositiveNum = false
  }
  let quotient = num
  while (quotient !== 0) {
    stack.unshift(quotient % 7)
    quotient = (quotient / radix) >> 0 //使用位运算向下取整
  }

  return isPositiveNum ? stack.join('') : '-' + stack.join('')
}
```

```bash
执行用时：80 ms, 在所有 JavaScript 提交中击败了 33.52% 的用户
内存消耗：37.8 MB, 在所有 JavaScript 提交中击败了 100.00% 的用户
```

使用字符串操作：

```js
function convertToBase7(num) {
  if (num === 0) return '0'
  let radix = 7
  let str = ''
  let isPositiveNum = true
  if (num < 0) {
    num = -num
    isPositiveNum = false
  }
  let quotient = num
  while (quotient !== 0) {
    str = (quotient % 7) + str
    quotient = (quotient / radix) >> 0 //使用位运算向下取整
  }

  return isPositiveNum ? str : '-' + str
}
```

```bash
执行用时：92 ms, 在所有 JavaScript 提交中击败了 12.85% 的用户
内存消耗：37.8 MB, 在所有 JavaScript 提交中击败了 100.00% 的用户
```

两者的操作性能比较 [JavaScript 字符串操作的性能](https://zhuanlan.zhihu.com/p/30380678?from_voters_page=true)

### 原生 API

这个就没啥好说了，查出来直接用：

```js
function convertToBase7(num) {
  return num.toString(7)
}
```

```bash
执行用时：76 ms, 在所有 JavaScript 提交中击败了 46.93% 的用户
内存消耗：37.8 MB, 在所有 JavaScript 提交中击败了 100.00% 的用户
```
