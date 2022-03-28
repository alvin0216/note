---
title: JavaScript 代码的执行流程
date: 2020-06-16 20:31:29
sidebar: 'auto'
tags:
  - Javascript
  - v8 引擎
  - 执行上下文
  - 变量提升
categories:
  - Javascript
---

JavaScript 代码是按顺序执行的吗？

显然不是，这里有**变量提升**的概念，在此前，先了解一下 v8 是如何执行一段代码的。

---

从概念的字面意义上来看，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，正如我们所模拟的那样。但，这并不准确。

**实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中。**，一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-run-js.png)

以这段代码为例

```js
showName();
console.log(myname);
var myname = '极客时间';
function showName() {
  console.log('函数showName被执行');
}
```

## （编译阶段）创建执行上下文和可执行代码

为了方便介绍，可以把这段代码分成变量提升部分和可执行代码部分：

:::: tabs

::: tab 变量提升

```js
var myname = undefined;
function showName() {
  console.log('函数showName被执行');
}
```

:::

::: tab 可执行代码

```js
showName();
console.log(myname);
myname = '极客时间';
```

:::

::::

下面我们就可以把 JavaScript 的执行流程细化，如下图所示:

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-context.png)

从上图可以看出，输入一段代码，经过编译后，会生成两部分内容：**执行上下文（Execution context）**和**可执行代码**。

:::tip 执行上下文 （变量环境+词法环境）
JavaScript 执行一段代码时的运行环境：比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。

在执行上下文中存在一个变量环境的对象（Viriable Environment），该对象中保存了变量提升的内容，比如上面代码中的变量 myname 和函数 showName，都保存在该对象中。
:::

你可以简单地把变量环境对象看成是如下结构：

```js
VariableEnvironment:
     myname -> undefined,
     showName ->function : {console.log(myname)
```

了解完变量环境对象的结构后，接下来，我们再结合下面这段代码来分析下是如何生成变量环境对象的。

```js
showName();
console.log(myname);
var myname = '极客时间';
function showName() {
  console.log('函数showName被执行');
}
```

- 第 1 行和第 2 行，由于这两行代码不是声明操作，所以 JavaScript 引擎不会做任何处理；
- 第 3 行，由于这行是经过 var 声明的，因此 JavaScript 引擎将在环境对象中创建一个名为 myname 的属性，并使用 undefined 对其初始化；
- 第 4 行，JavaScript 引擎发现了一个通过 function 定义的函数，所以它将函数定义存储到堆 (HEAP）中，并在环境对象中创建一个 showName 的属性，然后将该属性值指向堆中函数的位置。

这样就生成了变量环境对象。接下来 JavaScript 引擎会把声明以外的代码编译为字节码，你可以类比如下的模拟代码：

```js
showName();
console.log(myname);
myname = '极客时间';
```

好了，现在有了执行上下文和可执行代码了，那么接下来就到了执行阶段了。

## （执行阶段）从变量环境查找与执行

JavaScript 引擎开始执行“可执行代码”，按照顺序一行一行地执行。下面我们就来一行一行分析下这个执行过程：

- 当执行到 showName 函数时，JavaScript 引擎便开始在变量环境对象中查找该函数，由于变量环境对象中存在该函数的引用，所以 JavaScript 引擎便开始执行该函数，并输出“函数 showName 被执行”结果。
- 接下来打印“myname”信息，JavaScript 引擎继续在变量环境对象中查找该对象，由于变量环境存在 myname 变量，并且其值为 undefined，所以这时候就输出 undefined。
- 接下来执行第 3 行，把“极客时间”赋给 myname 变量，赋值后变量环境中的 myname 属性值改变为“极客时间”，变量环境如下所示：

```js
VariableEnvironment:
     myname -> "极客时间",
     showName ->function : {console.log(myname)
```

好了，以上就是一段代码的编译和执行流程。实际上，编译阶段和执行阶段都是非常复杂的，包括了词法分析、语法解析、代码优化、代码生成等。

具体可以看[V8 是如何执行一段 JavaScript 代码的？](./compile.md)在本篇文章中你只需要知道 JavaScript 代码经过编译生成了什么内容就可以了。

<tree namespace='javascript/v8' :defaultExpandAll="false" />
