---
title: 二叉树中和为某一值的路径
date: 2020-08-20 11:35:57
---

[剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)

输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

```js
给定如下二叉树，以及目标和 sum = 22，
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1

返回:

[
   [5,4,11,2],
   [5,8,4,5]
]

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {}
```

本问题是典型的二叉树方案搜索问题，使用回溯法解决，其包含 **先序遍历 + 路径记录** 两部分。

```js
var pathSum = function(root, sum) {
  const pathList = []
  let loop = (node, value, path) => {
    if (!node) return
    path = [...path, node.val]
    if (node.val === value && !node.left && !node.right) {
      pathList.push(path)
    }
    node.left && loop(node.left, value - node.val, path)
    node.right && loop(node.right, value - node.val, path)
  }
  loop(root, sum, [])
  return pathList
}
```
