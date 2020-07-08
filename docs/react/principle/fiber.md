---
title: 实现 fiber
date: 2020-07-08 22:31:45
---

element.js

```js
/**
 *      [A]
 *      / \
 *   [B1] [B2]
 *   /  \
 * [C1] [C2]
 *
 * child 指向子节点 比如 A1.child = B1
 * sibling 指向下一个兄弟节点 比如 B1.sibling = B2
 * */

let A1 = { type: 'div', key: 'A1' }
let B1 = { type: 'div', key: 'B1', return: A1 }
let B2 = { type: 'div', key: 'B2', return: A1 }
let C1 = { type: 'div', key: 'C1', return: B1 }
let C2 = { type: 'div', key: 'C2', return: B1 }

A1.child = B1
B1.sibling = B2
B1.child = C1
C1.sibling = C2

module.exports = A1
```

fiber.js

```js
/**
 * 1. 从顶点开始遍历
 * 2. 先遍历第一个子节点，然后遍历子节点的兄弟节点
 * */
let rootFiber = require('./element')
let nextUnitOfWork = null // 下一个执行单元

function workLoop() {
  // 如果有待执行的执行单元，就执行，然后返回下一个执行单元
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (!nextUnitOfWork) {
    console.log('render 阶段结束')
  }
}

nextUnitOfWork = rootFiber
workLoop()
```

performUnitOfWork:

```js
function performUnitOfWork(fiber) {
  beginWork(fiber) // 处理此 fiber

  // 如果有 child 则返回成为下个执行单元
  if (fiber.child) {
    return fiber.child
  }

  // 如果没有 child 则说明此 fiber 完成了
  while (fiber) {
    completeUnitOfWork(fiber)
    if (fiber.sibling) {
      return fiber.sibling // 返回兄弟节点
    }
    fiber = fiber.return // 返回父节点
  }
}

function completeUnitOfWork(fiber) {
  console.log(`结束：${fiber.key}`)
}

function beginWork(fiber) {
  console.log(`开始：${fiber.key}`)
}
```

执行结果

```js
开始：A1
开始：B1
开始：C1
结束：C1
开始：C2
结束：C2
结束：B1
开始：B2
结束：B2
结束：A1
```

- 开始 A1 ,B1 ,C1 ,C2 ,B2
- 结束 C1 ,C2 ,B1 ,B2 ,A1

结合 `requestIdleCallback`:

```js
/**
 * 1. 从顶点开始遍历
 * 2. 先遍历第一个子节点，然后遍历子节点的兄弟节点
 * */
let rootFiber = require('./element')
let nextUnitOfWork = null // 下一个执行单元
const TIME_OUT = 1000

function workLoop(deadline) {
  // 如果有待执行的执行单元，就执行，然后返回下一个执行单元

  // 如果帧内有富余的时间，或者超时 则执行任务
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (!nextUnitOfWork) {
    console.log('render 阶段结束')
  } else {
    requestIdleCallback(workLoop, { timeout: TIME_OUT })
  }
}

function performUnitOfWork(fiber) {
  beginWork(fiber) // 处理此 fiber

  // 如果有 child 则返回成为下个执行单元
  if (fiber.child) {
    return fiber.child
  }

  // 如果没有 child 则说明此 fiber 完成了
  while (fiber) {
    completeUnitOfWork(fiber)
    if (fiber.sibling) {
      return fiber.sibling // 返回兄弟节点
    }
    fiber = fiber.return // 返回父节点
  }
}

function completeUnitOfWork(fiber) {
  console.log(`结束：${fiber.key}`)
}

function beginWork(fiber) {
  // console.log(`开始：${fiber.key}`)
}

nextUnitOfWork = rootFiber
workLoop()

requestIdleCallback(workLoop, { timeout: TIME_OUT })
```
