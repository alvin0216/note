---
title: Typescript 在 React 中的实践
date: 2021-01-01
sidebar: 'auto'
tags:
  - Typescript
categories:
  - Typescript
---

- [typescript-cheatsheets/react](https://github.com/typescript-cheatsheets/react)
- [react-typescript-cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/)

## Hooks

### useState

如果你的默认值已经可以说明类型，那么不用手动声明类型，交给 TS 自动推断即可：

```ts
const [val, toggle] = React.useState(false); // 自动推断为 boolean
```

如果初始值是 null 或 undefined，那就要通过泛型手动传入你期望的类型。

```ts
const [user, setUser] = React.useState<IUser | null>(null);

// later...
setUser(newUser);

// 需要访问 user 上的属性可以通过可选链的方式
const name = user?.name;
```

### useEffect

比较常见的一个情况是，我们的 `useEffect` 需要执行一个 async 函数，比如：

```ts
// ❌
// Type 'Promise<void>' provides no match
// for the signature '(): void | undefined'
useEffect(async () => {
  const user = await queryUser();
  setUser(user);
}, []);
```

推荐这样改写：

```ts
useEffect(() => {
  const getUser = async () => {
    const user = await queryUser();
    setUser(user);
  };
  getUser();
}, []);
```

### useReducer

需要用 [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) 来标注 Action 的类型。

```ts
const initialState = { count: 0 };

type ACTIONTYPE = { type: 'increment'; payload: number } | { type: 'decrement'; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement', payload: '5' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+</button>
    </>
  );
}
```

### useRef

这个 `Hook` 在很多时候是没有初始值的，这样可以声明返回对象中 `current` 属性的类型：

```ts
const TextInputWithFocusButton = () => {
  const inputEl = React.useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputEl.current?.focus();
  };
  return (
    <>
      <input ref={inputEl} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};
```

### useImperativeHandle

推荐使用一个自定义的 `innerRef` 来代替原生的 ref，否则要用到 `forwardRef` 会搞的类型很复杂。

```ts
interface DemoProps {
  innerRef?: React.Ref<{ scrollToItem(): void }>;
}

const Demo: React.FC<DemoProps> = ({ innerRef }) => {
  useImperativeHandle(innerRef, () => ({
    scrollToItem() {}
  }));

  return null;
};
```

结合刚刚 `useRef` 的知识，使用是这样的：

```ts
const App = () => {
  const demoRef = useRef<{ scrollToItem(): void }>(null);

  // 调用 ==> demoRef.current?.scrollToItem();
  return <Demo innerRef={demoRef} />;
};
```

:::details 最佳实践 导出 ref 的类型声明

```ts
export type DemoRef = { scrollToItem(): void }; // 导出
interface DemoProps {
  innerRef?: React.Ref<DemoRef>;
}

const Demo: React.FC<DemoProps> = ({ innerRef }) => {
  useImperativeHandle(innerRef, () => ({
    scrollToItem() {}
  }));

  return null;
};
```

引入：

```ts
const App = () => {
  const demoRef = useRef<DemoRef>(null);

  // 调用 ==> demoRef.current?.scrollToItem();
  return <Demo innerRef={demoRef} />;
};
```

:::

### 自定义 Hooks

如果你想仿照 useState 的形式，返回一个数组给用户使用，一定要记得在适当的时候使用 `as const`，标记这个返回值是个常量，告诉 TS 数组里的值不会删除，改变顺序等等……
否则，你的每一项都会被推断成是「所有类型可能性的联合类型」，这会影响用户使用。

```ts
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  // ✅ 加了 as const 会推断出 [boolean, typeof load]
  // ❌ 否则会是 (boolean | typeof load)[]
  return [isLoading, load] as const;
}
```

:::details 使用 useLoading

```ts
const App = () => {
  const [loading, query] = useLoading();

  const onButtonClick = () => {
    let promise = new Promise(resolve =>
      setTimeout(() => {
        resolve(1);
      }, 2000)
    );

    query(promise);
  };

  if (loading) return <span>loading...</span>;
  return <button onClick={onButtonClick}>click</button>;
};
```

:::

## React.FC

```tsx
interface AppProps = { message: string };

const App = ({ message }: AppProps) => <div>{message}</div>;
```

利用 `React.FC` 内置类型的话，不光会包含你定义的 `AppProps` 还会自动加上一个 `children` 类型，以及其他组件上会出现的类型：

```ts
// 等同于
AppProps & {
  children: React.ReactNode
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

// 使用
interface AppProps = { message: string };

const App: React.FC<AppProps> = ({ message, children }) => {
  return (
    <>
     {children}
     <div>{message}</div>
    </>
  )
};

```

用这个类型可以避免我们重复定义 `children`、`propTypes`、 `contextTypes`、 `defaultProps`、`displayName` 的类型。

:::details FC 声明

```ts
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
  children: React.ReactNode;
}
```

:::

## React 相关类型

**基础类型**

```ts
interface BaseProps {
  count: number;
  disabled: boolean;
  names: string[];
  status: 'waiting' | 'success';
  component: React.ReactNode; // 组件

  style?: React.CSSProperties; // ✅ 推荐 在内联 style 时使用

  // ✅ 推荐原生 button 标签自带的所有 props 类型
  // 也可以在泛型的位置传入组件 提取组件的 Props 类型
  buttonProps: React.ComponentProps<'button'>;

  // ✅ 推荐 利用上一步的做法 再进一步的提取出原生的 onClick 函数类型
  // 此时函数的第一个参数会自动推断为 React 的点击事件类型
  onClickButton：React.ComponentProps<"button">["onClick"];

  // ✅ 推荐 可能你需要传其他的 props
  [prop: string]: any;
}

```

**函数类型**

```ts
interface BaseProps {
  /** 没有参数的函数 不需要返回值 😁 常用 */
  onClick: () => void;

  /** 带函数的参数 😁 非常常用 */
  onChange: (id: number) => void;

  // React 的事件 => 推荐写法
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}
```

| 事件名            | 描述            |
| ----------------- | --------------- |
| `ChangeEvent`     | Change 事件对象 |
| `MouseEvent`      | 鼠标事件对象    |
| `KeyboardEvent`   | 键盘事件对象    |
| `ClipboardEvent`  | 剪切板事件对象  |
| `DragEvent`       | 拖拽事件对象    |
| `TouchEvent`      | 触摸事件对象    |
| `WheelEvent`      | 滚轮事件对象    |
| `AnimationEvent`  | 动画事件对象    |
| `TransitionEvent` | 过渡事件对象    |
