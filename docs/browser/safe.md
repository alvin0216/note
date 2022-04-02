---
title: 安全问题以及解决方案
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - 安全
categories:
  - 浏览器
---

- xss
  - cookie http-only、xss 转义、csp
- csrf
  - cookie secure & samesite
  - (身份认证) referer & origin
  - 验证码
  - token

## 问题 有 token 一定能预防 csrf 攻击吗
