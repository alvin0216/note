---
title: 广度优先和深度优先 ✨
date: 2020-08-31 09:30:59
---

**针对二叉树类型**

```js
   11
   / \
  7  15
 / \ /  \
5  9 13 20

广度: [11, 7, 15, 5, 9, 13, 20]
深度: [11, 7, 5, 9, 15, 13, 20]
```

:::details 构建 tree

```js
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

let root = new TreeNode(11)
root.left = new TreeNode(7)
root.left.left = new TreeNode(5)
root.left.right = new TreeNode(9)
root.right = new TreeNode(15)
root.right.left = new TreeNode(13)
root.right.right = new TreeNode(20)
```

:::

## 广度优先遍历

从上到下，从左到右。

利用**队列**，未访问的元素入队，访问后则出队，并将其左右子元素入队，直到叶子元素结束。

```js
function bfs(root) {
  if (!root) return []
  let queue = [root]
  let res = []
  while (queue.length) {
    let node = queue.shift() // 出队
    res.push(node.val)
    node.left && queue.push(node.left) // 左孩子入队
    node.right && queue.push(node.right) // 右孩子入队
  }
  return res
}
```

输出：`[ [ 11 ], [ 7, 15 ], [ 5, 9, 13, 20 ] ]`

:::details 代码

```js
function bfs(root) {
  if (!root) return []
  let result = []
  let queue = [root] // 根节点入队

  while (queue.length) {
    let level = queue.length // 每一层的节点数
    let currLevel = [] // 当前层

    // 每次遍历一层元素
    for (let i = 0; i < level; i++) {
      let curr = queue.shift() // 当前访问的节点出队
      // 出队节点的子女入队
      curr.left && queue.push(curr.left)
      curr.right && queue.push(curr.right)

      currLevel.push(curr.val) // 收集结果
    }
    result.push(currLevel)
  }
  return result
}
```

:::

## 深度优先遍历

```js
function dfs(root) {
  if (!root) return []
  let res = []
  let stack = [root] // 根节点入栈

  while (stack.length > 0) {
    const node = stack.pop() // 出栈
    res.push(node.val)
    node.right && stack.push(node.right) // 注意先入栈左孩子，栈是先进后出的
    node.left && stack.push(node.left)
  }
  return res
}
// [11, 7, 5, 9, 15, 13, 20]
```
