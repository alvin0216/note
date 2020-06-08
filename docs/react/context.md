---
title: React Context
date: 2020-06-03 14:22:36
---

## Class 版本

```js
import React, { Component } from 'react'

// 1. createContext
// 2. <TitleContext.Provider value={xxx}>
// 3. <TitleContext.Consumer>{xxx => xxx} </TitleContext.Consumer>

const TitleContext = React.createContext()

class App extends Component {
  render() {
    return (
      <TitleContext.Provider value={{ title: 'alvin' }}>
        <Title />
      </TitleContext.Provider>
    )
  }
}

class Title extends Component {
  render() {
    return <TitleContext.Consumer>{({ title }) => <h2>{title}</h2>}</TitleContext.Consumer>
  }
}

export default App
```

## Function 版本

```js
import React, { useContext } from 'react'

const UserContext = React.createContext()

const Content = props => {
  const { name } = useContext(UserContext)
  return <h2>{name}</h2>
}

const App = props => {
  return (
    <UserContext.Provider value={{ name: 'alvin' }}>
      <Content />
    </UserContext.Provider>
  )
}
```

### 结合 useReducer

```TS
import React, { useContext, useReducer } from 'react'

const CountContext = React.createContext()

const initialState = 0
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return state + 1
    case 'decrement': return state - 1
    case 'set': return action.count
    default: throw new Error('Unexpected action')
  }
}

const CountProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState)
  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  )
}

const useCount = () => {
  const contextValue = useContext(CountContext)
  return contextValue
}

const Demo = props => {
  const [count, dispatch] = useCount()
  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={e => dispatch({ type: 'increment' })}>increment</button>
      <button onClick={e => dispatch({ type: 'decrement' })}>decrement</button>
    </>
  )
}

const App = props => {
  return (
    <CountProvider>
      <Demo />
    </CountProvider>
  )
}

export default App
```
