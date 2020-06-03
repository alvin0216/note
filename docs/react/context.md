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

```js
import React, { useContext, useReducer } from 'react'

const UserContext = React.createContext()

let initState = {
  name: 'alvin',
  age: 18
}

function reducer(state, action) {
  switch (action.type) {
    case 'INCREASE':
      state = { ...state, age: state.age + 1 }
      return state

    default:
      return state
  }
}

const Content = props => {
  const [state, dispatch] = useContext(UserContext)
  return (
    <>
      <h2>{state.name}</h2>
      <h2>{state.age}</h2>
      <button onClick={e => dispatch({ type: 'INCREASE' })}>add</button>
    </>
  )
}

const App = props => {
  return (
    <UserContext.Provider value={useReducer(reducer, initState)}>
      <Content />
    </UserContext.Provider>
  )
}

export default App
```
