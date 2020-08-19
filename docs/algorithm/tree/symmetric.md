---
title: 二叉树的对称性
date: 2020-08-17 15:09:05
---

## 101. 对称二叉树

```js
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

   1
   / \
  2   2
 / \ / \
3  4 4  3

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3

进阶：你可以运用递归和迭代两种方法解决这个问题吗？

/**
 * TreeNode { val, left, right }
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {}
```

题解：

```js
var isSymmetric = function(root) {
  const check = (left, right) => {
    if (!left && !right) return true // 左右子树都不存在 也是对称的
    if (left && right) {
      // 左右子树都存在，要继续判断
      return (
        left.val === right.val && // 左右子树的顶点值要相等
        check(left.left, right.right) && // 左子树的left和右子树的right相等
        check(left.right, right.left) // 左子树的right和右子树的left相等
      )
    }
    // 左右子树中的一个不存在，一个存在，不是对称的
    return false
  }
  return !root || check(root.left, root.right) // root为null也是对称的
}
```

## 剑指 Offer 27. 二叉树的镜像

```js
请完成一个函数，输入一个二叉树，该函数输出它的镜像。
例如输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
镜像输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]

/**
 * TreeNode { val, left, right }
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var mirrorTree = function(root) {}
```

答案：

```js
var mirrorTree = function(root) {
  if (root) {
    let tempTreeNode = root.left
    root.left = root.right
    root.right = tempTreeNode
    root.left && mirrorTree(root.left)
    root.right && mirrorTree(root.right)
    return root
  } else {
    return root
  }
}
```
