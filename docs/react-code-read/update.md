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
  const current = container.current // Fiber 对象

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

```ts
export function createUpdate(expirationTime: ExpirationTime): Update<*> {
  return {
    expirationTime: expirationTime, // 对应本次创建更新的一个过期时间

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null
  }
}
```

`createUpdate` `ruturn` 一个 [update](/react-code-read/home.html#update-updatequeue) 对象。

- `expirationTime`: 对应本次创建更新的一个过期时间
- `tag`: 指定更新类型，分别对应 `UpdateState = 0` `ReplaceState = 1` `ForceUpdate = 2` `CaptureUpdate = 3`
  - `CaptureUpdate`: 捕获更新 用于 [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html)
- `payload`: 对应实际执行的操作内容。比如 `setState` 接收的第一个参数
- `next`: 指向下一个 `update`, `Update` 存放在 `UpdateQueue` 中， `UpdateQueue` 是一个单向链表的结构, 每个 `update` 都有一个 `next`.
  - 在 [updatequeue](/react-code-read/home.html#update-updatequeue) 存在 `firstUpdate` `lastUpdate` 它记录的是单向链表的开头和结尾。这中间都是通过 `next` 一一串联起来的。把整个单链表结构连接起来！

## enqueueUpdate

然后我们将刚才创建出来的 `update` 对象插入队列中，`enqueueUpdate` 函数核心作用就是创建或者获取一个队列，然后把 `update` 对象入队。

```ts {12,36,38}
export function enqueueUpdate<State>(fiber: Fiber, update: Update<State>) {
  // 在Fiber树更新的过程中，每个Fiber都会有一个跟其对应的Fiber 我们称他为`current <==> workInProgress`
  // 在渲染完成之后他们会交换位置
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

先判断 `alternate` 是否存在, 第一次 `render` 后 `alternate === null` 执行

```ts
queue1 = fiber.updateQueue
queue2 = null // queue 不存在 则为 null
if (queue1 === null) {
  queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
}

export function createUpdateQueue<State>(baseState: State): UpdateQueue<State> {
  const queue: UpdateQueue<State> = {
    baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
  return queue
}
```

`createUpdateQueue` 非常简单, 就是把所有的属性置为 `null` ，然后 `return`, 因为后续的操作需要在创建之后在这个对象上进行操作。

第一次渲染，`queue`等于 `null` 执行 `appendUpdateToQueue(queue1, update)`

```ts
function appendUpdateToQueue<State>(queue: UpdateQueue<State>, update: Update<State>) {
  // Append the update to the end of the list.
  if (queue.lastUpdate === null) {
    // Queue is empty
    queue.firstUpdate = queue.lastUpdate = update
  } else {
    queue.lastUpdate.next = update
    queue.lastUpdate = update
  }
}
```

判断 `lastUpdate` 是否存在。如果不存在 则 `Queue` 为空， `queue` 的 `firstUpdate` `lastUpdate` 都等于这个对象。
如果 `lastUpdate` 存在， 则当前的 `lastUpdate` 的 `next` 指向这次 `update`。

## scheduleWork

至此，开始任务调度。开始后续的任务调度过程。
