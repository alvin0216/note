---
title: 概览
date: 2020-08-20 11:50:33
---

> 链表在开发中也是经常用到的数据结构，React16 的 Fiber Node 连接起来形成的 Fiber Tree, 就是个单链表结构。

<h2>基本应用</h2>

主要是对链表基本概念和特性的应用，如果基础概念掌握牢靠，此类问题即可迎刃而解

- [从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)
- [删除链表中的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)
- [反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

<h2>环类题目</h2>

环类题目即从判断一个单链表是否存在循环而扩展衍生的问题

- [环形链表]()
- [链表环的入口节点]()
- [约瑟夫环]()

<h2>双指针</h2>

双指针的思想在链表和数组中的题目都经常会用到，主要是利用两个或多个不同位置的指针，通过速度和方向的变换解决问题。

- 两个指针从不同位置出发：一个从始端开始，另一个从末端开始；
- 两个指针以不同速度移动：一个指针快一些，另一个指针慢一些。

对于单链表，因为我们只能在一个方向上遍历链表，所以第一种情景可能无法工作。然而，第二种情景，也被称为慢指针和快指针技巧，是非常有用的。

- [两个链表的公共节点]()
- [链表倒数第 k 个节点]()
- [相交链表]()

<h2>双向链表</h2>

双链还有一个引用字段，称为 prev 字段。有了这个额外的字段，您就能够知道当前结点的前一个结点。

- [扁平化多级双向链表]()

---

from [conardli 链表](http://www.conardli.top/docs/dataStructure/%E9%93%BE%E8%A1%A8/%E9%93%BE%E8%A1%A8.html)
