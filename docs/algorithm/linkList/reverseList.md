---
title: 链表-反转链表
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

---

题解，双指针遍历：

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/reverseList.gif)

```js
var reverseList = function(head) {
  let p1 = head,
    p2 = null
  while (p1) {
    console.log(p1.val, p2 && p2.val)
    p2 = p1
    p1 = p1.next
  }
}
```

打印结果：

```js
1 null
2 1
3 2
4 3
5 4
```

这时候，我们可以把 p1 的指针指向 p2 即可。 也即 `2 -> 1`、`3 -> 2`...

```js
var reverseList = function(head) {
  let p1 = head,
    p2 = null
  while (p1) {
    const next = p1.next // 保存为临时变量
    p1.next = p2 // p1.next 指向 p2
    p2 = p1 // 记录上一个节点
    p1 = next // 继续下一个循环
  }

  return p2
}
```
