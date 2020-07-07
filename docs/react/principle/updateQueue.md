---
title: 实现 updateQueue
date: 2020-07-07 23:18:33
---

```js
class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null // 原状态
    this.firstUpdate = null // 第一个更新 (头指针)
    this.lastUpdate = null // 最后一个更新  (尾指针 )
  }

  // 入队（形成一个链表结构）
  enqueueUpdate(update) {
    if (this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = update
    } else {
      // 上一个最后一个节点的 nextUpdate 指向更新对象
      this.lastUpdate.nextUpdate = update

      // 最后一个节点指向自己
      this.lastUpdate = update
    }
  }

  // 获取老状态，然后遍历这个链表，进行更新
  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate

    while (currentUpdate) {
      let nextState =
        typeof currentUpdate.payload === 'function' ? currentUpdate.payload(currentState) : currentUpdate.payload
      currentState = { ...currentState, ...nextState } // 得到新的状态
      currentUpdate = currentUpdate.nextUpdate // 遍历下个节点
    }

    // 更新完成后清空链表
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState
  }
}
```

测试

```js
let queue = new UpdateQueue()

queue.enqueueUpdate(new Update({ name: 'alvin' }))
queue.enqueueUpdate(new Update({ age: 18 }))
queue.enqueueUpdate(new Update(state => ({ age: state.age + 1 })))
queue.enqueueUpdate(new Update(state => ({ age: state.age + 1 })))
queue.forceUpdate()
console.log(queue.baseState)
// { name: 'alvin', age: 20 }
```

## Update 对象

```js
class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}
```

- `payload`: 伪代码为 setState(payload)，比如 setState({ age: 18 })，setState(prev => ({ age: 18 }))
- `nextUpdate`: 下一个更新的 Update 对象

## UpdateQueue 队列

```js
class UpdateQueue {
  constructor() {
    this.baseState = null // 原状态
    this.firstUpdate = null // 第一个更新 (头指针)
    this.lastUpdate = null // 最后一个更新  (尾指针 )
  }

  // 入队（形成一个链表结构）
  enqueueUpdate(update) {
    if (this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = update
    } else {
      // 上一个最后一个节点的 nextUpdate 指向更新对象
      this.lastUpdate.nextUpdate = update

      // 最后一个节点指向自己
      this.lastUpdate = update
    }
  }
}
```

入队操作形成链表、执行更新则是遍历链表。

```js
forceUpdate() {
  let currentState = this.baseState || {}
  let currentUpdate = this.firstUpdate
  while (currentUpdate) {
    let nextState =
      typeof currentUpdate.payload === 'function' ? currentUpdate.payload(currentState) : currentUpdate.payload
    currentState = { ...currentState, ...nextState } // 得到新的状态
    currentUpdate = currentUpdate.nextUpdate // 遍历下个节点
  }
  // 更新完成后清空链表
  this.firstUpdate = this.lastUpdate = null
  this.baseState = currentState
}
```
