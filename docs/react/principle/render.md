---
title: 手写 react 渲染过程 ✨
date: 2020-07-11 13:52:09
---

本文主要实现 `React.createElement` 和 `React.render` 将 `vdom` 渲染出来，并不涉及到调度过程...

首先用脚手架创建个 react 项目: `create-react-app mini-react`

改造 `src/index.js`：

```jsx
import React from 'react'

const element = (
  <div id='A1'>
    A1
    <div id='B1'>
      <div id='C1'>C1</div>
      <div id='C2'></div>
    </div>
    <div id='B2'></div>
  </div>
)

console.log(element)
```

通过 babel 转义

```JS
var element = React.createElement(
  'div',
  { id: 'A1' },
  'A1',
  React.createElement(
    'div',
    { id: 'B1' },
    React.createElement('div', { id: 'C1' }, 'C1'),
    React.createElement('div', { id: 'C2' })
  ),
  React.createElement('div', { id: 'B2' })
)
```

结果：

<img style='height: 400px' src='https://gitee.com/alvin0216/cdn/raw/master/img/react/v-dom.png' />

可见 jsx 对象被转化为了 虚拟 DOM 对象

---

现在就来实现一下简单的 react

```jsx
import React from './react'
import ReactDOM from './react-dom'

const element = (
  <div id='A1'>
    A1
    <div id='B1'>
      <div id='C1'>C1</div>
      <div id='C2'></div>
    </div>
    <div id='B2'></div>
  </div>
)

ReactDOM.render(element, document.getElementById('root))
```

## 目录结构

初始化项目 `create-react-app mini-react`, src 下的目录结构：

```bash
├── constants.js    # 常量
├── index.js        # 入口文件
├── react-dom.js    # 提供 ReactDOM.render 等方法
├── react.js        # React 核心
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

## React.createElement <Badge text='react.js' />

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

## React.render

react-dom.js

```js
function render(vdom, container) {
  const dom = vdom.type === 'TEXT' ? document.createTextNode('') : document.createElement(vdom.type)

  Object.keys(vdom.props)
    .filter(key => key !== 'children')
    .forEach(attr => {
      // 添加属性
      // className => class
      // onClick => listener...
      dom[attr] = vdom.props[attr]
    })

  vdom.props.children.forEach(child => {
    render(child, dom)
  })

  container.appendChild(dom)
}

export default {
  render
}
```
