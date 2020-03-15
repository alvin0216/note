---
title: React 原理解析 - expirationTime
date: 2020-03-14 21:31:53
---

## 前言

> 紧接着上一章，我们知道 `expirationTime` 和任务的优先级息息相关。 它的意义又在什么地方呢！

我们在计算 expirationTime 的时候如果我们一个操作多次调用 setState，前一次调用和后一次调用即便他们的差距很小，但是他们从毫秒级别来说还是由差距的，**计算出的 expirationTime 还是有可能不一样的， 意味着他们的任务优先级不一样，会导致 React 整体的更新执行多次，而导致整个应用的性能下降。**

我们只需要知道上面一点就行了，具体的计算方式其实就是常量的一个计算方式。如果不想看，请直接阅读下一个章节 [任务调度](./scheduleWork.md)。

> 那么这个时间是如何计算出来的呢？

简单来说 **当前时间 + 一个常量（根据任务优先级改变）**

当前时间指的是 `performance.now()`，这个 API 会返回一个精确到毫秒级别的时间戳（当然也并不是高精度的），另外浏览器也并不是所有都兼容 `performance API` 的。如果使用 `Date.now()` 的话那么精度会更差，但是为了方便起见，我们这里统一把当前时间认为是 `performance.now()`。

常量指的是根据不同优先级得出的一个数值，React 内部目前总共有五种优先级，分别为：

## requestCurrentTime

`requestCurrentTime` 初始化时:

1. 初始化时间 - react 加载完成的时间点中间的一个间隔。
   - `const currentTimeMs = now() - originalStartTimeMs`
2. 然后经过一些计算得到的一个值。
   - `currentRendererTime = msToExpirationTime(currentTimeMs)`
   - `currentSchedulerTime = currentRendererTime`

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

定位到 `packages/react-reconciler/src/ReactFiberScheduler.js`

```ts {10,20,28}
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

let originalStartTimeMs: number = now() // 固定的值 在 react 加载后获取的 now
function recomputeCurrentRendererTime() {
  const currentTimeMs = now() - originalStartTimeMs // 从 js 加载完成到现在为止的时间间隔
  currentRendererTime = msToExpirationTime(currentTimeMs)
}

// packages/react-reconciler/src/ReactFiberExpirationTime.js
const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1
export function msToExpirationTime(ms: number): ExpirationTime {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0) // | 0 是取整的意思，即去掉余数
}
```

如果一次 `render` 中有个任务进来了我们发现现在正处于 `rendering` 的阶段 直接返回上次 `render` 开始的时间 再去计算 `expirationTime`, 这有什么好处呢！？

```ts
if (isRendering) {
  return currentSchedulerTime
}
```

就是前后计算出来的 `expirationTime` 是一样的，那这个任务就可以即时的提前进行调度，如果不理解，可以认为当前时间到 js 加载完成后的时间差经过一个计算规则算出来的就行了。
