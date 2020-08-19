---
title: 二叉搜索树
date: 2020-08-19 21:46:45
---

## 剑指 Offer 54. 二叉搜索树的第 k 大节点

```js
给定一棵二叉搜索树，请找出其中第k大的节点。

输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4

输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 4

1 ≤ k ≤ 二叉搜索树元素个数

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {}
```

<h3>题解</h3>

本题实际考察二叉树的中序遍历，比如

```js
     4
   /   \
  2     7
 / \   / \
1   3 6   9
// 中序遍历 左根右，可以输出从小到大的排列，[1, 2, 3, 4, 6, 7, 9]
// 二叉搜索树的第 k 大节点 第一大为 9 第二大为 7 ....也就是 length - k
```

<h3>版本1 利用中序遍历排列</h3>

```js
var kthLargest = function(root, k) {
  if (!root) return null
  let nodeList = []
  const inorder = node => {
    node.left && inorder(node.left)
    nodeList.push(node.val)
    node.right && inorder(node.right)
  }
  inorder(root)
  return nodeList[nodeList.length - k]
}
```

<h3>版本2 迭代版本</h3>

```js
var kthLargest = function(root, k) {
  let nodeList = []
  let stack = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current) // 左孩子 先入栈
      current = current.left
    }
    current = stack.pop() // 左孩子 出栈
    nodeList.push(current.val)
    current = current.right
  }
  return nodeList[nodeList.length - k]
}

// 代码可详见中序遍历的迭代版本
```

<h3>版本3 利用二叉树的规律查找</h3>

```js
var kthLargest = function(root, k) {
  if (!root) return null
  let result = 0
  let count = 0
  let inorder = (node, k) => {
    if (node.right) inorder(node.right, k) // // 入栈 [4, 7, 9] ...
    if (++count === k) {
      result = node.val
      return
    }
    if (node.left) inorder(node.left, k)
  }
  inorder(root, k)
  return result
}
```

## 剑指 Offer 33. 二叉搜索树的后序遍历序列

```js
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。
如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

     5
    / \
   2   6
  / \
 1   3

输入: [1,6,3,2,5]
输出: false

输入: [1,3,2,6,5]
输出: true

数组长度 <= 1000

/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function(postorder) {}
```
