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
