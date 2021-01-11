---
title: 谈谈 useEffect 运行流程？
date: 2020-07-16 20:57:57
sidebar: 'auto'
tags:
  - React
  - React 原理
categories:
  - React
---

参考

- [烤透 React Hook](https://juejin.cn/post/6867745889184972814)
- [用动画和实战打开 React Hooks（一）：useState 和 useEffect](https://juejin.cn/post/6844904127110053895)
- [iamkasong useEffect](https://react.iamkasong.com/hooks/useeffect.html)

请自行翻阅源码

一个使用 useEffect Hook 的函数组件，在运行的时候的运行流程如下：

## 组件初次渲染（挂载）

- 执行 useEffect 时，将 useEffect Hook 添加到 Hook 链表中，然后创建 fiberNode 的 updateQueue，并把本次 effect 添加到 updateQueue 中；
- 渲染组件的 UI；
- 完成 UI 渲染后，执行本次 effect；

## 组件重新渲染（更新）

1. 执行 useEffect 时，将 useEffect Hook 添加到 Hook 链表中，判断依赖：
   - 假如没有传入依赖（useEffect 没有传入第二个参数），那么直接给这个 effect 打上 “需要执行” 的 tag（HookHasEffect）；
   - 假如有传入依赖 deps 并且当前依赖和上次渲染时的依赖对比有发生改变，那么就给这个 effect 打上 “需要执行” 的 tag（HookHasEffect）；
   - 假如有传入依赖 deps，但是依赖没有发生改变，则 不会 给这个 effect “需要执行” 的 tag；
   - 假如有传入依赖 deps，但是传入的是一个空数组 []，那么也 不会 给这个 effect “需要执行” 的 tag；
2. 渲染组件的 UI；
3. 假如有清除函数（effect 中的 return 内容），则执行上一次渲染的清除函数；如果依赖是 []，则先不用执行清除函数，而是等到组件销毁时才执行；
4. 判断本次 effect 是否有“需要执行” 的 tag（HookHasEffect），如果有，就执行本次 effect；如果没有，就直接跳过，不执行 本次 effect；

## 组件销毁时

在组件销毁之前，先执行完组件上次渲染时的清除函数
