/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let result = [];
  let len = nums.length;
  nums.sort((a, b) => a - b); // 排序 从小到大

  // 起始位置小于0 末尾大于0 才可能得到 0 的目标值
  if (nums[0] <= 0 && nums[len - 1] >= 0) {
    for (let i = 0; i < len - 2; ) {
      let first = i;
      let second = i + 1;
      let third = len - 1;

      if (nums[first] > 0) break; // 当前遍历的起始位置大于 0，绝对无解，跳出循环

      while (second < third) {
        if (nums[first] * nums[third] > 0) break; // 两人选相遇，或者三人同符号，则退出
        let sum = nums[first] + nums[second] + nums[third];
        if (sum === 0) {
          result.push([nums[first], nums[second], nums[third]]);
        } else if (sum < 0) {
          // 实力太弱，把菜鸟那边右移一位
          while (second < third && nums[second] === nums[++second]) {} // 如果相等就跳过
        } else {
          while (second < third && nums[third] === nums[--third]) {}
        }
      }

      while (nums[i] === nums[++i]) {}
    }
  }

  return result;
};
