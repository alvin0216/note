---
title: 双指针
date: 2020-11-04 17:33:47
---

**双指针是指 两个指针以某种模式（例如一个从前，一个从后面）在数据结构中迭代，直到两个指针达到某种特定条件。**

## [移除元素](https://leetcode-cn.com/problems/remove-element/submissions/)

```js
var removeElement = function(nums, val) {
  let i = 0,
    n = nums.length
  while (i < n) {
    if (nums[i] === val) {
      nums[i] = nums[n - 1]
      n--
    } else {
      i++
    }
  }
  return n
}
```

## [反转字符串](https://leetcode-cn.com/problems/reverse-string/)

```JS
var reverseString = function(s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]]
  }
}
```

## [反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/submissions/)

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

## [三数之和](https://leetcode-cn.com/problems/3sum/)
