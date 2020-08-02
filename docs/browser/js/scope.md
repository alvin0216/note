---
title: 理解作用域：解决变量提升问题
date: 2020-06-15 09:19:25
---

通过上一节我们知道 JavaScript 代码的执行流程，第一步就是创建 <span class='orange'>执行上下文</span> 和 <span class='orange'>可执行代码</span>。

其中执行上下文中主要包括了

1. **变量环境 (Viriable Environment)**：用于存放变量提升的内容。
2. **词法环境 (Lexical Environment)**：Js 引擎内部用来跟踪标识符和特定变量之间的映射关系。又称之为<span class='orange'>作用域</span>。
3. **this 的绑定**

本节主要讲 `var` 的产生的变量提升缺陷以及为何引入 `let` `const`，以便梳理作用域相关知识。

## 变量提升所带来的问题

**1. 本应销毁的变量没有被销毁**

```js
function foo() {
  for (var i = 0; i < 7; i++) {}
  console.log(i) // 这里还可以访问到 i = 7
}
foo()
```

在创建执行上下文阶段，变量 i 就已经被提升了，所以当 for 循环结束之后，变量 i 并没有被销毁。

**2. 变量容易在不被察觉的情况下被覆盖掉**

```js
var myname = '极客时间'
function showName() {
  console.log(myname) // undefined
  if (1) {
    var myname = '极客邦'
  }
  console.log(myname) // 极客邦
}
showName()
```

`showName` 函数的执行上下文创建，JavaScript 引擎便开始执行 `showName` 函数内部的代码了。首先：

```js
console.log(myname)
```

`myname` 在全局执行上下文和 `showName` 函数的执行上下文中都存在。在函数执行过程中，**JavaScript 会优先从当前的执行上下文中查找变量**，由于变量提升，当前的执行上下文中就包含了变量 `myname`，而值是 `undefined`，所以获取到的 `myname` 的值就是 `undefined`。

## 块级作用域：解决变量提升问题

上面我们介绍了变量提升而带来的一系列问题，为了解决这些问题，ES6 引入了 `let` 和 `const` 关键字，从而使 JavaScript 也能像其他语言一样拥有了**块级作用域**。

为什么 JavaScript 中会存在变量提升这个特性，而其他语言似乎都没有这个特性呢？要讲清楚这个问题，我们就得先从作用域讲起。

作用域是指程序源代码中定义变量的区域：作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

在 ES6 之前，ES 的作用域只有两种：全局作用域和函数作用域。

- **全局作用域**中的对象在代码中的任何地方都能访问，其生命周期伴随着页面的生命周期。
- **函数作用域**就是在函数内部定义的变量或者函数，并且定义的变量或者函数只能在函数内部被访问。函数执行结束之后，函数内部定义的变量会被销毁。

在 ES6 之前，JavaScript 只支持这两种作用域，相较而言，其他语言则都普遍支持**块级作用域**。块级作用域就是使用一对大括号包裹的一段代码，比如函数、判断语句、循环语句，甚至单独的一个{}都可以被看作是一个块级作用域。

```JS
//if块
if (1) {}

//while块
while (1) {}

//函数块
function foo() {}

//for循环块
for (let i = 0; i < 100; i++) {}

//单独一个块
{}
```

还是上面的例子，用 `let` 解决变量提升的问题：

```js
var myname = '极客时间'
function showName() {
  console.log(myname) // 极客时间
  if (1) {
    let myname = '极客邦'
  }
  console.log(myname) // 极客时间
}
showName()
```

## JavaScript 是如何支持块级作用域的 ✨

那么接下来，我们就要站在**执行上下文**的角度来揭开答案。

```js
function foo() {
  var a = 1
  let b = 2
  {
    let b = 3
    var c = 4
    let d = 5
    console.log(a)
    console.log(b)
  }
  console.log(b)
  console.log(c)
  console.log(d)
}
foo()
```

当执行上面这段代码的时候，JavaScript 引擎会先对其进行编译并创建执行上下文，然后再按照顺序执行代码，关于如何创建执行上下文我们在前面的文章中已经分析过了，但是现在的情况有点不一样，我们引入了 let 关键字，let 关键字会创建块级作用域，那么 let 关键字是如何影响执行上下文的呢？

接下来我们就来一步步分析上面这段代码的执行流程。

### 编译阶段：编译并创建执行上下文

```js
VariableEnvironment:
  a -> undefined
  c -> undefined
LexicalEnvironment:
  b -> undefined
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/scope/3.png)

通过上图，我们可以得出以下结论：

<blockquote class='box'>

- 函数内部通过 var 声明的变量，在编译阶段全都被存放到**变量环境**里面了。
- 通过 let 声明的变量，在编译阶段会被存放到**词法环境**（`Lexical Environment`）中。
- 在函数的作用域块内部，通过 let 声明的变量并没有被存放到词法环境中。

</blockquote>

### 执行代码

接下来，**第二步继续执行代码**，当执行到代码块里面时，变量环境中 a 的值已经被设置成了 1，词法环境中 b 的值已经被设置成了 2，这时候函数的执行上下文就如下图所示：

```js
VariableEnvironment:
  a -> 1
  c -> undefined
LexicalEnvironment:
  b -> 2
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/scope/4.png)

从图中可以看出，当进入函数的作用域块时，作用域块中通过 let 声明的变量，会被存放在词法环境的一个单独的区域中，这个区域中的变量并不影响作用域块外面的变量，比如在作用域外面声明了变量 b，在该作用域块内部也声明了变量 b，当执行到作用域内部时，它们都是独立的存在。

其实，在词法环境内部，维护了一个小型栈结构，栈底是函数最外层的变量，进入一个作用域块后，就会把该作用域块内部的变量压到栈顶；当作用域执行完成之后，该作用域的信息就会从栈顶弹出，这就是词法环境的结构。需要注意下，我这里所讲的变量是指通过 let 或者 const 声明的变量。

再接下来，当执行到作用域块中的 console.log(a)这行代码时，就需要在词法环境和变量环境中查找变量 a 的值了，具体查找方式是：沿着词法环境的栈顶向下查询，如果在词法环境中的某个块中查找到了，就直接返回给 JavaScript 引擎，如果没有查找到，那么继续在变量环境中查找。

这样一个变量查找过程就完成了，你可以参考下图：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/scope/5.png)

从上图你可以清晰地看出变量查找流程，不过要完整理解查找变量或者查找函数的流程，就涉及到作用域链了，这个我们会在下篇文章中做详细介绍。

当作用域块执行结束之后，其内部定义的变量就会从词法环境的栈顶弹出

<blockquote class='box'>

通过上面的分析，想必你已经理解了词法环境的结构和工作机制

- 块级作用域就是通过词法环境的栈结构来实现的，
- 变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。

</blockquote>
