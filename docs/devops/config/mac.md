---
title: Mac 常用命令
date: 2019-07-15 13:00:28
sidebar: auto
tags:
  - 前端工程化
categories:
  - 前端工程化
---

<!-- 如何安装 `zsh + oh-my-zsh + autojump` 自行百度 -->

:::: tabs

::: tab linux 命令

```bash
lsof -i:4040 # 查看 4040 端口占用情况
kill pid # 释放进程

# 其他
# 切换 bash 与 zsh
chsh -s /bin/bash
chsh -s /bin/zsh


# 获取系统时间 2021-07-22 09:23:33
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "${time}"
```

:::

::: tab 配置 bash 别名

```bash
vim ~/.bash_profile

alias dev='npm run dev'
alias start='npm run start'
alias ip="ifconfig | grep -oE 'inet.*netmask' | grep -oE '(\d+\.){3}\d+' | sed -n 2p"
alias taobao="echo --registry=https://registry.npm.taobao.org" # 输出淘宝镜像
# h 也即 help 的意思
alias h='
echo alvin 的帮助文档

echo \\n
echo scp 命令
echo 拷贝文件目录到服务器 scp -r \<filepath\> \<remote:filePath\>
echo 拷贝文件到服务器 scp \<filepath\> \<remote:filePath\>
echo demo: scp /Users/guosw/Desktop/a.js guosw:/code/a.js
echo 备注：拷贝服务端到本地 只需要调换 filePath 即可
echo \\n

echo linux 命令
echo 关闭端口占用 1. lsof -i:端口号 2. kill -9 PID
echo 查看某个进程 ps | grep -i mysql
echo 压缩解压
echo "  压缩 test文件夹为 test.gz:  tar zcvf ./test.gz ./test"
echo "  解压 test.gz 到当前目录:  tar zxvf test.gz"
'

# 修改后
source .bash_profile
```

:::

::: tab homebrew

```bash
# 安装
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# check
brew -v

# 安装卸载软件
brew install <formula> # 安装指定软件
brew uninstall <formula # 卸载指定软件
brew list # 显示所有的已安装的软件
brew search text #搜索本地远程仓库的软件，已安装会显示绿色的勾

# 升级软件相关
brew update # 自动升级homebrew
brew outdated # 检测已经过时的软件
brew upgrade # 升级所有已过时的软件，即列出的以过时软件
brew upgrade <formula> # 升级指定的软件

# 清理相关 homebrew再 升级软件时候不会清理相关的旧版本，在软件升级后我们可以使用如下命令清理
brew cleanup -n # 列出需要清理的内容
brew cleanup <formula> # 清理指定的软件过时包

# 查看源
cd "$(brew --repo)"
git remote -v
```

更换国内源

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/rgf456/HomebrewInstall/master/install.rb)"
```

:::

::: tab autojump

```js
j --stat // 查看权重

改变权重值：
j -i [权重] // 增加
j -d [权重] // 减少

j --purge // 去除不存在的路径

jco c // 在文件管理器中打开一个子目录
```

:::

::::

Sed 主要用来自动编辑一个或多个文件、简化对文件的反复操作、编写转换程序等.

[Linux sed 命令](https://www.runoob.com/linux/linux-comm-sed.html)
