---
title: 二叉树的遍历
date: 2020-07-15 15:26:50
---

- 前序遍历：首先访问根节点，然后遍历左子树，最后遍历右子树，可记录为根—左—右；
- 中序遍历：首先访问左子树，然后访问根节点，最后遍历右子树，可记录为左—根—右；
- 后序遍历：首先遍历左子树，然后遍历右子树，最后遍历根节点，可记录为左—右—根。

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/tree/4.png)

## 94. 二叉树的中序遍历（左根右）

```js
给定一个二叉树，返回它的中序 遍历。

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {}
```

### 递归版本

```js
var inorderTraversal = function(root) {
  if (!root) return [] // 注意 root 为 null 的情况
  let nums = []
  let traversal = (node, callback) => {
    node.left && traversal(node.left, callback)
    callback(node.val)
    node.right && traversal(node.right, callback)
  }

  traversal(root, val => nums.push(val))
  return nums
}
```

### 迭代版本

- 取跟节点为目标节点，开始遍历
- 左孩子入栈 -> 直至左孩子为空的节点
- 节点出栈 -> 访问该节点
- 以右孩子为目标节点，再依次执行 1、2、3

```js
var inorderTraversal = function(root) {
  const nums = []
  const stack = []
  let current = root

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current) // 左孩子 先入栈
      current = current.left
    }
    current = stack.pop() // 左孩子 出栈
    nums.push(current.val)
    current = current.right // 再继续遍历右节点
  }
  return nums
}
```

## 144. 二叉树的前序遍历（根左右）

```js
给定一个二叉树，返回它的中序 遍历。

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,2,3]

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {}
```

### 递归版本

```js
var preorderTraversal = function(root) {
  let nums = []
  let traversal = (node, callback) => {
    if (node) {
      callback(node.val)
      node.left && traversal(node.left, callback)
      node.right && traversal(node.right, callback)
    }
  }

  traversal(root, val => nums.push(val))
  return nums
}
```

### 迭代版本

- 取跟节点为目标节点，开始遍历

1. 访问目标节点
2. 左孩子入栈 -> 直至左孩子为空的节点
3. 节点出栈，以右孩子为目标节点，再依次执行 1、2、3

```js
var preorderTraversal = function(root) {
  const nums = []
  const stack = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      nums.push(current.val)
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
  return nums
}
```

## 145. 二叉树的后序遍历（左右根）

```js
给定一个二叉树，返回它的 后序 遍历。

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [3,2,1]

进阶: 递归算法很简单，你可以通过迭代算法完成吗？
```

### 递归版本

```js
var postorderTraversal = function(root) {
  let nums = []
  let traversal = (node, callback) => {
    if (node) {
      node.left && traversal(node.left, callback)
      node.right && traversal(node.right, callback)
      callback(node.val)
    }
  }

  traversal(root, val => nums.push(val))
  return nums
}
```

### 迭代版本

取跟节点为目标节点，开始遍历

1. 左孩子入栈 -> 直至左孩子为空的节点
2. 栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
3. 栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行 1、2、3

```js
var postorderTraversal = function(root) {
  const nums = []
  const stack = []
  let last = null // 标记上一个访问的节点
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack[stack.length - 1]
    if (!current.right || current.right == last) {
      current = stack.pop()
      nums.push(current.val)
      last = current
      current = null // 继续弹栈
    } else {
      current = current.right
    }
  }
  return nums
}
```

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

  // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
  let i = inorder.indexOf(rootVal)

  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i))
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1))
  return node
}
```
