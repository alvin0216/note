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
 * @return {TreeNode}
 */
var convertBST = function (root) {
  let num = 0;
  function dfs(node) {
    if (!node) return;
    dfs(node.right);
    node.val = node.val + num;
    num = node.val;
    dfs(node.left);
    return node;
  }
  return dfs(root);
};
