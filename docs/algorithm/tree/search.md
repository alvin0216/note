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

<h3>解题思路</h3>

- 在题目没有重复数字的前提下，二叉搜索树的左子树均小于根节点，右子树均大于根节点。
- 判断二叉搜索树的后续遍历是否合法，只需判断右子树是否均大于根节点，左子树是否均小于根节点。
- 显然对于每个节点的操作都是一样的(问题拆解成子问题))，所以使用递归来实现。

```js
var verifyPostorder = function(postorder) {
  const len = postorder.length
  if (len < 2) return true

  // 后序遍历的最后一个元素为根节点
  let root = postorder[len - 1]

  let i = 0
  //  划分左/右子树
  while (i < len - 1) {
    if (postorder[i] > root) break
    i++
  }

  // 判断右子树中的元素是否都大于 root
  let res = postorder.slice(i, len - 1).every(num => num > root)
  if (!res) return false
  // 对左右子树进行递归调用,左右子树通过 i 进行分割
  return verifyPostorder(postorder.slice(0, i)) && verifyPostorder(postorder.slice(i, len - 1))
}
```

<span class='mgreen'>总结一下：</span>

- **后序遍历，左右根，根节点是在最后一个节点的。[左子树, 右子树, root]**
- **分割点在于在根节点之前的节点大于 root 时，[左子树, 右子树, root]**
- **左子树均小于根节点，右子树均大于根节点**
