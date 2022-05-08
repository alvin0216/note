/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let len = nums.length;

  if (len === 0) return 0;
  if (len === 1) return nums[0];

  function fn(nums) {
    let _len = nums.length;
    let dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < _len; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[_len - 1];
  }

  return Math.max(fn(nums.slice(0, len - 1)), fn(nums.slice(1)));
};

console.log(rob([1, 2, 3, 1]));
