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
    Nodes.push((node.left = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
    Nodes.push((node.right = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
  }
}
