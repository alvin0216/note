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

<h3>题解</h3>

在翻转链表的时候，可以借助三个指针：prev、curr、next，分别代表前一个节点、当前节点和下一个节点，实现过程如下所示。

![reverseList](http://s0.lgstatic.com/i/image2/M01/90/E9/CgotOV2IRJ2AYlnUACToKJcAldQ867.gif)

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

1. 将 curr 指向的下一节点保存到 next 指针；
2. curr 指向 prev，一起前进一步；
3. 重复之前步骤，直到 k 个元素翻转完毕；
4. 当完成了局部的翻转后，prev 就是最终的新的链表头，curr 指向了下一个要被处理的局部，而原来的头指针 head 成为了链表的尾巴。

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
