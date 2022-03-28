---
title: HTTP 报文结构是怎样的？
date: 2018-09-22 13:00:28
sidebar: 'auto'
tags:
  - http
categories:
  - 网络协议
---

对于 TCP 而言，在传输的时候分为两个部分: **TCP 头**和**数据部分**。

而 HTTP 类似，也是 `header + body` 的结构，具体而言:

```ts
起始行 + 头部 + 空行 + 实体;
```

:::details

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/http-wireshark.png)

:::

## 起始行

对于请求报文来说：

```ts
GET /home HTTP/1.1
```

也就是`方法` + `路径` + `http 版本`。

对于响应报文来说，起始行一般长这个样:

```ts
HTTP/1.1 200 OK
```

`http 版本` + `状态码` + `原因`。

## 头部

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/response-header.png)

不管是请求头还是响应头，其中的字段是相当多的，而且牵扯到 http 非常多的特性，这里就不一一列举的，重点看看这些头部字段的格式：

- 字段名不区分大小写
- 字段名不允许出现空格，不可以出现下划线 `_`
- 字段名后面必须紧接着 `:`

## 空行

`空行` 用于区分**头部**和**实体**

:::warning 如果说在头部中间故意加一个空行会怎么样？

那么空行后的内容全部被视为实体。

:::

## 实体

就是具体的数据了，也就是 body 部分。请求报文对应请求体, 响应报文对应响应体。
