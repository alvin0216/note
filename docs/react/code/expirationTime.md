---
title: React 原理解析 - expirationTime
date: 2020-03-14 21:31:53
---

## 前言

> 紧接着上一章，我们知道 `expirationTime` 和任务的优先级息息相关。 它的意义又在什么地方呢！

我们在计算 expirationTime 的时候如果我们一个操作多次调用 setState，前一次调用和后一次调用即便他们的差距很小，但是他们从毫秒级别来说还是由差距的，**计算出的 expirationTime 还是有可能不一样的， 意味着他们的任务优先级不一样，会导致 React 整体的更新执行多次，而导致整个应用的性能下降。**

:::tip
expirationTime 指的就是一个任务的过期时间，React 根据任务的优先级和当前时间来计算出一个任务的执行截止时间。只要这个值比当前时间大就可以一直让 React 延后这个任务的执行，以便让更高优先级的任务执行，但是一旦过了任务的截止时间，就必须让这个任务马上执行。
:::

我们只需要知道上面一点就行了，具体的计算方式其实就是常量的一个计算方式。如果不想看，请直接阅读下一个章节 [任务调度](./scheduleWork.md)。

> 那么这个时间是如何计算出来的呢？

简单来说 **当前时间 + 一个常量（根据任务优先级改变）**

当前时间指的是 `performance.now()`，这个 API 会返回一个精确到毫秒级别的时间戳（当然也并不是高精度的），另外浏览器也并不是所有都兼容 `performance API` 的。如果使用 `Date.now()` 的话那么精度会更差，但是为了方便起见，我们这里统一把当前时间认为是 `performance.now()`。

定位到 `packages/react-reconciler/src/ReactFiberReconciler.js`

```ts {8,9}
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

## requestCurrentTime

在 `React` 中我们计算 `expirationTime` 要基于当前得时钟时间，一般来说我们只需要获取 `Date.now` 或者 `performance.now` 就可以了，但是每次获取一下呢比较消耗性能，所以呢 React 设置了 `currentRendererTime` 来记录这个值，用于一些不需要重新计算得场景。

但是在 `React` 中呢又提供了 `currentSchedulerTime` 这个变量，同样也是记录这个值的，那么为什么要用两个值呢？我们看一下 `requestCurrentTime` 方法的实现。

```ts {10}
let currentRendererTime: ExpirationTime = msToExpirationTime(originalStartTimeMs)
function requestCurrentTime() {
  // 已经进入到渲染阶段
  if (isRendering) {
    return currentSchedulerTime
  }
  findHighestPriorityRoot() // 从调度队列找到权限最高的的 root
  // 没有进行任何调度时
  if (nextFlushedExpirationTime === NoWork || nextFlushedExpirationTime === Never) {
    recomputeCurrentRendererTime()
    currentSchedulerTime = currentRendererTime
    return currentSchedulerTime
  }
  return currentSchedulerTime
}
```

### isRendering

```ts
if (isRendering) {
  return currentSchedulerTime
}
```

这个 `isRendering` 只有在 `performWorkOnRoot` 的时候才会被设置为 `true`，而其本身是一个同步的方法，不存在他执行到一半没有设置 `isRendering` 为 `false` 的时候就跳出，那么什么情况下会在这里出现新的 `requestCurrentTime` 呢？

- 在生命周期方法中调用了 `setState`
- 需要挂起任务的时候

也就是说 **`React` 要求在一次 `rendering` 过程中，新产生的 `update` 用于计算过期时间的 `current` 必须跟目前的 `renderTime` 保持一致，同理在这个周期中所有产生的新的更新的过期时间都会保持一致！**

```ts
if (
  nextFlushedExpirationTime === NoWork ||
  nextFlushedExpirationTime === Never
)
```

也就是说在一个 `batched` 更新中，只有第一次创建更新才会重新计算时间，后面的所有更新都会复用第一次创建更新的时候的时间，这个也是为了**保证在一个批量更新中产生的同类型的更新只会有相同的过期时间**

### recomputeCurrentRendererTime

在 `requestCurrentTime` 函数内部计算时间的最核心函数是 `recomputeCurrentRendererTime`。

```ts
function recomputeCurrentRendererTime() {
  const currentTimeMs = now() - originalStartTimeMs // 从 js 加载完成到现在为止的时间间隔
  currentRendererTime = msToExpirationTime(currentTimeMs)
}
```

`now()`就是 `performance.now()`，如果你不了解这个 API 的话可以阅读下 [相关文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now)

`originalStartTimeMs` 是 `React` 应用初始化时就会生成的一个变量，值也是 `performance.now()`，并且这个值不会在后期再被改变。那么这两个值相减以后，得到的结果也就是现在离 `React` 应用初始化时经过了多少时间。

然后我们需要把计算出来的值再通过一个公式算一遍，这里的 `| 0` 作用是取整数，也就是说 `16 / 10 | 0 = 1`

```ts
const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1
export function msToExpirationTime(ms: number): ExpirationTime {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0) // | 0 是取整的意思，即去掉余数
}
```

## expirationTime

`React` 中有两种类型的 `ExpirationTime`，一个是 `Interactive` 的，另一种是普通的异步。`Interactive` 的比如说是由事件触发的，那么他的响应优先级会比较高因为涉及到交互。

在整个计算公式中只有 `currentTime` 是变量，也就是当前的时间戳

```ts
function computeExpirationForFiber(currentTime: ExpirationTime, fiber: Fiber) {
  const priorityLevel = getCurrentPriorityLevel()

  let expirationTime
  if ((fiber.mode & ConcurrentMode) === NoContext) {
    expirationTime = Sync
  } else if (isWorking && !isCommitting) {
    expirationTime = nextRenderExpirationTime
  } else {
    switch (priorityLevel) {
      case ImmediatePriority:
        expirationTime = Sync
        break
      case UserBlockingPriority:
        expirationTime = computeInteractiveExpiration(currentTime)
        break
      case NormalPriority:
        expirationTime = computeAsyncExpiration(currentTime)
        break
      case LowPriority:
      case IdlePriority:
        expirationTime = Never
        break
      default:
    }

    // If we're in the middle of rendering a tree, do not update at the same
    // expiration time that is already rendering.
    if (nextRoot !== null && expirationTime === nextRenderExpirationTime) {
      expirationTime -= 1
    }
  }

  if (
    priorityLevel === UserBlockingPriority &&
    (lowestPriorityPendingInteractiveExpirationTime === NoWork ||
      expirationTime < lowestPriorityPendingInteractiveExpirationTime)
  ) {
    lowestPriorityPendingInteractiveExpirationTime = expirationTime
  }

  return expirationTime
}
```

我们看到 switch 中有几个 case 判断常量 指的是优先级 如下 同步更新的优先级最高

```ts
var ImmediatePriority = 1
var UserBlockingPriority = 2
var NormalPriority = 3
var LowPriority = 4
var IdlePriority = 5
```

### 整个计算公式

定位到 `packages/react-reconciler/src/ReactFiberExpirationTime.js`

```ts
const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = 2

export function msToExpirationTime(ms: number): ExpirationTime {
  return ((ms / UNIT_SIZE) | 0) + MAGIC_NUMBER_OFFSET
}

export function expirationTimeToMs(expirationTime: ExpirationTime): number {
  return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE
}

function ceiling(num: number, precision: number): number {
  return (((num / precision) | 0) + 1) * precision
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs): ExpirationTime {
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE)
  )
}

export const LOW_PRIORITY_EXPIRATION = 5000
export const LOW_PRIORITY_BATCH_SIZE = 250

export function computeAsyncExpiration(currentTime: ExpirationTime): ExpirationTime {
  return computeExpirationBucket(currentTime, LOW_PRIORITY_EXPIRATION, LOW_PRIORITY_BATCH_SIZE)
}

export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150
export const HIGH_PRIORITY_BATCH_SIZE = 100

export function computeInteractiveExpiration(currentTime: ExpirationTime) {
  return computeExpirationBucket(currentTime, HIGH_PRIORITY_EXPIRATION, HIGH_PRIORITY_BATCH_SIZE)
}
```

在整个计算公式中只有 `currentTime` 是变量，也就是当前的时间戳。我们拿 `computeAsyncExpiration` 举例，在 `computeExpirationBucket` 中接收的就是 currentTime、5000 和 250

最终的公式就是酱紫的：**((((currentTime - 2 + 5000 / 10) / 25) | 0) + 1) \* 25**

其中 25 是 250 / 10，| 0 的作用是取整数

翻译一下就是：**当前时间加上 498 然后处以 25 取整再加 1 再乘以 5，需要注意的是这里的 currentTime 是经过 msToExpirationTime 处理的，也就是((now / 10) | 0) + 2，所以这里的减去 2 可以无视，而除以 10 取整应该是要抹平 10 毫秒内的误差，当然最终要用来计算时间差的时候会调用 expirationTimeToMs 恢复回去，但是被取整去掉的 10 毫秒误差肯定是回不去的。**

现在应该很明白了吧？再解释一下吧：简单来说在这里，最终结果是以 25 为单位向上增加的，比如说我们输入 10002 - 10026 之间，最终得到的结果都是 10525，但是到了 10027 的到的结果就是 10550，这就是除以 25 取整的效果。

另外一个要提的就是 msToExpirationTime 和 expirationTimeToMs 方法，他们是想换转换的关系。**有一点非常重要，那就是用来计算 expirationTime 的 currentTime 是通过 msToExpirationTime(now)得到的，也就是预先处理过的，先处以 10 再加了 2，所以后面计算 expirationTime 要减去 2 也就不奇怪了**

### why

React 这么设计抹相当于抹平了 25ms 内计算过期时间的误差, `LOW_PRIORITY_BATCH_SIZE` `bacth` 对应着 `batchedUpdates` , 这么做也许是为了让非常相近的两次更新得到相同的 `expirationTime`，然后在一次更新中完成，相当于一个自动的 `batchedUpdates`。

finally

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-032003.png)
