---
title: setState 是同步还是异步的？
date: 2021-06-29 10:54:23
sidebar: auto
tags:
  - React
categories: React
---

```jsx
trigger = (isBatchedUpdate: boolean) => {
  const runSetState = () => {
    this.setState({ count: this.state.count + 1 }, () => console.log(this.state.count));
  };

  if (isBatchedUpdate) {
    runSetState();
  } else {
    setTimeout(runSetState, 0);
  }
};

<button onClick={() => this.trigger(true)}>触发合成事件</button>;
<button onClick={() => this.trigger(false)}>触发 setTimeout 事件</button>;
```

可以发现两个执行的时机不一样，`console.log` 的结果也不一样。一个是同步，一个则是异步。

## 分析

我们来看看 react 部分源码

```js
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (lane === SyncLane) {
    // 同步操作
    ensureRootIsScheduled(root, eventTime);
    // 判断当前是否还在 React 事件流中
    // 如果不在，直接调用 flushSyncCallbackQueue 更新
    if (executionContext === NoContext) {
      flushSyncCallbackQueue();
    }
  } else {
    // 异步操作
  }
}
```

上述代码可以简单描述这个过程，主要是判断了 `executionContext` 是否等于 `NoContext` 来确定当前更新流程是否在 React 事件流中。

所有的事件在触发的时候，都会先调用 `batchedEventUpdates$1` 这个方法，在这里就会修改 `executionContext` 的值，React 就知道此时的 `setState` 在自己的掌控中。

```js
// executionContext 的默认状态
var executionContext = NoContext;
function batchedEventUpdates$1(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= EventContext; // 修改状态
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    // 调用结束后，调用 flushSyncCallbackQueue
    if (executionContext === NoContext) {
      flushSyncCallbackQueue();
    }
  }
}
```

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/setState.png)

所以，不管是直接调用 flushSyncCallbackQueue ，还是推迟调用，这里本质上都是同步的，只是有个先后顺序的问题。

## 结论

**同步情况**

1. 当前是 `Legacy 模式`
2. 在非合成事件中执行 `setState`，比如 `setTimeout`, `Promise`, `MessageChannel` 等

**异步情况**

1. 如果是合成事件中的回调, `executionContext |= EventContext`, 所以不会进入, 最终表现出异步
2. concurrent 模式下都为异步

## 批处理

在**React 合成事件**中执行多次 setState 后，react 会合并进行一次更新，这样就可以提高性能，这就是**批处理**的概念。

```jsx
trigger = (isBatchedUpdate: boolean) => {
  const runSetState = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ age: this.state.age + 1 });
  };

  if (isBatchedUpdate) {
    runSetState(); // render 一次
  } else {
    setTimeout(runSetState, 0); // render 两次
  }
};
```

即使是 async 函数，isBatchedUpdate 为 false，那多次 setState 实际上也会 render 多次。～～

## 给张图

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/setState-async.png)
