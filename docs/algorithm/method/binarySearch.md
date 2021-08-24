---
title: 二分查找
date: 2020-05-24 23:37:51
---

## 算法思路

> 在一个有序的区间，不断缩小检索范围，类似于滑动窗口，时间复杂度：`O(logN)`

该算法的大致逻辑如下：

```js
function binarySearch(arr, target) {
  let left = 0, right = ...
  while (...) {
    const mid = (left + right) >> 1 // 位运算 向左移动一个符号位 相当于求一个数的二分之一且向下取整
    if (target === arr[mid]) {
      return ...
    } else if (target > arr[mid]) {
      left = ...
    } else if (target < arr[mid]) {
      right = ...
    }
  }
  return ...
}
```

<h3>位运算</h3>

`>>`: 表示二进制符号位向右移动。

- `>> 0`：向下取整，相当于 `Math.floor(num)`
- `>> 1`：二分之一 + 向下取整，相当于 `Math.floor(num / 2)`

:::tip 这里为什么不使用 Math.floor((left +right) / 2) 呢？

这句代码在 left 和 right 很大的时候, 会发生**整型溢出**。如何避免了可以修改

```js
const mid = Math.floor((left + right) / 2)

// 修改为
const mid = Math.floor(left + (right - left) / 2)

// 推导一下：
left + right / 2 - left / 2 = (left + right) / 2
```

解决整型溢出的方法还有就是位运算 如上。
:::

## 704 二分查找

```js
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，
写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1

提示：
  你可以假设 nums 中的所有元素是不重复的。
  n 将在 [1, 10000]之间。
  nums 的每个元素都将在 [-9999, 9999]之间。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {}
```

答案：

```js
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}
```

1、为什么 `while` 循环的条件中是 <=，而不是 <？

答：因为初始化 `right` 的赋值是 `nums.length - 1`，即最后一个元素的索引，而不是 `nums.length`。

这二者可能出现在不同功能的二分查找中，区别是：前者相当于两端都闭区间 `[left, right]`，后者相当于左闭右开区间 `[left, right)`，因为索引大小为 `nums.length` 是越界的

我们这个算法中使用的是前者 `[left, right]` 两端都闭的区间。这个区间其实就是每次进行搜索的区间。

什么时候应该停止搜索呢？当然，找到了目标值的时候可以终止：

```js
if (nums[mid] === target) return mid
```

但如果没找到，就需要 while 循环终止，然后返回 -1。那 while 循环什么时候应该终止？**搜索区间为空**的时候应该终止，意味着你没得找了，就等于没找到嘛。

- `while(left <= right)` 的终止条件是 `left == right + 1`，写成区间的形式就是 `[right + 1, right]`，或者带个具体的数字进去 [3, 2]，可见这时候区间为空，因为没有数字既大于等于 3 又小于等于 2 的吧。所以这时候 while 循环终止是正确的，直接返回 -1 即可。

- `while(left < right)` 的终止条件是 `left == right`，写成区间的形式就是 `[left, right]`，或者带个具体的数字进去 [2, 2]，这时候区间非空，还有一个数 2，但此时 while 循环终止了。也就是说这区间 [2, 2] 被漏掉了，索引 2 没有被搜索，如果这时候直接返回 -1 就是错误的。

当然，如果你非要用 while(left < right) 也可以，我们已经知道了出错的原因，就打个补丁好了：

```js
//...
while (left < right) {
  // ...
}
return nums[left] == target ? left : -1
```

2、为什么 left = mid + 1，right = mid - 1？我看有的代码是 right = mid 或者 left = mid，没有这些加加减减，到底怎么回事，怎么判断

答：这也是二分查找的一个难点，不过只要你能理解前面的内容，就能够很容易判断。

刚才明确了「搜索区间」这个概念，而且本算法的搜索区间是两端都闭的，即 [left, right]。那么当我们发现索引 mid 不是要找的 target 时，下一步应该去搜索哪里呢？

当然是去搜索 [left, mid-1] 或者 [`mid+1, right]` 对不对？因为 mid 已经搜索过，应该从搜索区间中去除。

## 判断条件以及区别

<span class='pink'>第一个，最基本的二分查找算法：</span>

```js
因为我们初始化 right = nums.length - 1
所以决定了我们的「搜索区间」是 [left, right]
所以决定了 while (left <= right)
同时也决定了 left = mid+1 和 right = mid-1

因为我们只需找到一个 target 的索引即可
所以当 nums[mid] == target 时可以立即返回
```

<span class='pink'>第二个，寻找左侧边界的二分查找：</span>

```js
因为我们初始化 right = nums.length
所以决定了我们的「搜索区间」是 [left, right)
所以决定了 while (left < right)
同时也决定了 left = mid + 1 和 right = mid

因为我们需找到 target 的最左侧索引
所以当 nums[mid] == target 时不要立即返回
而要收紧右侧边界以锁定左侧边界
```

<span class='pink'>第三个，寻找右侧边界的二分查找：</span>

```js
因为我们初始化 right = nums.length
所以决定了我们的「搜索区间」是 [left, right)
所以决定了 while (left < right)
同时也决定了 left = mid + 1 和 right = mid

因为我们需找到 target 的最右侧索引
所以当 nums[mid] == target 时不要立即返回
而要收紧左侧边界以锁定右侧边界

又因为收紧左侧边界时必须 left = mid + 1
所以最后无论返回 left 还是 right，必须减一
```

下面是 3 种写法的代码：

```js
// 基本写法 right = nums.length - 1, while(left <= right)
var search1 = function (nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    if (target === nums[mid]) {
      return mid
    } else if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    }
  }
  return -1
}

// 写法 2
var search2 = function (nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    if (target === nums[mid]) {
      right = mid - 1 // 别返回，锁定左侧边界
    } else if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    }
  }
  // 最后要检查 left 越界的情况
  if (left >= nums.length || nums[left] != target) return -1
  return left
}

// 写法 3
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    if (target === nums[mid]) {
      left = mid + 1 // 别返回，锁定右侧边界
    } else if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    }
  }
  // 最后要检查 right 越界的情况
  if (right < 0 || nums[right] != target) return -1
  return right
}
```

## 34 在排序数组中查找元素的第一个和最后一个位置

```js
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]


输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {}
```

:::details 答案

```js
var searchRange = function (nums, target) {
  let min = 0,
    max = nums.length - 1

  while (min <= max) {
    var mid = (max + min) >>> 1
    if (target > nums[mid]) {
      min = mid + 1
    } else if (target < nums[mid]) {
      max = mid - 1
    } else {
      let start = mid,
        end = mid

      while (start > min && nums[start] === nums[start - 1]) start--
      while (end < max && nums[end] === nums[end + 1]) end++
      return [start, end]
    }
  }
  return [-1, -1]
}
```

:::

---

鉴于 [我写了一首诗，把所有滑动窗口问题变成了默写题](https://leetcode-cn.com/problems/permutation-in-string/solution/wo-xie-liao-yi-shou-shi-ba-suo-you-hua-dong-chuang/)
