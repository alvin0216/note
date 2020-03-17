---
title: React 原理解析 - scheduleWork
date: 2020-03-17 11:14:05
---

## scheduleWork

`ReactDOM.render` `setState` `forceUpdate` 最终都调用 `scheduleWork`，而它做了什么工作呢？

1. 找到更新对应的 `FiberRoot` 节点。

   - 在使用 `ReactDOM.render` 的时候我们传给 `scheduleWork` 就是 `FiberRoot` ，
   - 但是调用 `setState` `forceUpdate` 一般都是传递的是某个组件的对应的 `fiber` 节点，这时候就需要找到 `FiberRoot` 节点

2. 找到符合条件重置 `stack` 。
3. 如果符合条件就请求工作调度。

::: details ReactDOM.render >> updateContainer >> scheduleWork 流程图
![](../../assets/react/ReactDOM.render.png)

主要流程

`updateContainer` >> `computeExpirationForFiber` 计算 `expirationTime` >> `createUpdate` >> `enqueueUpdate` 更新入队 >> 调用 `scheduleWork`
:::

```ts
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): ExpirationTime {
  const current = container.current;
  const currentTime = requestCurrentTime();
  const expirationTime = computeExpirationForFiber(currentTime, current);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    callback,
  );
}

export function updateContainerAtExpirationTime(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  expirationTime: ExpirationTime,
  callback: ?Function,
) {
  const current = container.current;

  const context = getContextForSubtree(parentComponent);
  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  return scheduleRootUpdate(current, element, expirationTime, callback);
}

function scheduleRootUpdate(
  current: Fiber,
  element: ReactNodeList,
  expirationTime: ExpirationTime,
  callback: ?Function,
) {

  const update = createUpdate(expirationTime);

  update.payload = {element};

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  flushPassiveEffects();
  enqueueUpdate(current, update);
  scheduleWork(current, expirationTime);

  return expirationTime;
}
```
