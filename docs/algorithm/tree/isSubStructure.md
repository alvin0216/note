---
title: 树的子结构
date: 2020-08-20 11:42:41
---

[剑指 Offer 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

```js
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

给定的树 A:

     3
    / \
   4   5
  / \
 1   2

给定的树 B：

   4
  /
 1
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

输入：A = [1,2,3], B = [3,1]
输出：false

输入：A = [3,4,5,1,2], B = [4,1]
输出：true

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {}
```

答案：

```JS
var isSubStructure = function(A, B) {
  if (!A || !B) return false

  return isSameTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
}

var isSameTree = function(p, q) {
  if (!q) return true // 注意 B 为空时也是判断为相同的结构
  if (!p && !q) return true
  if (p && q
      && p.val === q.val
      && isSameTree(p.left, q.left)
      && isSameTree(p.right, q.right)) {
    return true
  }
  return false
}
```
