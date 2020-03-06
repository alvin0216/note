---
title: React 坑点记录
date: 2019-11-31 14:45:40
---

## 记录编码过程中遇到的坑点

### 修改 key 值会摧毁组件

```jsx
const Demo = props => {
  useEffect(() => {
    return () => console.log('demo was destroyed')
  }, [])
  return null
}

const App = props => {
  const [key, setKey] = useState(0)
  return (
    <>
      <Demo key={key} />
      <button onClick={e => setKey(prev => prev + 1)}>update key</button>
    </>
  )
}
```
