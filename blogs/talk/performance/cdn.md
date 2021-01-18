---
title: 什么是 CDN？
date: 2019-09-28 17:00:28
sidebar: 'auto'
tags:
  - CDN
  - 性能优化
categories:
  - 性能优化
  - 技术漫谈
---

:::tip cdn 原理

CDN 的工作原理是将源站的资源缓存到位于全球各地的 CDN 节点上，用户请求资源时，就近返回节点上缓存的资源，而不需要每个用户的请求都回您的源站获取，避免网络拥塞、缓解源站压力，保证用户访问资源的速度和体验。

:::

这个估计大家都明白，因为打包后的产物本身也是上传到 CDN 的。但是我们要做的是将体积较大的第三方依赖单独拆出来放到 `CDN` 上，这样这个依赖既不会占用打包资源，也不会影响最终包体积。

如果一个依赖有直接打包压缩好的单文件 CDN 资源，就可以直接使用。

按照官方文档的解释，如果我们想引用一个库，但是又不想让 `webpack` 打包，并且又不影响我们在程序中以 `import`、`require` 或者 `window/global` 全局等方式进行使用，那就可以通过配置 `externals`。

`externals` 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。

首先将 CDN 引入的依赖加入到 `externals` 中。

![](https://gitee.com/alvin0216/cdn/raw/master/images/cdn1.png)

然后借助 html-webpack-plugin 将 CDN 文件打入 html:

![](https://gitee.com/alvin0216/cdn/raw/master/images/cdn2.png)

这里有一点需要注意，在 html 中配置的 CDN 引入脚本一定要在 body 内的最底部，因为：

- 如果放在 body 上面或 header 内，则加载会阻塞整个页面渲染。
- 如果放在 body 外，则会在业务代码被加载之后加载，模块中使用了该模块将会报错。

参考 [动动手，将网页加载速度提升 5 倍](https://mp.weixin.qq.com/s/7q5pgC5mBmjgGJ0wlBIqww)
