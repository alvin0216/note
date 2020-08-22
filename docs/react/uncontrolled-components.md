---
title: 受控组件与非受控组件
date: 2020-08-22 17:58:15
---

> 在大多数情况下，我们推荐使用 受控组件 来处理表单数据。**在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。**

在 React 中，所谓受控组件和非受控组件，是针对表单而言的。

- **受控组件** <Badge vertical='middle' text='React 操作表单'  />

在表单上会绑定 `value`，如果不加 `onChange`方法 react 会报警告。

---

- **非受控组件** <Badge vertical='middle' text='DOM 操作表单' type='warning' />

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，**你可以 使用 ref 来从 DOM 节点中获取表单数据**。

在 HTML 中，`<input type="file">` 可以让用户选择一个或多个文件上传到服务器，或者通过使用 File API 进行操作。

在 React 中，`<input type="file" /`> 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。

---

非受控组件可能会发生不可预料的错误：

```jsx
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

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/key.gif)
