---
title: 二叉树的深度
date: 2020-08-20 10:40:39
---

## 104. 二叉树的最大深度

```js
输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）
形成树的一条路径，最长路径的长度为树的深度。

给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7

返回它的最大深度 3 。

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {}
```

<h3>解题思路</h3>

深度优先遍历，深度就是比较左右子树哪个深。

```js
var maxDepth = function(root) {
  let max = 0
  let dfs = (root, count = 0) => {
    if (root) {
      max = Math.max(max, ++count) // 访问 + 1
      root.left && dfs(root.left, count)
      root.right && dfs(root.right, count)
    }
  }
  dfs(root)
  return max
}
```

一行代码实现：

```js
var maxDepth = function(root) {
  // 然后别忘了加上自己的深度 + 1
  return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```

## 110. 平衡二叉树

```js
输入一棵二叉树的根节点，判断该树是不是平衡二叉树。
本题中，一棵高度平衡二叉树定义为：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

给定二叉树 [3,9,20,null,null,15,7]

   3
   / \
  9  20
    /  \
   15   7

返回 true 。

给定二叉树 [1,2,2,3,3,null,null,4,4]

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4

返回 false 。

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {}
```

<h3>解题思路</h3>

- 后序遍历二叉树
- 在遍历二叉树每个节点前都会遍历其左右子树
- 比较左右子树的深度，若差值大于 1 则返回一个标记 -1 表示当前子树不平衡
- 左右子树有一个不是平衡的，或左右子树差值大于 1，则整课树不平衡
- 若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）

```js
var isBalanced = function(root) {
  const balanced = node => {
    if (!node) return 0
    const left = balanced(node.left)
    const right = balanced(node.right)
    if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
      return -1
    }
    return Math.max(left, right) + 1
  }

  return balanced(root) != -1
}
```
