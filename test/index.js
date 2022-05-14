var maxSubArray = function (nums) {
  // dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);

  let dp = [nums[0]];
  let len = nums.length;

  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
  }

  console.log(dp);

  return dp[len - 1];
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
