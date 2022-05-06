---
title: 远程组件加载方案实践
date: 2022-05-05 17:22:23
sidebar: auto
tags:
  - 远程组件
categories:
  - 技术漫谈
---

本次分享会涉及到以下几点

1. 远程组件定义
2. UMD 模块规范
3. 远程组件加载方案实现思路和细节
4. systemjs 中 System.import 的丐版实现
5. JS 沙箱能力丐版实现

## 远程组件定义

远程组件，这里指的是加载远程 JS 资源并渲染成组件。

其整体流程应该是：

1. 组件打包为 umd 格式的 js 包以供浏览器使用（后面会介绍 UMD）
2. 上传到 oss ，通过接口或链接进行访问
3. 客户端拿到链接后，执行该文件（也就是 `React`、`Vue` 组件）
4. 将组件利用 `Vue` 中的动态组件或者 `React` 中 `React.createElement` 进行渲染。

其中最核心的是第 3 点和第 4 点，**加载远程组件并渲染内容**，本文也将围绕如何加载提出一些解决方案供大家思考。

## 远程组件应用场景

远程组件的应用场景主要有以下两个特点：

1. 动态性（组件内容可动态更新）
2. 业务解耦（主应用并不关心组件的内容，不捆绑到部署进程中）

举个例子，我们知道一个低代码平台组件越多代表其覆盖的场景也越多，功能也越强大。但是随着组件的增多也会带来项目**体积过大，加载慢**等问题。面临这种情况有处理方式：

1. 不处理：全部引入
2. 懒加载：代码分割、动态组件...
3. 运行时加载：实现一套动态组件机制，仅当组件被使用到时再进行加载，加载后缓存...

```js
// 1. npm 全引入

// 2. 通过懒加载
import React, { Suspense } from 'react';
const Button = React.lazy(() => import('./components/Button'));

<Suspense fallback='loading...'>
  <Button>lazy button</Button>
</Suspense>;

// 3. 通过加载 url 加载，不打包到主应用中
```

通过 url 加载方案的实现方式：

- 微前端
- webpack5 MF（模块联邦）
- umd 加载

## UMD 模块规范

UMD 模块规范是一种兼容浏览器全局变量、AMD 规范、CommonJS 规范的规范。

我们使用 `vite` 将一个 `React` 组件打包为 `UMD` 格式来说明其运作方式。

1. 初始化 vite + react 的项目
2. 修改 `vite.config.ts`

```js
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/Button.tsx'),
      name: 'Button',
      formats: ['umd'],
      fileName: (format) => `Button.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
        },
      },
    },
  },
});
```

这里之所以将 `react` 排除，是因为每个 `React` 组件都需要这个包，如果都将其打进去就会导致包很大（也就是需要将公共依赖排除，并由主应用提供）。

Button.tsx

```tsx
const Button = (props) => {
  return <button {...props}>{props.children || 'default text'}</button>;
};

export default Button;
```

执行构建命令

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/umd.png)

我们在顶部看到一个连续的三元运算符：

1. 如果有 `export` 和 `module` 变量，则表示在 nodejs 环境中，遵循 [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) 规范
2. 如果有 `define` 和` define.amd` 变量，则表示用 [amd](https://github.com/amdjs/amdjs-api/wiki/AMD) 模块规范
3. 否则判断是否有 [globalThis](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 如果没有用 `global` 或者 `self`，这里的 `globalThis` 或者 `self` 在浏览器环境下为 `window`。

我们想要使用这个组件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"></script>
    <script src="./Button.umd.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      console.log(window);
      ReactDOM.render(React.createElement(window.Button), document.getElementById('app'));
    </script>
  </body>
</html>
```

我们就看到界面已经可以正常渲染，然后我们观察 `window` 变量，也有我们挂载的 `React`、`ReactDOM` 以及 `Button` 变量：

也就是说一个 `UMD` 格式的 `JS` 文件，如果以 `script` 标签的方式使用，就是往 `window` 上挂载全局变量，并且会从 `window` 上读取依赖。

## 加载方案讲解

整个动态组件最核心的地方就是**执行 JS 并获取导出的内容**，其目前识别到的有以下四种方案：

- 方案 1：动态 `script` 方案。即获取链接后，动态创建一个 `script` ，拿到变量后再删除此 `script`
- 方案 2：`eval` 方案。即通过链接获取到 JS 纯文本，然后再 `eval` 执行 JS
- 方案 3：`new Function+ sandbox` 方案
- 方案 4：微组件

我们从以下三点评判方案的优劣势：

- 简单程度
- 运行时是否有沙箱能力（JS 沙箱和 CSS 隔离）
- 兼容性

### 方案 1: 动态 script 方案

这个方案整体思路很简单，就是动态创建一个 `script`，加载完成后再删掉（和 `jsonp` 类似）。

`utils/index.js`

```js
export const importScript = (() => {
  // 自执行函数，创建一个闭包，保存 cache 结果
  const cache = {};

  return (url) => {
    // 如果有缓存，则直接返回缓存内容
    if (cache[url]) return Promise.resolve(cache[url]);

    return new Promise((resolve, reject) => {
      // 保存最后一个 window 属性
      const lastWindowKey = Object.keys(window).pop();

      // 创建 script
      const script = document.createElement('script');
      script.setAttribute('src', url);
      document.head.appendChild(script);

      // 监听加载完成事件
      script.addEventListener('load', () => {
        document.head.removeChild(script);
        // 最后一个新增的 key，就是 umd 挂载的，可自行验证
        const newLastWindowKey = Object.keys(window).pop();

        // 获取到导出的组件
        const res = lastWindowKey !== newLastWindowKey ? window[newLastWindowKey] : {};
        const Com = res.default ? res.default : res;

        cache[url] = Com;

        resolve(Com);
      });

      // 监听加载失败情况
      script.addEventListener('error', (error) => {
        reject(error);
      });
    });
  };
})();
```

然后我们就可以用 `React` 或者 `Vue` 的动态组件进行渲染了。这里以 `React` 为例。

1. `main.tsx`

```js
window.React = React;
window.ReactDOM = ReactDOM;
```

之前说过 `UMD` 组件会从 `window` 上读取公共依赖，而我们将 `React` 作为了公共依赖，所以需要将其挂在到 `window` 上。

2. 然后我们需要增加 `UmdComponent.jsx`，其逻辑为：

```js
import { useEffect, useState } from 'react';

import { importScript } from '../utils';

const UmdComponent = ({ url, children, umdProps = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [UmdCom, setUmdCom] = useState(null);

  useEffect(() => {
    importScript(url)
      .then((Com) => {
        // 这里需要注意的是，res 因为是组件，所以类型是 function
        // 而如果直接 setUmdCom 可以接受函数或者值，如果直接传递 setUmdCom(Com)，则内部会先执行这个函数，则会报错
        // 所以值为函数的场景下，必须是 如下写法
        setUmdCom(() => Com);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  if (!url) return null;
  else if (error) return <div>error!!!</div>;
  else if (loading) return <div>loading...</div>;
  else if (!UmdCom) return <div>加载失败，请检查</div>;

  return <UmdCom {...umdProps}>{children}</UmdCom>;
};

export default UmdComponent;
```

验证一下：

```jsx
import UmdComponent from './components/UmdComponent';

const App = () => {
  return (
    <UmdComponent url='/Button.umd.js' umdProps={{ onClick: () => alert(1) }}>
      button
    </UmdComponent>
  );
};
```

就可以看到正确渲染了组件，并且属性可以正常透传。

上述 importScript 只是示例代码 ，不建议用到生产。如果确实有需求，建议使用 [systemjs](https://github.com/systemjs/systemjs)，其 System.import 方法同 importScript 作用一致并且考虑的情况更加全面。

之前也已经说了，此方案会造成全局变量的污染。

### 方案 2：eval 方案

`eval` 方案是指先获取 `JS` 链接的文本内容，然后通过 `eval` 的方式执行，并获取内容。

```js
export const importScript = (() => {
  // 自执行函数，创建一个闭包，保存 cache 结果
  const cache = {};

  return (url) => {
    // 如果有缓存，则直接返回缓存内容
    if (cache[url]) return Promise.resolve(cache[url]);

    // 发起 get 请求
    return fetch(url)
      .then((response) => response.text())
      .then((text) => {
        // 记录最后一个 window 的属性
        const lastWindowKey = Object.keys(window).pop();

        // eval 执行
        eval(text);

        // 获取最新 key
        const newLastWindowKey = Object.keys(window).pop();

        const res = lastWindowKey !== newLastWindowKey ? window[newLastWindowKey] : {};
        const Com = res.default ? res.default : res;

        cache[url] = Com;

        return Com;
      });
  };
})();
```

与方案 1 唯一的不同就是请求方式从 `script` 变成了 `fetch` 然后 `eval`。

此方案仍然没有解决全局变量污染的问题。

### 方案 3：new Function + 沙箱

> 因为在严格模式下不允许 eval 函数，所以我们使用 new Function 函数，两个具体区别，可参考[eval 和 new Function 的区别](https://juejin.cn/post/6844903859274383373)。

这里的沙箱既包含 JS 沙箱又包含 CSS 隔离，但我们这里仅仅为了说明问题，只写一个 JS 沙箱的丐版实现。

我们这里的沙箱的实现方式比较简单，就是通过 `eval + with + proxy`，基本思路是通过代理远程 `JS` 中的 `window` 对象，当增、删时修改一个代理变量，当获取时则读取全局变量。

- 我们首先来 `new Function` 的用法：

```js
window.a = 18;
eval('console.log(a)'); // 18
var fn = new Function('console.log(a)');
fn(); // 18
```

我们看到其效果和 `eval` 相同。

- 然后看一下 [with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with) 的用法：

```js
var obj = { name: 'guo' };

window.name = 'li';

with (obj) {
  console.log(name); // 会先从 obj 上找 name 属性，所以会输出 guo
}
```

`with` 通过包裹一个对象，增加一层作用域链，这样 `name` 变量在向上查找的过程中，发现 `obj` 里面有，就返回了 `obj.name` 的值。

如果我们把 obj 的 name 属性删除后，看看会发生什么？

```js
delete obj.name;
with (obj) {
  console.log(name); // li
}
```

输出结果变成了 `li`，这说明，当在此对象上找不到时，会继续向上级作用域查找，因为上级是全局作用域，所以返回了 `window.name` 的属性值。

- 最后看一下 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 的用法：

```js
var fakeWindow = {};
var proxyWindow = new Proxy(window, {
  // 获取属性
  get(target, key) {
    return target[key] || fakeWindow[key];
  },
  // 设置属性
  set(target, key, value) {
    return (fakeWindow[key] = value);
  },
});
```

可以看到：

```js
proxyWindow.name = 'guo';
console.log(proxyWindow.name, window.name); // guo undefined
```

那么我们看一下最终的解决方案：

```js
function sandboxEval(code) {
  const fakeWindow = {};
  const proxyWindow = new Proxy(window, {
    // 获取属性
    get(target, key) {
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables
      if (key === Symbol.unscopables) return false;

      // 内部可能访问当这几个变量，都直接返回代理对象
      if (['window', 'self', 'globalThis'].includes(key)) {
        return proxyWindow;
      }

      return target[key] || fakeWindow[key];
    },
    // 设置属性
    set(target, key, value) {
      return (fakeWindow[key] = value);
    },
    // 判断属性是否有
    has(target, key) {
      return key in target || key in fakeWindow;
    },
  });
  window.proxyWindow = proxyWindow;

  // 这是一个自执行函数
  // 并且通过 `call` 调用，因为 code 可能通过 this 访问 window，所以通过 call 改变 this 指向
  const codeBindScope = `
    (function (window) {
      with (window) {
        ${code}
      }
    }).call(window.proxyWindow, window.proxyWindow)
  `;

  // 通过 new Function 的方式执行
  const fn = new Function(codeBindScope);
  fn();

  // 获取最后的值
  const lastKey = Object.keys(fakeWindow)[0];
  return lastKey ? fakeWindow[lastKey] : undefined;
}
```

然后我们替换 `importScript` 中的 `eval` 函数即可：

```js
export const importScript = (() => {
  // 自执行函数，创建一个闭包，保存 cache 结果（如果是用打包工具编写就大可不必这样，只需要在文件中定义一个 cache 变量即可）
  const cache = {};
  return (url) => {
    // 如果有缓存，则直接返回缓存内容
    if (cache[url]) return Promise.resolve(cache[url]);

    // 发起 get 请求
    return fetch(url)
      .then((response) => response.text())
      .then((text) => {
        // 沙箱执行
        const res = sandboxEval(text);

        const Com = res.default ? res.default : res;
        cache[url] = Com;

        return Com;
      });
  };
})();
```

我们可以看下效果，改造一下 · 组件：

```js
const Button = (props) => {
  return (
    <button
      onClick={() => {
        window.aa = 123;
      }}>
      {props.children || 'default'}
    </button>
  );
};
```

点击按钮之后，会发现：

```js
window.aa // undefined
window.proxyWindow.aa 123;
```

至此我们已经说明了沙箱的能力，但目前社区还没有一个可独立运行的沙箱库，基本上我们只能从微前端代码中研究。

### 方案 4：微组件

微组件也是通过 url 加载组件，并且具有沙箱、CSS 隔离等功能，具体参见文章：[《微组件实践》](https://www.yuque.com/docs/share/60069dca-a63f-4735-859c-01b3354fe924?#)。
