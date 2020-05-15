---
title: React 坑点记录
date: 2019-11-31 14:45:40
---

## 记录编码过程中遇到的坑点

### 修改 key 值会摧毁组件

```jsx
const Demo = props => {
  useEffect(() => {
    return () => console.log('demo was destroyed')
  }, [])
  return null
}

const App = props => {
  const [key, setKey] = useState(0)
  return (
    <>
      <Demo key={key} />
      <button onClick={e => setKey(prev => prev + 1)}>update key</button>
    </>
  )
}
```

### 很容易采坑的写法 <badge text="子组件可能监听不到 props 变化" type="warning" />

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
