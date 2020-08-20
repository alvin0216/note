---
title: 二叉树
date: 2020-07-15 15:26:50
---

## 一些特性

- 前序遍历：`[root, 左子树，右子树]`
- 中序遍历：`[左，根，右...]`, 值会从小到大排序
- 后序遍历：`[左子树，右子树，root]`，左子树的值均小于 root，右子树的值均大于 root

## 二叉树遍历

> 重点中的重点，最好同时掌握递归和非递归版本，递归版本很容易书写，但是真正考察基本功的是非递归版本。

- 前序遍历：首先访问根节点，然后遍历左子树，最后遍历右子树，可记录为根—左—右；
- 中序遍历：首先访问左子树，然后访问根节点，最后遍历右子树，可记录为左—根—右；
- 后序遍历：首先遍历左子树，然后遍历右子树，最后遍历根节点，可记录为左—右—根。

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/tree/4.png)

题目

- [剑指 Offer 07 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

...

## 二叉树的对称性

- [101 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)
- [剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

## 二叉搜索树

> 二叉搜索树是特殊的二叉树，考察二叉搜索树的题目一般都是考察二叉搜索树的特性，所以掌握好它的特性很重要。

1. 若任意节点的左⼦子树不不空，则左⼦子树上所有结点的值均⼩小于它的 根结点的值;
2. 若任意节点的右⼦子树不不空，则右⼦子树上所有结点的值均⼤大于它的 根结点的值;
3. 任意节点的左、右⼦子树也分别为⼆二叉查找树。

- [剑指 Offer 54. 二叉搜索树的第 k 大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)
- [剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

## 二叉树的深度

> - 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
> - 平衡二叉树：左右子树深度之差大于 1

- [剑指 Offer 55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)
- [平衡二叉树](https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/)

## 二叉树代码

```js
function Node(key) {
  this.key = key
  this.left = null
  this.right = null
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  // 前序遍历 根左右
  preOrderTraverse(callback) {
    let preOrderTraverseNode = function(node, callback) {
      if (node !== null) {
        callback(node.key)
        preOrderTraverseNode(node.left, callback)
        preOrderTraverseNode(node.right, callback)
      }
    }

    preOrderTraverseNode(this.root, callback)
  }

  // 中序遍历 左根右
  inOrderTraverse(callback) {
    let inOrderTraverseNode = function(node, callback) {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback)
        callback(node.key)
        inOrderTraverseNode(node.right, callback)
      }
    }

    inOrderTraverseNode(this.root, callback)
  }

  // 后序遍历 左右根
  postOrderTraverse(callback) {
    let postOrderTraverseNode = function(node, callback) {
      if (node !== null) {
        postOrderTraverseNode(node.left, callback)
        postOrderTraverseNode(node.right, callback)
        callback(node.key)
      }
    }

    postOrderTraverseNode(this.root, callback)
  }

  // 插入节点
  insert(key) {
    let newNode = new Node(key)
    if (this.root === null) this.root = newNode
    else {
      let insertNode = function(node, newNode) {
        if (newNode.key < node.key) {
          if (node.left === null) node.left = newNode
          else insertNode(node.left, newNode)
        } else {
          if (node.right === null) node.right = newNode
          else insertNode(node.right, newNode)
        }
      }

      insertNode(this.root, newNode)
    }
  }

  // 删除节点 ...
  remove(key) {
    let removeNode = function(node, key) {
      if (node === null) return null
    }

    this.root = removeNode(this.root, key)
    return this.root
  }
}
```

---

概览鉴于 [awesome-coding-js](http://www.conardli.top/docs/dataStructure/%E4%BA%8C%E5%8F%89%E6%A0%91/%E4%BA%8C%E5%8F%89%E6%A0%91.html)
