/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  if (!root) return 0;

  let nums = [];
  let queue = [root];

  while (queue.length) {
    let len = queue.length;

    let sum = 0;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      sum += node.val;
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    nums.push(sum);
  }

  console.log(111, nums);
  return;
  // 打家劫舍
  function robRoom(nums) {
    let len = nums.length;
    let dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < len; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[len - 1];
  }

  return robRoom(nums);
};

class Node {
  // 定义节点
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const createTree = (arr) => {
  // 创建二叉树
  let tree = new Node(arr[0]);
  let Nodes = [tree];
  let i = 1;
  for (let node of Nodes) {
    Nodes.push((node.left = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
    Nodes.push((node.right = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
  }
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  let result = [];
  let queue = [root];

  while (queue.length) {
    let len = queue.length;
    let temp = [];
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      temp.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    result.push(temp);
  }
  return result;
};

console.log(rob(createTree([2, 1, 3, null, 4])));
