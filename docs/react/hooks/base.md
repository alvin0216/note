---
title: React Hooks
date: 2019-12-31 11:29:30
---

## useState 和 setState 异同

```jsx
// class
this.setState(prev => ({ count: prev.count + 1 }))
setTimeout(() => {
  console.log(this.state.count) // 3 3 3
}, 3000)

// function
setCount(prev => prev + 1)
setTimeout(() => {
  console.log(count) // 0 1 2
}, 3000)
```

两者都是 click 事件。连续点击 3 次：

- setState 后生成的是新的引用，控制台输出的是 `3 3 3`，count 值最终是 3
- useState 在执行后会重新 render 函数组件，所以 `setTimeout` 读取了当时渲染闭包环境的数据，虽然最新的值跟着最新的渲染变了，但旧的渲染里，状态依然是旧值。

## 模拟 useState

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

useState 一次，定义的 `hookIndex++` ，然后 setState 通过闭包的方式引用这个索引。

```js
const currentIndex = hookIndex // 通过闭包保持索引的引用
function setState(newState) {
  lastState[currentIndex] = newState
  render()
}
```

执行一次，触发一轮新的 `render`
