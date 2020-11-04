---
title: 快慢指针
---

快慢指针：双指针的一种。在链表中设置两个指针，不同步地遍历链表。可以在两个指针之间制造我们需要的距离。

## [环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

判断链表中是否存在环，可以用哈希，这里用快慢指针实现

```js
var hasCycle = function(head) {
  let p1 = head // 慢指针
  let p2 = head // 快指针
  while (p2 && p2.next) {
    p1 = p1.next
    p2 = p2.next.next
    if (p1 === p2) {
      return true
    }
  }
  return false
}
```

## [链表的中间节点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)　　

快指针的速度是慢指针的两倍，当快指针到达终点时，慢指针正好指向链表的中间节点。注意这里不能是循环链表

```js
var middleNode = function(head) {
  let slow = head
  let fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
}
```

## [环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

这道题目，不仅考察对链表的操作，而且还需要一些数学运算。

假设从头结点到环形入口节点 的节点数为 `x`。
环形入口节点到 `fast` 指针与 `slow` 指针相遇节点 节点数为 `y`。
从相遇节点 再到环形入口节点节点数为 `z`。 如图所示：

![](https://pic.leetcode-cn.com/3be69ecc0e8948a5c0d74edfaed34d3eb92768ab781c1516bf00e618621eda66-142%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A82.png)

那么相遇时：

- `slow` 指针走过的节点数为: `x + y`
- `fast` 指针走过的节点数： `x + y + n (y + z)`，n 为 fast 指针在环内走了 n 圈才遇到 slow 指针， （`y+z`）为 一圈内节点的个数

因为 fast 指针是一步走两个节点，slow 指针一步走一个节点， 所以 fast 指针走过的节点数 = slow 指针走过的节点数 \* 2

$$(x + y) * 2 = x + y + n (y + z)$$

两边消掉一个 `(x+y):` $x + y = n (y + z)$

<span class='mgreen'>因为我们要找环形的入口，那么要求的是 x，因为 x 表示 头结点到 环形入口节点的的距离。</span>

所以我们要求 x ，将 x 单独放在左面：$x = n (y + z) - y$

在从 n(y+z)中提出一个 （y+z）来，整理公式之后为如下公式：$x = (n - 1) (y + z) + z$ 注意这里 n 一定是大于等于 1 的，因为 fast 指针至少要多走一圈才能相遇 slow 指针

这个公式说明什么呢，

先拿 n 为 1 的情况来举例，意味着 fast 指针在环形里转了一圈之后，就遇到了 slow 指针了。

当 n 为 1 的时候，公式就化解为 **`x = z`**, 推导过程：

```JS
(x + y) * 2 = x + y + n (y + z)
x + y = n (y + z) // 消除 x + y
x = n(y+z）+ z // 提公因式
// 如果 n 为 0，x = z
```

**也就是如果从头结点出发一个指针，从相遇节点 也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是 环形入口的节点** 代码：

```js
function detectCycle(head) {
  let slow = head,
    fast = head

  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next

    if (slow === fast) {
      // 相遇的节点
      while (head !== slow) {
        // x=z, 一个从头节点出发，slow 是相遇的节点，每次移动一个节点，相遇后就是 x 的距离了
        head = head.next
        slow = slow.next
      }
      return slow
    }
  }
  return null
}
```

## [寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)

审题：数组的限制在于 **给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间**，

举个例子

```JS
[1, 3, 4, 2, 2] // n = 4, 然后数组里面的数都不大于4 符合条件
[1, 9, 9, 2, 2] // n = 4, 9 大于 4，不符合条件
```

<h3>快慢指针解法</h3>

分析这个数组的特点，索引从 0 ～ n0 ～ n ，数组项的范围是 1 ～ n1 ～ n 。值域，在索引的范围内，值可以当索引使。

比如，nums 数组：`[4, 3, 1, 2, 2]`

- 以 nums[0] 的值 4 作为索引，去到 nums[4]
- 以 nums[4] 的值 2 作为索引，去到 nums[2]
- 以 nums[2] 的值 1 作为索引，去到 nums[1]……

从一项指向另一项，将 nums 抽象为一个链表：4->2->1->3->2，又指回 2——抽象成链表存在一个环。

![](https://pic.leetcode-cn.com/a393fd88e07b576de4d603fcccd47539e6648273a7f6626760b95ec28d2343b7-%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200526201809.png)

```js
var findDuplicate = function(nums) {
  let s = 0,
    f = 0

  while (true) {
    s = nums[s]
    f = nums[nums[f]]
    if (s === f) {
      let p = 0
      while (nums[p] !== nums[s]) {
        // 环相遇 寻找 x 的距离
        s = nums[s]
        p = nums[p]
      }
      return nums[p]
    }
  }
}
```

<h3>二分法和抽屉原理</h3>

:::info 抽屉原理

桌上有十个苹果，要把这十个苹果放到九个抽屉里，无论怎样放，我们会发现至少会有一个抽屉里面放不少于两个苹果。

:::

思路是先拿出有效范围 `[left, right]` 里的中间数 mid，然后和数组中的每个元素进行比较，统计小于等于这个中间数的元素的个数 cnt。如果 cnt 大于 mid，依然根据抽屉原理，重复元素就应该在区间 `[left, mid]` 里，否则在区间 `[mid+1, right]`。

```js
var findDuplicate = function(nums) {
  let l = 0,
    r = nums.length - 1

  while (l <= r) {
    let mid = (l + r) >> 1
    let cnt = 0
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) cnt++
    }
    if (cnt > mid) r = mid - 1
    else l = mid + 1
  }

  return l
}
```
