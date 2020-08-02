---
title: 理解执行上下文：变量提升
date: 2020-06-14 11:11:30
---

## 变量提升（Hoisting）

不过在介绍变量提升之前，我们先通过下面这段代码，来看看什么是 JavaScript 中的声明和赋值。

```js
var myname = '极客时间' // 变量声明
```

这段代码你可以把它看成是两行代码组成的：

```js
var myname //声明部分
myname = '极客时间' //赋值部分
```

同理 函数的声明和赋值为：

```js
function foo() {
  console.log('foo')
}
var bar = function() {
  console.log('bar')
}
```

第一个函数 foo 是一个完整的函数声明 也就是说没有涉及到赋值操作，第二个函数是先声明变量 bar 再赋值

为了直观理解，你可以参考下图：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/function-promotion.png)

好了，理解了声明和赋值操作，那接下来我们就可以聊聊什么是变量提升了。

<blockquote class='box'>

**所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。**

</blockquote>

下面我们来模拟下实现：

```js
/*
 * 变量提升部分
 */
// 把变量 myname提升到开头，
// 同时给myname赋值为undefined
var myname = undefined
// 把函数showName提升到开头
function showName() {
  console.log('showName被调用')
}

/*
 * 可执行代码部分
 */
showName()
console.log(myname)
// 去掉var声明部分，保留赋值语句
myname = '极客时间'
```

为了模拟变量提升的效果，我们对代码做了以下调整，如下图：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/simulation-variable-promotion.png)

从图中可以看出，对原来的代码主要做了两处调整：

- 第一处是把声明的部分都提升到了代码开头，如变量 myname 和函数 showName，并给变量设置默认值 undefined；
- 第二处是移除原本声明的变量和函数，如 var myname = '极客时间'的语句，移除了 var 声明，整个移除 showName 的函数声明。

通过这段模拟的变量提升代码，相信你已经明白了可以在定义之前使用变量或者函数的原因——**函数和变量在执行之前都提升到了代码开头**。

## JavaScript 代码的执行流程 ✨

从概念的字面意义上来看，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，正如我们所模拟的那样。但，这并不准确。

**实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中。**，一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。

一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。大致流程你可以参考下图：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/run.png)

以这段代码为例

```js
showName()
console.log(myName)
var myName = '极客时间'
function showName() {
  console.log('函数showName被执行')
}
```

### 编译阶段：创建执行上下文和可执行代码

那么编译阶段和变量提升存在什么关系呢？为了搞清楚这个问题，我们还是回过头来看上面那段模拟变量提升的代码，为了方便介绍，可以把这段代码分成两部分。

1. 变量提升部分的代码

```js
var myname = undefined
function showName() {
  console.log('函数showName被执行')
}
```

2. 执行部分的代码。

```js
showName()
console.log(myname)
myname = '极客时间'
```

下面我们就可以把 JavaScript 的执行流程细化，如下图所示:

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/compile.png)

从上图可以看出，输入一段代码，经过编译后，会生成两部分内容：**执行上下文（Execution context）**和**可执行代码**。

<blockquote class='box'>

**执行上下文是 JavaScript 执行一段代码时的运行环境**：比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。

在执行上下文中存在一个**变量环境的对象（Viriable Environment）**，该对象中保存了变量提升的内容，比如上面代码中的变量 myname 和函数 showName，都保存在该对象中。

</blockquote>

你可以简单地把变量环境对象看成是如下结构：

```js
VariableEnvironment:
     myname -> undefined,
     showName ->function : {console.log(myname)
```

了解完变量环境对象的结构后，接下来，我们再结合下面这段代码来分析下是如何生成变量环境对象的。

```js
showName()
console.log(myname)
var myname = '极客时间'
function showName() {
  console.log('函数showName被执行')
}
```

<blockquote class='box'>

- 第 1 行和第 2 行，由于这两行代码不是声明操作，所以 JavaScript 引擎不会做任何处理；
- 第 3 行，由于这行是经过 var 声明的，因此 JavaScript 引擎将在环境对象中创建一个名为 myname 的属性，并使用 undefined 对其初始化；
- 第 4 行，JavaScript 引擎发现了一个通过 function 定义的函数，所以它将函数定义存储到堆 (HEAP）中，并在环境对象中创建一个 showName 的属性，然后将该属性值指向堆中函数的位置（不了解堆也没关系，JavaScript 的执行堆和执行栈我会在后续文章中介绍）。

</blockquote>

这样就生成了变量环境对象。接下来 JavaScript 引擎会把声明以外的代码编译为字节码，你可以类比如下的模拟代码：

```js
showName()
console.log(myname)
myname = '极客时间'
```

好了，现在有了执行上下文和可执行代码了，那么接下来就到了执行阶段了。

### 执行阶段：从变量环境查找与执行

<blockquote class='box'>

JavaScript 引擎开始执行“可执行代码”，按照顺序一行一行地执行。下面我们就来一行一行分析下这个执行过程：

- 当执行到 showName 函数时，JavaScript 引擎便开始在变量环境对象中查找该函数，由于变量环境对象中存在该函数的引用，所以 JavaScript 引擎便开始执行该函数，并输出“函数 showName 被执行”结果。
- 接下来打印“myname”信息，JavaScript 引擎继续在变量环境对象中查找该对象，由于变量环境存在 myname 变量，并且其值为 undefined，所以这时候就输出 undefined。
- 接下来执行第 3 行，把“极客时间”赋给 myname 变量，赋值后变量环境中的 myname 属性值改变为“极客时间”，变量环境如下所示：

```js
VariableEnvironment:
     myname -> "极客时间",
     showName ->function : {console.log(myname)
```

</blockquote>

好了，以上就是一段代码的编译和执行流程。实际上，编译阶段和执行阶段都是非常复杂的，包括了词法分析、语法解析、代码优化、代码生成等。

具体可以看[编译器和解释器：V8 是如何执行一段 JavaScript 代码的？](../v8/run-the-code.md)在本篇文章中你只需要知道 JavaScript 代码经过编译生成了什么内容就可以了。

## 总结

补充：函数提升和变量提升的优先级

---

函数提升优先于变量提升：

```js
foo() // 1

var foo = function() {
  console.log(2)
}

function foo() {
  console.log(1)
}
```

<blockquote class='box'>

- JavaScript 代码执行过程中，需要先做变量提升，而之所以需要实现变量提升，是因为 JavaScript 代码在执行之前需要先编译。

- 在编译阶段，变量和函数会被存放到变量环境中，变量的默认值会被设置为 undefined；在代码执行阶段，JavaScript 引擎会从变量环境中去查找自定义的变量和函数。

- 如果在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，这是因为后定义的会覆盖掉之前定义的。

</blockquote>
