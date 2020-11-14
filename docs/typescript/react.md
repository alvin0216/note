---
title: 在 React 中的实践
---

- [TypeScript 在 React 中使用总结](https://juejin.im/post/6844903684422254606)

## React.FC

```ts
type FC<P = {}> = FunctionComponent<P>

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null
  propTypes?: WeakValidationMap<P>
  contextTypes?: ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
}
```

用这个类型可以避免我们重复定义 `children`、 `propTypes`、 `contextTypes`、 `defaultProps`、`displayName` 的类型。

通常使用在函数组件中：

```tsx
interface BtnProps {
  size: 'large' | 'middle' | 'small'
}

const Button: React.FC<BtnProps> = props => {
  return <button>click</button>
}
```

## 事件处理

```ts
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

## defaultProps

```tsx
const defaultProps = {
  size: 'middle'
}

type BtnProps = typeof defaultProps & { size: 'large' | 'middle' | 'small' }

const Button = ({ size }: BtnProps) => <button>{size}</button>
Button.defaultProps = defaultProps

const Demo: React.FC = props => {
  return <Button />
}
```
