---
title: git 提交规范
date: 2020-09-28 13:00:28
sidebar: 'auto'
tags:
  - 前端工程化
  - git
  - git-commit
categories:
  - 技术漫谈
---

提交类型指定为下面其中一个：

| 类型     | 描述                                                                                 |
| -------- | ------------------------------------------------------------------------------------ |
| build    | 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交                |
| ci       | 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交     |
| docs     | 文档更新                                                                             |
| feat     | 新增功能                                                                             |
| merge    | 分支合并 Merge branch ? of ?                                                         |
| fix      | bug 修复                                                                             |
| perf     | 性能, 体验优化                                                                       |
| refactor | 重构代码(既没有新增功能，也没有修复 bug)                                             |
| style    | 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑) |
| test     | 新增测试用例或是更新现有测试                                                         |
| revert   | 回滚某个更早之前的提交                                                               |
| chore    | 不属于以上类型的其他类型 , 示例： 将表格中的查看详情改为详情                         |

提交信息规范:

```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

每次提交可以包含页眉(header)、正文(body)和页脚(footer)，每次提交必须包含页眉内容

每次提交的信息不超过 100 个字符

详细文档 [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
