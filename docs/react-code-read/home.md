---
title: React 原理解析 - 首页
date: 2020-03-06 12:08:21
---

## 前言

- 关于版本: v16.8.6
- 关于工具: vscode 推荐阅读源码工具: Bookmarks
- 关于来源
  - from [Jokcy](https://react.jokcy.me/)
  - from [yck](https://yuchengkai.cn/react/)

> 阅读源码并不只是让你深入的理解一个框架的运作原理，更能让你在一些实现方案上学习到一些更优的方法

## 流程图概览

### React 的调度过程

![](../../assets/react/scheduler-fiber-scheduler.png)

### React 的渲染更新的过程

![](../../assets/react/scheduler-render-root.png)

## React 中的数据结构

### FiberRoot

定位到 `packages/react-reconciler/src/ReactFiberRoot.js`

```ts
type BaseFiberRootProperties = {|
   // root节点，render方法接收的第二个参数 比如 document.getElementById('root')
  containerInfo: any,

  // 只有在持久更新中会用到，也就是不支持增量更新的平台，react-dom不会用到
  pendingChildren: any,

  // 当前应用对应的Fiber对象，是 RootFiber
  // 这里 FiberRoot 引用了 RootFiber
  current: Fiber,

  // 以下的 time 是来区分
  // 1 没有提交 committed 的任务
  // 2 没有提交的挂起任务
  // 3 没有提交的可能被挂起的任务
  // 我们选择不追踪每个单独的阻塞登记，为了兼顾性能
  // The earliest and latest priority levels that are suspended from committing.
  // 最老和新的在提交的时候被挂起的任务
  earliestSuspendedTime: ExpirationTime,
  latestSuspendedTime: ExpirationTime,

  // The earliest and latest priority levels that are not known to be suspended.
  // 最老和最新的不确定是否会挂起的优先级（所有任务进来一开始都是这个状态）
  earliestPendingTime: ExpirationTime,
  latestPendingTime: ExpirationTime,

  // The latest priority level that was pinged by a resolved promise and can
  // be retried.
  // 最新的通过一个promise被reslove并且可以重新尝试的优先级
  latestPingedTime: ExpirationTime,

  // 如果有错误被抛出并且没有更多的更新存在，我们尝试在处理错误前同步重新从头渲染
  // 在`renderRoot`出现无法处理的错误时会被设置为`true`
  didError: boolean,

  // 正在等待提交的任务的`expirationTime`
  pendingCommitExpirationTime: ExpirationTime,
  // 已经完成的任务的FiberRoot对象，如果你只有一个Root，那他永远只可能是这个Root对应的Fiber，或者是null
  // 在commit阶段只会处理这个值对应的任务
  finishedWork: Fiber | null,
  // 在任务被挂起的时候通过setTimeout设置的返回内容，用来下一次如果有新的任务挂起时清理还没触发的timeout
  timeoutHandle: TimeoutHandle | NoTimeout,
  // 顶层context对象，只有主动调用`renderSubtreeIntoContainer`时才会有用
  context: Object | null,
  pendingContext: Object | null,
  // 用来确定第一次渲染的时候是否需要融合
  +hydrate: boolean,
  // 当前root上剩余的过期时间
  // TODO: 提到renderer里面区处理
  nextExpirationTimeToWorkOn: ExpirationTime,
  // 当前更新对应的过期时间
  expirationTime: ExpirationTime,
  // List of top-level batches. This list indicates whether a commit should be
  // deferred. Also contains completion callbacks.
  // TODO: Lift this into the renderer
  // 顶层批次（批处理任务？）这个变量指明一个commit是否应该被推迟
  // 同时包括完成之后的回调
  // 貌似用在测试的时候？
  firstBatch: Batch | null,
  // root之间关联的链表结构
  nextScheduledRoot: FiberRoot | null,
｜}
```

### Fiber

什么是 `Fiber`?

1. 每一个 `ReactElement` 对应一个 `Fiber` 对象，用于记录节点的各种状态。
   - 比如组件的 `props`、`state` 等等都会记录在 `Fiber` 对象当中，`Fiber` 对象更新之后才会更新到各个组件当中！
2. 串联整个应用形成树结构。`Fiber` 会记录每个节点的应用并且串联起来！
   - `return` `child` `sibling`。

通过 `Fiber` 我们能够将 JS 渲染的这样一个单线程语言，能够让他表现为一个多线程。在计算机厘面，无非是时间和空间上面，他们两者之间的一个妥协，舍弃时间去换取空间，使用更大的空间换取时间，这就是它的一个思路，一个实现，当然这里面借助了链表、树这些数据结构。

定位到 `packages/react-reconciler/src/ReactFiber.js`

```ts
// Fiber对应一个组件需要被处理或者已经处理了，一个组件可以有一个或者多个Fiber

type Fiber = {|
  // 标记不同的组件类型
  tag: WorkTag,

  // ReactElement里面的key
  key: null | string,

  // ReactElement.type，也就是我们调用`createElement`的第一个参数
  elementType: any,

  // The resolved function/class/ associated with this fiber.
  // 异步组件resolved之后返回的内容，一般是`function`或者`class`
  type: any,

  // The local state associated with this fiber.
  // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）
  stateNode: any,

  // 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
  return: Fiber | null,

  // 单链表树结构
  // 指向自己的第一个子节点
  child: Fiber | null,
  // 指向自己的兄弟结构
  // 兄弟节点的return指向同一个父节点
  sibling: Fiber | null,
  index: number,

  // ref属性
  ref: null | (((handle: mixed) => void) & { _stringRef: ?string }) | RefObject,

  // 新的变动带来的新的props
  pendingProps: any,
  // 上一次渲染完成之后的props
  memoizedProps: any,

  // 该Fiber对应的组件产生的Update会存放在这个队列里面
  updateQueue: UpdateQueue<any> | null,

  // 上一次渲染的时候的state
  memoizedState: any,

  // 一个列表，存放这个Fiber依赖的context
  firstContextDependency: ContextDependency<mixed> | null,

  // 用来描述当前Fiber和他子树的`Bitfield`
  // 共存的模式表示这个子树是否默认是异步渲染的
  // Fiber被创建的时候他会继承父Fiber
  // 其他的标识也可以在创建的时候被设置
  // 但是在创建之后不应该再被修改，特别是他的子Fiber创建之前
  mode: TypeOfMode,

  // Effect
  // 用来记录Side Effect
  effectTag: SideEffectTag,

  // 单链表用来快速查找下一个side effect
  nextEffect: Fiber | null,

  // 子树中第一个side effect
  firstEffect: Fiber | null,
  // 子树中最后一个side effect
  lastEffect: Fiber | null,

  // 代表任务在未来的哪个时间点应该被完成
  // 不包括他的子树产生的任务
  expirationTime: ExpirationTime,

  // 快速确定子树中是否有不在等待的变化
  childExpirationTime: ExpirationTime,

  // 在Fiber树更新的过程中，每个Fiber都会有一个跟其对应的Fiber
  // 我们称他为`current <==> workInProgress`
  // 在渲染完成之后他们会交换位置
  alternate: Fiber | null,

  // 下面是调试相关的，收集每个Fiber和子树渲染时间的

  actualDuration?: number,

  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number,

  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number,

  // Sum of base times for all descedents of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number,

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean
|}
```

### Update & UpdateQueue

```ts {22}
export type Update<State> = {
  // 更新的过期时间
  expirationTime: ExpirationTime

  // export const UpdateState = 0;
  // export const ReplaceState = 1;
  // export const ForceUpdate = 2;
  // export const CaptureUpdate = 3;
  // 指定更新的类型，值为以上几种
  tag: 0 | 1 | 2 | 3
  // 更新内容，比如 setState 接收的第一个参数
  payload: any
  // 对应的回调，setState，render都有
  callback: (() => mixed) | null

  // 指向下一个更新
  next: Update<State> | null
  // 指向下一个 side effect
  nextEffect: Update<State> | null
}

export type UpdateQueue<State> = {
  // 每次操作完更新之后的 state
  baseState: State

  // 队列中的第一个 Update
  firstUpdate: Update<State> | null
  // 队列中的最后一个 Update
  lastUpdate: Update<State> | null

  // 第一个捕获类型的 Update
  firstCapturedUpdate: Update<State> | null
  // 最后一个捕获类型的 Update
  lastCapturedUpdate: Update<State> | null

  // 第一个 side effect
  firstEffect: Update<State> | null
  // 最后一个 side effect
  lastEffect: Update<State> | null

  // 第一个和最后一个捕获产生的 side effect
  firstCapturedEffect: Update<State> | null
  lastCapturedEffect: Update<State> | null
}
```

### effectTags

React 的一个精妙的设定就是它对类型的指定，它使用的是二进制，然后按二进制的按位与、按位或这样的一个操作来去取得它最终的一个渲染类型。

```ts
export type SideEffectTag = number

// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*              */ 0b00000000000
export const PerformedWork = /*         */ 0b00000000001

// You can change the rest (and add more).
export const Placement = /*             */ 0b00000000010
export const Update = /*                */ 0b00000000100
export const PlacementAndUpdate = /*    */ 0b00000000110
export const Deletion = /*              */ 0b00000001000
export const ContentReset = /*          */ 0b00000010000
export const Callback = /*              */ 0b00000100000
export const DidCapture = /*            */ 0b00001000000
export const Ref = /*                   */ 0b00010000000
export const Snapshot = /*              */ 0b00100000000

// Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*   */ 0b00110100100

// Union of all host effects
export const HostEffectMask = /*        */ 0b00111111111

export const Incomplete = /*            */ 0b01000000000
export const ShouldCapture = /*         */ 0b10000000000
```
