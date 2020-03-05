## 版本以及说明

- `version`: v16.13.0
- `vscode` 推荐阅读源码工具: `Bookmarks`
- [阅读跟随地址](https://react.jokcy.me/)

## API

`packages/react/src/React.js` : line 74

```js
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

### Children

这个对象提供了一堆帮你处理 `props.children` 的方法，因为 `children` 是一个类似数组但是不是数组的数据结构，如果你要对其进行处理可以用 `React.Children` 外挂的方法。

### createRef && forwardRef

新的 `ref` 用法，`React` 即将抛弃`<div ref="myDiv" />`这种 `string ref` 的用法，将来你只能使用两种方式来使用 `ref`

`forwardRef` 是用来解决 `HOC` 组件传递 `ref` 的问题的，所谓 `HOC` 就是 `Higher Order Component`，比如使用 `redux` 的时候，我们用 `connect` 来给组件绑定需要的 `state`，这其中其实就是给我们的组件在外部包了一层组件，然后通过`...props` 的方式把外部的 `props` 传入到实际组件。`forwardRef` 的使用方法如下：

```jsx
const TargetComponent = React.forwardRef((props, ref) => <TargetComponent ref={ref} />)
```

**这也是为什么要提供 createRef 作为新的 ref 使用方法的原因，如果用 string ref 就没法当作参数传递了。**

```jsx
// example
class Com extends Component {
  state = { age: 18 }
  render() {
    return null
  }
}

const Hoc = WrappedComponent =>
  class extends Component {
    render() {
      return <WrappedComponent {...this.props} name={'guodada'} />
    }
  }

class App extends Component {
  componentDidMount() {
    console.log(this.refs) // b ref state === null
  }
  render() {
    return (
      <>
        <Com ref='a' />
        <Comb ref='b' />
      </>
    )
  }
}
```

### createElement & cloneElement & createFactory & isValidElement

`createElement` 可谓是 `React` 中最重要的 `API` 了，他是用来创建 `ReactElement` 的

```yml
// jsx
<div id='app'>content</div>

// js
React.createElement('div', { id: 'app' }, 'content')


<div id='div'>
  <span>hello</span>
  <span>world</span>
</div>

React.createElement("div", {
  id: "div"
}, React.createElement("span", null, "hello"), React.createElement("span", null, "world"));
```

### 其他 API 暂时略过

### 类型

```jsx
Fragment: REACT_FRAGMENT_TYPE,
StrictMode: REACT_STRICT_MODE_TYPE,
unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
unstable_Profiler: REACT_PROFILER_TYPE,
```

## ReactElement

通过 `React.createElement` 创建 `ReactElement`，调用该方法需要传入三个参数：

1. `type`
   - `type` 指代这个 `ReactElement` 的类型, 字符串比如 div，p 代表原生 DOM，称为 `HostComponent`
   - `Class` 类型是我们继承自 `Component` 或者 `PureComponent` 的组件，称为 `ClassComponent`
   - 方法就是 `functional Component`
   - 原生提供的 `Fragment、AsyncMode` 等是 `Symbol`，会被特殊处理
   - TODO: 是否有其他的
2. `config`
3. `children`

从源码可以看出虽然创建的时候都是通过 `config` 传入的，但是 `key` 和 `ref` 不会跟其他 `config` 中的变量一起被处理，而是单独作为变量出现在 `ReactElement` 上。

在最后创建 `ReactElement` 我们看到了这么一个变量`$$typeof`，这是个啥呢，在这里可以看出来他是一个常量：`REACT_ELEMENT_TYPE`，但有一个特例：`ReactDOM.createPortal` 的时候是 `REACT_PORTAL_TYPE`，不过他不是通过 `createElement` 创建的，所以他应该也不属于 `ReactElement`

```jsx
// packages/react/src/ReactElement.js: line 348
export function createElement(type, config, children) {
  // verification...
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}

// packages/react/src/ReactElement.js: line 146
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
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

1. `type` 类型，用于判断如何创建节点
2. `key` 和 `ref` 这些特殊信息
3. `props` 新的属性内容
4. 4.`$$typeof` 用于确定是否属于 `ReactElement`

这些信息对于后期构建应用的树结构是非常重要的，**而 `React` 通过提供这种类型的数据，来脱离平台的限制**

## React.Children

> 最开始 React.Children 这个 API 是不想讲的，一方面平时不怎么用，另一方面跟数组处理功能差不多，不深究实现是比较容易理解的。但是后来实际去看了一下源码之后发现，他的实现方式还是非常有趣的，尤其是 map 和 forEach，我们就按照 map 的流程来看一下，forEach 其实差不多，只是没有返回新的节点。

先来看一下流程图：

![](https://pozvqg.dm.files.1drv.com/y4mmeXuR-FkgNj-8c2xEInueibhFoYSEdG7un9nWggJFV1nYGsjb6S8m0D776nWAyuXHwKz1kCVMelh96STs4RYe9EVppRjlQyiu7jwrPqH9iM-cR4YPS7UbJkFTZHg62yMg6k8n_c-DMQOoEzZhvmCdR8LAEPFY4JQvypWYj3LF1EpeR5zp6OIfkPOk3qei4Qwz903Q9lxtWpavsva6TceyQ?width=768&height=1152&cropmode=none)

当然这么看肯定云里雾里，接下去会对各个函数进行讲解，然后再回过头来配合图片观看更好理解。

```jsx
// packages/react/src/ReactChildren.js line 349
function mapChildren(children, func, context) {
  if (children == null) {
    return children
  }
  const result = []
  mapIntoWithKeyPrefixInternal(children, result, null, func, context)
  return result
}

// packages/react/src/ReactChildren.js line 321
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  let escapedPrefix = ''
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/'
  }
  // getPooledTraverseContext 就是从pool里面找一个对象，
  const traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context)
  // releaseTraverseContext 会把当前的context对象清空然后放回到 pool 中。
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext)
  releaseTraverseContext(traverseContext)
}

export { mapChildren as map }
```

`map` 和 `forEach` 的最大区别就是有没有 `return result`。

`getPooledTraverseContext` 就是从 `pool` 里面找一个对象，`releaseTraverseContext` 会把当前的 `context` 对象清空然后放回到 `pool` 中。

```jsx
// packages/react/src/ReactChildren.js line 55
const POOL_SIZE = 10
const traverseContextPool = []
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    const traverseContext = traverseContextPool.pop()
    // set attrs
    return traverseContext
  } else {
    return {
      /* attrs */
    }
  }
}
```
