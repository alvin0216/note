---
title: useState
date: 2020-09-15 11:55:51
---

1. 对于如下函数组件：

```js
function App() {
  const [num, updateNum] = useState(0)
  window.updateNum = updateNum
  return num
}
```

调用 `window.updateNum(1)` 可以将视图中的 `0` 更新为 `1` 么？

2. 对于如下函数组件：

```js
function App() {
  const [num, updateNum] = useState(0)

  function increment() {
    setTimeout(() => {
      updateNum(num + 1)
    }, 1000)
  }

  return <p onClick={increment}>{num}</p>
}
```

在 1 秒内快速点击 p5 次，视图上显示为几？
