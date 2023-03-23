---
title: 探索 hooks API
date: 2022-03-23 09:58:29
sidebar: auto
tags:
  - React
categories: React
---

## useEffect 依赖执行关系

`useEffect` 第二个参数[]如何影响 fn 的执行？换句话说，它的第二个参数是如何影响 `fiber` 创建 `Passive Effect` 的？

1. 不包含第二个参数 `useEffect(() => {})`，`Mount` & `Update` 时，每次 `render` 时都会创建一个 `Passive Effect`;
2. 包含一个空数组[]作为依赖项 `useEffect(() => {}, [])`，它会在 `mount` 时，创建 `Passive Effect`
3. 包含一个依赖项`[dep]`，它会在 mount 时，dep 依赖项变化时，创建 Passive Effect

## fn 和 componentDidMount 的执行时机分别是什么？

**过程**

render 阶段到 commit 阶段，传递的时包含不同 fiber 节点的 effect 的链表，commit 阶段时将状态变化（Effect）渲染在视图中

- 渲染视图前，beforeMutation 阶段
- 渲染视图中，mutation 阶段，Placement 会执行 appendChild，DOM 节点插入到视图中
- 渲染视图后，layout 阶段，调用 componentDidMount

1. useEffect 时 commit 完成后异步调用
2. componentDidMount 是 commit 阶段完成视图更新（mutation 阶段）后，在 layout 阶段同步调用
3. useLayoutEffect 和 componentDidMount 调用时机一致，也是在 layout 阶段同步调用

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/hooks-api.png)

<!-- `useEffect` 可以看成 `componentDidMount / componentDidUpdate / componentWillUnmount` 这 3 个生命周期函数的替代。

但其实他们并不是完全等价，**useEffect 是在浏览器渲染结束之后才执行的，而这三个生命周期函数是在浏览器渲染之前同步执行的**，React 还有一个官方的 hook 是完全等价于这三个生命周期函数的，叫 useLayoutEffect。 -->

## 相关文章

- [React Hooks: 深入剖析 useMemo 和 useEffect](https://www.yuque.com/lxylona/note/tlc8hz#RnPvS)
