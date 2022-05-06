// https://leetcode-cn.com/problems/permutations/

// 不考虑重复值 这个比较简单
// 使用回溯法

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let result = [];
  let track = []; // 记录一个路径
  let used = []; // 记录已经被使用过的数据

  function dfs(nums, track) {
    // 结束条件
    if (track.length == nums.length) {
      // 位置1:利用es6的'... 展开运算符'进行浅拷贝
      result.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // 跳过本次循环
      track.push(nums[i]);
      used[i] = true;
      dfs(nums, track);
      track.pop(); // 删除路径
      used[i] = false;
    }
  }

  dfs(nums, track);

  return result;
};
