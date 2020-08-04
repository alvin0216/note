---
title: Babel 简易分析
date: 2020-08-04 01:04:00
---

- [AST Explorer](https://astexplorer.net/)：实时编辑看 `AST`，还带高亮
- [Javascript 可视化分词](https://resources.jointjs.com/demos/javascript-ast)

## Babel 都有哪些库

| 名称                                    | 描述                                                                                                                                                                          | 应用                                                                                                                  |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Babylon` -> `@babel/parser`            | Babel 的解析器。最初是从 Acorn 项目 fork 出来的。Acorn 非常快，易于使用，并且针对非标准特性(以及那些未来的标准特性) 设计了一个基于插件的架构。                                | 可以用于接受一段代码，生成一段 Babel AST 格式的 AST                                                                   |
| `Babel-traverse` -> `@babel/traverse`   | 负责维护整棵树的状态，并且负责替换、移除和添加节点                                                                                                                            | 接受一段 AST，然后会遍历该 AST，并且提供了许多钩子来协助我们在遍历到某种 AST 节点类型时进行处理，如 callExpression 等 |
| `Babel-types` -> `@babel/types`         | 一个用于 AST 节点的 Lodash 式工具库， 它包含了构造、验证以及变换 AST 节点的方法。该工具库包含考虑周到的工具方法，对编写处理 AST 逻辑非常有用。                                | 这个库提供了 babel AST 所有的节点类型，用户可以使用这个库构造出一个新的 AST 节点，或者判断某个节点是什么类型等        |
| `Babel-generator` -> `@babel/generator` | Babel 的代码生成器，它读取 AST 并将其转换为代码和源码映射（sourcemaps）。                                                                                                     | 接受一段 AST ，返回一段代码                                                                                           |
| `Babel-template` -> `@babel/template`   | 另一个虽然很小但却非常有用的模块。它能让你编写字符串形式且带有占位符的代码来代替手动编码， 尤其是生成大规模 AST 的时候。在计算机科学中，这种能力被称为准引用（quasiquotes）。 | 将一些变量注入到模版代码中，然后获得注入后代码的 AST                                                                  |

## Babel 工作流程

<span class='pink'>步骤一：解析</span>

使用 `@babel/parser` 解析器进行语法解析，获得 `AST`

<span class='pink'>步骤二：转换</span>

使用 `@babel/traverse` 对 `AST` 进行深度遍历，处理各种 `AST` 节点

遍历过程中，能对每一种节点进行处理，这里可以使用到 `@babel/types` 对节点进行增删查改，或者也可以使用 `@babel/template` 来生成大量 AST 进行修改

<span class='pink'>步骤三：生成</span>

使用 `@babel/generator` 将处理后的 `AST` 转换回正常代码

一句话描述：`input string` -> `@babel/parser parser` -> `AST` -> `@babel/traverse transformer[s]` -> `AST` -> `@babel/generator` -> `output string`
这一点也可以在后文的 简易的 `babel` 代码解析 中看见

## 抽象语法树

![](https://gitee.com/alvin0216/cdn/raw/master/img/webpack/ast.png)

---

- [理解 Babel 插件](https://developer.aliyun.com/article/62671)
- [Babel 插件开发&测试与简易源码分析](https://mp.weixin.qq.com/s/NuSupcY3Dbfku3dK-lo2FQ)
- [深入 Babel，这一篇就够了](https://juejin.im/post/6844903746804137991)
