/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 1. 确定递归的函数
  // 2. 确定递归终止条件
  if (!root || root === p || root === q) {
  }
  // 3. 确定递归单层逻辑
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  //如果在某一个节点的左右子树都能找到p和q说明这个节点就是公共祖先
  if (left !== null && right !== null) {
    return root;
  }
  if (left === null) {
    //如果左子树没找到就说明p，q都在右子树
    return right;
  }
  return left; //如果右子树没找到就说明p，q都在左子树
};
