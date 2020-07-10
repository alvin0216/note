---
title: 认识同构
date: 2020-07-10 22:18:59
---

## 实现 React 组件的服务端渲染

`server.js`

```js
import Koa from 'koa'
import React from 'react'
import { renderToString } from 'react-dom/server'

import Home from './Home'

const app = new Koa()

app.use((ctx, next) => {
  const html = renderToString(<Home />)

  ctx.body = html
})

app.listen(1000, () => {
  console.log('http://localhost:1000')
})
```

`Home.js`

```js
import React from 'react'

const Home = () => <button>Home</button>

export default Home
```

至此我们实现了 react 的服务端渲染。

```bash
npm run build
npm run dev
```

:::details webpack 配置与 package.json

`webpack.server.js`

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node', // 打包的是服务器中的代码
  entry: './server.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [nodeExternals()], // 用于排除 node_modules 目录下的代码被打包进去
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader', // 编译 js 文件
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['last 2 versions'] // 兼容所有浏览器中的最后两个版本
                }
              }
            ]
          ]
        }
      }
    ]
  }
}
```

`package.json`

```json
{
  "name": "react-ssr",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@babel/core": "^7.10.4",
    "@babel/preset-env": "^7.10.4",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "koa": "^2.13.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12",
    "webpack-node-externals": "^2.3.0"
  },
  "scripts": {
    "dev": "node build/bundle.js",
    "build": "webpack --config webpack.server.js"
  }
}
```

:::

## 引入同构

我们加入事件绑定试试：

```js
import React from 'react'

const Home = () => <button onClick={e => alert(1)}>Home</button>

export default Home
```

再试一下，你会惊奇的发现，事件绑定无效!那这是为什么呢？原因很简单，`react-dom/server` 下的 `renderToString` 并没有做事件相关的处理，因此返回给浏览器的内容不会有事件绑定。

那怎么解决这个问题呢？

这就需要进行同构了。所谓同构，通俗的讲，**就是一套 React 代码在服务器上运行一遍，到达浏览器又运行一遍。服务端渲染完成页面结构，浏览器端渲染完成事件绑定。**

那如何进行浏览器端的事件绑定呢？

唯一的方式就是让浏览器去拉取 JS 文件执行，让 JS 代码来控制。于是服务端返回的代码变成了这样:
