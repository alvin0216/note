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

::: details 回顾 ReactDOM.render >> updateContainer >> scheduleWork 流程图
![](../../assets/react/ReactDOM.render.png)

主要流程

`updateContainer` >> `computeExpirationForFiber` 计算 `expirationTime` >> `createUpdate` >> `enqueueUpdate` 更新入队 >> 调用 `scheduleWork`

```ts {10,35,45,56}
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

  const update = createUpdate(expirationTime); // 创建更新 update 对象

  update.payload = {element};

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  flushPassiveEffects();
  enqueueUpdate(current, update); // update 对象入队！
  scheduleWork(current, expirationTime);

  return expirationTime;
}
```

:::

定位到 `packages/react-reconciler/src/ReactFiberScheduler.js`

```ts {2,13,15,23}
function scheduleWork(fiber: Fiber, expirationTime: ExpirationTime) {
  const root = scheduleWorkToRoot(fiber, expirationTime)
  if (root === null) {
    return // root === null 即找不到 rootFiber 直接 return...
  }

  // isWorking: 正在执行渲染，有任务正在进行当中 在后续任务正在执行 可能被中断的情况。。!isWorking 代表没任何任务正在进行
  // nextRenderExpirationTime !== NoWork：任务可能是异步任务，并且执行到一半没有执行完，现在要把执行权交给浏览器去执行更高优先级的任务，
  // expirationTime > nextRenderExpirationTim：新的任务的 expirationTime 高于目前任务的 expirationTime
  // 这个判断 >> 新优先级任务打断低优先级任务的操作。
  if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime > nextRenderExpirationTime) {
    interruptedBy = fiber // 给开发工具用的，用来展示被哪个节点打断了异步任务
    resetStack() // 新优先级任务打断低优先级任务的操作。
  }
  markPendingPriorityLevel(root, expirationTime)
  if (
    !isWorking ||
    isCommitting ||
    // ...unless this is a different root than the one we're rendering.
    nextRoot !== root
  ) {
    const rootExpirationTime = root.expirationTime
    requestWork(root, rootExpirationTime)
  }
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    // Reset this back to zero so subsequent updates don't throw.
    nestedUpdateCount = 0
  }
}
```

这里先调用了 `scheduleWorkToRoot`，这一步非常重要，他主要做了一下几个任务

## scheduleWorkToRoot

1. 根据当前 Fiber 节点向上寻找对应的的 root 节点
2. 给更新节点的父节点链上的每个节点的 **expirationTime** 设置为这个 update 的 expirationTime，除非他本身时间要小于 expirationTime
3. 给更新节点的父节点链上的每个节点的 **childExpirationTime** 设置为这个 update 的 expirationTime，除非他本身时间要小于 expirationTime
4. 最终返回 `root` 节点的 `Fiber` 对象

::: details scheduleWorkToRoot 方法

```ts
function scheduleWorkToRoot(fiber: Fiber, expirationTime): FiberRoot | null {
  recordScheduleUpdate()

  // 如果 fiber 之前产生的 expirationTime 小于现在产生的优先级时 即当前的 fiber 优先级高 设置为当前节点的 expirationTime
  if (fiber.expirationTime < expirationTime) {
    fiber.expirationTime = expirationTime
  }
  let alternate = fiber.alternate // 取出 alternate -> 在Fiber树更新的过程中，每个Fiber都会有一个跟其对应的Fiber,我们称他为`current <==> workInProgress`,在渲染完成之后他们会交换位置
  if (alternate !== null && alternate.expirationTime < expirationTime) {
    alternate.expirationTime = expirationTime // 更新 fiber.alternate 的 expirationTime
  }
  // 找到 rootFiber，并更新子过期时间。
  let node = fiber.return // 取出父节点的 fiber
  let root = null
  // node === null 代表 rootFiber 因为 rootFiber.return === null
  // HostRoot 同样代表 rootFiber
  if (node === null && fiber.tag === HostRoot) {
    root = fiber.stateNode // root = rootFiber.stateNode，返回的 root 节点现在就是 rootFiber，这里进行赋值。
  } else {
    // node 即父节点不为空，即当前不是 rootFiber 需要循环查找，当中可能会更新 childExpirationTime
    while (node !== null) {
      alternate = node.alternate
      // 如果当前产生的更新 expirationTime > 对于 node 节点，即父节点它的子树来说，是一个更高优先级的任务。则更新 node.childExpirationTime
      if (node.childExpirationTime < expirationTime) {
        node.childExpirationTime = expirationTime
        // 对 alternate 同样要进行更新，因为他们是两个对象。他们存储的内容可能是不一样的 需要单独进行一次更新。
        if (alternate !== null && alternate.childExpirationTime < expirationTime) {
          alternate.childExpirationTime = expirationTime
        }
      } else if (alternate !== null && alternate.childExpirationTime < expirationTime) {
        // 上面 if 语句是执行 node 的 childExpirationTime 的更新，这里是判断 alternate。如果 node 不需要更新不代表 alternate 不需要更新
        alternate.childExpirationTime = expirationTime
      }
      // 找到 rootFiber 并赋值 stateNode
      if (node.return === null && node.tag === HostRoot) {
        root = node.stateNode
        break
      }
      node = node.return
    }
  }

  // enableSchedulerTracing 略
  if (enableSchedulerTracing) {
    if (root !== null) {
      const interactions = __interactionsRef.current
      if (interactions.size > 0) {
        const pendingInteractionMap = root.pendingInteractionMap
        const pendingInteractions = pendingInteractionMap.get(expirationTime)
        if (pendingInteractions != null) {
          interactions.forEach(interaction => {
            if (!pendingInteractions.has(interaction)) {
              // Update the pending async work count for previously unscheduled interaction.
              interaction.__count++
            }

            pendingInteractions.add(interaction)
          })
        } else {
          pendingInteractionMap.set(expirationTime, new Set(interactions))

          // Update the pending async work count for the current interactions.
          interactions.forEach(interaction => {
            interaction.__count++
          })
        }

        const subscriber = __subscriberRef.current
        if (subscriber !== null) {
          const threadID = computeThreadID(expirationTime, root.interactionThreadID)
          subscriber.onWorkScheduled(interactions, threadID)
        }
      }
    }
  }
  return root
}
```

:::

## resetStack

`scheduleWork` 调用了 `scheduleWorkToRoot` 最终返回了 `rootFiber` 节点后呢 我们执行了一个判断，其中调用了一个很重要的方法 `resetStack`

```ts
if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime > nextRenderExpirationTime) {
  interruptedBy = fiber // 给开发工具用的，用来展示被哪个节点打断了异步任务
  resetStack() // 新优先级任务打断低优先级任务的操作。
}
```

1. isWorking 代表是否正在工作，在开始 renderRoot 和 commitRoot 的时候会设置为 true，也就是在 render 和 commit 两个阶段都会为 true
2. nextRenderExpirationTime 在是新的 renderRoot 的时候会被设置为当前任务的 expirationTime，而且一旦他被，只有当下次任务是 NoWork 的时候他才会被再次设置为 NoWork，当然最开始也是 NoWork

那么这个条件就很明显了：**目前没有任何任务在执行，并且之前有执行过任务，同时当前的任务比之前执行的任务过期时间要早（也就是优先级要高）**

:::tip 那么这种情况会出现在什么时候呢？
上一个任务是异步任务（优先级很低，超时时间是 502ms），并且在上一个时间片（初始是 33ms）任务没有执行完，而且等待下一次 requestIdleCallback 的时候新的任务进来了，并且超时时间很短（52ms 或者 22ms 甚至是 Sync），那么优先级就变成了先执行当前任务，也就意味着上一个任务被打断了（interrupted）

被打断的任务会从当前节点开始往上推出 context，因为在 React 只有一个 stack，而下一个任务会从头开始的，所以在开始之前需要清空之前任务的的 stack。
:::

```ts {2,5}
function resetStack() {
  if (nextUnitOfWork !== null) {
    let interruptedWork = nextUnitOfWork.return
    while (interruptedWork !== null) {
      unwindInterruptedWork(interruptedWork)
      interruptedWork = interruptedWork.return
    }
  }

  // 重置所有的公共变量
  nextRoot = null
  nextRenderExpirationTime = NoWork
  nextLatestAbsoluteTimeoutMs = -1
  nextRenderDidError = false
  nextUnitOfWork = null
}
```

- `nextUnitOfWork`: 用来记录遍历整棵子树的时候执行到哪个节点的更新，即下一个即将更新的节点，他只会指向 workInProgress

  - ```js
    nextUnitOfWork !== null
    ```
    代表之前正在更新的是一个的异步的任务，并且执行到一半由于时间片不够他把执行权交还给浏览器，如果现在没有任务进来中断或者优先级更高的任务打断等浏览器有空了 js 运行权限交还给 react ，会继续执行 `nextUnitOfWork` 继续更新任务。

- `unwindInterruptedWork`: 有个更高优先级任务进来 它还是要重头更新，存在 nextUnitOfWork 说明上层几个组件可能进行过更新，一个新任务进行在从头更新会导致前后 state 并不是我们真正想要更新的这次任务不是我们想要的 导致 state 错乱。这个后期在讲

## markPendingPriorityLevel

这个方法会记录当前的 `expirationTime` 到 `pendingTim`e，让 `expirationTime` 处于 `earliestPendingTime` 和 `latestPendingTime` 之间

并且会设置 `root.nextExpirationTimeToWorkOn 和` `root.expirationTime = expirationTime`

- 最早的 `pendingTime` 或者 `pingedTime`，如果都没有则是 `lastestSuspendTime`
- `suspendedTime` 和 `nextExpirationTimeToWorkOn` 中较早的一个
