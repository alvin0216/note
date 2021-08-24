---
title: 滑动窗口
---

## 算法思路

> 滑动窗口法，也叫尺取法（可能也不一定相等，大概就是这样 =。=），可以用来解决一些查找满足一定条件的连续区间的性质（长度等）的问题。由于区间连续，因此当区间发生变化时，可以通过旧有的计算结果对搜索空间进行剪枝，这样便减少了重复计算，降低了时间复杂度。往往类似于“**请找到满足 xx 的最 x 的区间（子串、子数组）的 xx**”这类问题都可以使用该方法进行解决。

该算法的大致逻辑如下：

```js
let left = 0
let right = 0

while (right < s.length) {
  // 增大窗口
  window.add(s[right])
  right++

  while (临界条件) {
    // 缩小窗口
    window.remove(s[left])
    left++
  }
}
```

这个算法技巧的时间复杂度是 O(N)，比字符串暴力算法要高效得多。

令人困扰的，不是算法的思路，而是各种细节问题。比如说如何向窗口中添加新元素，如何缩小窗口，在窗口滑动的哪个阶段更新结果。即便你明白了这些细节，也容易出 bug，找 bug 还不知道怎么找，真的挺让人心烦的。

---

滑动窗口题目:

- 3 无重复字符的最长子串
- 30 串联所有单词的子串
- 76 最小覆盖子串
- 159 至多包含两个不同字符的最长子串
- 209 长度最小的子数组
- 239 滑动窗口最大值
- 567 字符串的排列
- 632 最小区间
- 727 最小窗口子序列

借鉴：

- [双指针 + 滑动窗口](https://github.com/Alex660/Algorithms-and-data-structures/blob/master/demos/%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A311%E9%81%93.md)
- [Leetcode 刷题总结之滑动窗口法（尺取法）](https://zhuanlan.zhihu.com/p/61564531)
- [滑动窗口技巧](https://labuladong.gitbook.io/algo/suan-fa-si-wei-xi-lie/hua-dong-chuang-kou-ji-qiao-jin-jie)

## 3 无重复字符的最长子串

[链接](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/): 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

```js
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {}
```

---

<h3>题解</h3>

![无重复字符最长字串](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/others/无重复字符最长字串.gif)

```js
var lengthOfLongestSubstring = function (s) {
  let start = 0
  let maxLen = 0
  let end = 0
  let map = new Map()
  while (end < s.length) {
    let char = s[end]

    // 当且仅当 s[start,end) 中存在s[end]时更新start
    if (map.has(char)) {
      start = Math.max(start, map.get(char) + 1)
    }
    map.set(char, end) // 记录每个字符最后出现位置
    end++

    maxLen = Math.max(maxLen, end - start)
  }

  return maxLen
}
```

以 `abcabcbb` 为例

- 移动右指针，如果遇到重复的字符则更新左指针为靠后的下标，循环..
- map 存储各个字符最后出现的位置，`{ 'a' => 3, 'b' => 7, 'c' => 5 }`
- 每次循环计算最大值

## 209 长度最小的子数组

```js
给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，
并返回其长度。如果不存在符合条件的子数组，返回 0。

输入：s = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

提示：不断移动右指针，临界条件是移动区间总和大于 s 时，收缩左指针。

:::details 答案

```js
var minSubArrayLen = function (s, nums) {
  let start = 0
  let end = 0
  let sum = 0
  let minLen = Infinity // 定义为无穷大

  while (end < nums.length) {
    sum += nums[end]

    while (sum >= s) {
      minLen = Math.min(minLen, end - start + 1)
      sum -= nums[start]
      start++
    }

    end++
  }
  return minLen === Infinity ? 0 : minLen
}
```

:::

## 567 字符串的排列

```js
给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的子串。

输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").

输入: s1= "ab" s2 = "eidboaoo"
输出: False

注意：
  输入的字符串只包含小写字母
  两个字符串的长度都在 [1, 10,000] 之间

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {}
```

:::details 答案

```js
var checkInclusion = function (s1, s2) {
  let window = {}
  let dictionary = {} // 字典存储
  for (const char of s1) {
    if (dictionary.hasOwnProperty(char)) dictionary[char]++
    else dictionary[char] = 1
  }

  let start = 0,
    end = 0

  while (end < s2.length) {
    const char = s2[end]

    // 塞入窗口
    if (window.hasOwnProperty(char)) window[char]++
    else window[char] = 1

    end++

    // 调整窗口，判断左侧窗口是否要收缩
    while (end - start > s1.length) {
      let d = s2[start]
      start++
      window[d]--
    }

    // 判断 window 和 dictionary 是否相等
    if (isEqual(dictionary, window)) {
      return true
    }
  }

  return false
}

// 以 ob1 为准
function isEqual(obj1, obj2) {
  for (let k in obj1) {
    if (obj1[k] !== obj2[k]) {
      return false
    }
  }
  return true
}
```

:::

## 30 串联所有单词的子串
