---
title: 备忘录
date: 2019-07-15 13:00:28
sidebar: auto
tags:
  - 前端工程化
categories:
  - 前端工程化
---

```bash
# 批量删除本地包
git tag -l| awk '/@/ {print $1}' | xargs git tag -d

# 批量删除远程包
git show-ref --tag | awk '{print ":" $2}' | xargs git push origin
```
