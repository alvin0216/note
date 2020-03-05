## 前言

- `version`: v16.13.0
- `vscode` 推荐阅读源码工具: `Bookmarks`
- [阅读跟随地址 jokcy React 源码解析](https://react.jokcy.me/)
- [阅读跟随地址 yck React 原理解析](https://yuchengkai.cn/react/)

首先定位到 `React` 主入口文件，看看主文件代码里有什么：

```js
// packages/react/src/React.js : line 74
const Children = { map, forEach, count, toArray, only }
export {
  Children,
  createRef,
  Component,
  PureComponent,
  createContext,
  //...
  createElement,
  cloneElement,
  isValidElement //...
}
```

这里可以看到 `React` 导出了一系列的 API 和类，`Children`、`createRef`, `Component`...。这里仅仅会记录下重要的函数

## React.createElement

大家在写 `React` 代码的时候肯定写过 `JSX`，但是为什么一旦使用 JSX 就必须引入 `React` 呢？

这是因为我们的 `JSX` 代码会被 `Babel` 编译为 `React.createElement`，不引入 `React` 的话就不能使用 `React.createElement` 了。 简单的 `demo`：

```jsx
// jsx
<div id='app'>content</div>

// js
React.createElement('div', { id: 'app' }, 'content')

<div id='div'>
  <span>hello</span>
  <span>world</span>
</div>

React.createElement("div", {  id: "div"},
  React.createElement("span", null, "hello"),
  React.createElement("span", null, "world"))
```

通过 `React.createElement` 创建 `ReactElement`，调用该方法需要传入三个参数：

1. `type`
   - `type` 指代这个 `ReactElement` 的类型, 字符串比如 div，p 代表原生 DOM，称为 `HostComponent`
   - `Class` 类型是我们继承自 `Component` 或者 `PureComponent` 的组件，称为 `ClassComponent`
   - 方法就是 `functional Component`
   - 原生提供的 `Fragment、AsyncMode` 等是 `Symbol`，会被特殊处理
   - 等等
2. `config`
3. `children`

定位到函数代码：

```jsx
// packages/react/src/ReactElement.js: line 348
export function createElement(type, config, children) {
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref
    }
    if (hasValidKey(config)) {
      key = '' + config.key
    }

    self = config.__self === undefined ? null : config.__self
    source = config.__source === undefined ? null : config.__source
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName]
      }
    }
  }
  //...
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}
```

> **这段代码对 `ref` 以及 `key` 做了个验证），然后遍历 `config` 并把内建的几个属性（比如 `ref` 和 `key`）剔除后丢到 `props` 对象中。**

### children 的处理

```jsx
// packages/react/src/ReactElement.js lin 386
const childrenLength = arguments.length - 2
if (childrenLength === 1) {
  props.children = children
} else if (childrenLength > 1) {
  const childArray = Array(childrenLength)
  for (let i = 0; i < childrenLength; i++) {
    childArray[i] = arguments[i + 2]
  }
  props.children = childArray
}
```

首先把第二个参数之后的参数取出来，然后判断长度是否大于一。大于一的话就代表有多个 `children`，这时候 `props.children` 会是一个数组，否则的话只是一个对象。

最后就是返回了一个 `ReactElement` 对象

## ReactElement

```jsx
// packages/react/src/ReactElement.js: line 146
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner // Record the component responsible for creating this element.
  }
  // ...
  return element
}
```

`ReactElement` 只是一个用来承载信息的容器，他会告诉后续的操作这个节点的以下信息：

- `type` 类型，用于判断如何创建节点
- `key` 和 `ref` 这些特殊信息
- `props` 新的属性内容
- `$$typeof` 用于确定是否属于 `ReactElement`

内部代码很简单，核心就是通过 `$$typeof` 来帮助我们识别这是一个 `ReactElement`，后面我们可以看到很多这样类似的类型。另外我们需要注意一点的是：通过 `JSX` 写的 `<APP />` 代表着 `ReactElement`，`APP` 代表着 `React Component`。

从 `createElement` 到返回一个 `ReactElement` 的流程如下：

![](../../assets/react/createElement.png)
