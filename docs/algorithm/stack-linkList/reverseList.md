---
title: 反转链表
date: 2020-07-23 11:55:25
---

## 简单的反转链表

leetcode [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

```js
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

限制：0 <= 节点个数 <= 5000

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {}
```

:::details 答案与解析

- cur 游标，一直往后循环，最后会为 null
- prev 记录前一个节点

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/reverseList.gif)

```js
var reverseList = function(head) {
  let prev = null,
    current = head

  while (current) {
    let next = current.next
    current.next = prev
    prev = current
    current = next
  }

  return prev
}
```

:::
