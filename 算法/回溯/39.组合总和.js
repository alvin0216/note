/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let result = [];

  function backtrack(track, idx, sum) {
    if (sum === target) return result.push([...track]);
    if (sum > target) return;

    for (let i = idx; i < candidates.length; i++) {
      if (candidates[i] > target - sum) continue;
      track.push(candidates[i]);
      sum += candidates[i];
      backtrack(track, i, sum);
      sum -= candidates[i];
      track.pop();
    }
  }

  backtrack([], 0, 0);
  return result;
};
// @lc code=end

console.log(combinationSum([2, 3, 6, 7], 7));
console.log(combinationSum([2, 3, 5], 8));
