---
title: 面试系列
date: 2021-07-22 09:23:33
sidebar: auto
tags:
  - 面试
categories: 面试
keys:
  - 'c4ca4238a0b923820dcc509a6f75849b'
---

[时隔一年半，我，一个卑微的前端菜鸡，又来写面经了](https://juejin.cn/post/7036581158670303240)

## 阿里 lazada

1. 高并发场景处理方案
2. 动态加载 选择 umd 的原因是什么？（比对模块联邦 微前端）
   1. 除了技术比较新，还有什么考虑点？接入成本那些、不适合当前业务
3. 为什么写原生拖拽 （React dnd 说了不适合、原生可以支持跨框架）
4. 讲一下你的 json schema 是如何设计的。
5. 笔试题
   1. 实现 promise.all ，reject 的时候返回 array
   2. 写事件发布订阅
6. 小程序的 h5 页面不支持小程序某些方法，比如静默授权等，你怎么解决的（没遇到过 实在不行通过微信开发者工具打开）
7. 讲一下 react 源码你看过什么 、讲一下 hooks 的原理，尽量详细点
8. 推送技术更新，你主要做了什么事情？为什么这么做，class 和 hooks 的区别是什么？你怎么思考 hooks 的封装。
9. 为什么离职。下一份工作的期望是什么

## 字节飞书

1. 闭包问题
2. eventloop 题目
3. setTimeout setInterval requestAnimation 区别
4. generator 返回什么
5. 洗牌算法 快排
6. babal ast & React.createElement
7. react 事件机制，为什么，冒泡到哪里
8. setState 产生的更新为什么有时候没作用在 dom 上
9. http 报文结构 & 状态码
10. 项目...

## 飞猪某部门

### 飞猪一面 1h

1. 最近手头的项目 以及遇到的难点是什么？
2. 项目里面用了缓存吗？有做性能优化吗？相关的指标是什么
3. 谈谈前端缓存、http 缓存
4. es6 常用什么语法，谈一下 promise、this
5. 节流和防抖的区别是什么
6. webpack 的原理。loader 和 plugins 的区别是什么
7. css 盒子模型
8. react 高阶组件是什么？class 和 function 组件的区别是什么
9. 前端同源策略、跨域问题

### 飞猪二面 30min + 在线测评

1. 浏览器从 url 到渲染，重绘和回流
2. http 和 https 的区别是什么，http2 有什么不同
3. 做过性能优化吗？了解性能优化指标吗
4. 缓存 强缓存和协商缓存
5. 虚拟 dom 是什么，父子组件的通讯、context
6. DNS 是怎么解析的
7. 304 状态码是什么意思

算法题

1. [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
2. [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
3. 二分法 寻找最接近的数

## Ones

1. BFS 遍历
2. 富文本编辑器会遇到什么坑
3. 瀑布流避免 dom 卡顿，怎么解决
4. React diff
5. 浏览器缓存
6. 组件库搭建思路
7. lerna 遇到什么问题
8. 难点 跨 iframe 拖拽，怎么难

## Mobiuspace

1. Hooks 遇到什么问题
2. Https 传输过程 （分别加密什么）
   1. 对称加密
   2. 非对称加密
   3. 混合加密
3. cdn 原理
4. promise 状态
5. 工程化你们怎么做的
6. 怎么发布部署的
7. 多个 react-hooks 用什么来记录每一个 hooks 的顺序
8. 好维护代码你怎么定义的
9. 解决常见的安全性，有哪些
10. OAuth2 原理
11. ssl 链接过程
12. [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

## 顺丰（据说是很赚钱的组）

1. react 优化 useMemo useCallback
2. react 和 vue 的虚拟 dom 的区别是什么
3. 快排算法 你知道那些数据结构
4. react router 原理
5. pm2 你了解有什么常用的配置
6. nginx 能力
7. http2 新增了什么属性
8. eventloop node 和浏览器的表现有什么不同
9. 前端工程化
10. 灰度发布 怎么实现
11. 性能优化
12. 参考了哪些低代码平台 遇到了什么挑战 相对于有赞 你们有什么不同
13. 离职原因
14. 页面数据量！！！100 多个页面在用，物料 60+，3000 多条页面草稿和模板
15. 个人规划是什么 好的前端开发工程师需要什么
16. 怎么看前端发展
17. 公司项目里面存在什么问题 ？（⚠️ 这里最好答存在什么问题 你怎么去解决的）

## 乐信

1. npm 发生错误之后 ，怎么去监控，怎么去推进，怎么去修复
2. 怎么支持一个脚手架跑 vue2 vue3 （模块联邦、转译代码）
3. 小程序有一个体验码 有什么方式支持多个分支
4. pnpm 了解过吗，和 lerna 有什么区别。
5. 使用 umi 你怎么去设计跨平台的一个能力
6. 错误监控体系怎么做
7. 首屏加载怎么优化 怎么实现秒开
8. webpack 优化
9. 讲一下前端工程化
10. 为什么离职？

## 面试常考算法题

- ✅ [连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/) `easy`
- ✅ [K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/) `hard`
- ✅ [反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/) `medium`
- [数组中的第 K 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
- LRU 缓存机制
- [接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)
- [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
- [最短单词距离](https://leetcode-cn.com/problems/shortest-word-distance/)
- [二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)
- [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)
- 蛇形遍历二叉树
- 合并 K 个排序链表
