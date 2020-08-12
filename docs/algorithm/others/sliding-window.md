---
title: 滑动窗口
---

借鉴：[Leetcode 刷题总结之滑动窗口法（尺取法）](https://zhuanlan.zhihu.com/p/61564531)

> 滑动窗口法，也叫尺取法（可能也不一定相等，大概就是这样 =。=），可以用来解决一些查找满足一定条件的连续区间的性质（长度等）的问题。由于区间连续，因此当区间发生变化时，可以通过旧有的计算结果对搜索空间进行剪枝，这样便减少了重复计算，降低了时间复杂度。往往类似于“**请找到满足 xx 的最 x 的区间（子串、子数组）的 xx**”这类问题都可以使用该方法进行解决。

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

## 3. 无重复字符的最长子串 <Badge text='中等' />

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
var lengthOfLongestSubstring = function(s) {
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
