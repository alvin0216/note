---
title: React 中的不可变数据
date: 2020-09-24 21:26:22
---

我们在学习 React 的过程中经常会碰到一个概念,那就是数据的不可变性(immutable),不可变数据是**函数式编程**里的重要概念,因为可变数据在提供方便的时候会带了很多棘手的副作用,那么我们应该如何处理这些棘手的问题,如何实现不可变数据呢?

## 可变数据的副作用

```jsx
class App extends Component {
  state = { nums: [1] }

  handleClick = e => {
    const nums = this.state.nums
    nums.push(2)
    this.setState({ nums })
  }
  render() {
    console.log(this.state.nums) // [1, 2...]
    return (
      <>
        <button onClick={this.handleClick}>click</button>
        {this.state.nums}
      </>
    )
  }
}
```

可以看到 nums.push 原始数据被改变。不管点击多少次在视图上渲染一直是 1。但实际上在 render 函数中的 nums 是可以看到数据发生变化的。

这是因为 nums 和 this.state.nums 被指向了同一个内存。或者说在 `shouldComponentUpdate` 或者 `PureComponent` 的时候，也不能检测出 props 的变化。

```jsx
class List extends React.PureComponent {
  render() {
    console.log('render')
    return <h2>{this.props.nums.join(', ')}</h2>
  }
}

class App extends Component {
  render() {
    // ....
    return <List nums={this.state.nums} />
  }
}
```

同样不能检测出变化，`PureComponent` 浅层变化，内存地址不变，所以不会触发渲染...

## 不可变数据的解决方案

### 浅复制或者深度克隆

```js
const nums = [...this.state.nums] // 使用 ... 或者 Object.assign
nums.push(2)
this.setState({ nums })

// 深克隆
const nums = clone(this.state.nums)
```

- 浅复制虽然可以解决浅层嵌套的问题,但是依然对多层嵌套的引用类型无能为力.
- 实现一次深克隆的开销太昂贵了.

### immutable.js

`immutable.js` 是正是兼顾了使用效果和性能的解决方案

原理如下:

`Immutable` 实现的原理是 `Persistent Data Structur`（持久化数据结构），对 `Immutable` 对象的任何修改或添加删除操作都会返回一个新的 `Immutable` 对象, 同时使用旧数据创建新数据时，要保证旧数据同时可用且不变。

为了避免像 `deepCopy` 一样 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 `Structural Sharing`（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。请看下面动画

<img class='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/react/immutable.png' />

我们看到动画中右侧的子节点由于发生变化,相关父节点进行了重建,但是左侧树没有发生变化,最后形成的新的树依然复用了左侧树的节点,看起来真的是无懈可击.

immutable.js 的实现方法确实很高明,毕竟是花了 Facebook 工程师三年打造的全新数据结构,相比于深克隆,带来的 cpu 消耗很低,同时内存占用也很小.

但是 immutable.js 就没有弊端吗?

在使用过程中,immutable.js 也存在很多问题.

1. 由于实现了完整的不可变数据,immutable.js 的体积过于庞大,尤其在移动端这个情况被凸显出来.
2. 全新的 api+不友好的文档,immutable.js 使用的是自己的一套 api,因此我们对 js 原生数组、对象的操作统统需要抛弃重新学习，但是官方文档不友好，很多情况下需要自己去试 api.
3. 调试错误困难，immutable.js 自成一体的数据结构,我们无法像读原生 js 一样读它的数据结构,很多情况下需要 toJS()转化为原生数据结构再进行调试,这让人很崩溃.
4. 极易引起滥用,immutable.js 在 react 项目中本来是可以大幅提高软件性能,通过深度对比避免大量重复渲染的,但是很多开发者习惯在 react-redux 的 connect 函数中将 immutable.js 数据通过 toJS 转化为正常的 js 数据结构,这个时候新旧 props 就永远不会相等了,就导致了大量重复渲染,严重降低性能.
5. 版本更新卡壳,immutable.js 在 4.0.0-rc.x 上大概卡了一年了,在 3.x 版本中对 typescript 支持极差,而新版本一直卡壳

请看 [面试官(8): React 强调的『不可变数据结构』怎么实现?](https://juejin.im/post/6844903859618332680)

---

- [面试官(8): React 强调的『不可变数据结构』怎么实现?](https://juejin.im/post/6844903859618332680)
- [React 中的不可变数据 — Immer](https://juejin.im/post/6846687604130185230)
