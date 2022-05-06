// https://leetcode-cn.com/problems/permutations-ii/

/**
 * @param {number[]} nums
 * @return {number[][]}
 *
 * ! 不同于全排列1 这里需要考虑重复的情况，所以回溯的时候加入
 * ! nums[i] == nums[i - 1] && !visited[i - 1] 进行判断（需要对数组先行排序）
 *
 */
var permuteUnique = function (nums) {
  let result = [],
    len = nums.length,
    visited = new Array(len).fill(false); // 用于剪枝

  nums.sort((a, b) => a - b); // 排序

  function backtrack(path) {
    // 判断终止条件
    if (path.length === len) {
      result.push(path.slice());
      return;
    }

    for (let i = 0; i < len; i++) {
      if (visited[i] || (nums[i] == nums[i - 1] && !visited[i - 1])) continue; // 跳过

      // 加入当前数字并置状态位为已加入选择
      path.push(nums[i]);
      visited[i] = true;
      // 继续回溯
      backtrack(path);

      // 撤销选择并还原状态位
      path.pop();
      visited[i] = false;
    }
  }

  backtrack([]);

  return result;
};

console.log(permuteUnique([1, 2, 1]));
