// 剑指 Offer 38. 字符串的排列
// https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/

/** 
  输入：s = "abc"
  输出：["abc","acb","bac","bca","cab","cba"]
*/

/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
  let result = [];
  let visited = [];

  s = s.split('').sort((a, b) => a.charCodeAt() - b.charCodeAt());

  function backtrack(track) {
    if (track.length === s.length) {
      result.push([...track].join(''));
      return;
    }

    for (let i = 0; i < s.length; i++) {
      if (visited[i] || (!visited[i - 1] && s[i] === s[i - 1])) continue;
      track.push(s[i]);
      visited[i] = true;
      backtrack(track);
      track.pop();
      visited[i] = false;
    }
  }

  backtrack([]);
  return result;
};

console.log(permutation('abb'));
