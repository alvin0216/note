---
title: 理解执行上下文栈
date: 2020-06-15 22:37:07
---

简单回顾上一节所讲的内容

JavaScript 代码的执行流程的第一步就是编译阶段：创建 `执行上下文` 和 `可执行代码`。

## 可执行代码

JavaScript 的可执行代码(executable code)的类型有哪些了？

其实很简单，就三种，全局代码、函数代码、eval 代码。

当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"**执行上下文(execution context)**"。

## 执行上下文栈

接下来问题来了，我们写的函数多了去了，如何管理创建的那么多执行上下文呢？

所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文。

在执行上下文创建好后，JavaScript 引擎会将执行上下文压入栈中。这里列举一个例子：

```js
var a = 2
function add(b, c) {
  return b + c
}
function addAll(b, c) {
  var d = 10
  result = add(b, c)
  return a + result + d
}
addAll(3, 6)
```

JS 执行代码后产生的执行上下文栈如图所示：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/stack/6.png)

<blockquote class='box'>

第一步，创建全局上下文，并将其压入栈底。

第二步，是调用 addAll 函数。为 addAll 创建执行上下文栈并押入栈中。

第三步，在 addAll 函数中执行了 add 函数，为 add 创建执行上下文栈并押入栈中。

当 add 执行完毕并返回时，add 函数出栈，以此类推。当整个应用程序结束的时候，栈才被清空。

</blockquote>

### 模拟调用栈

为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：

```js
ECStack = []
```

当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext：

```js
ECStack = [globalContext]
```

还是这段代码：

```js
var a = 2
function add(b, c) {
  return b + c
}
function addAll(b, c) {
  var d = 10
  result = add(b, c)
  return a + result + d
}
addAll(3, 6)
```

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。知道了这样的工作原理，让我们来看看如何处理上面这段代码：

```js
// addAll(3, 6)
ECStack.push(<addAll>> functionContext)

// addAll 中竟然调用了 add ，还要创建 add 的执行上下文
ECStack.push(<add>> functionContext)

// add 执行完毕
ECStack.pop()

// addAll 执行完毕
ECStack.pop()

// 整个应用程序结束
ECStack.pop()
```

### 如何在浏览器中查看调用栈

1. **打断点**

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/stack/9.png)

2. **console.trace**

使用 console.trace() 来输出当前的函数调用关系：

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/js/stack/10.png)
