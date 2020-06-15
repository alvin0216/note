---
title: 理解作用域：解决变量提升问题
date: 2020-06-15 09:19:25
---

通过上一节我们知道 JavaScript 代码的执行流程，第一步就是创建 <span class='orange'>执行上下文</span> 和可执行代码。

其中执行上下文中存在着

1. **变量环境 (Viriable Environment)**：用于存放变量提升的内容。
2. **词法环境 (Lexical Environment)**：Js 引擎内部用来跟踪标识符和特定变量之间的映射关系。又称之为<span class='orange'>作用域</span>。

本节主要讲 `var` 的产生的变量提升缺陷以及为何引入 `let` `const`，以便梳理作用域相关知识。

## 变量提升所带来的问题

1. 变量容易在不被察觉的情况下被覆盖掉

```js
var myname = '极客时间'
function showName() {
  console.log(myname) // undefined
  if (0) {
    var myname = '极客邦'
  }
  console.log(myname) // undefined
}
showName()
```
