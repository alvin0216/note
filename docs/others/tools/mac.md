---
title: mac
date: 2020-01-05 09:25:13
---

## 系统命令

```bash
lsof -i:4040 # 查看 4040 端口占用情况
kill pid # 释放进程
```

## 配置别名

```bash
vim ~/.bash_profile

alias dev='npm run dev'
alias start='npm run start'
alias ip="ifconfig | grep -oE 'inet.*netmask' | grep -oE '(\d+\.){3}\d+' | sed -n 2p"
```

## 切换 bash 与 zsh

- 切换 bash：chsh -s /bin/bash
- 切换 zsh：chsh -s /bin/zsh

## homebrew

```bash
# 安装
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# check
brew -v

# 安装卸载软件
brew install <formula> # 安装指定软件
brew unistall <formula # 卸载指定软件
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

---

[Homebrew 进阶使用教程(一)](https://juejin.im/post/5a55d04f6fb9a01c9405bdcb)
