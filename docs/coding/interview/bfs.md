---
title: BFS 树形结构转化
date: 2021-07-22 09:23:33
sidebar: auto
tags:
  - 面试
categories: 面试
---

```js
   11
   / \
  7  15
 / \ /  \
5  9 13 20

BFS 广度: [11, 7, 15, 5, 9, 13, 20]
DFS 深度: [11, 7, 5, 9, 15, 13, 20]
```

从上到下，从左到右。

```js
let arr = [
  { id: '1', pid: '0', name: 'Top 1' },
  { id: '1-1', pid: '1', name: 'Leave 1-1' },
  { id: '1-2', pid: '1', name: 'Leave 1-2' },
  { id: '1-1-1', pid: '1-1', name: 'Leave 1-1-1' },
  { id: '2', pid: '0', name: 'Top 2' },
  { id: '2-1', pid: '2', name: 'Leave 2-1' },
];

// expect result ['Top 1', 'Top 2', 'Leave 1-1', 'Leave 1-2', 'Leave 2-1', 'Leave 1-1-1']
```

解决：

```js
function toTree(arr, pid = '0') {
  let temp = arr.slice();
  let rest = [];

  temp.forEach((item) => {
    if (item.pid === pid) {
      let obj = item;
      obj.children = toTree(temp, item.id);
      rest = rest.concat(obj);
    }
  });
  return rest;
}

function bfs(arr) {
  let queue = [];
  let result = [];
  queue = arr;
  while (queue.length) {
    let temp = queue.shift();
    result.push(temp);
    temp.children.forEach((item) => {
      queue.push(item);
    });
  }
  return result;
}

const treeData = toTree(arr, '0');

console.log(bfs(treeData).map((item) => item.name));
```
