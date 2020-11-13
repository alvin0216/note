---
title: 在 React 中的实践
---

- [TypeScript 2.8 下的终极 React 组件模式](https://juejin.im/post/6844903612787720206)
- [[译] 使用 TypeScript 开发 React Hooks](https://juejin.im/post/6854573212374663176)
- [TypeScript 在 React 中使用总结](https://juejin.im/post/6844904112882974728)
- [Setup TypeScript with React](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

## 事件

```tsx
import React, { ChangeEvent, MouseEvent, useRef } from 'react'

const Events: React.FC = props => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    inputRef.current?.focus()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <>
      <input type='text' onChange={handleChange} ref={inputRef} />
      <button onClick={handleClick}>click</button>
    </>
  )
}

export default Events
```

:::note React 事件对象

- `ClipboardEvent`: 剪切板事件对象
- `DragEvent`: 拖拽事件对象
- `ChangeEvent`: Change 事件对象
- `KeyboardEvent`: 键盘事件对象
- `MouseEvent`: 鼠标事件对象
- `TouchEvent`: 触摸事件对象
- `WheelEvent`: 滚轮事件对象
- `AnimationEvent`: 动画事件对象
- `TransitionEvent`: 过渡事件对象

:::

## Form 表单

```tsx
const Events: React.FC = props => {
  const formRef = useRef<HTMLFormElement>(null)

  // React.SyntheticEvent 合成事件
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value // typechecks!
    const password = target.password.value // typechecks!
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type='email' name='email' />
      <input type='submit' value='Log in' />
    </form>
  )
}
```

## Promise

```ts
function getResponse(): Promise<string> {
  return Promise.resolve('alvin')
}
```

或者指定泛型输入：

```tsx
interface IResponse<T> {
  message: string
  result: T
  success: boolean
}

function getResponse(): Promise<IResponse<number[]>> {
  return Promise.resolve({
    message: 'alvin',
    result: [1, 2, 3],
    success: true
  })
}
```

## typeof

```ts
let p = {
  name: 'alvin',
  age: 18,
  list: [1, 2, '3']
}

type Person = typeof p

// Person 会被解析为
interface Person {
  name: string
  age: number
  list: (string | number)[]
}
```

## &

```ts
interface P {
  name: string
}

interface T {
  age: number
}

let s: P & T = {
  name: 'alvin',
  age: 18
}
```
