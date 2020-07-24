---
title: react diff
date: 2020-07-23 07:02:47
---

## React 的 diff 策略

- 策略一：忽略 Web UI 中 DOM 节点跨层级移动；`(tree diff）`
- 策略二：拥有相同类型的两个组件产生的 DOM 结构也是相似的，不同类型的两个组件产生的 DOM 结构则不近相同 `(component diff)`
- 策略三：对于同一层级的一组子节点，可以通过唯一 id 进行区分`（element diff）`

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/react-dom-diff.png)

## tree diff

两棵树只会对同一层次的节点进行比较，忽略 DOM 节点跨层级的移动操作。React 只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。由此一来，最直接的提升就是复杂度变为线型增长而不是原先的指数增长。

![react-diff](https://gitee.com/alvin0216/cdn/raw/master/img/react/react-diff.png)

跨层级的移动（如下）两个 tree 进行对比，右边的新 tree 发现 A 节点已经没有了，则会直接销毁 A 以及下面的子节点 B、C。在 D 节点上面发现多了一个 A 节点，则会重新创建一个新的 A 节点以及相应的子节点。

![vdom-diff](https://gitee.com/alvin0216/cdn/raw/master/img/react/vdom-diff2.png)

如果可以判断到是 `"REMOVE_NODE"` (节点移动操作)，直接将 A-Tree 移动到 D 下，这样就不用销毁和创建新 dom 了，然而并不能。

## component diff

- 同一类型组件遵从 tree diff 比较 v-dom 树
- 不同类型组件，先将该组件归类为 dirty component，替换下整个组件下的所有子节点。见上图例子 ⬆️
- 同一类型组件 Virtual Dom 没有变化，React 允许开发者使用 `shouldComponentUpdate` 来判断该组件是否进行 diff，运用得当可以节省 diff 计算时间，提升性能

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/component-diff.png)

如上图，当组件 D → 组件 G 时，diff 判断为不同类型的组件，虽然它们的结构相似甚至一样，diff 仍然不会比较二者结构，会直接销毁 D 及其子节点，然后新建一个 G 相关的子 tree，这显然会影响性能，官方虽然认定这种情况极少出现，但是开发中的这种现象造成的影响是非常大的。

## element diff ✨

对于同一层级的 element 节点，diff 提供了以下 3 种节点操作：

1. `INSERT_MARKUP` 插入节点：对全新节点执行节点插入操作
2. `MOVE_EXISING` 移动节点：组件新集合中有组件旧集合中的类型，且 element 可更新，即组件调用了 receiveComponent，这时可以复用之前的 dom，执行 dom 移动操作
3. `REMOVE_NODE` 移除节点：此时有两种情况：组件新集合中有组件旧集合中的类型，但对应的 element 不可更新、旧组建不在新集合里面，这两种情况需要执行节点删除操作

### key 值 diff 中重要性

![element-diff](https://gitee.com/alvin0216/cdn/raw/master/img/react/element-diff1.png)

如图，两个 vdom-tree 的元素是一样的，但是顺序不一样。这时候是可以复用的，而不是想 tree-dom 跨层级移动一样摧毁了再重建。

> 这时候 key 的作用来了：Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

react 根据 key 来决定是销毁重新创建组件还是更新组件，原则是：

- key 相同，组件有所变化，react 会只更新组件对应变化的属性。
- key 不同，组件会销毁之前的组件，将整个组件重新渲染。

重点来了，React 通过 key 是如何进行 element 管理的呢？为何如此高效？

```HTML
<p key="{1}">1</p>
<p key="{2}">2</p>

<!-- key -->
// 节点的 key 作为 map 的 key
// 如果节点不存在 key，那么 index 为 key
const map = {
    1: {},
    2: {}
}

<!-- 在遍历的过程中会寻找新的节点的 key 是否存在于这个 map 中，存在即可复用，不存在就只能创建一个新的了-->
```

### diff

#### 节点移动

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/diff-move.png)

如图，新集合的 B D 不发生移动，只移动 A， C

图示：

| index | 节点 | oldIndex | maxIndex | 操作                                                                              |
| ----- | ---- | -------- | -------- | --------------------------------------------------------------------------------- |
| 0     | B    | 1        | 0        | oldIndex(1)>maxIndex(0),maxIndex=oldIndex，maxIndex 变为 1                        |
| 1     | A    | 0        | 1        | <span class='orange'>oldIndex(0)<maxIndex(1),节点 A 移动至 index(1)的位置 </span> |
| 2     | D    | 3        | 1        | oldIndex(3)>maxIndex(1),maxIndex=oldIndex，maxIndex 变为 3                        |
| 3     | C    | 2        | 3        | <span class='orange'>oldIndex(2)<maxIndex(3),节点 C 移动至 index(3)的位置</span>  |

- index： 新集合的遍历下标。
- oldIndex：当前节点在老集合中的下标。
- maxIndex：在新集合访问过的节点中，其在老集合的最大下标值。

操作一栏中只比较 oldIndex 和 maxIndex：

- 当 oldIndex>maxIndex 时，将 oldIndex 的值赋值给 maxIndex
- 当 oldIndex=maxIndex 时，不操作
- 当 oldIndex<maxIndex 时，将当前节点移动到 index 的位置

#### 新增节点

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/diff-add.png)

| index | 节点 | oldIndex | maxIndex | 操作                                                        |
| ----- | ---- | -------- | -------- | ----------------------------------------------------------- |
| 0     | B    | 1        | 0        | oldIndex(1)>maxIndex(0)，maxIndex=oldIndex，maxIndex 变为 1 |
| 1     | E    | -        | 1        | oldIndex 不存在，添加节点 E 至 index(1)的位置               |
| 2     | C    | 2        | 1        | oldIndex(2)>maxIndex(1),maxIndex=oldIndex，maxIndex 变为 2  |
| 3     | A    | 0        | 2        | oldIndex(0)<maxIndex(2),节点 A 移动至 index(3)的位置        |

最后还需要对旧集合进行循环遍历，找出新集合中没有的节点，此时发现存在这样的节点 D，因此删除节点 D，到此 diff 操作全部完成。

#### 移动尾节点到头部

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/diff-unshift.png)

实际我们只需对 D 执行移动操作，然而由于 D 在旧集合中的位置是最大的，导致其他节点的 oldIndex < maxIndex，造成 D 没有执行移动操作，而是 A、B、C 全部移动到 D 节点后面的现象。针对这种情况，官方建议：

> 在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作。当节点数量过大或更新操作过于频繁时，这在一定程度上会影响 React 的渲染性能。

## 总结

- 如果是跨层级，只有新建节点和删除节点的操作，推荐尽量不要跨层级，跨层级可用 css display: none 等手段完成。
- 在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作。

---

参考

- [React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)
- [谈谈 React 中 Diff 算法的策略及实现](https://segmentfault.com/a/1190000016539430)
- [浅谈 React 中的 diff](https://blog.csdn.net/sexy_squirrel/article/details/79801940)
- [React 源码之 Diff 算法](https://segmentfault.com/a/1190000010686582)
- [React diff 原理探究以及应用实践](https://juejin.im/post/5cb5b4926fb9a068b52fb823)
