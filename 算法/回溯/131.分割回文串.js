/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 * https://leetcode-cn.com/problems/palindrome-partitioning/
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 */

const isPalindrome = (s, l, r) => {
  for (let i = l, j = r; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
};

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  let result = [];

  function backtrack(track, i) {
    if (i >= s.length) {
      result.push([...track]);
      return;
    }

    for (let j = i; j < s.length; j++) {
      if (!isHuiWen(s.slice(i, j + 1))) continue;

      // 判断是否回文
      track.push(s.slice(i, j + 1));
      backtrack(track, j + 1);
      track.pop();
    }
  }

  function isHuiWen(s) {
    let tmp = s.split('');
    while (tmp.length > 1) {
      if (tmp.pop() !== tmp.shift()) return false;
    }
    return true;
  }

  backtrack([], 0);

  return result;
};
// @lc code=end

console.log(partition('aab'));
