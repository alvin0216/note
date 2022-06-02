---
title: pnpm
date: 2019-07-15 13:00:28
sidebar: auto
tags:
  - pnpm
  - 前端工程化
categories:
  - 前端工程化
---

- [pnpm 中文](https://pnpm.io/zh/motivation)

## pnpm workspace

```bash
mkdir pnpm-workspace.yaml

packages:
  # 所有在 packages/  子目录下的 package
  - 'packages/**'
  # 不包括在 test 文件夹下的 package
  - '!**/test/**'
```

## preinstall
