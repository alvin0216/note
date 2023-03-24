---
title: ssh 免密登陆服务器配置
date: 2019-07-15 13:00:28
tags:
  - ssh
  - 前端工程化
categories:
  - 前端工程化
---

## 创建 ssh 公钥

```bash
# 进入ssh 查看公钥
cat ~/.ssh/id_rsa.pub

# 如果不存在 则需要创建公钥
ssh-keygen -t rsa -C alvin0216@163.com
```

复制完公钥后，我们先登陆进服务器。

## 在服务器的 ssh 中添加 authorized_keys

在云服务器中进行以下操作：

```bash
cd ~/.ssh/

ls # 查看是否存在 authorized_keys 文件

vim authorized_keys

# 如果没有的话
vim ~/.ssh/authorized_keys
```

保存我们刚刚复制的公钥

## 设置登陆名

在进行完上面的操作后，可以发现登陆服务器已经不需要密码了，但是仍然需要输入 `IP`。

此时我们可以通过配置 `~/.ssh/config` 来做一个别名

```bash
vim ~/.ssh/config

Host server1
   User root
   HostName 'server1 的ip' # 注意⚠️ 这里不需要加引号 比如直接写上服务器地址 47.112.48.225
Host server2
   User root
   HostName 'server2 的ip'
```

然后我们打开控制台，输入

```bash
ssh server1
```

就可以快速登陆服务器了，退出登陆则 `control + d`
