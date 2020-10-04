---
title: 报文结构
---

HTTP 协议的请求报文和响应报文的结构基本相同，由三大部分组成：

- 起始行（start line）：描述请求或响应的基本信息；
- 头部字段集合（header）：使用 key-value 形式更详细地说明报文；
- 消息正文（entity）：实际传输的数据，它不一定是纯文本，可以是图片、视频等二进制数据。

<img className='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/http/series/http-wireshark.png' />

## 请求行

**它简要地描述了客户端想要如何操作服务器端的资源。**

请求行由三部分构成：

- 请求方法：是一个动词，如 GET/POST，表示对资源的操作；
- 请求目标：通常是一个 URI，标记了请求方法要操作的资源；
- 版本号：表示报文使用的 HTTP 协议版本。

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/series/request-line.png)

```bash
GET / HTTP/1.1
# 请求方法 GET 请求目标 / 请求协议 HTTP/1.1
```

## 头部

<img className='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/http/series/response-header.png' />

<img className='small' alt='' src='https://gitee.com/alvin0216/cdn/raw/master/img/http/series/response-header.png' />

不管是请求头还是响应头，其中的字段是相当多的，而且牵扯到 http 非常多的特性，这里就不一一列举的，重点看看这些头部字段的格式：

- 字段名不区分大小写
- 字段名不允许出现空格，不可以出现下划线 `_`
- 字段名后面必须紧接着 `:`

## 空行

`空行` 用于区分**头部**和**实体**

问: 如果说在头部中间故意加一个空行会怎么样？

那么空行后的内容全部被视为实体。

## 实体

就是具体的数据了，也就是 body 部分。请求报文对应请求体, 响应报文对应响应体。
