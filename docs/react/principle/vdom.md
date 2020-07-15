---
title: 简易版 react
date: 2020-07-11 13:52:09
---

本文主要实现 `React.createElement` 和 `React.render` 将 `vdom` 渲染出来，并不涉及到调度过程...

首先用脚手架创建个 react 项目: `create-react-app vdom`

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

## React.createElement

react.js

```js
/**
 *
 * @param {str|function} 类型，是字符串div 还是函数
 * @param {*} jsx传递的属性
 * @param  {...any} 子元素
 */
function createElement(type, props, ...children) {
  delete props.__source
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  }

/**
 * 文本类型的虚拟 DOM 创建
 */
function createTextElement(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

export default  {
  createElement
}
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
