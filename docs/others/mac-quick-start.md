---
title: mac 开发环境配置
date: 2020-01-04 17:24:41
---

## 开发环境配置

### homebrew 安装

[官网](https://brew.sh/index_zh-cn)

打开终端工具，输入下面的网址即可。

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### 安装配置终端

1. 安装 `iterm2` 代替 `mac` 自带的终端工具

```bash
brew cask install iterm2
```

打开并设置为默认的终端。

2. 安装 `oh-my-zsh`

`zsh` 是一个可兼容 `bash` 并完全可以取而代之的 `shell`，其提供了比 `bash` 更强大的一系列功能，比如足以让你欲罢不能的命令自动补全，比如当你键入 “`git bran`” 按下 tab 键后会自动补全命令为 “`git branch`” ，继续按 `tab` 还会列出相关分支，非常方便。

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

如果你发现安装不成功，请科学翻墙后再重新试试。

可以安装 [蓝灯](https://github.com/getlantern/download) 简单翻墙试试：

```bash
brew cask info lantern # 查看有没有安装蓝灯以及输出信息

brew cask install lantern
```

### 安装 node、配置 yarn

```bash
brew install node

# 安装 yarn
npm i -g yarn --registry=https://registry.npm.taobao.org

yarn -v

# 设置 yarn 镜像源为淘宝源
yarn config set registry http://registry.npm.taobao.org/

# 如果你的 npm 也想设置为淘宝源
npm config set registry https://registry.npm.taobao.org
```

### 安装 git 配置 ssh

```bash
brew install git

# 查看当前用户的配置 user.name user.email ...
git config --global --list

# 配置用户信息
git config --global user.name guosw
git config --global user.email gershonv@163.com
```

[配置 ssh 和 提高 github 访问速度](/tools/git.html#%E9%85%8D%E7%BD%AE-ssh)

### vscode 和其他软件安装

[vscode 官网](https://code.visualstudio.com/)

```bash
brew cask install visual-studio-code
```

打开 `vscode` 下载插件 `Settings Sync` 更新个人设置到本地。

## 个人操作习惯设置

### 设置辅助点按

原本的 `macbook` 触控版是无法点击就触发左键功能，需要进行设置。

系统偏好设置 => 触控板 => 光标与点按 => 钩上辅助点控 即可！

### 设置三指拖动

便于拖动窗口和选中文字等，看个人习惯设置。

系统的偏好设置 => 辅助功能 => 指针控制 => 触控板选项 => 启动拖移（三只拖移）。即可完成设置

原先的三指的辅助手势，变成了四指手势，（切换桌面）
