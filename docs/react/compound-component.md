---
title: React 组合组件模式
date: 2020-03-04 16:38:10
---

- 推荐阅读[复合组件](https://react-cn.github.io/react/docs/multiple-components.html)
- [React 组件设计模式 Simply React by Kent C. Dodds](https://www.bilibili.com/video/av74131369?t=1203)
- [React 组件设计模式-组合组件](https://juejin.im/post/5cf8e153e51d4576bc1a0dc7)

这种模式本质上解决的是组件之间传值的问题。但是它对于传值以及一些内部操控的逻辑封装得更严密。

场景：希望减少上下级组件之间 `props` 的传递，简单来说就是不用传做显式地传值，来达到组件之间相互通信的目的

```jsx
const App = props => {
  const [index, setIndex] = useState(0)
  const getStyle = targetIndex => index === targetIndex ? { color: 'red' } : null
  return (
    <ul>
      <li style={getStyle(0)} onClick={e => setIndex(0)}>0</li>
      <li style={getStyle(1)} onClick={e => setIndex(1)}>1</li>
      <li style={getStyle(2)} onClick={e => setIndex(2)}>2</li>
    </ul>
  )
}
```

在 `App` 组件中点击任意一个 `li` 标签，字体就会变红。

假如我们要新增需求，鼠标移入时颜色变成黄色，那我们怎么做呢？很简单，在每一个 `li` 标签绑定一个 `onMouseEnter` 和 `onMouseLeave` 事件，ok，这也可以接受，那么某天产品经理说：我鼠标在移动时，字体颜色要变蓝，怎么办？

继续在每个 `li` 标签上绑定一些事件，那么越来越多我们需要 `props` 到这个 `li` 中。代码就会变得十分臃肿，props 冗杂。且这个是难以复用的。


## React.Children 

react 最大的优势之一就是组件的可复合性了，组合组件的模式让我们可以编写更加简洁、逻辑严谨的代码。

对于上面的需求，我们可以利用 `React.Children` 提供的 API 来操作 `props.children`， `props.children` 是闭合的，但是 `React.Children` 提供了很相关的 API 来让我们操作 `props.children`。

```jsx
const List = props => {
  const [index, setIndex] = useState(0)
  const newChildren = React.Children.map(props.children, (child, i) => {
    if (!child.type) return child
    return React.cloneElement(child, {
      style: i === index ? { color: 'red' } : null,
      onClick: e => setIndex(i)
    })
  })

  return newChildren
}

const App = props => {
  return (
    <List>
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </List>
  )
}
```

这样减少上下级组件之间 `props` 的传递，将逻辑封装于 `List` 组件中，组件之间通过隐秘的方式进行通信，但这里的隐秘实际上是对 `props` 的操作在一个地方进行管理。


这种模式比较好的把复杂逻辑完全封装起来了，抽象程度更好，比较适合开发组件开发者。针对props的扩展性也比较好，对于使用组件的开发者来说，也比较友好。