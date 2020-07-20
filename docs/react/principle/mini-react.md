---
title: 手写 react 调度过程 ✨
date: 2020-07-08 22:31:45
---

## 概览

`jsx -> vdom -> fiber`

初始化项目 `create-react-app mini-react`, src 下的目录结构：

```bash
├── UpdateQueue.js  # 更新队列
├── constants.js    # 常量
├── index.js        # 入口文件
├── react-dom.js    # 提供 ReactDOM.render 等方法
├── react.js        # React 核心
├── scheduler.js    # 调度过程
└── utils.js        # 辅助文件
```

## 常量 & utils.js

`contants.js`：定义一些 tag 值等。

```js
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT') // 文本元素

// tag
export const TAG_ROOT = Symbol.for('TAG_ROOT') // 标记 react 根节点
export const TAG_HOST = Symbol.for('TAG_HOST ') // 标记 原生的节点 span div p
export const TAG_TEXT = Symbol.for('TAG_TEXT') // 文本节点
export const TAG_CLASS = Symbol.for('TAG_CLASS') // 类组件
export const TAG_FUNCTION_COMPONENT = Symbol.for('TAG_FUNCTION_COMPONENT')

// effectTag
export const PLACEMENT = Symbol.for('PLACEMENT') // 插入节点
export const DELETION = Symbol.for('DELETION') // 删除节点
export const UPDATE = Symbol.for('UPDATE') // 更新节点
```

`utils.js`：主要提供 dom 元素的属性修改替换等方法

```js
export function setProps(dom, oldProps, newProps) {
  for (const key in oldProps) {
    if (key !== 'children') {
      if (newProps.hasOwnProperty(key)) {
        setProp(dom, key, newProps[key]) // 更新
      } else {
        dom.removeAttribute(key) // oldProps 有这个属性而 newProps 没有，则删除属性
      }
    }
  }

  for (const key in newProps) {
    if (key !== 'children') {
      if (!oldProps.hasOwnProperty(key)) {
        setProp(dom, key, newProps[key]) // 添加
      }
    }
  }
}

function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    dom[key.toLowerCase()] = value
  } else if (key === 'style') {
    if (value) {
      for (const styleName in value) {
        dom.style[styleName] = value[styleName]
      }
    }
  } else {
    dom.setAttribute(key, value)
  }
}
```

## index.js

```jsx
import React from './react'
import ReactDOM from './react-dom'

const element = (
  <div id='A1'>
    A1
    <div id='B1'>
      B1
      <div id='C1'>C1</div>
      <div id='C2'>C2</div>
    </div>
    <div id='B2'>B2</div>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))
```

先考虑渲染出界面来，jsx 通过 babel 转义，最终会生成 vdom，其关键 API 为 `React.render`

## react.js

```js
import { ELEMENT_TEXT } from './constants'
import { Update, UpdateQueue } from './UpdateQueue'
import { scheduleRoot, useReducer, useState } from './scheduler'

/**
 * 创建元素 {虚拟 DOM} 的方法
 * @param {*} type 元素的类型 div span p
 * @param {*} config 配置对象的 props 以及 key ref 等
 * @param  {...any} children
 */
function createElement(type, config, ...children) {
  delete config.__self
  delete config.__source // 删除 webpack 打包的信息

  return {
    type,
    props: {
      ...config,
      children: children.map(child => {
        return typeof child === 'object'
          ? child
          : {
              type: ELEMENT_TEXT,
              props: { text: child, children: [] }
            }
      })
    }
  }
}

class Component {
  constructor(props) {
    this.props = props
    this.updateQueue = new UpdateQueue()
  }

  setState(payload) {
    let update = new Update(payload)
    // this.updateQueue.enqueueUpdate(update)
    // updateQueue其实是放在此类组件对应的fiber节点的internalFiber;
    this.internalFiber.updateQueue.enqueueUpdate(update)

    scheduleRoot()
  }
}

Component.prototype.isReactComponent = {} // 类组件

const React = {
  createElement,
  Component,
  useReducer,
  useState
}

export default React
```

## vdom-tree

生成结构 如下：

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

## Fiber

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

## 结合 requestIdleCallback

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
  console.log(`开始：${fiber.key}`)
}

nextUnitOfWork = rootFiber
workLoop()

requestIdleCallback(workLoop, { timeout: TIME_OUT })
```
