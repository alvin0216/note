---
title: k个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  let p = head,
    len = 0;
  while (p) {
    p = p.next;
    len++;
  }

  function dfs(node, len) {
    if (len < k) return node;

    // 反转链表
    let prev = null,
      cur = node;
    for (let i = 0; i < k; i++) {
      let next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }

    node.next = dfs(cur, len - k);
    return prev;
  }

  return dfs(head, len);
};
```
