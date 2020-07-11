---
title: 实现 vdom
date: 2020-07-11 13:52:09
---

## React.createElement

```bash
create-react-app vdom
cd vdom
```

原有的 index.js

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

<h4>修改 index.js</h4>

```js
import React from './react' // 引入自己写的 react.js
import ReactDOM from 'react-dom'

const element = (
  <div id='A1'>
    <div id='B1'>
      <div id='C1'></div>
      <div id='C2'></div>
    </div>
    <div id='B2'></div>
  </div>
)

console.log(element)
```

<h4>react.js</h4>

```js
/* eslint-disable indent */
import { ELEMENT_TEXT } from './constants'
/**
 * 创建虚拟 DOM 的方法
 * @param {*} type - 元素类型 div span p
 * @param {*} config - 配置对象 属性 key ref
 * @param  {...any} children - 子元素
 */
function createElement(type, config, ...children) {
  delete config.__self
  delete config.__source // 表示这个元素是在哪行哪列哪个文件生成的 babel 编译出来的 这里不需要
  return {
    type,
    props: {
      ...config,
      children: children.map(child => {
        // 做了一个兼容处理，如果是 React 元素的话就返回自己，如果是文本类型，返回元素对象
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

const React = {
  createElement
}

export default React
```

<h4>constants.js</h4>

```js
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT') // 文本类型
```

result:

<img style='height: 20rem' alt='v-dom' src='https://gitee.com/alvin0216/cdn/raw/master/img/react/v-dom.png' />

## ReactDOM.render

<h4>更新 index.js</h4>

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

<h4>更新 constants.js </h4>

```js
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT') // 文本类型

// react 根节点
export const TAG_ROOT = Symbol.for('TAG_ROOT')
// 原生的节点 span div p 函数组件 类组件
export const TAG_HOST = Symbol.for('TAG_HOST ')
// 文本节点
export const TAG_TEXT = Symbol.for('TAG_TEXT')
```

<h4>新建 react-dom.js</h4>

```js {13}
import { TAG_ROOT } from './constants'

/**
 * render 是要把一个元素渲染到一个容器的内部
 */
function render(element, container) {
  const rootFiber = {
    tag: TAG_ROOT, // 每个 fiber 会有一个 tag 标识 此元素类型
    stateNode: container, // 一般情况下如果这个元素是一个原生节点，stateNode 指向真实的 DOM 元素
    // props.children 是一个数组，里面放的是 React 元素，VDOM 后面会根据 React 元素创建对应的 Fiber
    props: { children: [element] } // 这个fiber 的属性对象 children，里面放的是要渲染的元素
  }
  scheduleRoot(rootFiber)
}

const ReactDOM = {
  render
}

export default ReactDOM
```

## schedule

<h4>新建 schedule.js</h4>

```js
const { TAG_ROOT, ELEMENT_TEXT, TAG_HOST, TAG_TEXT, PLACEMENT } = require('./constants')

const TIME_OUT = 500 // ms
/**
 *  从根节点开始渲染调度
 *  两个阶段
 *  diff 阶段 对比新旧虚拟 DOM，进行增量、更新或者创建、render 阶段
 *           这个阶段比较花时间、我们可以对任务进行拆分、拆分的维度 VDOM
 *           此阶段可以暂停
 *    render 阶段成果是 effect list 知道哪些节点更新哪些节点删除、哪些节点增加
 *  commit 阶段，进行 DOM 更新或创建阶段、不能暂停，一次呵成
 *
 * */
let nextUnitOfWork = null // 一个工作单元
let workInProgressRoot = null // RootFiber 应用的根

function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber
  nextUnitOfWork = rootFiber
}

// 循环执行工作
function workLoop(deadline) {
  let shouldYield = false // 是否要让出时间片或者说控制权
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1 // 执行完一个任务后，帧内剩余时间不足 1ms，让出控制权
  }

  if (nextUnitOfWork) {
    // 如果时间片到期 还有任务没完成，就再次调度
    requestIdleCallback(workLoop, { timeout: TIME_OUT })
  } else {
    console.log('render 阶段结束')
  }
}

requestIdleCallback(workLoop, { timeout: TIME_OUT })

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
}

/**
 * 1. 创建真实 dom 元素
 * 2. 创建子 fiber
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  }
}

function updateHostRoot(currentFiber) {
  // 先处理自己 如果是一个原生节点，创建真实 DOM 2 创建子 fiber
  const newChildren = currentFiber.props.children
  recoileChildren(currentFiber, newChildren)
}

function recoileChildren(currentFiber, newChildren) {
  let newChildrenIndex = 0 // 新子节点的索引
  let prevSibling // 上一个新的子 fiber

  // 遍历子虚拟 DOM 元素数组，为每个虚拟 DOM 元素创建 子 Fiber
  while (newChildrenIndex < newChildren.length) {
    const newChild = newChildren[newChildrenIndex]
    let tag
    if (newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT // 这是一个文本节点
    } else if (typeof newChild.type === 'string') {
      tag = TAG_HOST // 如果 type 是字符串 那么是一个原生 DOM 节点
    }

    const newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null, // div 还没有创建 DOM 元素
      return: currentFiber, // return 父 Fiber
      effectTag: PLACEMENT, // 副作用标识，render 我们会收集副作用 增加、删除、更新
      nextEffect: null // effect list 也是一个单链表
    }

    newChildrenIndex++
  }
}
```
