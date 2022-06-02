---
title: 树的实现
date: 2020-05-16 16:43:44
sidebar: auto
tags:
  - 算法与数据结构
categories:
  - 算法与数据结构
---

## 树的概念

我们这一篇所说的`树`就是一种数据逻辑结构，即研究的是数据和数据之间的关系。

> 之前所说的`栈`、`队列`、`链表`都是一种线性结构，相信大家也能发现这种**线性结构**的数据关系有一个共同点，就是数据都是一对一的，对于`集合`这种数据结构，数据是散乱的，他们之间的关系就是隶属于同一个集合。和线性表不同的是，**树这种数据结构是一对多的**，

树是一种非顺序的数据结构。下图展示了树的定义：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree1.png)

这里介绍有关树的术语:

```js
1. 节点的度：一个节点含有的子树的个数称为该节点的度；
2. 树的度：一棵树中，最大的节点的度称为树的度；
3. 叶节点：度为零的节点；
4. 父节点：若一个节点含有子节点，则这个节点称为其子节点的父节点；
5. 子节点：一个节点含有的子树的根节点称为该节点的子节点
6. 兄弟节点：具有相同父节点的节点互称为兄弟节点
7. 节点的层次：从根开始定义起，根为第 1 层，根的子节点为第 2 层，以此类推
8. ...
```

## 二叉搜索树

> 二叉树中的节点最多只能有两个子节点，一个是左子节点，一个是右子节点。左右子节点的顺序不能颠倒。因此，二叉树中不存在度大于 2 的节点。

二叉搜索树（`BST——Binary Search Tree`）是二叉树的一种，它规定在**左子节点上存储小（比父节点）的值，在右子节点上（比父节点）存储大（或等于）的值**。上图就是一个二叉搜索树。

- 父节点 > 子节点
- 左节点 < 右节点

下面是二叉搜索树的数据结构示意图：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree2.png)

首先创建一个类来表示二叉查找树，它的内部应该有一个 `Node` 类，用来表示节点

```js
function Node(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}
```

以下是我们要实现的 `BinarySearchTree` 类的骨架部分：

```js
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 向树中插入一个节点
  insert(key) {}

  // 通过中序遍历方式遍历树中的所有节点
  inOrderTraverse() {}

  // 通过先序遍历方式遍历树中的所有节点
  preOrderTraverse() {}

  // 通过后序遍历方式遍历树中的所有节点
  postOrderTraverse() {}

  // 返回树中的最小节点
  min() {}

  // 返回树中的最大节点
  max() {}

  // 在树中查找一个节点
  search(key) {}

  // 从树中移除一个节点
  remove(key) {}
}
```

### 插入节点的实现

先来看看向树中添加一个节点

```js
insert(key) {
  let newNode = new Node(key)

  if (this.root === null) this.root = newNode
  else insertNode(this.root, newNode)
}
```

当树的 `root` 为 `null` 时，表示树为空，这时直接将新添加的节点作为树的根节点。否则，我们需要借助于私有函数 `insertNode()`来完成节点的添加。

在 `insertNode()`函数中，我们需要根据新添加节点的 `key` 的大小来递归查找树的左侧子节点或者右侧子节点，因为根据我们的二叉搜索树的定义，值小的节点永远保存在左侧子节点上，值大的节点（包括值相等的情况）永远保存在右侧子节点上。下面是 `insertNode()`函数的实现代码：

```js
let insertNode = function (node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) node.left = newNode;
    else insertNode(node.left, newNode);
  } else {
    if (node.right === null) node.right = newNode;
    else insertNode(node.right, newNode);
  }
};
```

所有新节点只能作为叶子节点被添加到树中。在本文一开始给出的树的结构图中，如果要添加节点 2，对应的操作步骤如下：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree3.png)

我们传入树的根节点，依次进行递归，找到对应的叶子节点，然后修改节点的左子节点或右子节点指针，使其指向新添加的节点。

在上例中，如果要添加节点 4，它对应的位置应该是节点 3 的右子节点，因为 4 比 3 大。如果要添加节点 21，对应的位置应该是节点 25 的左子节点......

### 树的遍历

下面我们来看看树的三种遍历方式：

- 前序遍历：首先访问根节点，然后遍历左子树，最后遍历右子树，可记录为根—左—右；
- 中序遍历：首先访问左子树，然后访问根节点，最后遍历右子树，可记录为左—根—右；
- 后序遍历：首先遍历左子树，然后遍历右子树，最后遍历根节点，可记录为左—右—根。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree4.png)

下面的三个方法对应树的三种遍历方式：

```js
// 前序遍历
let preOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    callback(node.key);
    preOrderTraverseNode(node.left, callback);
    preOrderTraverseNode(node.right, callback);
  }
};

// 中序遍历
let inOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    inOrderTraverseNode(node.left, callback);
    callback(node.key);
    inOrderTraverseNode(node.right, callback);
  }
};

// 后续遍历
let postOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    postOrderTraverseNode(node.left, callback);
    postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }
};
```

可以看到，这三个函数的内容很相似，只是调整了左右子树和根节点的遍历顺序。这里的 `callback` 是一个回调函数，可以传入任何你想执行的函数，这里我们传入的函数内容是打印树的节点的 key 值。我们将 `BinarySearchTree` 类的这三个遍历方法的内容补充完整：

```js
preOrderTraverse(callback) {
  preOrderTraverseNode(this.root, callback)
}

inOrderTraverse(callback) {
  inOrderTraverseNode(this.root, callback)
}

postOrderTraverse(callback) {
  postOrderTraverseNode(this.root, callback)
}
```

#### 前序遍历分析 <Badge text="根左右" />

为了构建本文一开始的那棵树，我们执行下面的代码，然后测试 `preOrderTraverse()` 方法：

```js
let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(9);
tree.insert(13);
tree.insert(20);
tree.insert(3);
tree.insert(6);
tree.insert(8);
tree.insert(10);
tree.insert(12);
tree.insert(14);
tree.insert(18);
tree.insert(25);

tree.preOrderTraverse((value) => console.log(value));
// 11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25
```

我们参照前序遍历的定义，借住下面的示意图来理解整个遍历过程：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree5.png)

在前序遍历函数 `preOrderTraverseNode()`中，先执行 `callback(node.key)`，然后再依次递归左子树和右子树。

我们将树的根节点作为第一个节点传入，首先打印的就是根节点 11，然后开始遍历左子树，这将依次打印左子树中的所有左子节点，依次是 7、5、3。当节点 3 的 `left` 为 `null` 时，递归返回，继续查找节点 3 的右子节点，此时节点 3 的 `right` 值也为 `null`，于是继续向上返回到节点 5，开始遍历节点 5 的右子节点，于是打印节点 6......最终所有的节点就按照这个递归顺序进行遍历。

#### 中序遍历分析 <Badge text="左根右" />

然后我们再来看看中序遍历的情况。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree6.png)

```js
tree.postOrderTraverse((value) => console.log(value));
// 3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11
```

在中序遍历函数 `inOrderTraverseNode()`中，先递归左子树，然后执行 `callback(node.key)`，最后再递归右子树。

同样的，我们将根节点作为第一个节点传入，递归到左子树的最后一个左子节点 3，由于节点 3 的 `left` 为 `null`，所以递归返回，打印节点 3，然后继续查找节点 3 的右子节点，节点 3 的 `right` 值也为 `null`，递归返回到上一层节点 5，开始打印节点 5，之后再查找节点 5 的右子节点......最终整棵树按照这个顺序完成遍历。

#### 后序遍历分析 <Badge text="左右根" />

最后再来看看后序遍历的情况。

```js
tree.postOrderTraverse((value) => console.log(value));
// 3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11
```

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree7.png)

在后序遍历函数 `postOrderTraverseNode()`中，先递归左子树，然后再递归右子树，最后执行 `callback(node.key)`。

同样的，我们将根节点作为第一个节点传入，递归到左子树的最后一个左子节点 3，由于节点 3 的 `left` 为 `null`，所以递归返回，此时继续查找节点 3 的右子节点，节点 3 的 `right` 值也为 `null`，递归返回并打印节点 3，之后递归返回到上一层节点 5，开始查找节点 5 的右子节点，节点 5 的右子节点是节点 6，由于节点 6 是叶子节点，所以直接打印节点 6，然后递归返回并打印节点 5。之后递归再向上返回到节点 7 并递归节点 7 的右子节点......按照这个顺序最终完成对整棵树的遍历。

### 树的搜索

接下来我们再来看看对树的搜索。有三种要经常执行的搜索方式：

- 搜索树中的最小值
- 搜索树中的最大值
- 搜索树中的特定值

搜索树中的最小值和最大值比较简单，由于我们的二叉搜索树规定了值小的节点永远在左子树（左子节点）中，值大（或相等）的节点永远在右子树（右子节点）中。

所以，搜索最大值我们只需要递归查找树的右子树直到叶子节点，就能找到值最大的节点。搜索最小值只需要递归查找树的左子树直到叶子节点，就能找到值最小的节点。下面是这两个函数的实现：

```js
// 返回树中的最小节点
let minNode = function (node) {
  let current = node;
  while (current && current.left) {
    current = current.left;
  }
  return current;
};
// 返回树中的最大节点
let maxNode = function (node) {
  let current = node;
  while (current && current.right) {
    current = current.right;
  }
  return current;
};
```

第三种方式是搜索特定的值，我们需要比较要搜索的值与当前节点的值，如果要搜索的值小于当前节点的值，则从当前节点开始递归查找左子数（左子节点）。如果要搜索的值大于当前节点的值，则从当前节点开始递归查找右子树（右子节点）。按照这个逻辑，我们的 `searchNode()`函数实现如下：

```js
let searchNode = function (node, key) {
  if (!node) return null;
  if (node.key > key) return searchNode(node.left, key);
  else if (node.key < key) return searchNode(node.right, key);
  else return node;
};
```

如果找到了对应的节点，就返回该节点，否则就返回 null。我们将 `BinarySearchTree` 类的这三个搜索方法的内容补充完整：

```js
min() {
  return minNode(this.root)
}

max() {
  return maxNode(this.root)
}

search(key) {
  return searchNode(this.root, key)
}
```

下面是一些测试用例及结果：

```js
console.log(tree.min().key); // 3
console.log(tree.max().key); // 25

console.log(tree.search(3)); // Node { key: 3, left: null, right: null }
console.log(tree.search(27)); // null
```

### 移除节点

最后我们再来看一下从树中移除一个节点的过程，这个过程要稍微复杂一些。先来看看删除树节点的函数 `removeNode()`的代码，稍后我们再来详细讲解整个执行过程。

```js
let removeNode = function (node, key) {
  if (node === null) return null;

  if (key < node.key) {
    node.left = removeNode(node.left, key);
    return node;
  } else if (key > node.key) {
    node.right = removeNode(node.right, key);
    return node;
  } else {
    // 第一种情况：一个叶子节点（没有子节点）
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    // 第二种情况：只包含一个子节点
    if (node.left === null) {
      node = node.right;
      return node;
    } else if (node.right === null) {
      node = node.left;
      return node;
    }

    // 第三种情况：有两个子节点 替换的节点为右子树的最小节点
    let aux = minNode(node.right);
    node.key = aux.key;
    node.right = removeNode(node.right, aux.key);
    return node;
  }
};
```

首先要找到树中待删除的节点，这需要进行递归遍历，从根节点开始，如果 `key` 值小于当前节点的值，则遍历左子树，如果 `key` 值大于当前节点的值，则遍历右子树。

注意，在递归遍历的过程中，我们将 `node`（这里的 node 传入的是树的根节点）的 `left` 指针或 `right` 指针逐级指向下一级节点，然后返回整个 `node`。当找到要删除的节点后，我们要处理三种情况：

- 该节点为叶子节点（没有子节点）
- 该节点只有一个子节点（左子节点或右子节点）
- 该节点有两个子节点（左右子节点都存在）

1️⃣ **移除的节点的子节点均为 `null`**

---

我们先看第一种情况：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree8.png)

假设我们要删除节点 6，传入根节点 11，整个执行过程如下：

1. node=11，key=6，6<11，递归执行 removeNode(7, 6)
2. node=7，key=6，6<7，递归执行 removeNode(5, 6)
3. node=5，key=6，6>5，递归执行 removeNode(6, 6)
4. node=6，key=6，6=6，并且节点 6 的 `left` 和 `right` 都为 null，所以我们将节点 6 设置为 null，并且返回 null
5. 递归返回到步骤 3，节点 5 的 `right` 将获取步骤 4 的返回值 null
6. 递归返回到步骤 2，节点 7 的 `left` 依然指向节点 5，保持不变
7. 递归返回到步骤 1，节点 11 的 `left` 依然指向节点 7，保持不变
8. 最后返回节点 11

2️⃣ **移除的节点的有一个子节点**

---

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree9.png)

前面已经删除了节点 6，假设我们现在要删除节点 5，它有一个左子节点 3，我们依然传入根节点 11，来看看整个执行过程：

1. node=11，key=5，5<11，递归执行 removeNode(7, 5)
2. node=7，key=5，5<7，递归执行 removeNode(5, 5)
3. node=5，key=5，5=5，并且节点 5 的 left=3，right=null，所以我们将节点 5 替换成它的左子节点 3，并返回节点 3
4. 递归返回到步骤 2，节点 7 的 right 将获取步骤 3 的返回值 3
5. 递归返回到步骤 1，节点 11 的 left 依然指向节点 7，保持不变
6. 最后返回节点 11

3️⃣ **移除的节点的有两个子节点**

---

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tree10.png)

前面已经删除了节点 6 和节点 5，现在我们要删除节点 15，它有左右子树，我们传入根节点 11，来看下具体执行过程：

1. node=11，key=15，15>11，递归执行 removeNode(15, 15)
2. node=15，key=15，15=15，此时我们需要找到节点 15 的右子树中的最小节点 18，将节点 15 的 key 替换成节点 18 的 key，然后将节点 15 的 `right` 节点（即节点 20）作为起始节点进行遍历，找到并删除节点 18，最后再将节点 15（此时它的 key 是 18）的 `right` 指针指向节点 20，并返回节点 15
3. 递归返回到步骤 1，节点 11 的 `right` 依然指向节点 15，但此时节点 15 的 key 已经变成 18 了
4. 最后返回节点 11

试想一下，当删除节点 15 之后，为了保证我们的二叉搜索树结构稳定，必须用节点 15 的右子树中的最小节点来替换节点 15，如果直接将 11 的 next 指向 20，则 20 将会有三个子节点 13、18、25，这显然已经不符合我们二叉树的定义了。如果将节点 25 用来替换节点 15，节点 20 的值比节点 25 的值小，不应该出现在右子节点，这也不符合我们的二叉搜索树的定义。所以，只有按照上述过程才能既保证不破坏树的结构，又能删除节点。

:::tip 总结
移除的节点有两个子节点 替换的节点为右子树的最小节点
:::

### 最终代码

我们已经完成了一开始我们定义的二叉搜索树 `BinarySearchTree` 类的所有方法，下面是它的完整代码：

:::details BinarySearchTree

```js
function Node(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}

let removeNode = function (node, key) {
  if (node === null) return null;

  if (key < node.key) {
    node.left = removeNode(node.left, key);
    return node;
  } else if (key > node.key) {
    node.right = removeNode(node.right, key);
    return node;
  } else {
    // 第一种情况：一个叶子节点（没有子节点）
    if (node.left === null && node.right === null) {
      console.log(111111111, node);
      node = null;
      return node;
    }

    // 第二种情况：只包含一个子节点
    if (node.left === null) {
      node = node.right;
      return node;
    } else if (node.right === null) {
      node = node.left;
      return node;
    }

    // 第三种情况：有两个子节点
    let aux = minNode(node.right);
    node.key = aux.key;
    node.right = removeNode(node.right, aux.key);
    return node;
  }
};

let insertNode = function (node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) node.left = newNode;
    else insertNode(node.left, newNode);
  } else {
    if (node.right === null) node.right = newNode;
    else insertNode(node.right, newNode);
  }
};

// 前序遍历
let preOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    callback(node.key);
    preOrderTraverseNode(node.left, callback);
    preOrderTraverseNode(node.right, callback);
  }
};

// 中序遍历
let inOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    inOrderTraverseNode(node.left, callback);
    callback(node.key);
    inOrderTraverseNode(node.right, callback);
  }
};

// 后续遍历
let postOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    postOrderTraverseNode(node.left, callback);
    postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }
};

// 返回树中的最小节点
let minNode = function (node) {
  let current = node;
  while (current && current.left) {
    current = current.left;
  }
  return current;
};
// 返回树中的最大节点
let maxNode = function (node) {
  let current = node;
  while (current && current.right) {
    current = current.right;
  }
  return current;
};

let searchNode = function (node, key) {
  if (!node) return null;
  if (node.key > key) return searchNode(node.left, key);
  else if (node.key < key) return searchNode(node.right, key);
  else return node;
};

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 向树中插入一个节点
  insert(key) {
    let newNode = new Node(key);

    if (this.root === null) this.root = newNode;
    else insertNode(this.root, newNode);
  }

  preOrderTraverse(callback) {
    preOrderTraverseNode(this.root, callback);
  }

  inOrderTraverse(callback) {
    inOrderTraverseNode(this.root, callback);
  }

  postOrderTraverse(callback) {
    postOrderTraverseNode(this.root, callback);
  }

  min() {
    return minNode(this.root);
  }

  max() {
    return maxNode(this.root);
  }

  search(key) {
    return searchNode(this.root, key);
  }

  remove(key) {
    this.root = removeNode(this.root, key);
    return this.root;
  }
}
```

:::

参考 [JavaScript 数据结构——树的实现](https://www.cnblogs.com/jaxu/p/11309385.html)
