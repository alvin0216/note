---
title: 面试系列之软问题
date: 2021-07-22 09:23:33
sidebar: auto
tags:
  - 面试
categories: 面试
keys:
  - 'c4ca4238a0b923820dcc509a6f75849b'
---

## 自我介绍

高级面试官通常会在这个环节，对面试者有一个初步的判断，特别是招聘管理岗的时候。 可以拿到信息如下：表达能力，沟通能力、总结能力、个人成就等。 高级面试官会顺着这个环节，无缝切入他要考察的点。

1. 我的基础信息，名字 + 专业 + 毕业时间（工作时间）
2. 我的工作经历 分别做了什么 取得了什么成就
   1. 实习：主要是做物流供应链的 sass 平台和混合开发的 app 产品，vue
   2. 医疗公司：负责**主营业务**的开发，主要是做医疗影像处理相关的业务，（做了哪些成就）在这家公司除常规业务外，主要还是推动了技术的发展，参与组件库的一个设计搭建，怎么推送为什么推动？
   3. 目前：主要负责低代码平台 & 3D 梦想家导购业务相关，还有其他的一些业务。这两个也取得什么成就 & 部门优秀标杆～

## 你为什么离职？

划重点：不要说东家坏话、尽量以个人规划为主！突出自己的想法！

思路：

1. 肯定自己的公司：原公司部门的伙伴都挺聊得来的，主要是我个人渴望一个更大的平台和挑战，尝试一下更有挑战性的工作，开拓自己的眼界、提升自己的能力。换一个环境让自己有更大的突破
2. 肯定面试的公司：贵公司的工作机会是我一直很渴望的，我非常希望有机会能进贵公司工作，和一群优秀的人做优秀的产品！

上家公司很好，走的时候老大也有挽留我，但公司平时项目不多，工作比较清闲，感觉这样下去不行，我想年轻的时候多做一点事，多一些锻炼，所以才提出离职。

## 你手头有 offer 吗？为什么选择我们公司？

有！

综合评估，我觉得贵公司才是我的理想公司，（分析为什么选择）...

为什么选择我们公司？

夸面试官很好聊，了解到这个岗位非常符合我长期的一个发展，也喜欢这个有挑战性的工作。夸贵公司的团队、规模更吸引我。也可以说贵公司也是我比较想进的公司。

能进阿里的人肯定也是及其优秀的，在一个优秀的环境成长 ，相信我的技术成长也会很快

## 你当前的薪资？ 你期待多少工资？以及你为什么可以拿到

1. 现在 base 低：当时是让朋友内推我的，当时对于谈薪这块技巧比较欠缺。
2. 我通过了贵公司的 3 轮技术面试，说明贵公司也比较认可我，有这个能力匹配到这个岗位。
3. 当前我在公司里面，领导比较认可我，我也在季度评优里频频上榜，这边领导很早之前口头承诺给我涨薪了（什么时候说的 什么时候给涨 涨幅是多少！），但是由于个人规划原因，我还是想进更大的平台工作。

## 有什么想问我的？

- 技术面：
  - 前端团队规模？
  - 业务主要是做什么的？我的岗位是负责哪一块内容的
- hr 面：
  - 每年晋升机会、调薪机会

## 考你的项目 常！

做过最满意的项目是什么？

- 项目背景
  - 为什么要做这件事情？
  - 最终达到什么效果？
- 你处于什么样的角色，起到了什么方面的作用？
- 在项目中遇到什么技术问题？具体是如何解决的？
- 如果再做这个项目，你会在哪些方面进行改善？

> 个人答案

低代码的实现方案思考和推进

star 原则：

1. (为什么做这件事) 做低代码的一个背景是公司有接到业务需求，需要提供给商户自定义自己商城页面的能力。说白了就是商户可以通过拖拽的可视化方式来搭建属于自己的页面。
2. (效果）第一个 mvp 版本出来，整个流程就打通了。
3. (我在承担了什么角色) 在这个项目中，从技术选型到整套方案的落地、前端主要是我在负责。
4. (遇到什么的技术问题、个人思考)：后续：如何做到 pass 平台的能力，解耦业务

**思路**

1. 支持远程加载，

技术选型 微前端、webpack5 的 MF 功能、umd 动态加载 怎么选 为什么 原理？

理论上上面的方案都能实现。

为什么选择 umd ？

微前端需要再宿主项目进行配置主应用，子应用，有一定的接入成本。

webpack5 MF 也有接入成本，而且只能用在以 webpack 为构建工具的项目，那么某一天我需要接入 vite 呢？

umd 没有接入成本，（配置成本），更早的实现方案、所以更加稳定

**可能会问的问题**

1. 模块依赖你怎么考虑的？比如组件 A、组件 B 都依赖包 C？
2. 依赖版本不一样的问题怎么解决？比如组件 A 用了 loadsh1.0、组件 B 用了 loadsh2.0？
3. 还有什么优化点