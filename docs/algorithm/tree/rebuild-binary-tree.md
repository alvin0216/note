---
title: 重建二叉树
date: 2020-07-15 15:26:50
---

[剑指 Offer 07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

例如，给出

```js
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
```

返回如下的二叉树：

```js
   3
   / \
  9  20
    /  \
   15   7
```

限制：0 <= 节点个数 <= 5000

---

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {}
```

::: details 答案

![](../../../assets/algorithm/tree/4.png)

假设有二叉树如下：

```js
    1
   / \
  2   3
 / \
4   5
```

它的前序遍历的顺序是：1 2 4 5 3。中序遍历的顺序是：4 2 5 1 3

因为前序遍历的第一个元素就是当前二叉树的根节点。那么，这个值就可以将中序遍历分成 2 个部分。

在以上面的例子，中序遍历就被分成了 4 2 5 和 3 两个部分。4 2 5 就是左子树，3 就是右子树。

```js
var buildTree = function(preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null
  }

  const rootVal = preorder[0]
  const node = new TreeNode(rootVal)

  let i = 0 // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
  while (inorder[i] !== rootVal) {
    i++
  }

  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i))
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1))
  return node
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}
```

:::
