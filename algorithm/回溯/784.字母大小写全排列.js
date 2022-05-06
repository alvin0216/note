/*
 * @lc app=leetcode.cn id=784 lang=javascript
 *
 * [784] 字母大小写全排列
 * https://leetcode-cn.com/problems/letter-case-permutation/
 *
 * 输入：s = "a1b2
 * 输出：["a1b2", "a1B2", "A1b2", "A1B2"]
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let result = [];
  function dfs(i, str) {
    if (i === s.length) {
      result.push(str);
      return;
    }
    if (/\d/.test(s[i])) dfs(i + 1, str + s[i]);
    else {
      dfs(i + 1, str + s[i].toLowerCase());
      dfs(i + 1, str + s[i].toUpperCase());
    }
  }

  dfs(0, '');

  return result;
};

// @lc code=end

console.log(letterCasePermutation('a1b2'));
