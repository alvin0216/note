/*
 * @lc app=leetcode.cn id=541 lang=javascript
 *
 * [541] 反转字符串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  let arr = s.split('');

  for (let i = 0; i < s.length; i += 2 * k) {
    let y = Math.min(i + k, s.length) - 1;
    for (let x = i; x < y; x++, y--) {
      [arr[x], arr[y]] = [arr[y], arr[x]];
    }
  }

  return arr.join('');
};

console.log(reverseStr('abcdefg', 2));

// @lc code=end
