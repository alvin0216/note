---
title: setState 异步？
date: 2021-06-29 10:54:23
sidebar: auto
tags:
  - React
categories: React
---

```jsx
class App extends Component {
  state = { val: 0 };

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 0
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 0
    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 2
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 3
    });
  }

  render() {
    return null;
  }
}
```

- **由 React 控制的事件处理程序，以及生命周期函数调用 setState 不会同步更新 state 。**
- **React 控制之外的事件中调用 setState 是同步更新的。比如原生 js 绑定的事件，setTimeout/setInterval、Promise.resolve 等。**

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/setState.png)

- [React 中 setState 是一个宏任务还是微任务？](https://juejin.cn/post/6992006476558499853?from=main_page)
- [React 架构的演变 - 从同步到异步](https://blog.shenfq.com/posts/2020/React%20%E6%9E%B6%E6%9E%84%E7%9A%84%E6%BC%94%E5%8F%98%20-%20%E4%BB%8E%E5%90%8C%E6%AD%A5%E5%88%B0%E5%BC%82%E6%AD%A5.html)
