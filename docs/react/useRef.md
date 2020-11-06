---
title: Ref
date: 2019-12-31 11:29:30
---

## useRef

### 获取 DOM 元素的节点

```jsx
function App(props) {
  const inputRef = useRef(null)
  const handleClick = e => inputRef.current.focus()
  return (
    <>
      <input type='text' ref={inputRef} />
      <button onClick={handleClick}>focus</button>
    </>
  )
}
```

> 获取子组件的 ref 用法与上面 👆 一致，但是只有 `Class Compontent` 才有 `ref`。 `ref.current` 即为实例, 这里不举例

### 存储可变的数据

在 `Class Component` 中我们可以用 `this.xxx` 用来存储一些数据 例如定时器的实例，以免在 `render` 之后重置数据, 在 `Function Compontent` 中我们抑或可以使用 `ref` 记录可变的数据。

```jsx
function App(props) {
  const flag = useRef(false)
  const [count, setCount] = useState(0)

  const handleClick = e => {
    flag.current = true
  }
  console.log(flag.current)
  return (
    <>
      <button onClick={e => setCount(prev => prev + 1)}>count: {count}</button>
      <button onClick={handleClick}>changeFlag</button>
    </>
  )
}
```

点击 `changeFlag` 后 在下次的 `render` 中 `flag.current` 任然是 `true`。而不会被重置！

我们可以使用这个属性去获取上一轮的 `props` 或者 `state`, 这里可以封装成私有的 `hooks`

```jsx
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function App(props) {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  console.log(`prevCount: ${prevCount}, currentCount: ${count}`)
  return <button onClick={e => setCount(prev => prev + 1)}>count: {count}</button>
}
```

在进行一次 `setCount` 之后才给 `prevCount` 赋值。

### useImperativeHandle

> `useImperativeHandle(ref, createHandle, [inputs])`
>
> 自定在使用 ref 时，公开给父组件的实例值，必须和 `forwardRef` 一起使用。

```jsx
function MyInput(props, ref) {
  const inputRef = useRef()

  // useImperativeHandle 必须和 forwardRef 一起使用
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
    ele: inputRef.current
  }))

  return <input type='text' ref={inputRef} />
}

const Input = React.forwardRef(MyInput)

function App(props) {
  const inputRef = useRef(null)

  function handleClick(e) {
    console.log(inputRef.current.ele)
    inputRef.current.focus()
  }
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={handleClick}>onClick</button>
    </>
  )
}
```
