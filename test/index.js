function createTree(arr) {
  class Node {
    // 定义节点
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  // 创建二叉树
  let tree = new Node(arr[0]);
  let Nodes = [tree];
  let i = 1;
  for (let node of Nodes) {
    console.log(arr[i]);
    Nodes.push((node.left = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
    Nodes.push((node.right = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
  }
}

var levelOrderBottom = function (root) {
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
    result.unshift(temp);
  }
  return result;
};

console.log(levelOrderBottom(createTree([3, 9, 20, null, null, 15, 7])));
