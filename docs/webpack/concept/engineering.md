---
title: 前端工程化、模块化、组件化分别是什么
date: 2020-08-18 12:45:21
---

## 工程化

其实就是**一种设计思想**，前端基本的工程化思想就是页面结构、样式、动作分离。

工程化是一种思想而不是某种技术，用做工程的思维看待和开发自己的项目，而不是直接撸起袖子一个页面一个页面开些；要盖一栋大楼，假如我们不进行工程化的考量那就是一上来掂起瓦刀、砖块就开干，直到把大楼垒起来，这样做往往意味着中间会出现错误，要推倒重来或是盖好以后结构有问题但又不知道出现在哪谁的责任甚至会在某一天轰然倒塌。

那我们如果用工程化的思想去做，就会先画图纸、确定结构、确定用料和预算以及工期，另外需要用到什么工种多少人等等，我们会先打地基再建框架再填充墙体这样最后建立起来的高楼才是稳固的合规的，什么地方出了问题我们也能找到源头和负责人。

## 模块化

工程化是一个更高层次的思想，那么**组件化和模块化就是工程思想下相对具体的开发方式**；

**模块化开发，一个模块就是一个实现特定功能的文件，有了模块我们就可以更方便的使用别人的代码，要用什么功能就加载什么模块**。

模块化开发的 4 点好处：

1. 避免变量污染，命名冲突
2. 提高代码复用率
3. 提高维护性
4. 依赖关系的管理

那具体什么是模块化呢？还是举简单的例子,我们要写一个实现 A 功能的 JS 代码,这个功能在项目其他位置也需要用到,那么我们就可以把这个功能看成一个模块采用一定的方式进行模块化编写,既能实现复用还可以分而治之,

同理在写样式的时候,如果我们需要某种特殊的样式,会在很多地方应用,那么我们也可以采用一定的方式进行 CSS 的模块化

具体说来,JS 模块化方案很多有 AMD/CommonJS/UMD/ES6 Module 等,CSS 模块化开发大多是在 less、sass、stylus 等预处理器的 import/mixin 特性支持下实现的

## 组件化

- 页面上每个独立的、可视/可交互区域视为一个组件；
- 每个组件对应一个工程目录，组件所需的各种资源都在这个目录下就近维护；
- 组件具有独立性，因此组件与组件之前可以自由组合；
- 页面只不过是组件的容器，负责组合组件行程功能完成的界面；
- 当不需要某个组件，可以替换或者删除；

**组件化将页面视为一个容器,页面上各个独立部分例如:头部、导航、焦点图、侧边栏、底部等视为独立组件,不同的页面根据内容的需要,去盛放相关组件即可组成完整的页面。**

模块化和组件化的好处就是复用。除了复用还有个好处就是分治，我们可以在不影响其他代码的情况下按需求修改某一独立的模块或是组件；

参考 [浅谈前端工程化、模块化、组件化](https://www.cnblogs.com/angel648/p/11370327.html)