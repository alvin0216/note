---
title: DFS & BFS
date: 2020-05-24 23:37:51
sidebar: auto
tags:
  - 深度优先遍历
  - 广度优先遍历
categories:
  - 算法与数据结构
---

## DFS 深度优先遍历 递归实现

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

//    3
//   / \
//  1   4
//   \
//    2
// 输出: 1 2 3 4

function dfs(node) {
  if (!node) return;
  node.left && dfs(node.left);
  console.log(node.val); // 中序遍历
  node.right && dfs(node.right);
}
```

## DFS 深度优先遍历 栈实现

```js
function dfs(root) {
  const stack = [];
  let nums = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    nums.push(current.val);
    current = current.right;
  }

  console.log(nums); // [ 1, 2, 3, 4 ]
}
```

## BFS 广度优先遍历 队列实现

```js
//    3
//   / \
//  1   4
//   \
//    2
// 输出: 3 1 4 2
function bfs(root) {
  let queue = [root];

  while (queue.length) {
    const node = queue.shift();
    console.log(node.val); //
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
}
```
