---
title: 分治算法
date: 2020-08-25 23:30:03
---

分而治之是算法设计中的一种思想，简单来说就是将大问题划分成小问题去解决，常用的方法就是递归。

常见的应用场景有:

- [归并排序](../sort/mergeSort.md)
  - 分：把数组从中间一分为二
  - 解：递归地对两个子组进行归并排序
  - 合：合并有序数组
- [快速排序](../sort/quickSort.md)
  -...

[leetcode：分治算法](https://leetcode-cn.com/tag/divide-and-conquer/)：

- [374. 猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)
- [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)
- [100. 相同的树](https://leetcode-cn.com/problems/same-tree/)
- [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

## 猜数字大小

猜数字游戏的规则如下：

每轮游戏，系统都会从  1  到  n 随机选择一个数字。 请你猜选出的是哪个数字。
如果你猜错了，系统会告诉你，你猜测的数字比系统选出的数字是大了还是小了。

你可以通过调用一个预先定义好的接口 guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1 或 0）：

```js
-1 : 你猜测的数字比系统选出的数字大
 1 : 你猜测的数字比系统选出的数字小
 0 : 恭喜！你猜对了

输入: n = 10, pick = 6
输出: 6

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */
/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {}
```

二分查找:

```js
var guessNumber = function(n) {
  let min = 1,
    max = n

  while (min <= max) {
    const mid = (max + min) >>> 1

    let pick = guess(mid)
    if (pick === 0) {
      return mid
    } else if (pick === 1) {
      min = mid + 1
    } else {
      max = mid - 1
    }
  }
  return -1
}
```

## 翻转二叉树

```js
翻转一棵二叉树。

     4                     4
   /   \                 /   \
  2     7       -->     7     2
 / \   / \             / \   / \
1   3 6   9           9   6 3   1

// 答案

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (!root) return null

  let right = invertTree(root.right)
  let left = invertTree(root.left)
  root.left = right
  root.right = left
  return root
}
```

## 相同的树

```js
给定两个二叉树，编写一个函数来检验它们是否相同。
如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {}
```

答案：

```JS
var isSameTree = function(p, q) {
  if (!p && !q) return true
  if (p && q
    && p.val === q.val
    && isSameTree(p.left, q.left)
    && isSameTree(p.right, q.right)) {
    return true
  }
  return false
}
```

## 对称二叉树

见 [对称二叉树](../tree/symmetric.md)
