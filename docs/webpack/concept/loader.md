---
title: webpack loader
date: 2020-08-25 10:41:35
---

loader 用于对模块的源代码进行转换。比如 `scss、less -> css`，`img -> data URL`

**webpack.config.js**（示例）

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
}
```

## 使用 loader

在你的应用程序中，有三种使用 loader 的方式：

- 配置（推荐）：在 `webpack.config.js` 文件中指定 `loader`。
- 内联：在每个 `import` 语句中显式指定 loader。
- CLI：在 shell 命令中指定它们。

### 配置[Configuration]

`module.rules` 允许你在 webpack 配置中指定多个 loader。 这是展示 loader 的一种简明方式，并且有助于使代码变得简洁。同时让你对各个 loader 有个全局概览：

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { modules: true }
        }
      ]
    }
  ]
}

// 也可以  use: ['style-loader', 'css-loader']
```

loader 的执行顺序为从右到左，比如上面的代码执行为 `css-loader、style-loader`

### 内联

可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 `!` 将资源中的 `loader` 分开。分开的每个部分都相对于当前目录解析。

```js
import Styles from 'style-loader!css-loader?modules!./styles.css'
```

通过前置所有规则及使用 `!`，可以对应覆盖到配置中的任意 `loader`。

选项可以传递查询参数，例如 `?key=value&foo=bar`，或者一个 JSON 对象，例如 `?{"key":"value","foo":"bar"}`。

> 尽可能使用 `module.rules`，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。

### CLI

你也可以通过 CLI 使用 loader：

```bash
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

这会对 `.jade` 文件使用 `jade-loader`，对 `.css` 文件使用 `style-loader` 和 `css-loader`。

## loader 的匹配

首先处理 inlineLoaders，对其进行解析，获取对应的 loader 模块的信息，接下来利用 ruleset 实例上的匹配过滤方法对 webpack.config 中配置的相关 loaders 进行匹配过滤，获取构建这个 module 所需要的配置的的 loaders，并进行解析，这个过程完成后，便进行所有 loaders 的拼装工作，并传入创建 module 的回调中。

![](https://gitee.com/alvin0216/cdn/raw/master/img/webpack/loader-match.png)

当一个 module 被创建之后，使用 loader 去处理这个 module 内容的流程机制。首先我们来总体的看下整个的流程：

![](https://gitee.com/alvin0216/cdn/raw/master/img/webpack/loader-match2.png)

---

- [webpack 官网 - loader](https://www.webpackjs.com/concepts/loaders/)
- [Webpack Loader 高手进阶(三)](https://segmentfault.com/a/1190000018600714)
