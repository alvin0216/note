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
