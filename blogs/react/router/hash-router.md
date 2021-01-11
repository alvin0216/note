---
title: 实现 HashRouter
date: 2020-07-25 16:51:46
sidebar: 'auto'
tags:
  - React Router
categories:
  - React
---

## 前端路由

前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新。目前单页面使用的路由就只有两种实现方式

| hash 模式                                                              | history 模式                                                       |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![](https://gitee.com/alvin0216/cdn/raw/master/images/hash-router.png) | ![](https://gitee.com/alvin0216/cdn/raw/master/images/history.png) |

<Badge text='hash 路由' />

`www.test.com/#/` 就是 `Hash URL`，当 `#` 后面的哈希值发生变化时，不会向服务器请求数据，可以通过 `hashchange` 事件来监听到 URL 的变化，从而进行跳转页面。

举个例子：

我们知道 a 标签有一个 href 属性，如果是哈希路由就不会引发页面的刷新

```html
<a href="#/a">页面A</a>
<a href="#/b">页面B</a>

<script>
  window.addEventListener('hashchange', () => {
    console.log(window.location.hash);
  });
</script>
```

![](https://gitee.com/alvin0216/cdn/raw/master/images/hash-router.gif)

## HashRouter

> [react-router HashRouter](https://reactrouter.com/web/api/HashRouter) 原理是基于监听哈希的变化，通过匹配不同的路径去返显不同的组件。

如何监听变化呢？在 `HashRouter.js` 中实现监听：

```jsx
useEffect(() => {
  window.location.hash = window.location.hash || '/' // 默认添加 hash
   window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [onHashChange])
}
```

再通过 `React.Context` 的发布订阅机制，通知各个 `Consumer` 路由状态的更新

```jsx
const [location, setLocation] = useState({
  hash: '',
  pathname: window.location.hash.slice(1) || '/', // 删除 #
  search: ''
})

// HashRouter
<Context.Provider value={{ location }}>
  {props.children}
</Context.Provider>
```

Route 组件：

```jsx
const { path, component: Component } = props

<Context.Consumer>
  {state => {
    const { pathname } = state.location
    if (pathname === path) {
      return <Component />
    }
    return null
  }}
</Context.Consumer>
```

以上就是 `HashRouter` 基本运作了。

## 目录

接下来就是如何实现了，用 `create-react-app` 创建项目，代码目录如下：

```bash
├── index.js          # 主入口
└── react-router-dom  # react-router-dom
    ├── HashRouter.js # 路由的父组件 Provider 要放在这里
    ├── Link.js       # 导航组件，通过 history.push 方法实现
    ├── Redirect.js   # 重定向组件 在 Switch 包裹的组件中，如果路由匹配不到则重定向到某个路径
    ├── Route.js      # Route 可以根据路由匹配 返显组件
    ├── Switch.js     # Switch 组件，路由匹配中就只显示那个路由的组件
    ├── context.js    # context 组件
    └── index.js      # 导出各个文件
```

其中 `react-router-dom/index.js` 如下

```js
import HashRouter from './HashRouter';
import Route from './Route';
import Link from './Link';
import Redirect from './Redirect';
import Switch from './Switch';

export { HashRouter, Route, Link, Redirect, Switch };
```

其中 `react-router-dom/context.js` 如下

```js
import React from 'react';

let Context = React.createContext();

export default Context;
```

## 实现步骤

### 实现 HashRouter 和 Route 切换路由

主入口文件 `index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from './react-router-dom';

const Home = () => <h2>home</h2>;
const User = () => <h2>user</h2>;
const Profile = () => <h2>profile</h2>;

const App = (
  <HashRouter>
    <Route path='/home' component={Home} />
    <Route path='/user' component={User} />
    <Route path='/profile' component={Profile} />
  </HashRouter>
);
```

所以我们需要定义这几个属性

先看看 `HashRouter`，在路由的父组件中监听路由变化，并且自动给路由带上 `hash`

```jsx
import React, { useEffect, useState } from 'react';
import Context from './context';

const HashRouter = props => {
  const [location, setLocation] = useState({
    hash: '',
    pathname: window.location.hash.slice(1) || '/', // 删除 #
    search: ''
  });

  useEffect(() => {
    window.location.hash = window.location.hash || '/'; // 默认添加 hash

    // 监听 hash 值变化
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  function onHashChange() {
    setLocation({ ...location, pathname: window.location.hash.slice(1) || '/' });
  }

  return <Context.Provider value={location}>{props.children}</Context.Provider>;
};

export default HashRouter;
```

接着实现 `Route` 组件：

```js
import React, { useEffect, useState } from 'react';
import Context from './context';

const Route = props => {
  const { path, component: Component } = props;

  return (
    <Context.Consumer>
      {state => {
        const { pathname } = state.location;
        return pathname === path ? <Component /> : null;
      }}
    </Context.Consumer>
  );
};

export default Route;
```

`Route` 主要做了什么?

- 通过 `context` 取到 `location` 的信息，根据 `location` 的 `pathname` 去匹配路径，匹配成功则返显组件。
- 而路由变化在 `HashRouter` 监听，每次变化都通过 `context` 通知 `Consumer`，这样子就做到了路由的切换了！！

然而还有问题，那就是路由的匹配问题。

比如匹配路由 `/home` ，应该包含 `/home?age=1`、`/home/aaa`、`/home#123` 等，上面的方式需要全等于才可以匹配中路由。所以我们要对 `Route` 路由进行改造。

### Route 路由匹配改造

实现

```jsx
<Route path='/home' component={Home} />
<Route path='/home/123' component={Home} />
```

判断路径的方式，用 `===` 或者 `includes` 都不太合适，我们需要根据 `path` 实现一个正则，通过正则匹配路由。

借助 `path-to-regexp` 这个包去生成我们需要的正则。比如

```js
let { pathToRegexp } = require('path-to-regexp');

let reg = pathToRegexp('/home', [], { end: false });

console.log(reg); // /^\/home(?:[\/#\?](?=[]|$))?(?=[\/#\?]|[]|$)/i

console.log(reg.test('/home/1/2/3')); // true
console.log(reg.test('/home1/1/2/3')); // false

let reg2 = pathToRegexp('/home', [], { end: true });

console.log(reg2.test('/home/1/2/3')); // false
console.log(reg.test('/home')); // true
```

我们改造一下 `Route` 组件：

```jsx {10}
import React, { useEffect, useState } from 'react';
import Context from './context';

const Route = props => {
  const { path, component: Component, extract = false } = props;

  return (
    <Context.Consumer>
      {state => {
        let reg = pathToRegexp(path, [], { end: extract });
        let result = pathname.match(reg);

        return result ? <Component /> : null;
      }}
    </Context.Consumer>
  );
};

export default Route;
```

其中 `extract` 是严格匹配的意思，比如

```jsx
<Route path='/home/123' extract component={Home} />
<Route path='/home' component={Home} />
```

匹配中 `/home/123` 就不会连 `/home` 也匹配中的意思

### 实现 Link 组件

```jsx
<Link to='/home'>home</Link>
```

代码也很简单需要借助 `history.push` 这个 API

```jsx
import React, { useEffect, useState } from 'react';
import Context from './context';

const Link = props => {
  const { to } = props;

  return (
    <Context.Consumer>
      {state => {
        return <a onClick={e => state.history.push(to)}>{props.children}</a>;
      }}
    </Context.Consumer>
  );
};

export default Link;
```

而 `history` 则是从父组件的 `context` 传递来的，所以还要改造一下 `HashRouter` 组件：

```js
const HashRouter = props => {
  //...
  const value = {
    location,
    history: {
      push(to) {
        window.location.hash = to;
      }
    }
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
```

### 实现 Redirect 和 Switch

`Redirect` 比较简单，重定向到 `props` 传入的路由地址即可。这里既然用了 `hooks` ，也不用之前的 `reder props` 的写法了：

```jsx
import React, { useContext } from 'react';
import Context from './context';

const Redirect = props => {
  const { history } = useContext(Context);
  history.push(props.to);
  return null;
};

export default Redirect;
```

此时 `index.js` 为

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';

const Home = props => {
  console.log(props);
  return <h2>home</h2>;
};
const User = () => <h2>user</h2>;
const Profile = () => <h2>profile</h2>;
const NotFound = () => <h2>NotFound</h2>;

const App = props => {
  return (
    <HashRouter>
      <nav>
        <Link to='/home'>home</Link> ---
        <Link to='/user'>user</Link> ---
        <Link to='/profile'>profile</Link>
      </nav>
      <Route path='/home' extract component={Home} />
      <Route path='/user' component={User} />
      <Route path='/profile' component={Profile} />
      <Route path='/404' component={NotFound} />
      <Redirect to='/404' />
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

此时发现不管输入什么地址都会重定向到 `404` 页面。这时候 `Switch` 的作用出来了，只要匹配中路由，后面的组件将不再渲染。

```jsx
<Switch>
  <Route path='/home' extract component={Home} />
  <Route path='/user' component={User} />
  <Route path='/profile' component={Profile} />
  <Redirect to='/404' />
</Switch>
```

`Switch` 中只需要对 `props.children` 进行操作即可：

```js
import React, { useContext } from 'react';
import Context from './context';
import { pathToRegexp } from 'path-to-regexp';

const Switch = props => {
  const { location } = useContext(Context);
  const pathname = location.pathname;

  for (let i = 0; i < props.children.length; i++) {
    const child = props.children[i];
    const path = child.props.path || '';
    const reg = pathToRegexp(path, [], { end: false });

    if (reg.test(pathname)) {
      return child;
    }
  }

  return null;
};

export default Switch;
```

对 `props.children` 遍历，符合条件的路由则返回即可。

### 给 Route 中的 component 传递属性

在 Route.js 中，返回的组件方式为

```js
return result ? <Component /> : null;
```

此时并不能在 `Home` 组件等获取到属性，而 `react-router-dom` 是会赋予它属性的

我们可以打印看看 `Home` 的 `props`，这些是 `react-router-dom` 赋予的路由属性:

![](https://gitee.com/alvin0216/cdn/raw/master/images/router-props.png)

因此 我们再次改造 `Route.js`

```js
let comProps = {
  location: state.location,
  history: state.history
};

return result ? <Component {...comProps} /> : null;
```

### 实现参数匹配 /:id

还有一种路由匹配方式，比如 `/list/:type`, 分别获取不同的路由，其他组件可以通过 `props.match.params` 获取路由的参数。让我们实现它：

看看 `path-to-regexp` 是如何匹配参数的：

```js
let { pathToRegexp } = require('path-to-regexp');

let reg = pathToRegexp('/list/:type', [], { end: true });

let pathname = '/list/1';

console.log(pathname.match(reg)); // [ '/list/1', '1', index: 0, input: '/list/1', groups: undefined ]

let reg2 = pathToRegexp('/list/:type/:id', [], { end: true });

console.log('/list/1/abc'.match(reg2));
// [
//   '/list/1/abc',
//   '1',
//   'abc',
// ]
```

修改第二个参数：

```js
let { pathToRegexp } = require('path-to-regexp');

let keys = [];
let reg2 = pathToRegexp('/list/:type/:id', keys, { end: true });

let result = '/list/1/abc'.match(reg2);
console.log(result);
// [
//   '/list/1/abc',
//   '1',
//   'abc',
// ]

console.log(keys);
// [
//   {
//     name: 'type',
//     prefix: '/',
//     suffix: '',
//     pattern: '[^\\/#\\?]+?',
//     modifier: ''
//   },
//   {
//     name: 'id',
//     prefix: '/',
//     suffix: '',
//     pattern: '[^\\/#\\?]+?',
//     modifier: ''
//   }
// ]

const [url, ...values] = result;
// url '/list/1/abc'
// values: [ '1', 'abc' ]
```

我们需要做到的是如何组成 `params = { type: 1, id: abc }`

```js
let { pathToRegexp } = require('path-to-regexp');

let keys = [];
let reg2 = pathToRegexp('/list/:type/:id', keys, { end: true });

let [url, ...values] = '/list/1/abc'.match(reg2);

console.log(values); // [ '1', 'abc' ]

const keyList = keys.map(item => item.name); // [ 'type', 'id' ]

// 采用 reduce
const params = keys.reduce((obj, item, idx) => {
  const key = item.name;
  obj[key] = values[idx];
  return obj;
}, {});

console.log('params', params); // params2 { type: '1', id: 'abc' }
```

改造 `Route` 将结果赋予上去：

```js
import React from 'react';
import Context from './context';
import { pathToRegexp } from 'path-to-regexp';

const Route = props => {
  const { path, component: Component, extract = false } = props;

  return (
    <Context.Consumer>
      {state => {
        // 也可以使用 useContext
        const { pathname } = state.location;
        let keys = [];
        // extract 严格匹配
        let reg = pathToRegexp(path, keys, { end: extract });
        let result = pathname.match(reg);
        let [url, ...values] = result || [];

        let comProps = {
          location: state.location,
          history: state.history,
          match: {
            params: keys.reduce((obj, item, idx) => {
              const key = item.name;
              obj[key] = values[idx];
              return obj;
            }, {})
          }
        };

        return result ? <Component {...comProps} /> : null;
      }}
    </Context.Consumer>
  );
};

export default Route;
```

关键的 API 都实现了，其余的 `withRouter` 等也是同样的道理，这里也不再实现了。

完结撒花 🎉。源代码路径为：[alvin-code-store](https://github.com/alvin0216/alvin-code-store/tree/master/react-router)
