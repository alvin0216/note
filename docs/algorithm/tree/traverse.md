---
title: 二叉树的遍历
date: 2020-07-15 15:26:50
---

- 前序遍历：首先访问根节点，然后遍历左子树，最后遍历右子树，可记录为根—左—右；
- 中序遍历：首先访问左子树，然后访问根节点，最后遍历右子树，可记录为左—根—右；
- 后序遍历：首先遍历左子树，然后遍历右子树，最后遍历根节点，可记录为左—右—根。

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/tree/4.png)

## 剑指 Offer 07. 重建二叉树

```js
输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

比如

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]

返回如下的二叉树：

   3
   / \
  9  20
    /  \
   15   7

限制：0 <= 节点个数 <= 5000

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

<h3>思路</h3>

- 前序遍历：跟节点 + 左子树前序遍历 + 右子树前序遍历
- 中序遍历：左子树中序遍历 + 跟节点 + 右字数中序遍历
- 后序遍历：左子树后序遍历 + 右子树后序遍历 + 跟节点

根据上面的规律：

- 前序遍历找到根结点 `root`
- 找到 `root` 在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归重建二叉树

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/tree/traverse.png)

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
```
