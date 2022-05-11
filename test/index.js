function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) return null;

  // inorder 左根右 postorder 左右根
  // 推导根 postorder[postorder.length - 1]

  const root = new TreeNode(postorder[postorder.length - 1]);

  // 分割点
  const index = inorder.findIndex((v) => root.val === v);

  // 左子树的中序遍历
  const leftInroder = inorder.slice(0, index);
  // 左子树的后续遍历
  const leftPostorder = postorder.slice(0, index);

  // 右子树的中序遍历
  const rightInroder = inorder.slice(index + 1, inorder.length);
  // 右子树的后续遍历
  const rightPostorder = postorder.slice(index, postorder.length - 1);

  // console.log({ index, leftInroder, leftPostorder, rightInroder, rightPostorder });
  root.left = buildTree(leftInroder, leftPostorder);
  root.right = buildTree(rightInroder, rightPostorder);

  return root;
};

console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
