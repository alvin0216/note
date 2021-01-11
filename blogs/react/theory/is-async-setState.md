---
title: setState 是异步还是同步？
date: 2020-07-16 20:57:57
sidebar: 'auto'
tags:
  - React
  - React 原理
categories:
  - React
---

:::tip 答案：

1. Legacy 模式命中 batchedUpdates 时是异步的，未命中则是同步的。
2. Concurrent 模式都是异步的。

:::

- [Concurrent 模式介绍](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html)
- [batchedUpdates 源码](https://github.com/facebook/react/blob/17.0.1/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L1117-L1130)
- [executionContext === NoContext 源码](https://github.com/facebook/react/blob/17.0.1/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L581-L589)

这是一道高频的面试题，但其实开发中意义是不大的。

- 对于 `setState` 来说，我们可以在第二参数中传入回调或者 `componentDidUpdate` 中处理逻辑。
- 对于 `useState` 来说，我们可以通过 `useEffect` 中监听依赖来处理逻辑。

针对这个问题，其实不同模式下的 React 答案是不一样的，我们来看看为什么不同模式会造成不同的差异。

首先 React 会有[三种模式](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html#why-so-many-modes)

![](https://gitee.com/alvin0216/cdn/raw/master/images/react-mode.png)

```ts
// 默认 Legacy 模式
ReactDOM.render(<App />, document.getElementById('root'));

// 你可以用下面的代码引入 concurrent 模式：
ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />);
```

## Concurrent 模式

当我们创建了 Concurrent 模式，**创建了更新拥有了不同优先级，并且更新的过程可以打断**

看个例子：

```ts
export default class App extends React.Component {
  state = { num: 0 };

  updateNum = () => {
    console.log('before setState', this.state.num);
    this.setState({ num: this.state.num + 1 });
    console.log('after setState', this.state.num);

    // 老版本跳出batchedUpdates
    // setTimeout(() => {
    //   this.setState({num: this.state.num + 1});
    //   console.log('after setState', this.state.num)
    // });
  };
  render() {
    const { num } = this.state;
    console.log('AppClass render ', num);
    return <p onClick={this.updateNum}>hello {num}</p>;
  }
}
```

Legacy 和 Concurrent 下表现一致，点击 p 标签后效果：

```js
AppClass render  0
before setState 0
after setState 0
AppClass render 1
```

当我们跑注释的一端代码后，差异就体现出来了，Legacy 下是同步的效果，而 Concurrent 仍然是异步的结果

```diff
before setState 0
- after setState 0 // Concurrent
+ after setState 1 // Legacy
AppClass render 1
```

## Legacy 模式下的效果

Legacy 模式下可以这么认为

- 合成事件中是异步
- 钩子函数中的是异步
- 原生事件中是同步
- setTimeout 中是同步

**一句话 react 管得到的就是异步 管不到的就是同步**
