---
title: React 原理解析 - 创建更新
date: 2020-03-10 09:24:41
---

在[上一章节](/react-code-read/render)我们可以了解到 `ReactDOM.render` 方法创建 `ReactFiberRoot` 的过程。

在 `legacyCreateRootFromDOMContainer` 之后后执行了

1. [createFiberRoot](/react-code-read/render.html#createfiberroot) 创建了 `FiberRoot` 对象
2. [createHostRootFiber](/react-code-read/render.html#createhostrootfiber) 创建了 `rootFiber` 对象

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

## ReactRoot.prototype.render

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

<!-- ## ReactRoot.prototype.render

定位到 `packages/react-dom/src/client/ReactDOM.js`

```ts
ReactRoot.prototype.render = function(children: ReactNodeList, callback: ?() => mixed): Work {
  const root = this._internalRoot // 取出 fiberRoot 对象
  const work = new ReactWork()
  callback = callback === undefined ? null : callback
  if (callback !== null) {
    work.then(callback)
  }
  updateContainer(children, root, null, work._onCommit)
  return work
}
```

1. 在 `render` 函数内部我们首先取出 `root`，这里的 `root` 指的是 [FiberRoot](/react-code-read/home.html#fiberroot)
2. 创建 `ReactWork` 的实例，这块内容我们没有必要深究，功能就是为了在组件渲染或更新后把所有传入 `ReactDom.render` 中的回调函数全部执行一遍。

接下来我们来看 `updateContainer` 内部是怎么样的。

## updateContainer

`updateContainer` 在这里计算了一个时间，这个时间叫做 `expirationTime`，顾名思义就是这次更新的 **超时时间**。

定位到 `packages/react-reconciler/src/ReactFiberReconciler.js`

```jsx
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

1. 我们先从 `FiberRoot` 的 `current` 属性中取出它的 `fiber` 对象 `document.getElementById('root')._reactRootContainer._internalRoot.current`
2. 然后计算了两个时间 `currentTime` 和 `expirationTime`。这两个时间在 `React` 中相当重要，因此我们需要单独用一小节去学习它们。

首先是 `currentTime`，在 `requestCurrentTime` 函数内部计算时间的最核心函数是 `recomputeCurrentRendererTime`。

### requestCurrentTime

定位到 `packages/react-reconciler/src/ReactFiberScheduler.js`

```jsx
function requestCurrentTime() {
  if (isRendering) {
    // We're already rendering. Return the most recently read time.
    return currentSchedulerTime
  }
  findHighestPriorityRoot()
  if (nextFlushedExpirationTime === NoWork || nextFlushedExpirationTime === Never) {
    recomputeCurrentRendererTime()
    currentSchedulerTime = currentRendererTime
    return currentSchedulerTime
  }
  return currentSchedulerTime
}
// 最核心函数
function recomputeCurrentRendererTime() {
  const currentTimeMs = now() - originalStartTimeMs
  currentRendererTime = msToExpirationTime(currentTimeMs)
}
```

1. `now()` 就是 `performance.now()`，如果你不了解这个 `API` 的话可以阅读下 [相关文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now)
2. `originalStartTimeMs` 是 `React` 应用初始化时就会生成的一个变量，值也是 `performance.now()`，并且这个值不会在后期再被改变。那么这两个值相减以后，得到的结果也就是现在离 `React` 应用初始化时经过了多少时间。

然后我们需要把计算出来的值再通过一个公式算一遍。

这里的 `| 0`作用是取整数，也就是说 `11 / 10 | 0 = 1`

```jsx
const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1
export function msToExpirationTime(ms: number): ExpirationTime {
  return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0)
}
```

接下来我们来假定一些变量值，代入公式来算的话会更方便大家理解。

假如 `originalStartTimeMs` 为 `2500`，当前时间为 `5000`，那么算出来的差值就是 `2500`，也就是说当前距离 `React` 应用初始化已经过去了 `2500` 毫秒，最后通过公式得出的结果为：

```jsx
currentTime = 1073741822 - ((2500 / 10) | 0) = 1073741572
```

接下来是计算 `expirationTime`，**这个时间和优先级有关，值越大，优先级越高。** 并且同步是优先级最高的，它的值为 `1073741823`，也就是之前我们看到的常量 `MAGIC_NUMBER_OFFSET` 加一。

### computeExpirationForFiber

定位到 `packages/react-reconciler/src/ReactFiberScheduler.js`

> `requestCurrentTime` 计算了当前时间而 **`expirationTime` 这个时间和优先级有关，值越大，优先级越高。**

```jsx
const expirationTime = computeExpirationForFiber(currentTime, current)
```

在 `computeExpirationForFiber` 函数中存在很多分支，但是计算的核心就只有三行代码，分别是：

```jsx
// 同步
expirationTime = Sync
// 交互事件，优先级较高
expirationTime = computeInteractiveExpiration(currentTime)
// 异步，优先级较低
expirationTime = computeAsyncExpiration(currentTime)
```

接下来我们就来分析 `computeInteractiveExpiration` 函数内部是如何计算时间的，当然 `computeAsyncExpiration` 计算时间的方式也是相同的，无非更换了两个变量。

#### computeInteractiveExpiration

定位到 `packages/react-reconciler/src/ReactFiberExpirationTime.js`

```jsx
export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150
export const HIGH_PRIORITY_BATCH_SIZE = 100

export function computeInteractiveExpiration(currentTime: ExpirationTime) {
  return computeExpirationBucket(currentTime, HIGH_PRIORITY_EXPIRATION, HIGH_PRIORITY_BATCH_SIZE)
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs): ExpirationTime {
  return (
    MAGIC_NUMBER_OFFSET -
    ceiling(MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE)
  )
}

function ceiling(num: number, precision: number): number {
  return (((num / precision) | 0) + 1) * precision
}
```

以上这些代码其实就是公式，我们把具体的值代入就能算出结果了。

```jsx
time = 1073741822 - ((((1073741822 - 1073741572 + 15) / 10) | 0) + 1) * 10 = 1073741552
```

另外在 `ceiling` 函数中的 `1 * bucketSizeMs / UNIT_SIZE` 是为了抹平一段时间内的时间差，在抹平的时间差内不管有多少个任务需要执行，他们的过期时间都是同一个，这也算是一个性能优化，帮助渲染页面行为节流。

最后其实我们这个计算出来的 `expirationTime` 是可以反推出另外一个时间的：

```jsx
export function expirationTimeToMs(expirationTime: ExpirationTime): number {
  return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE
}
```

如果我们将之前计算出来的 `expirationTime` 代入以上代码，得出的结果如下：

```jsx
;(1073741822 - 1073741552) * 10 = 2700
```

这个时间其实和我们之前在上文中计算出来的 `2500` 毫秒差值很接近。

因为 `expirationTime` 指的就是一个任务的过期时间，`React` 根据任务的优先级和当前时间来计算出一个任务的执行截止时间。

只要这个值比当前时间大就可以一直让 `React` 延后这个任务的执行，以便让更高优先级的任务执行，但是一旦过了任务的截止时间，就必须让这个任务马上执行。

这部分的内容一直在算来算去，看起来可能有点头疼。当然如果你嫌麻烦，只需要记住**任务的过期时间是通过当前时间加上一个常量（任务优先级不同常量不同）计算出来的**。

### updateContainerAtExpirationTime >> scheduleRootUpdate

定位到 `packages/react-reconciler/src/ReactFiberReconciler.js`

```jsx
export function updateContainerAtExpirationTime(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  expirationTime: ExpirationTime,
  callback: ?Function
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
```

当我们计算出时间以后就会调用 `updateContainerAtExpirationTime`，这个函数其实没有什么好解析的，我们直接进入`scheduleRootUpdate` 函数就好。

```jsx
function scheduleRootUpdate(
  current: Fiber,
  element: ReactNodeList,
  expirationTime: ExpirationTime,
  callback: ?Function
) {
  const update = createUpdate(expirationTime)
  // Caution: React DevTools currently depends on this property
  // being called "element".
  update.payload = { element }

  callback = callback === undefined ? null : callback
  if (callback !== null) {
    update.callback = callback
  }
  flushPassiveEffects()

  enqueueUpdate(current, update)
  scheduleWork(current, expirationTime)

  return expirationTime
}
```

**首先我们会创建一个 `update`，这个对象和 `setState` 息息相关**

```jsx
export function createUpdate(expirationTime: ExpirationTime): Update<*> {
  return {
    expirationTime: expirationTime,
    // setState 的第一二个参数
    tag: UpdateState,
    payload: null,
    callback: null,
    // 用于在队列中找到下一个节点
    next: null,
    nextEffect: null
  }
}
```

对于 `update` 对象内部的属性来说，我们需要重点关注的是 `next` 属性。因为 `update` 其实就是一个队列中的节点，这个属性可以用于帮助我们寻找下一个 `update`。

对于批量更新来说，我们可能会创建多个 `update`，因此我们需要将这些 `update` 串联并存储起来，在必要的时候拿出来用于更新 `state`。

在 `render` 的过程中其实也是一次更新的操作，但是我们并没有 `setState`，因此就把 `payload` 赋值为 `{element}` 了。

接下来我们将 `callback` 赋值给 `update` 的属性，这里的 `callback` 还是 `ReactDom.render` 的第三个参数。

然后我们将刚才创建出来的 `update` 对象插入队列中，`enqueueUpdate` 函数内部分支较多且代码简单，函数核心作用就是创建或者获取一个队列，然后把 `update` 对象入队。

最后调用 `scheduleWork` 函数，这里开始就是调度相关的内容，这部分内容我们将在下一篇文章中来详细解析。

```jsx
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

## 总结

![](../../assets/react/render2.png) -->
