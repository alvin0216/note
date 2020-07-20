---
title: jsx 转化为 vdom
date: 2020-07-11 13:52:09
---

## React.createElement

任何 `jsx` 语法都会被 Babel 编译为`React.createElement` 来创建相应的 `ReactElement`。

这也是为什么我们在写 `jsx` 的时候必须加上`import React from 'react'` 的原因，否则会报错。

```JSX
<div id='app'>content</div>

// babel 会转义为
React.createElement('div', { id: 'app' }, 'content')
```

## 编译为 vdom 的 js

尝试在 [babel](https://www.babeljs.cn/repl) 下运行这段代码

```jsx
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
```

最终会被转义为

```js
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

最终在页面上呈现的 element 为：

<img style='height: 400px' src='https://gitee.com/alvin0216/cdn/raw/master/img/react/v-dom.png' />

自此，说明了 jsx 以及被转化为虚拟 dom。

而 react 对虚拟 dom 的处理是先转化为 fiber 对象，最后通过一系列的调度过程更新 dom 。

## 实现 React.createElement

用 create-react-app 创建的项目后，修改 index.js

```js
import React from './react.js'
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

输出来的对象，也即是上图的效果

`react.js`

```js
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
              type: 'ELEMENT_TEXT',
              props: { text: child, children: [] }
            }
      })
    }
  }
}

export default { createElement }
```

type 指代这个 ReactElement 的类型，config 相当于 props， children 则是编译的组件内部的 children。
