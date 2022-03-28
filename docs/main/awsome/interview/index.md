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

#

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

<!--

[HTTPS 是什么？加密原理和证书。SSL/TLS 握手过程](https://www.bilibili.com/video/BV1KY411x7Jp?spm_id_from=333.337.search-card.all.click)

## ssl/tsl2

![](https://user-images.githubusercontent.com/34113677/158003021-3b7b9c78-0dab-4644-bc99-bc9853e5eff5.png)

- web `- client hellow ->` server
  - 客户端：我生成一个随机数 A，还有我支持的加密套件有哪些给你知道，当前我用的是 tsl 1.2 版本
- web `<- server hello -` server
  - 服务端：我也生成一个随机数 B，我挑了一个加密套件 咱们使用这个套件进行加密
- web `<- server key exchange -` server
  - 服务端：我给你发个证书还有公钥，你可以用公钥加密
- web `<- server hello done -` server
  - 服务端：通知一下你 我完成啦
- web `- client key exchange ->` server
  - 客户端：检查了一下你的证书是有效的。我在生成了一个随机数 C，用你给我的公钥加密 发给你了
- 服务端：我拿到了第三个随机数，我们使用同样的加密方式生成我们的会话密钥。以后咱们使用这个密钥进行通信吧
- 客户端：好的，会话密钥只应用于当前会话，咱们传输很安全了。

## cdn

代理源服务器的相关内容，通过用户请求 ip 去附近的站点拿资源，除此之外还可以做到内容压缩、内容加速、负载均衡等。

[前端必需了解的 CDN 知识](https://juejin.cn/post/6913704568325046279)

## dns 解析

![图片链接](https://user-images.githubusercontent.com/34113677/158003001-9bbe6511-89bf-4e82-901f-fc267cdded51.png)

 -->
