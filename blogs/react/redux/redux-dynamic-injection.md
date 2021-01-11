---
title: Redux 依赖注入
date: 2020-07-15 13:00:28
sidebar: 'auto'
tags:
  - React
  - redux
categories:
  - React
---

当 `redux` 过大时需要考虑如何去优化以及维护数据，方法其实很简单，利用 `webpack` 的 `code-splitting` 异步加载来注入 reducer。

```jsx
import React, { Component } from 'react';

export const asyncComponent = importComponent =>
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { component: null };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component });
    }

    render() {
      const RenderComponet = this.state.component;
      return RenderComponet && <RenderComponet {...this.props} />;
    }
  };

export default asyncComponent;
```

利用的 `API` 也即 `store.replaceReducer`

```js
/**
 * 动态注入 reducer
 * @param {String} name - module name
 * @param {Function} reducer
 */
export function injectAsyncReducer(name, reducer) {
  if (Object.hasOwnProperty.call(store.asyncReducers, name)) return; // 如果存在 则不注入

  store.asyncReducers[name] = reducer;
  store.replaceReducer(combineReducers(store.asyncReducers));
}
```

页面：

```JSX
<Route exact path='/' component={lazy(() => import('./home'))} />
```

具体代码 略。

参考 [Redux store 的动态注入](https://zhuanlan.zhihu.com/p/29030226?from_voters_page=true)
