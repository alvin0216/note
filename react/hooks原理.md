---
title: hooks 实现原理
date: 2021-06-29 10:54:23
sidebar: auto
tags:
  - React
categories: React
---

- [Hook 原理(概览)](https://7kms.github.io/react-illustration-series/main/hook-summary)
- [hook 的实现](https://react.iamkasong.com/hooks/create.html)

**讲 hooks 之前提出一个问题：为什么 hooks 不能写在条件语句之中？**

我们在初始化 hooks 的时候，`fiber` 的结构是长什么样的呢？

```js
function App() {
  const [num, updateNum] = useState(0);
  const [name, setName] = useState('alvin');
  return null
}
// fiber 结构：
{
  // memoizedState：hooks 链表结构
  memoizedState: {
    queue: { pending: null },
    memoizedState: 1,
    next: { queue: { pending: null}, memoizedState: 'alvin', next: null }
  },
  stateNode: [Function: App]
  // 其他属性...
}
```

当我们执行 `updateNum` 怎么去更新我们的应用呢？

如上，创建一个 `hooks` 链表结构，存储在 `fiber` 的 `memoizedState` 属性上，next 指针指向下一个 `hooks`

## 创建更新对象

```js
const update = { action, next: null };
```

对于 `App` 来说，点击 `p` 标签产生的 `update` 的 `action` 为 `num => num + 1`。

如果我们改写下 `App` 的 `onClick`：

```js
// 之前
return <p onClick={() => updateNum((num) => num + 1)}>{num}</p>;

// 之后
return (
  <p
    onClick={() => {
      updateNum((num) => num + 1);
      updateNum((num) => num + 1);
      updateNum((num) => num + 1);
    }}>
    {num}
  </p>
);
```

那么点击 `p` 标签会产生三个 `update`。

## 合并更新

这些 `update` 是如何组合在一起呢？

答案是：他们会形成**环状单向链表**。

```js
function dispatchAction(queue, action) {
  // 创建update
  const update = { action, next: null };

  // 环状单向链表操作
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }

  queue.pending = update;

  // 模拟React开始调度更新
  schedule();
}
```

环状链表操作不太容易理解，这里我们详细讲解下。

当产生第一个`update`（我们叫他`u0`），此时`queue.pending === null`。

`update.next = update;`即`u0.next = u0`，他会和自己首尾相连形成`单向环状链表`。

然后`queue.pending = update;`即`queue.pending = u0`

```js
queue.pending = u0 ---> u0
                ^       |
                |       |
                ---------
```

当产生第二个`update`（我们叫他`u1`），`update.next = queue.pending.next;`，此时`queue.pending.next === u0`，
即`u1.next = u0`。

`queue.pending.next = update;`，即`u0.next = u1`。

然后`queue.pending = update;`即`queue.pending = u1`

```js
queue.pending = u1 ---> u0
                ^       |
                |       |
                ---------
```

你可以照着这个例子模拟插入多个`update`的情况，会发现`queue.pending`始终指向最后一个插入的`update`。

这样做的好处是，当我们要遍历`update`时，`queue.pending.next`指向第一个插入的`update`。

## 简单实现

详情略...

```js
let workInProgressHook;
let isMount = true;

// App组件对应的fiber对象
const fiber = {
  // 保存该FunctionComponent对应的Hooks链表
  memoizedState: null,
  // 指向App函数
  stateNode: App,
};

function schedule() {
  workInProgressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}

function dispatchAction(queue, action) {
  // 创建update
  const update = { action, next: null };

  // 环状单向链表操作
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }

  queue.pending = update;

  // 模拟React开始调度更新
  schedule();
}

function useState(initialState) {
  let hook;

  if (isMount) {
    hook = {
      queue: { pending: null },
      memoizedState: initialState,
      next: null,
    };

    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending);

    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function App() {
  const [num, updateNum] = useState(0);

  console.log(`${isMount ? 'mount' : 'update'} num: `, num);
  return {
    onClick() {
      updateNum((num) => num + 1);
    },
  };
}

const app = schedule();
app.onClick();
```
