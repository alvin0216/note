---
title: awesome
date: 2019-01-04 17:24:41
---

## mac

- 删除光标后的字符：`fn + del`
- 截图【全屏】：`command + shift + 3`
- 截图【自由选中】：`command + shift + 4`

## centos

- 查看端口占用情况：`netstat -ntlp`
  
查看 6001 端口占用情况，并 `kill`

```bash
netstat -lnp | grep 6001

cp6  0 0 :::6001   :::*   LISTEN   31313/node

kill 31313
```