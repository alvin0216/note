---
title: 什么是执行上下文栈？
date: 2020-06-16 20:31:29
sidebar: 'auto'
tags:
  - Javascript
  - v8 引擎
  - 执行上下文
categories:
  - Javascript
---

## 执行上下文栈的构成

JavaScript 代码的执行流程的第一步就是编译阶段：创建 `执行上下文` 和 `可执行代码`。

::: tip JavaScript 的可执行代码(executable code)的类型有哪些了？

其实很简单，就三种，**全局代码、函数代码、eval 代码**。

:::

当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"**执行上下文(execution context)**"

所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文。

在执行上下文创建好后，JavaScript 引擎会将执行上下文压入栈中。这里列举一个例子：

```js
var a = 2;
function add(b, c) {
  return b + c;
}
function addAll(b, c) {
  var d = 10;
  result = add(b, c);
  return a + result + d;
}
addAll(3, 6);
```

JS 执行代码后产生的执行上下文栈如图所示：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/ec-stack1.png)

- 第一步，创建全局上下文，并将其压入栈底。
- 第二步，是调用 `addAll` 函数。为 `addAll` 创建执行上下文栈并押入栈中。
- 第三步，在 `addAll` 函数中执行了 `add` 函数，为 `add` 创建执行上下文栈并押入栈中。
- 当 `add` 执行完毕并返回时，`add` 函数出栈，以此类推。当整个应用程序结束的时候，栈才被清空。

## 如何在浏览器中查看调用栈

:::: tabs

::: tab 打断点
![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/ec-stack2.png)
:::

::: tab 使用 console.trace() 来输出当前的函数调用关系
![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/ec-stack3.png)
:::

::::
