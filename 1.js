var findDuplicate = function(nums) {
  // 暴力 O(n)
  // let map = {}
  // for (let i = 0; i < nums.length; i++) {
  //     if (map[nums[i]]) return nums[i]
  //     map[nums[i]] = 1
  // }

  // 你设计的解决方案必须不修改数组 nums 且只用常量级 O(1) 的额外空间。暴力法不符合条件
  // 进阶 环形链表 + 快慢指针  注意提示 1 <= nums[i] <= n 也就是数组内的值小于 n
  let slow = nums[0];
  let fast = nums[nums[0]];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }
};
