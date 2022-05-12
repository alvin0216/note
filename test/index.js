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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return null;
  if (key > root.val) root.right = deleteNode(root.right, key);
  else if (key < root.val) root.left = deleteNode(root.left, key);
  else {
    // 删除的是当前节点
    if (!root.left) return root.right;
    else if (!root.right) return root.left;
    else {
      // 左右子树都存在的情况下
      let newRoot = root.right;

      // 找到右子树下的最左子树，将原本的 root.left 指向这个节点
      let cur = root.right;
      while (cur.left) {
        cur = cur.left;
      }
      cur.left = root.left;

      return newRoot;
    }
  }

  return root;
};
