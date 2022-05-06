---
title: 删除链表的倒数第n个结点
date: 2022-03-31 20:46:00
sidebar: auto
tags:
  - 链表
categories:
  - leetcode
---

```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let fast = head;
  while (n-- && fast) {
    fast = fast.next;
  }

  let prev = new ListNode(undefined, head);
  let slow = prev;

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  return prev.next;
};
```
