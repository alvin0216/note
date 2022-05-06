/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let prev = new ListNode(undefined, head); //
  let cur = prev;
  // 我们以下个节点的值作为评判标准
  // 命中 则 cur.next = cur.next.next
  // 所以我们可以构造前置节点 来排除头节点的情况
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next;
    else cur = cur.next;
  }

  return prev.next;
};
// @lc code=end
