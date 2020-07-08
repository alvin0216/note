---
title: React Fiber
date: 2020-07-09 01:12:02
---

## Fiber 之前的协调

- React 会递归对比 VirtualDOM 树，找出需要变动的节点，然后更新它们。这个过程 React 称为 `Reconciliation`(协调)
- 在 `Reconciliation` 期间，React 会一直占用浏览器资源。导致的问题有：用户触发的事件得不到响应，二是执行复杂任务会导致调帧，形成卡顿。

看下这样的结构：

```JS
/**
 *      [A]
 *      / \
 *   [B1] [B2]
 *   /  \
 * [C1] [C2]
 *
 * ...
 * */
let root = {
  key: 'A1',
  children: [
    {
      key: 'B1',
      children: [
        { key: 'C1', children: [] },
        { key: 'C2', children: [] }
      ]
    },
    { key: 'B2', children: [] }
  ]
}
```

执行更新的操作伪代码：

```js
function work(vdom) {
  doWork(vdom)
  vdom.children.forEach(work)
}
function doWork(vdom) {
  console.log(vdom.key)
}

work(root)
```

每次更新从 root 入口，假如层级过大时，更新内部小小的部分，也要遍历整个树，会造成性能损耗的问题。

## Fiber 是什么

相关链接

- [React Fiber](https://juejin.im/post/5ab7b3a2f265da2378403e57)
- [React Fiber 初探](https://juejin.im/post/5a2276d5518825619a027f57)
