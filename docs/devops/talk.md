---
title: 谈一谈前端工程化
date: 2022-03-29 17:10:52
sidebar: auto
tags:
  - 前端工程化
categories:
  - 前端工程化
---

> 个人可以理解为是工程化为了**提高开发效率、通过系统化、规范化、可度量的方式运于前端开发、构建、部署、性能以及维护等方面。**

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/devops1.png)

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/devops2.png)

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/devops3.png)

## TODO

- [谁能介绍下 web 前端工程化？](https://www.zhihu.com/question/24558375)
- [什么是前端工程化？](https://www.zhihu.com/question/433854153/answer/1713597311)
- [从 0 构建自己的脚手架/CLI 知识体系（万字） 🛠](https://juejin.cn/post/6966119324478079007)

## 整合

- 性能优化

  - 1. 如何检测
    - `page test`: 网站跑分
    - `chrome lighthouse`: 谷歌跑分
    - `chrome performance`: 谷歌火焰图。内存泄漏分析
  - 2. 怎么根据指标优化
    - ...
  - 3. 具体的一个优化方案，优化链路
    - 常见分为编译优化 & 资源加载优化
      - 分析 TTFB，做出 dns 预解析，开启 http2
      - 图片等静态资源放 cdn
      - 公用资源打包 external 放 cdn
      -

---

- 错误监控

  - 错误捕捉方式以及错误类型
    - try catch 常规的错误，但是捕捉不到 promise 错误
    - window.onerror 捕捉异步错误
    - unhandledrejection 捕捉 promise 错误
  - 错误上报方式
    - ...

---

- 前端安全
  - xss、csrf、 ddos、 sql 注入

---

- 低代码平台
  - 技术选型
    - 逻辑编排，模块独立，基于 dsl 协议作为顶层的数据支持
  - 底层原理
  - 遇到的问题
    - 在物料组件增多的方式，如果加载优化以及支持到开放化的能力
    - 本地懒加载部分解决了加载优化问题，但是难以做到业务解耦
    - 动态加载能力（ 技术选型 微前端，mf，umd）
      - 微前端配置成本，但是有一套沙箱隔离
      - mf 只限制 webpack 工具，难以拓展，也有配置成本
      - umd 满足需求
        - script load
        - eval
        - eval + with + proxy
        - webcomponent
