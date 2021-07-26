---
title: 🌞 索引
date: 2021-07-22 09:23:33
sidebar: auto
---

## 命令备忘录

```bash
# 批量删除本地包
git tag -l| awk '/@/ {print $1}' | xargs git tag -d

# 批量删除远程包
git show-ref --tag | awk '{print ":" $2}' | xargs git push origin

# shell 输出时间
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "${time}"
```

## 一些好用的工具

- [幕布 思维导图](https://mubu.com/app)
- [bootcdn](https://www.bootcdn.cn/)

## 一些收藏

- [专有钉钉前端面试指南](https://juejin.cn/post/6986436944913924103)
- [在阿里我是如何当面试官的](https://juejin.cn/post/6844904093425598471)
- [写给中高级前端关于性能优化的 9 大策略和 6 大指标 | 网易四年实践](https://juejin.cn/post/6981673766178783262)
- [web 性能优化（Lighthouse 和 performance）：从实际项目入手，如何监测性能问题、如何解决。](https://juejin.cn/post/6965744691979485197)
- [性能优化到底应该怎么做](https://juejin.cn/post/6962039912392556575)
- [47 张图带你走进浏览器的前世今生！](https://mp.weixin.qq.com/s?__biz=Mzg5MTU5ODYxOA==&mid=2247488538&idx=1&sn=73c4a580de48319c9d23ca71d3e35155&chksm=cfcbb66ff8bc3f7963ca800dc9b7bf2bea12e2ae6240327b6c9da7e8e26428dcce280602a9bd&mpshare=1&scene=1&srcid=0721j3P1PPfGR6MFMF7NaJff&sharer_sharetime=1626832397265&sharer_shareid=6c571175851759869a1aa0675b3936f3#rd)
- [万字干货！详解 JavaScript 执行过程](https://mp.weixin.qq.com/s?__biz=MzkwODIwMDY2OQ==&mid=2247490736&idx=1&sn=b00645ef0303635695dc2e208f2767df&chksm=c0ccc302f7bb4a147d4e0133717c006d1fd160f7b7308f1b6838d1cb42a64b0b8a42d87e4e65&mpshare=1&scene=1&srcid=07224Yswf8I9huzzLqEwAeJA&sharer_sharetime=1626914349023&sharer_shareid=6c571175851759869a1aa0675b3936f3#rd)
- [那些高级/资深的前端是如何回答 JavaScript 面试题的 （一）](https://juejin.cn/post/6971727286856843295)
-

## 写过的 demo

- [实现 commonjs](https://github.com/alvin0216/note/tree/master/.demo/packages/commonJS)
- [github 授权登录](https://github.com/alvin0216/note/tree/master/.demo/packages/github-oauth2)
- [lerna + workspaces](https://github.com/alvin0216/note/tree/master/.demo/packages/lerna-demo)
- [实现 Promise A+](https://github.com/alvin0216/note/tree/master/.demo/packages/my-promise)
- [简单实现 react-router](https://github.com/alvin0216/note/tree/master/.demo/packages/my-react-router)
- [简单实现 react-redux](https://github.com/alvin0216/note/tree/master/.demo/packages/my-redux)
- [react ssr 搭建 demo](https://github.com/alvin0216/note/tree/master/.demo/packages/react-ssr-demo)
- [vdom diff](https://github.com/alvin0216/note/tree/master/.demo/packages/vdom-diff)
- [vite demo](https://github.com/alvin0216/note/tree/master/.demo/packages/vite-ts-demo)
- [webrtc-demo 视频通话](https://github.com/alvin0216/note/tree/master/.demo/packages/webrtc-demo)
- [github action demo](https://github.com/alvin0216/note/tree/master/.demo/packages/github-action-demo)
- [github webhook demo](https://github.com/alvin0216/note/tree/master/.demo/packages/github-webhook-demo)
