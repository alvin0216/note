---
title: 渲染与优化
date: 2020-09-28 11:21:21
---

## 父组件 render

父组件 render ，子组件也会 render

```js
const Con1 = () => {
  console.log('render Con1')
  return null
}

const App = props => {
  const [state, setState] = useState(0)
  return (
    <>
      <Con1 />
      <button onClick={e => setState(prev => prev + 1)}>{state}</button>
    </>
  )
}
```

点击 按钮，没有给 `Con1` 传递 props，发现也是会触发 `Con1` 的 render

## React.memo

语法：

```js
React.memo(SubComponent, (prevProps, nextProps) => prevProps.name === nextProps.name)
```

通过 `React.Memo` 可以对 `props` 进行浅比较，以此来优化渲染

```js
const Con1 = React.memo(() => {
  console.log('render Con1')
  return null
})
```

点击按钮 🔘，也不会渲染 `Con1` 渲染了。

## useCallback

```js
const Con1 = React.memo(({ num }) => {
  console.log('render Con1')
  return null
})

const App = props => {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const addCount2 = () => setCount2(prev => prev + 1)

  return (
    <>
      <Con1 addCount2={addCount2} />
      <button onClick={e => setCount(prev => prev + 1)}>{count}</button>
    </>
  )
}
```

可以发现我们往 `Con1` 组件传递函数，那么点击的时候触发 `setCount`, `App` 组件重新渲染，导致生成新的 `addCount2` 函数。

一句话概览就是重新 `render` 导致 `addCount2` 函数引用地址变了，这时候使用了 `React.memo` 浅比较认为 props 发现改变了，会重新触发 `Con1 render`

使用 `useCallback` 优化：

```js
const addCount2 = useCallback(() => {
  setCount2(prev => prev + 1)
}, [count2])
```

只有 `count2` 发现变化后，才会触发 `addCount2` 更新

## useMemo

```js
const App = props => {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  function countWithTime() {
    return new Date().getTime() + ': ' + count2
  }

  const newCount2 = countWithTime()

  return (
    <>
      {newCount2}
      <button onClick={e => setCount(prev => prev + 1)}>{count}</button>
    </>
  )
}
```

我们值希望 count2 发生变化后，newCount2 才被重新更新，然而并不是，render 后会重新执行 `countWithTime`，即使 `count2` 没有发生改变。

可以使用 `useMemo` 进行缓存

```js
const newCount2 = useMemo(countWithTime, [count2])
```
