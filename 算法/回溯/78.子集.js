/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let result = [];
  function backtrack(track, idx) {
    result.push([...track]);

    for (var i = idx; i < nums.length; i++) {
      track.push(nums[i]);
      backtrack(track, i + 1);
      track.pop();
    }
  }

  backtrack([], 0);

  return result;
};
// @lc code=end
