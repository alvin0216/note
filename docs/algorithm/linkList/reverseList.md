---
title: 反转链表
date: 2020-07-23 11:55:25
---

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
  let cur = head,
    prev = null
  while (cur) {
    console.log(cur.val, prev && prev.val)
    prev = cur
    cur = cur.next
  }
}
```

打印结果：

```js
1 null // 1.next = null
2 1    // 2.next = 1
3 2    // 3.next = 2
4 3    // ...
5 4
```

这时候，我们可以把 prev 的指针指向 cur 即可。 也即 `2 -> 1`、`3 -> 2`...

```js
var reverseList = function(head) {
  let cur = head,
    prev = null
  while (cur) {
    const next = cur.next // 保存为临时变量
    cur.next = prev // cur.next 指向 prev
    prev = cur // 记录上一个节点
    cur = next // 继续下一个循环
  }

  return prev
}
```
