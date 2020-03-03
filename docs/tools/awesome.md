---
title: Awesome
date: 2019-01-04 17:24:41
---

## 相关链接

- [mac 安装 autojump](https://segmentfault.com/a/1190000011277135)
- [命令行打开 vscode](https://blog.csdn.net/h774140913/article/details/84650273)
- [Vi/Vim 如何消除搜索后的关键字高亮](https://zhidao.baidu.com/question/1574869395955046300.html): `noh`
- [centos 安装 zsh 及其插件](https://iluoy.com/articles/133): `zsh` `autojump` `zsh-autosuggestions` 等

## 命令

### iterm2

删除一行：`control + u`

### mac

- 删除光标后的字符：`fn + del`
- 截图【全屏】：`command + shift + 3`
- 截图【自由选中】：`command + shift + 4`
- 查看端口占用情况：

  - ```bash
      lsof -i :6060 # 查看 6060 端口

      COMMAND   PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
      node    34472 guoshaowei   22u  IPv6 0xc291ef64528a6725      0t0  TCP *:6060 (LISTEN)

      kill -9 34472 # kill pid
    ```

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
