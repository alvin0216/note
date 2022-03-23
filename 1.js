/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let left,
    right,
    nowMax,
    len = s.length,
    maxLength = 0,
    maxStart;

  for (let i = 0; i < len; i++) {
    left = i - 1;
    right = i + 1;
    nowMax = 1; // 当前区间最大长度重置为 1
    // 从中心 i 出发，往左找到第一个不同的，即开始找可能会不满足题意的回文子串，并准备判断
    while (left >= 0 && s[left] === s[i]) {
      left--;
      nowMax++;
    }
    // 从中心 i 出发，往右找到第一个不同的，即开始找可能会不满足题意的回文子串，并准备判断
    while (right < len && s[right] === s[i]) {
      right++;
      nowMax++;
    }
    // 开始左右指针各往外遍历，寻找到第一个不符合回文串的位置
    while (left >= 0 && right < len && s[left] === s[right]) {
      left--;
      right++;
      nowMax += 2;
    }
    // 遍历结束，看看此时子串是否最大
    if (nowMax > maxLength) {
      maxLength = nowMax;
      maxStart = left;
    }
  }

  return s.slice(maxStart + 1, maxStart + 1 + maxLength);
};

console.log(longestPalindrome('cbbd'));

// /**
//  * Definition for singly-linked list.
//  * function ListNode(val, next) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.next = (next===undefined ? null : next)
//  * }
//  */
// /**
//  * @param {ListNode} head
//  * @param {number} left
//  * @param {number} right
//  * @return {ListNode}
//  */
// var reverseBetween = function (head, left, right) {
//   let temp = new ListNode();
//   temp.next = head;

//   // 翻转的前一个节点
//   let leftNode = temp;

//   // [1, 2, 3, 4, 5] left 2 right 4
//   // leftNode => 1
//   for (let i = 0; i < left - 1; i++) {
//     leftNode = leftNode.next;
//   }

//   // 翻转的节点
//   // rightNode => 4
//   let rightNode = leftNode;
//   for (let i = 0; i < right - left + 1; i++) {
//     rightNode = rightNode.next;
//   }

//   // 第 3 步：切断出一个子链表（截取链表）
//   let middleNode = leftNode.next;
//   let nextNode = rightNode.next;

//   // 注意：切断链接
//   leftNode.next = null;
//   rightNode.next = null;

//   console.log(middleNode);

//   // 第 4 步：同第 206 题，反转链表的子区间
//   reverseLinkedList(middleNode);

//   // 第 5 步：接回到原来的链表中
//   //  leftNode -> middleNode -> nextNode;
//   leftNode.next = rightNode;
//   middleNode.next = nextNode;

//   return temp.next;
// };

// function reverseLinkedList(head) {
//   let leftNodev = null,
//     cur = head;

//   while (cur) {
//     const next = cur.next;
//     cur.next = leftNodev;
//     leftNodev = cur;
//     cur = next;
//   }
// }

// function ListNode(val, next) {
//   this.val = val === undefined ? 0 : val;
//   this.next = next === undefined ? null : next;
// }

// const { getListNode, bfsListNode } = require('./utils');

// reverseBetween(getListNode([1, 2, 3, 4, 5]), 2, 4);

// // bfsListNode(result);
