---
title: 前端安全
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - 安全
categories:
  - 浏览器
---

- xss 脚本注入
  - `cookie` 设置 `http-only` 禁止用户通过 `document` 读取 `cookie`
  - `xss` 转义，过滤有害的 js 脚本
  - csp 白名单
- csrf
  - cookie secure & samesite
  - (身份认证) referer & origin
  - 验证码
  - token
- 敏感数据
  - 加密，代码混淆
