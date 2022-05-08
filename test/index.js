function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

let root = new TreeNode(3, new TreeNode(1, null, new TreeNode(2, null, null)), new TreeNode(4, null, null));

function dfs(root) {
  const stack = [];
  let nums = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    nums.push(current.val);

    current = current.right;
  }

  console.log(nums); // [ 1, 2, 3, 4 ]
}

dfs(root);
