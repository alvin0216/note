---
title: 基础
date: 2020-08-20 20:21:49
---

## 剑指 Offer 06. 从尾到头打印链表

```js
输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

输入：head = [1,3,2]
输出：[2,3,1]

/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {}
```

其实就是遍历链表，答案：

```js
var reversePrint = function(head) {
  let result = []
  while (head) {
    result.unshift(head.val)
    head = head.next
  }

  return result
}
```

## 剑指 Offer 18. 删除链表的节点

```js
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {}
```

答案：

```JS
var deleteNode = function(head, val) {
  let current = head
  let prev = new ListNode(-1) // 保存上一个节点
  while (current) {
    if (current.val === val) {
      if (current === head) head = head.next // 当前是 head 头节点
      else prev.next = current.next // 其他情况
      break
    }
    prev = current
    current = current.next
  }

  return head
}
```

别人的题解，递归：

```js
var deleteNode = function(head, val) {
  if (head.val == val) {
    return head.next
  }

  head.next = deleteNode(head.next, val)
  return head
}
```

不免感叹，递归用的真好。
