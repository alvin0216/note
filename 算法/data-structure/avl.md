---
title: TODO 平衡二叉树 (AVL)
date: 2020-09-03 15:46:39
sidebar: auto
tags:
  - 算法与数据结构
categories:
  - 算法与数据结构
---

什么是平衡二叉树，请看 [数据结构与算法--从平衡二叉树(AVL)到红黑树](https://www.jianshu.com/p/3a6650269d39)

它是一棵空树或它的左右两个子树的高度差的绝对值不超过 1，并且左右两个子树都是一棵平衡二叉树。

:::details 回顾而二叉搜索树

```js
function BinarySearchTree() {
  let Node = function(val) {
    this.val = val;
    this.left = this.right = null;
  };
  this.root = null;

  this.insert = function(val) {
    let newNode = new Node(val);
    if (this.root === null) this.root = newNode;
    else insertNode(this.root, newNode);
  };

  function insertNode(node, newNode) {
    if (node.val > newNode.val) {
      if (node.left === null) node.left = newNode;
      else insertNode(node.left, newNode);
    } else if (node.val < newNode.val) {
      if (node.right === null) node.right = newNode;
      else insertNode(node.right, newNode);
    }
  }

  this.remove = function(val) {
    this.root = removeNode(this.root, val);
  };

  function removeNode(node, val) {
    if (node === null) return null;

    if (node.val > val) {
      node.left = removeNode(node.left, val);
    } else if (node.val < val) {
      node.right = removeNode(node.right, val);
    } else {
      // 叶子节点为空
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null) {
        // 只有右孩子
        node = node.right;
      } else if (node.right === null) {
        // 只有左孩子
        node = node.left;
      } else {
        // 左右还在均存在 移除的节点有两个子节点 替换的节点为右子树的最小节点
        let curr = node.right;
        while (curr.left) {
          curr = curr.left;
        }
        node.val = curr.val; // 替换当前值为节点最小值
        node.right = removeNode(node.right, curr.val); // 当前节点下一个值
      }
    }
    return node;
  }

  // 前序遍历 根左右 【中序遍历 左根右；后序遍历 左右根】
  this.preOrderTraverse = function(callback) {
    let traverse = (node) => {
      if (node) {
        callback(node.val);
        node.left && traverse(node.left);
        node.right && traverse(node.right);
      }
    };
    traverse(this.root);
  };
}
```

:::

## 旋转

```js
///////////////////////////////////////////////////
// LL T1<Z<T2< X <T3<Y<T4                        //
//        y                              x       //
//       / \                           /   \     //
//      x   T4     向右旋转 (y)        z     y    //
//     / \       - - - - - - - ->    / \   / \   //
//    z   T3                        T1 T2 T3 T4  //
//   / \                                         //
// T1   T2                                       //
///////////////////////////////////////////////////

////////////////////////////////////////////////
// RR T1<Y<T2< X <T3<Z<T4                     //
//    y                             x         //
//  /  \                          /   \       //
// T1   x      向左旋转 (y)       y     z      //
//     / \   - - - - - - - ->   / \   / \     //
//    T2  z                    T1 T2 T3 T4    //
//       / \                                  //
//      T3 T4                                 //
////////////////////////////////////////////////
```

代码：

```js
```

参考 [数据结构与算法--从平衡二叉树(AVL)到红黑树](https://www.jianshu.com/p/3a6650269d39)
