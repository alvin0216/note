---
title: 低代码难点
date: 2021-06-29 10:54:23
sidebar: auto
tags:
  - 低代码平台
categories:
  - 开发实录
---

## 拖拽

1. 怎么知道当前拖拽的目标是在上或在下,怎么放拖拽的提示面板

![](https://gitee.com/alvin0216/cdn/raw/master/images/drag.png)

enterTarget：dragenter 的对象

每个 `renderItem` 里面加 `dataSet` ，获取 `enterTarget` 的索引，默认是放在 `enterTarget` 的索引 - 1。

如果 enterTarget 为空，则插入到最后一位。

注意缺省判断就行了

## 跨域问题
