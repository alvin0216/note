---
title: 实现 react fiber & hooks
date: 2020-07-11 13:52:09
---

首先用脚手架创建个 react 项目: `create-react-app mini-react`

## 目录结构

初始化项目 `create-react-app mini-react`, src 下的目录结构：

```bash
├── UpdateQueue.js  # 更新队列
├── constants.js    # 常量
├── index.js        # 入口文件
├── react-dom.js    # 提供 ReactDOM.render 等方法
├── react.js        # React 核心
├── scheduler.js    # 任务调度
└── utils.js        # 辅助文件
```

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

## 入口文件

修改 <Badge text='index.js' />

```js
import React from './react'
import ReactDOM from './react-dom'
const element = (
  <div id='A1'>
    A1
    <div id='B1'>B1
      <div id='C1'>C1</div>
      <div id='C2'>C2</div>
    </div>
    <div id='B2'>B2</div>
  </div>
)
ReactDOM.render(element, document.getElementById('root))
```

## React.createElement <Badge text='react.js' />

首先 jsx 语法会被转化为 vdom 对象

```js
import { ELEMENT_TEXT } from './constants'

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

const React = {
  createElement
}

export default React
```

## React.render <Badge text='react-dom.js' />

```js {16}
import { TAG_ROOT } from './constants'
import { scheduleRoot } from './scheduler'

/**
 * 把一个元素渲染到容器内部
 */
function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT, // 每一个 fiber 都有个 tag 标识 ｜ 此元素的类型
    stateNode: container, // 一般情况下如果此 vdom 是个原生节点，stateNode 指向真实 DOM
    // props.children 是一个数组，里面是 React 元素，后面会根据每一个 React 元素创建对应的 fiber
    props: { children: [element] }
  }

  // 调度
  scheduleRoot(rootFiber)
}

const ReactDOM = {
  render
}

export default ReactDOM
```

render 组装了 `rootFiber` 对象，使用 `scheduleRoot` 调度任务

## scheduler

定义好/引入常量

```JS
import { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST, PLACEMENT, DELETION, UPDATE, TAG_CLASS, TAG_FUNCTION_COMPONENT } from './constants'
import { setProps } from './utils'
import { UpdateQueue, Update } from './UpdateQueue'

let nextUnitOfWork = null // 下一个工作单元
let workInProgressRoot = null // 正在渲染的 根fiber
let currentRoot = null // 渲染成功后当前根 rootFiber 【 把当前渲染成功的 根fiber 赋给 currentRoot。在渲染前如果此之存在 则赋值到 rootFiber.alternate】
let deletions = [] // 删除的节点 并不放在 effect list，所以需要单独记录并执行 push by effectTag === DELETION，run and clear at commitRoot
let workingProgressFiber = null // 工作中的 fiber
let hookIndex = 0 // hooks 索引
```

```JS {35}
export function scheduleRoot(rootFiber) {
  console.log('scheduleRoot')
  if (currentRoot && currentRoot.alternate) {
    // 3. 第二次之后的更新
    // 交替 workInProgressRoot <=>  currentRoot 目的是复用 fiber-tree，避免每次都创建新 fiber-tree 损耗性能
    workInProgressRoot = currentRoot.alternate // 第  一次渲染出来的那个fiber tree
    workInProgressRoot.alternate = currentRoot // 让这个树的替身指向当前的currentRoot;

    if (rootFiber) {
      workInProgressRoot.props = rootFiber.props // 让它的props更新成新的props
    }
  } else if (currentRoot) {
    // 2. currentRoot 有值 说明至少渲染过一次了。
    if (rootFiber) {
      rootFiber.alternate = currentRoot
      workInProgressRoot = rootFiber
    } else {
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot
      }
    }
  } else {
    // 1. 第一次渲染
    workInProgressRoot = rootFiber
  }

  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null // 清空 effect
  nextUnitOfWork = workInProgressRoot
}

// 循环执行工作 nextUnitOfWork
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 时间片到期后还有任务没完成，需要请求浏览器再次调 度
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log('render 阶段结束')
    commitRoot()
  }

  // 每帧执行一个调度
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop) // ms
```

## performUnitOfWork

`performUnitOfWork` 首先会将 vdom 转换为真实的 dom 对象，然后在创建子 fiber，dom 挂在到 fiber 对象上，最后返回下一个执行单元。

```js
function performUnitOfWork(currentFiber) {
  beginWork(currentFiber) // updateHostRoot -> reconcileChildren 生成了 children 的 fiber 关系链

  if (currentFiber.child) {
    return currentFiber.child // 有 child 则返回 child 作为下一个执行单元
  }

  while (currentFiber) {
    completeUnitOfWork(currentFiber)
    if (currentFiber.sibling) return currentFiber.sibling // 有兄弟节点 返回兄弟节点
    currentFiber = currentFiber.return // 无 child 和 兄弟节点，返回 “叔叔” 节点，层层递进
  }
}
```

### beginWork

将 vdom 转换为真实的 dom 对象, 以及创建 子 fiber

```js
function beginWork(currentFiber) {
  switch (currentFiber.tag) {
    case TAG_ROOT: // react 根节点
      updateHostRoot(currentFiber)
      break

    case TAG_TEXT: // 文本节点
      updateHostText(currentFiber)
      break

    case TAG_HOST: // 原生 DOM 节点
      updateHost(currentFiber)
      break

    case TAG_CLASS: // 类组件
      updateClassComponent(currentFiber)
      break

    case TAG_FUNCTION_COMPONENT: // 类组件
      updateFunctionComponent(currentFiber)
      break

    default:
      break
  }
}
```

对应的方法

```js
function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function updateHostText(currentFiber) {
  // 如果此 fiber 没有创建 DOM 节点
  if (!currentFiber.stateNode) currentFiber.stateNode = createDOM(currentFiber)
}

function updateHost(currentFiber) {
  // 如果此 fiber 没有创建 DOM 节点
  if (!currentFiber.stateNode) currentFiber.stateNode = createDOM(currentFiber)
  const newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function updateClassComponent(currentFiber) {
  if (!currentFiber.stateNode) {
    // 类组件 stateNode 是组件的实例
    // new currentFiber.type(currentFiber.props) 也即 new Component(props)
    currentFiber.stateNode = new currentFiber.type(currentFiber.props)
    currentFiber.stateNode.internalFiber = currentFiber
    currentFiber.updateQueue = new UpdateQueue()
  }

  // 给组件的实例的state赋值
  currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state)
  let newElement = currentFiber.stateNode.render()
  const newChildren = [newElement]
  reconcileChildren(currentFiber, newChildren)
}

function updateFunctionComponent(currentFiber) {
  workingProgressFiber = currentFiber
  hookIndex = 0
  workingProgressFiber.hooks = []

  const newChildren = [currentFiber.type(currentFiber.props)]
  reconcileChildren(currentFiber, newChildren)
}
```

创建 dom 的方法

```js
function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) return document.createTextNode(currentFiber.props.text)

  // 原生 dom
  if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type)
    updateDOM(stateNode, {}, currentFiber.props)
    return stateNode
  }
}

function updateDOM(stateNode, oldProps, newProps) {
  if (stateNode && stateNode.setAttribute) {
    setProps(stateNode, oldProps, newProps)
  }
}
```

### reconcileChildren

```js
function reconcileChildren(currentFiber, newChildren) {
  let oldFiber = currentFiber.alternate && currentFiber.alternate.child
  if (oldFiber) {
    oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null
  }

  let index = 0 // 新子节点的索引
  let prevSibling // 上一个 子fiber
  // 遍历子 vdom，为每个 vdom 创建 子 fiber
  while (index < newChildren.length || oldFiber) {
    let newChild = newChildren[index]
    let newFiber = null

    // diff
    const sameType = oldFiber && newChild && oldFiber.type === newChild.type

    let tag

    if (newChild) {
      // new Child 可能为 null
      switch (true) {
        case newChild.type === ELEMENT_TEXT:
          tag = TAG_TEXT // 文本节点
          break

        // type 如果是字符串 表示当前是一个原生的 DOM 节点 div span...
        case typeof newChild.type === 'string':
          tag = TAG_HOST
          break

        case typeof newChild.type === 'function' && !!newChild.type.prototype.isReactComponent:
          tag = TAG_CLASS
          break

        case typeof newChild.type === 'function' && !newChild.type.prototype.isReactComponent:
          tag = TAG_FUNCTION_COMPONENT // 函数组件
          break

        default:
          break
      }
    }

    if (sameType) {
      if (oldFiber.alternate) {
        // 第二次之后的更新
        newFiber = oldFiber.alternate // 上上次 fiber，双缓冲机制
        newFiber.props = newChild.props
        newFiber.alternate = oldFiber
        newFiber.effectTag = UPDATE
        newFiber.nextEffect = null
        newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue()
      } else {
        // 说明 老 fiber 和新 vdom 类型一样，可以复用老的 dom，更新即可
        newFiber = {
          tag: oldFiber.tag,
          type: oldFiber.type,
          props: newChild.props,
          stateNode: oldFiber.stateNode, // 还没有创建 DOM 元素
          alternate: oldFiber, // 关联 oldFiber，diff 用到
          return: currentFiber, // 指向 父fiber
          effectTag: UPDATE, // 副作用标识 render 我们会收集副作用 增加 删除 更新
          nextEffect: null, // effect list 也是一个单链表
          updateQueue: oldFiber.updateQueue || new UpdateQueue()
        }

        if (typeof newChild.type === 'function' && !newChild.type.prototype.isReactComponent) {
          console.log(12)
        }
      }
    } else {
      // ! 第一次 render 也会走到这一步

      // 如果两两比较时候不一样，那就删除老的，添加新的。

      // vdom 可能是 null, example {null}
      if (newChild) {
        // beginWork 的时候创建 fiber completeUnitOfWork 的时候收集 effect
        newFiber = {
          tag,
          type: newChild.type,
          props: newChild.props,
          stateNode: null, // 还没有创建 DOM 元素
          return: currentFiber, // 指向 父fiber
          effectTag: PLACEMENT, // 副作用标识 render 我们会收集副作用 增加 删除 更新
          nextEffect: null, // effect list 也是一个单链表
          updateQueue: new UpdateQueue()
        }
      }

      // 删除旧节点
      if (oldFiber) {
        oldFiber.effectTag = DELETION
        deletions.push(oldFiber)
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling // oldFiber 指针向后移动一次
    }

    /**
     * 构建 fiber 关系
     *    currentFiber
     *     /
     * child1 --sibling--> child2
     * */

    if (newFiber) {
      if (index === 0) currentFiber.child = newFiber
      else prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}
```

## commitRoot

```js
function commitRoot() {
  deletions.forEach(commitWork) // 执行 effect list 前把该删除的元素删除
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    commitWork(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  deletions.length = 0 // 提交后清空 deletions 数组
  currentRoot = workInProgressRoot // 把当前渲染成功的 根fiber 赋给 currentRoot
  workInProgressRoot = null
}
```

### commitWork

```js
function commitWork(currentFiber) {
  if (!currentFiber) return
  let returnFiber = currentFiber.return

  // returnFiber 是个类组件或者函数组件情况下，挂载的应该是父 fiber.return
  while (returnFiber.tag !== TAG_HOST && returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_TEXT) {
    returnFiber = returnFiber.return
  }

  let returnDOM = returnFiber.stateNode

  switch (currentFiber.effectTag) {
    case PLACEMENT: // 新增节点
      // 如果要挂载的节点不是DOM节点，比如说是类组件Fiber，一直找第一个儿子，直到找到一个真实DOM节点为止。
      let nextFiber = currentFiber

      // 优化： 如果是类组件，其实可以直接return
      if (nextFiber.tag === TAG_CLASS) {
        return
      }

      while (nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_ROOT && nextFiber.tag !== TAG_TEXT) {
        nextFiber = nextFiber.child
      }
      returnDOM.appendChild(nextFiber.stateNode)

      break

    case DELETION: // 删除节点
      return commitDeletion(currentFiber, returnDOM)
    // returnDOM.removeChild(currentFiber.stateNode)
    // break

    case UPDATE: // 更新节点
      // returnDOM.removeChild(currentFiber.stateNode)
      if (currentFiber.type === ELEMENT_TEXT) {
        if (currentFiber.alternate.props.text !== currentFiber.props.text) {
          currentFiber.stateNode.textContent = currentFiber.props.text
        } else {
          updateDOM(
            currentFiber.stateNode, // 更新的节点
            currentFiber.alternate.props, // 老 props
            currentFiber.props // 当前的新 props
          )
        }
      }
      break

    default:
      break
  }

  currentFiber.effectTag = null
}
```

### commitDeletion

```js
function commitDeletion(currentFiber, domReturn) {
  if (currentFiber.tag === TAG_HOST || currentFiber.tag === TAG_TEXT) {
    domReturn.removeChild(currentFiber.stateNode)
  } else {
    commitDeletion(currentFiber.child, domReturn)
  }
}
```
