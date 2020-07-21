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

## 模拟实现
