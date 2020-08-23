---
title: React 事件系统
date: 2020-08-11 22:37:54
---

React 事件系统有两类：合成事件和原生事件。

## 合成事件（SyntheticEvent）

为了性能和跨平台兼容，React 基于 Virtual DOM 实现了一个 `SyntheticEvent` （合成事件）层。

通过 <span class='orange'>事件委托</span> 的方式，将事件监听挂载在 document 上，构造合成事件，并且在内部模拟了一套捕获和冒泡并触发回调函数的机制，实现了自己的一套事件系统。

所有事件都自动绑定到最外层上。如果需要访问原生事件对象，可以使用 `nativeEvent` 属性。可以使用 `stopPropagation` 和 `preventDefault` 来中断它。

```JSX
// 原生 通过 return false 可以组织默认事件
<a href="https://baidu.com" onclick="alert('click'); return false">click</a>

const App = props => {
  const handleClick = e => {
    console.log(e.nativeEvent) // 访问原生事件对象 => MouseEvent {..., type: 'click'}

    e.preventDefault() // 使用 preventDefault 代替 return false 来阻止默认事件

    e.stopPropagation() // stopPropagation 用于停止冒泡
  }
  // 事件并没有绑定在 a 标签上，而是挂载到 document 上
  return <a href='https://baidu.com' onClick={handleClick}>click</a>
}
```

## 合成事件的实现机制

在 React 底层，主要对合成事件做了两件事：事件委派和自动绑定。

- **事件委派**

React 并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。

- **自动绑定**

在 React 组件中，每个方法的上下文都会指向该组件的实例，即**自动绑定 this 为当前组件**。而且 React 还会对这种引用进行缓存，以达到 CPU 和内存的最优化。

## 合成事件和原生事件的混用

### demo1

直接看代码把：

```JSX
// 注意 原生事件需要 removeEventListener，这里为了演示就不加入
const App = props => {
  const $button = useRef(null)

  useEffect(() => {
    $button.current.addEventListener('click', () => console.log('native click'))

    document.addEventListener('click', () => console.log('document click'))
  }, [])

  const handleClick = e => {
    console.log('React click')
  }

  return <button onClick={handleClick} ref={$button}>click</button>
}
```

事件的执行顺序:

```bash
native click
React click
document click
```

React 合成事件与原生事件执行顺序图：

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/events.png)

我们在 `handleClick` 上添加 `e.stopPropagation()` 呢？或者在 button 的原生事件上阻止冒泡呢？

```js
const handleClick = e => {
  console.log('React click')
  e.stopPropagation()
}

// 结果不变 说明 e.stopPropagation() 无法阻止原生事件的冒泡 （注意。可以阻止 React 合成事件中的冒泡）
native click
React click
document click
```

```js
// 添加 false 阻止冒泡
$button.current.addEventListener('click', () => console.log('native click'), false)

// 结果 说明原生事件的停止冒泡，可以阻止合成事件中的冒泡
native click
```

我们可以得出结论：

- DOM 事件冒泡到 document 上才会触发 React 的合成事件，所以 React 合成事件对象的 e.stopPropagation，只能阻止 React 模拟的事件冒泡，并不能阻止真实的 DOM 事件冒泡
- DOM 事件的阻止冒泡也可以阻止合成事件原因是 DOM 事件的阻止冒泡使事件不会传播到 document 上
- 当合成事件和 DOM 事件 都绑定在 document 上的时候，React 的处理是合成事件应该是先放进去的所以会先触发，在这种情况下，原生事件对象的 stopImmediatePropagation 能做到阻止进一步触发 document DOM 事件

### demo2

再来看看 demo2

```jsx
const App = props => {
  useEffect(() => {
    document.addEventListener('click', () => console.log('document click'))
    window.addEventListener('click', () => console.log('window click'))
  }, [])

  const outerClick = e => console.log('outerClick')

  const innerClick = e => {
    console.log('innerClick')
  }

  return (
    <div className='outer' onClick={outerClick}>
      <div className='inner' onClick={innerClick}>
        click
      </div>
    </div>
  )
}
```

答案：

```js
innerClick
outerClick
document click
window click
```

在 `innerClick` 添加 `e.stopPropagation` 呢 答案会是什么？

```js
innerClick
document click
```

- [动画浅析 React 事件系统和源码](https://juejin.im/post/6844903704261312520)
- [React 源码解析(四):事件系统](https://juejin.im/post/6844903538762448910)
