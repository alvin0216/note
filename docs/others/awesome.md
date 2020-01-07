---
title: awesome
date: 2019-01-04 17:24:41
---

## 相关链接

### mac

- [mac 安装 autojump](https://segmentfault.com/a/1190000011277135)

### centos

- [centos 安装 zsh 及其插件](https://iluoy.com/articles/133): `zsh` `autojump` `zsh-autosuggestions` 等

## 命令

### iterm2

删除一行：`control + u`

### mac

- 删除光标后的字符：`fn + del`
- 截图【全屏】：`command + shift + 3`
- 截图【自由选中】：`command + shift + 4`

### centos

- 查看端口占用情况：`netstat -ntlp`

查看 6001 端口占用情况，并 `kill`

```bash
netstat -lnp | grep 6001

cp6  0 0 :::6001   :::*   LISTEN   31313/node

kill 31313
```

### vim

- 检索：`?plugins` 查询 `plugins` 字段，按下 `n` 即可跳转到下一个结果
