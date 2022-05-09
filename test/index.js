/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  // dp[i] = Math.min()
  let len = cost.length;
  let dp = [cost[0], cost[1]];
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }

  //已经在楼顶了，在前两步中找花费最少的
  return Math.min(dp[len - 1], dp[len - 2]);
};

minCostClimbingStairs([1, 2, 3, 4, 5]);
