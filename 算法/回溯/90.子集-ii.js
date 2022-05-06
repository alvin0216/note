/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 *
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
 * 输入：nums = [1,2,2]
 * 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  let result = [];
  nums.sort((a, b) => a - b);
  function backtrack(track, idx) {
    result.push([...track]);

    for (var i = idx; i < nums.length; i++) {
      if (nums[i] === nums[i - 1] && i > idx) continue;
      track.push(nums[i]);
      backtrack(track, i + 1);
      track.pop();
    }
  }

  backtrack([], 0);

  return result;
};
// @lc code=end
