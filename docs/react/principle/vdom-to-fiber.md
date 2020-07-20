---
title: vdom 转化为 fiber
date: 2020-07-11 13:52:09
---

## vdom 渲染在页面上

[上文](./jsx-to-vdom.md) 讲到了 jsx 通过 `React.createElement` 生成 vdom。

```js
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
              type: 'ELEMENT_TEXT',
              props: { text: child, children: [] }
            }
      })
    }
  }
}
```

有了 vdom，我们还需要通过 `ReactDOM.render` 在容器中渲染出一个组件。

依然是之前的代码：

```jsx
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

我们需要它在页面中渲染出来，所以需要实现 `ReactDOM.render`

```js
// react-dom.js
function render(vdom, container) {
  const dom =
    vdom.type === 'ELEMENT_TEXT' ? document.createTextNode(vdom.props.text) : document.createElement(vdom.type)

  // 设置属性
  Object.keys(vdom.props).forEach(attr => {
    if (attr !== 'children') {
      dom[attr] = vdom.props[attr]
    }
  })

  // 递归渲染⼦元素
  vdom.props.children.forEach(child => {
    render(child, dom)
  })

  container.appendChild(dom)
}
export default { render }
```

现在的 render 只是简单的渲染⼀个对象，我们需要转成真实的 dom 渲染 这⼀步没啥特别的 就是挨个遍历 创建 dom 然后 appendChild。

## 转化为 fiber

之前的 vdom 结构是⼀个树形结构，他的 diff 过程是没法中断的。为了管理我们 vdom 树之间的关系，我们需要把 树形结构的内部关系，改造成链表（⽅便终⽌） 之前只是 children 作为⼀个数组递归遍历，现在⽗=》⼦，⼦=》⽗，⼦=》兄弟，都有关系

<img class='small' alt='fiber-tree' src='https://gitee.com/alvin0216/cdn/raw/master/img/react/fiber-tree.png' />

### fiber 对象

```js
Fiber = {
  tag: WorkTag, // 标记不同的组件类型
  type: vdom.type, // fiber 类型，string 类型有 div、span、p 或者文本节点等。function 类型、类组件以及函数组件等
  props: vdom.props, // props
  stateNode: null, // 浏览器环境就是DOM节点
  return: fiber， // 指向 父fiber
  child: fiber, // 指向第一个 child，也即“太子”
  sibling: fiber, // 指向兄弟节点
  return: fiber // 指向父fiber
  // ...
}
```

### performUnitOfWork

修改 `render` 方法：

```js
// === 这些是定义的常量，TAG_* 用于表示 fiber 的 tag
const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT') // 文本元素
const TAG_ROOT = Symbol.for('TAG_ROOT') // 标记 react 根节点
const TAG_HOST = Symbol.for('TAG_HOST ') // 标记 原生的节点 span div p
const TAG_TEXT = Symbol.for('TAG_TEXT') // 文本节点

let nextUnitOfWork = null // 执行单元

function render(vdom, container) {
  nextUnitOfWork = {
    tag: TAG_ROOT,
    stateNode: container,
    props: {
      children: [vdom]
    }
  }

  // 执行单元任务
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (!nextUnitOfWork) {
    console.log('render 阶段结束')
  }
}
```

`React.render` 后通过执行 `performUnitOfWork` 一步步取出 `fiber` 的执行单元。

`performUnitOfWork` 首先会将 vdom 转换为真实的 dom 对象，然后在创建子 fiber，dom 挂在到 fiber 对象上，最后返回下一个执行单元。

```js
/**
 * 1. 创建 dom 元素
 * 2. 添加 子 fiber
 * 3. 返回下一个执行单元
 */
function performUnitOfWork(fiber) {
  // 创建 dom 元素
  if (!fiber.stateNode) {
    fiber.stateNode = createDOM(fiber)
  }

  // 挂载到父 fiber 对象的 dom 中
  if (fiber.return) {
    fiber.return.stateNode.appendChild(fiber.stateNode)
  }

  // 创建 子fiber
  let elements = fiber.props.children
  let index = 0 // 新子节点的索引
  let prevSibling // 上一个 子fiber

  while (index < elements.length) {
    let vdom = elements[index]
    let tag

    if (vdom.type === ELEMENT_TEXT) {
      tag = TAG_TEXT // 文本节点
    } else if (typeof vdom.type === 'string') {
      tag = TAG_HOST // type 如果是字符串 表示当前是一个原生的 DOM 节点
    }
    // 还有类组件 函数组件...

    let newFiber = {
      tag,
      type: vdom.type,
      props: vdom.props,
      stateNode: null, // 还没有创建 DOM 元素
      return: fiber // 指向 父fiber
    }

    if (index === 0) fiber.child = newFiber
    else prevSibling.sibling = newFiber

    prevSibling = newFiber
    index++
  }

  // 返回下一个执行单元
  if (fiber.child) {
    return fiber.child // 有 child 则返回 child 作为下一个执行单元
  }

  while (fiber) {
    if (fiber.sibling) return fiber.sibling // 有兄弟节点 返回兄弟节点
    fiber = fiber.return // 无 child 和 兄弟节点，返回 “叔叔” 节点，层层递进
  }
}
```

### 使用 requestIdleCallback 优化

注意上⾯的 render，⼀旦开始，就开始递归，本身这个没啥问题，但是如果应⽤变得庞⼤后，会有卡顿， 后⾯状态修改后的 diff 也是⼀样， 整个 vdom 对象变⼤后，diff 的过程也有会递归过多导致的卡顿

那么咋解决这个问题呢

浏览器⼜⼀个 api `requestIdleCallback` 可以利⽤浏览器的业余时间，我们可以把任务分成⼀个个的执行单元，然后利⽤浏览器空闲时间来做 diff，如果当前⼜任务来了，⽐如⽤户的点击或者动画，会先执⾏，然后空闲后，再回去把 `requestIdleCallback` 没完成的任务完成

```js
function render(vdom, container) {
  nextUnitOfWork = {
    tag: TAG_ROOT,
    stateNode: container,
    props: {
      children: [vdom]
    }
  }

  // 执行单元任务 使用 requestIdleCallback 代替
  // while (nextUnitOfWork) {
  //   nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  // }

  // if (!nextUnitOfWork) {
  //   console.log('render 阶段结束')
  // }
}

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (!nextUnitOfWork) {
    console.log('render 阶段结束')
  }

  // 每帧执行一个调度
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
```
