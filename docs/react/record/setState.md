---
title: setState何时同步何时异步？
date: 2020-09-15 14:24:24
---

说出每个阶段的 val 值。

```jsx
class App extends Component {
  state = { val: 0 }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 0
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 0
    setTimeout(() => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 2
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 3
    })
  }

  render() {
    return null
  }
}
// why? 0 0 2 3
```

## React 是怎样控制异步和同步的呢？

- **由 React 控制的事件处理程序，以及生命周期函数调用 setState 不会同步更新 state 。**
- **React 控制之外的事件中调用 setState 是同步更新的。比如原生 js 绑定的事件，setTimeout/setInterval、Promise.resolve 等。**

大部分开发中用到的都是 React 封装的事件，比如 onChange、onClick、onTouchMove 等，这些事件处理程序中的 setState 都是异步处理的。

---

在 React 的 setState 函数实现中，会根据一个变量 `isBatchingUpdates` 判断是直接更新 this.state 还是放到队列中延时更新，而 isBatchingUpdates 默认是 false，表示 setState 会同步更新 this.state；但是，有一个函数 `batchedUpdates`，该函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会先调用这个 batchedUpdates 将 isBatchingUpdates 修改为 true，这样由 React 控制的事件处理过程 setState 不会同步更新 this.state。

---

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/setState.png)

具体可以见 ReactFiberScheduler 中的 `performWork` 和 `performSyncWork`。如果有这种 async 的 work 就不执行 batch update 如果没有 async 的就执行 batch update，setTimeout 和 promise 这些要进入 EventLoop 队列的都会被认为是 async work。

## 看看 hooks 的体现

```js
const App = () => {
  const [val, setVal] = useState(0)

  useEffect(() => {
    setVal(val + 1)
    setVal(val + 1)
    setTimeout(() => {
      setVal(val + 1)
      setVal(val + 1)
    })
  }, [])

  return <p>{val}</p>
}
```

最终页面的显示结果为 `1`, 为什么呢？因为每次的 `setVal` 都会重新 `render` 也即 val 会被重置为 `0`
