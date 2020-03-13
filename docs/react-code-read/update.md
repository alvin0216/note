---
title: React 原理解析 - 创建更新
date: 2020-03-10 09:24:41
---

## 前言

![](../../assets/react/ReactDOM.render.png)

紧接着[上一章节](/react-code-read/render)我们可以了解到 `ReactDOM.render` 方法创建 `ReactFiberRoot` 的过程。

接下来让我们了解到存在 `root` 以后会发生什么事情，定位到 `packages/react-dom/src/client/ReactDOM.js`

```ts {12,16}
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: DOMContainer,
  forceHydrate: boolean,
  callback: ?Function
) {
  let root: Root = (container._reactRootContainer: any)
  if (!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
    // unbatchedUpdates -> 不批量更新
    unbatchedUpdates(() => {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback)
      } else {
        root.render(children, callback)
      }
    })
  } else {
    // 有root的情况...
  }
  return getPublicRootInstance(root._internalRoot)
}
```

## unbatchedUpdates

创建好 `root` 对象后，调用了 `unbatchedUpdates` 函数，这个函数涉及到的知识其实在 `React` 中相当重要。

大家都知道多个 `setState` 一起执行，并不会触发 `React` 的多次渲染。

```jsx
// 虽然 age 会变成 3，但不会触发 3 次渲染
this.setState({ age: 1 })
this.setState({ age: 2 })
this.setState({ age: 3 })
```

这是因为内部会将这个三次 `setState` 优化为一次更新，术语是批量更新（`batchedUpdate`），我们在后续的内容中也能看到内部是如何处理批量更新的。

对于 `root` 来说其实没必要去批量更新，所以这里调用了 `unbatchedUpdates` 函数来告知内部不需要批量更新。

```ts {5}
unbatchedUpdates(() => {
  if (parentComponent != null) {
    root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback)
  } else {
    root.render(children, callback)
  }
})
```

然后在 `unbatchedUpdates` 回调内部判断是否存在 `parentComponent`。这一步我们可以假定不会存在 `parentComponent`，因为很少有人会在 `root` 外部加上 `context` 组件。

不存在 `parentComponent` 的话就会执行 `root.render(children, callback)`，这里的 `render` 方法被挂载到了 `ReactRoot.prototype.render`。

## updateContainer

```ts {10,22,23,24}
ReactRoot.prototype.render = function(
  children: ReactNodeList,
  callback: ?() => mixed,
): Work {
  const root = this._internalRoot
  const work = new ReactWork()
  if (callback !== null) {
    work.then(callback)
  }
  updateContainer(children, root, null, work._onCommit) // 调用 updateContainer
  return work
}

// packages/react-reconciler/src/ReactFiberReconciler.js
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function
): ExpirationTime {
  const current = container.current
  const currentTime = requestCurrentTime()
  const expirationTime = computeExpirationForFiber(currentTime, current)
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback)
}
```

1. 在 `render` 函数内部我们首先取出 `root`，这里的 `root` 指的是 [FiberRoot](/react-code-read/home.html#fiberroot)
2. 创建 `ReactWork` 的实例，这块内容我们没有必要深究，功能就是为了在组件渲染或更新后把所有传入 `ReactDom.render` 中的回调函数全部执行一遍。

::: tip
在 `updateContainer` 中可以看到我们计算出了两个时间 `currentTime` 和 `expirationTime` (**超时时间**)。这都和任务的优先级息息相关。

现在我们只需要知道 **`expirationTime`，这个时间和优先级有关，值越大，优先级越高。并且同步是优先级最高的**， 具体的计算方式我们后面再讲。
:::

## createUpdate

当我们计算出时间以后就会调用 `updateContainerAtExpirationTime`。

定位到 `packages/react-reconciler/src/ReactFiberReconciler.js`

```ts {17,26,35,36}
export function updateContainerAtExpirationTime(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  expirationTime: ExpirationTime,
  callback: ?Function,
) {
  const current = container.current

  const context = getContextForSubtree(parentComponent)
  if (container.context === null) {
    container.context = context
  } else {
    container.pendingContext = context
  }

  return scheduleRootUpdate(current, element, expirationTime, callback)
}

function scheduleRootUpdate(
  current: Fiber,
  element: ReactNodeList,
  expirationTime: ExpirationTime,
  callback: ?Function,
) {
  const update = createUpdate(expirationTime) // 创建一个更新对象
  update.payload = { element } // 在 render 的过程中其实也是一次更新的操作，但是我们并没有 setState，因此就把 payload 赋值为 {element} 了。
  // 如果存在回调函数，则将回调函数也绑定到update对象上
  callback = callback === undefined ? null : callback
  if (callback !== null) {
    update.callback = callback
  }

  flushPassiveEffects()
  enqueueUpdate(current, update) // update 对象创建完成，将 update 添加到 UpdateQueue 中
  scheduleWork(current, expirationTime)

  return expirationTime
}
```

首先要生成一个 [update](/react-code-read/home.html#update-updatequeue)，不管你是 `setState` 还是`ReactDOM.render` 造成的 `React` 更新，都会生成一个叫 [update](/react-code-read/home.html#update-updatequeue) 的对象，并且会赋值给 `Fiber.updateQueue`

```jsx
// update 对象的内部属性
expirationTime: expirationTime,
tag: UpdateState,
// setState 的第一二个参数
payload: null,
callback: null,
// 用于在队列中找到下一个节点
next: null,
nextEffect: null,
```

## enqueueUpdate

然后我们将刚才创建出来的 `update` 对象插入队列中，`enqueueUpdate` 函数内部分支较多且代码简单，函数核心作用就是创建或者获取一个队列，然后把 `update` 对象入队。

```ts
export function enqueueUpdate<State>(fiber: Fiber, update: Update<State>) {
  // Update queues are created lazily.
  const alternate = fiber.alternate
  let queue1
  let queue2
  if (alternate === null) {
    // There's only one fiber.
    queue1 = fiber.updateQueue
    queue2 = null
    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
    }
  } else {
    // There are two owners.
    queue1 = fiber.updateQueue
    queue2 = alternate.updateQueue
    if (queue1 === null) {
      if (queue2 === null) {
        // Neither fiber has an update queue. Create new ones.
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
        queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState)
      } else {
        // Only one fiber has an update queue. Clone to create a new one.
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2)
      }
    } else {
      if (queue2 === null) {
        // Only one fiber has an update queue. Clone to create a new one.
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1)
      } else {
        // Both owners have an update queue.
      }
    }
  }
  if (queue2 === null || queue1 === queue2) {
    // There's only a single queue.
    appendUpdateToQueue(queue1, update)
  } else {
    // There are two queues. We need to append the update to both queues,
    // while accounting for the persistent structure of the list — we don't
    // want the same update to be added multiple times.
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update)
      appendUpdateToQueue(queue2, update)
    } else {
      // Both queues are non-empty. The last update is the same in both lists,
      // because of structural sharing. So, only append to one of the lists.
      appendUpdateToQueue(queue1, update)
      // But we still need to update the `lastUpdate` pointer of queue2.
      queue2.lastUpdate = update
    }
  }
}
```

## scheduleWork

至此，开始任务调度。开始后续的任务调度过程。
