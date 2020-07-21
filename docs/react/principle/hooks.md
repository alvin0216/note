---
title: react hooks
date: 2020-07-21 09:35:59
---

## 模拟实现 useState

```js
import React from 'react'
import ReactDOM from 'react-dom'

let lastState

function useState(initialState) {
  lastState = lastState || initialState
  function setState(newState) {
    lastState = newState
    render()
  }
  return [lastState, setState]
}

function App(props) {
  const [count, setCount] = useState(0)
  return (
    <>
      <h2>count {count}</h2>
      <button onClick={e => setCount(count + 1)}>add</button>
    </>
  )
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
```

由于组件会有多个 state，所以还需要改造一下：

```js
let lastState = []
let hookIndex = 0

function useState(initialState) {
  lastState[hookIndex] = lastState[hookIndex] || initialState

  const currentIndex = hookIndex // 通过闭包保持索引的引用
  function setState(newState) {
    lastState[currentIndex] = newState
    render()
  }

  return [lastState[hookIndex++], setState]
}

function render() {
  hookIndex = 0 // 注意 这里要重置 hookIndex，否则每次 render 后都会执行 hookIndex++
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
```

这也是为什么 `useState` 等 hooks 不能写在 `if-else` 之中。因为 `hookIndex` 可能会出错。

测试

```js
function App(props) {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(1)

  const addCount = () => setCount(count + 1)
  const addNum = () => setNum(num + 1)

  return (
    <>
      count {count}
      <button onClick={addCount}>add</button>
      <h2>num {num}</h2>
      <button onClick={addNum}>add</button>
    </>
  )
}
```

## 模拟实现 useMemo & useCallback

`useMemo`

```js
let lastMemo
let laseMemoDependenices

function useMemo(callback, dependenices) {
  if (laseMemoDependenices) {
    let changed = dependenices.some((item, index) => {
      return item !== laseMemoDependenices[index]
    })

    if (changed) {
      lastMemo = callback()
      laseMemoDependenices = dependenices
    }
  } else {
    lastMemo = callback()
    laseMemoDependenices = dependenices
  }

  return lastMemo
}
```

`useCallback`

```js
let lastCallback
let lastCallbackDependenices

function useCallback(callback, dependenices) {
  if (lastCallbackDependenices) {
    let changed = dependenices.some((item, index) => {
      return item !== lastCallbackDependenices[index]
    })

    if (changed) {
      lastCallback = callback
      lastCallbackDependenices = dependenices
    }
  } else {
    lastCallback = callback
    lastCallbackDependenices = dependenices
  }

  return lastCallback
}
```

同理 可能也有多个 `useMemo` 和多个 `useCallback`，改造方法同上。

## 模拟实现 useReducer

```js
import React from 'react'
import ReactDOM from 'react-dom'

let lastState

function useReducer(reducer, initialState) {
  lastState = lastState || initialState

  function dispatch(action) {
    lastState = reducer(lastState, action)
    render()
  }

  return [lastState, dispatch]
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1

    default:
      return state
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, 18)
  return (
    <>
      <h2>count {state}</h2>
      <button onClick={e => dispatch({ type: 'ADD' })}>add</button>
    </>
  )
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
```

## 利用 useReducer 实现 useState
