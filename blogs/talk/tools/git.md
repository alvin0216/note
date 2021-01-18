---
title: git 常用命令及环境搭建
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - git
  - 环境配置
categories:
  - 技术漫谈
---

:::: tabs

::: tab 多人协作

见 [提交规范](/blogs/ramble/engineering/git-commit.md)

**撤销与更新**

```bash
# 储藏与弹出
git stash -u # 保存当前状态，包括 untracked 的文件
git stash pop # 弹出

# 撤销本地修改
git checkout [目录/文件] # . 代表所有

# 软回滚一个版本,可以理解为撤销最近一次的 commit
git reset --soft HEAD~1

# 强制更新到远程
git push -f origin HEAD:master

# 强制更新远程到本地
git fetch --all
git reset --hard origin/dev
git pull
```

**分支和远程**

```bash
git remote add origin git.... # 添加远程分支

# 新建本地分支后，推向远程
git push --set-upstream dev

# 删除远程分支 dev
git push origin -d dev
```

**查看提交记录**

```bash
git lg --since='1 days' --author='alvin'
```

:::

::: tab 全局配置（别名）

```bash
# 查看你的全局配置
git config --global --list

# 配置用户信息
git config --global user.name alvin
git config --global user.email alvin00216@163.com
```

**别名配置**

```bash
# 配置 log
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"

git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
```

:::

::: tab ssh 配置

```bash
# 进入ssh目录
cd ～/.ssh

# 生成密钥 ssh-keygen -t rsa -C email
ssh-keygen -t rsa -C alvin00216@163.com

# 提示输入目录，目录可以不填，有默认路径，直接回车 ==>
Enter file in which to save the key (/root/.ssh/id_rsa):
# 提示输入密码, 密码可以不填, 默认没有密码，直接回车 ==>
Enter passphrase (empty for no passphrase):
Enter same passphrase again:

# 成功后就可以看到 SHA256: xxxxx

# 查看你用 ssh 生成的公钥
cat ~/.ssh/id_rsa.pub
```

复制你刚刚生成的公钥到 `github`

`github` => `settings` => `SSH and GPG keys` => `New SSH key` ， 测试效果：

```bash
ssh -T git@github.com
# 输出：Hi alvin00216! You've successfully authenticated, but GitHub does not provide shell access.
```

**配置多用户**

```bash
# 再次生成一个 ssh-key
ssh-keygen -t rsa -C xx@pvmedtech.com

# 流程和 配置 ssh 一样
# Enter file in which to save the key (/Users/guosw/.ssh/id_rsa): pvmed_rsa_gitlab
# 这里输入私钥名 比如 pvmed_rsa_gitlab 对应的公钥名为 pvmed_rsa_gitlab.pub
# 一路回车

cd ~/.ssh
cat pvmed_rsa_gitlab.pub

# 添加公钥到所在 gitlab 地址 和上面的一致

# 使用 ssh-add 命令 添加密钥
ssh-add ~/.ssh/pvmed_rsa_gitlab

# 修改 ~/.ssh/config 将你的用户信息写进去
Host pvmed #给你的host取个名字 方便自己记忆
   User guosw #你的用户名
   Host http://192.168.1.222 #host主机的url
   IdentityFile ~/.ssh/pvmed_rsa_gitlab #私钥的访问路径
   Port 8000 #host主机的端口

# 测试
ssh -T git@192.168.1.222
```

:::

::: tab 提高 github 访问速度

切换 `host`：用 [http://tool.chinaz.com/dns/?type=1](http://tool.chinaz.com/dns/?type=1) 输入域名测速，拿到 `ip` 后修改 `host` 映射：

```bash
sudo vim /etc/hosts

# 添加以下内容
# github
52.74.223.119 github.com
13.250.162.133 codeload.github.com
69.63.184.142 github.global.ssl.fastly.net
```

刷新 `dns`

```bash
# mac 下
dscacheutil -flushcache

# centos7
systemctl restart network
```

同理。有人开源了

- [让你“爱”上 GitHub，解决访问时图裂、加载慢的问题](https://juejin.im/post/5ee89e2b6fb9a0479e4d4cd7)
- 你可以从这里拿到最新的 `host` 地址: [GitHub520](https://github.com/521xueweihan/GitHub520)
- 愉快的切换 `host`: [SwitchHosts](https://github.com/oldj/SwitchHosts)

:::

::::
