---
title: 环形链表II
date: 2022-03-31 20:46:00
sidebar: auto
tags:
  - 链表
categories:
  - leetcode
---

[力扣题目链接](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

题意：
给定一个链表，返回链表开始入环的第一个节点。  如果链表无环，则返回  null。

为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

**说明**：不允许修改给定的链表。

![循环链表](https://img-blog.csdnimg.cn/20200816110112704.png)

## 思路

![](https://img-blog.csdnimg.cn/20210318162938397.png)

指针 slow 每次走一步，fast 每次走两步，如果有环，则一定会出现相遇的情况，注意这里是要返回环链接的起始位置。那么可以进行推断。

第一次相遇时

- `slow` 走了 `x + y`
- `fast` 走了 `x + y + n(y + z)`, n 指的是 fast 走了 n 次环

指针 slow 每次走一步，fast 每次走两步，得到公式 `2(x + y) = x + y + n(y + z)` , 也即 `x= n(y + z) - y`

整理公式之后为如下公式: `x = (n - 1)(y + z) + z`

先拿 n 为 1 的情况来举例，意味着 fast 指针在环形里转了一圈之后，就遇到了 slow 指针了。

当 n 为 1 的时候，公式就化解为 x = z，

这就意味着，**从头结点出发一个指针，从相遇节点 也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是 环形入口的节点**。

## 代码

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      // 相遇，但这里要求的是环的起始节点
      let slow = head;
      // slow 重头继续走，和相遇过的 fast 指针一样，每次只走一步，肯定会再头节点相遇
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }

  return null;
};
```
