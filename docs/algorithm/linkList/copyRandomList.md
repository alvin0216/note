---
title: 复杂链表的复制
date: 2020-08-20 21:32:26
---

## 链表的复制

- 递归思想：把大问题转换为若干小问题。
- 将复杂链表分为头结点和剩余结点两部分，剩余部分采用递归方法。

```js
var copyLinkList = function(head) {
  if (!head) return null
  let cloneNode = new TreeNode(head.val)
  cloneNode.next = copyLinkList(head.next)
  return cloneNode
}
```

## 剑指 Offer 35. 复杂链表的复制

[剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

请实现 `copyRandomList` 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 `next` 指针指向下一个节点，还有一个 `random` 指针指向链表中的任意节点或者 `null`。

**示例 1：**

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png)

```js
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**示例 2：**

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e2.png)

```js
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]
```

**示例 3：**
![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e3.png)

```js
输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

**示例 4：**

```js
输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
```

提示

- -10000 <= Node.val <= 10000
- Node.random 为空（null）或指向链表中的节点。
- 节点数目不超过 1000 。

```js
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {}
```

<h3>题解</h3>

1. 创建 HashMap
2. 复制结点值
3. 复制指向（next,random)

```js
var copyRandomList = function(head) {
  if (!head) return null

  const map = new Map() // { 原节点 => 复制节点 }
  let node = head // 当前节点

  const copyHead = new Node(node.val) // 复制的链表的头

  let copyNode = copyHead // 当前节点的copy
  map.set(node, copyNode)

  // 复制 node 节点
  while (node.next) {
    copyNode.next = new Node(node.next.val)
    node = node.next
    copyNode = copyNode.next
    map.set(node, copyNode)
  }

  // 通过哈希表获得节点对应的复制节点，更新 random 指针
  copyNode = copyHead
  node = head
  while (copyNode) {
    copyNode.random = map.get(node.random)
    copyNode = copyNode.next
    node = node.next
  }

  return copyHead
}
```
