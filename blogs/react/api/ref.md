---
title: Ref 的使用
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - React
categories:
  - React
---

## 基本用法

:::: tabs

::: tab 在组件上使用

结合 `useImperativeHandle`, 下例可通过 `demoRef.current.log()` 调用函数

```tsx
import React, { useRef, useImperativeHandle } from 'react';

const Demo: React.FC<any> = React.forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      log() {
        console.log(111);
      }
    }),
    []
  );
  return null;
});

const App: React.FC<{}> = props => {
  const demoRef = useRef<any>(null);

  return <Demo ref={demoRef} />;
};

export default App;
```

:::

::: tab 获取 DOM 元素的节点

```tsx
import React, { useRef } from 'react';

const App: React.FC<{}> = props => {
  const inputRef = useRef < HTMLInputElement > null;

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input type='text' ref={inputRef} />
      <button onClick={handleClick}>click</button>
    </>
  );
};

export default App;
```

:::

::::

class 组件的话通过 `React.createRef()` 去创建即可。

## usePrevious

```jsx
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const App: React.FC<{}> = props => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  console.log(`prevCount: ${prevCount}, currentCount: ${count}`);

  return <button onClick={e => setCount(prev => prev + 1)}>count: {count}</button>;
};
```
