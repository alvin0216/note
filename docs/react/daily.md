---
title: React 坑点记录
date: 2019-11-31 14:45:40
---

## 很容易采坑的写法 <badge text="子组件可能监听不到 props 变化" type="warning" />

```jsx
const App = props => {
  const [key, setKey] = useState(-1)
  const toolList = [
    { key: 1, component: <Demo1 /> },
    { key: 2, component: <Demo2 /> },
    { key: 3, component: <Demo3 /> }
    // MORE...
  ]

  return <div>{toolList.find(t => t.key === key).component}</div>
}
```

在组件渲染时候，子组件可能监听不到 props 发生的变化！！！应该用**稳如老铁**的方法

```jsx
const App = props => {
  const [key, setKey] = useState(-1)

  function getToolList() {
    return [
      { key: 1, component: <Demo1 /> },
      { key: 2, component: <Demo2 /> },
      { key: 3, component: <Demo3 /> }
      // MORE...
    ]
  }
  const toolList = getToolList()

  return <div>{toolList.find(t => t.key === key).component}</div>
}
```

但是耦合度太高，可以这么做

```js
const Todo = props => {
  switch (props.key) {
    case 1:
      return <Demo1 />
    case 2:
      return <Demo2 />
    case 3:
      return <Demo3 />

    default:
      return null
  }
}

const App = props => {
  const [key, setKey] = useState(-1)
  return <Todo key={key} />
}
```

## 性能优化失效？

```jsx
const Child = React.memo(({ columns }) => {
  return <Table columns={columns} />
})
const Parent = () => {
  const data = []
  return <Child columns={data} />
}
```

每次 `Parent render` 的时候虽然 `columns` 内容没有变，但是 `columns` 的引用已经变了。当 props 传递给 Child 的时候，即使使用了 `React.memo` 但是性能优化也失效了。

对于这种情况，可以通过 `useMemo` 将引用存储起来，依赖不变引用也就不变。

```js
const data = useMemo(() => [], [])
```

对于函数来说，如果你想保存它的引用的话可以使用 `useCallback` 来做。
