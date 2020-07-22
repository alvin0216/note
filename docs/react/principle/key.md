---
title: react 中的 key
date: 2020-07-22 09:57:55
---

## 为什么要使用 key

react diff 算法根据 key 来决定是销毁重新创建组件还是更新组件，原则是：

- key 相同，组件有所变化，react 会只更新组件对应变化的属性。
- key 不同，组件会销毁之前的组件，将整个组件重新渲染。

## 使用 index 做 key 存在的问题

在使用非受控组件时，使用了 index 作为 key 时可能会发生问题：

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Item = props => (
  <li>
    {props.title}
    <input />
  </li>
)

const App = () => {
  const [list, setList] = useState(['aaa', 'bbb', 'ccc'])

  function updateList() {
    setList(['bbb', 'aaa', 'ccc'])
  }
  return (
    <>
      <ul>
        {list.map((item, index) => (
          <Item key={index} title={item} />
        ))}
      </ul>
      <button onClick={updateList}>update</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

![react-key](https://gitee.com/alvin0216/cdn/raw/master/img/react/key.gif)

---

- [react 中 key 的正确使用方式](https://segmentfault.com/a/1190000017152570)
