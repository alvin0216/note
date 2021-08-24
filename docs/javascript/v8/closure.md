---
title: 什么是闭包？
date: 2020-06-16 20:31:29
sidebar: 'auto'
tags:
  - Javascript
  - v8 引擎
  - 作用域
  - 闭包
categories:
  - Javascript
---

老生长谈，这里仅仅概括：

<tree namespace='javascript/closure' defaultExpandAll />

---

要理解闭包，首先必须理解 Javascript 特殊的变量作用域。

闭包就是能够读取其他函数内部变量的函数。由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
