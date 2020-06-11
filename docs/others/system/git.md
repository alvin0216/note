---
title: Git 常用命令
date: 2019-12-31 14:20:32
---

## git 常用命令

[高频使用的 Git 命令](https://juejin.im/post/5de8d849e51d455808332166)

```bash
# 软回滚一个版本,可以理解为撤销最近一次的 commit
git reset --soft HEAD~1

# 删除远程分支
git push origin -d dev
```

## 配置个人信息

```bash
# 查看当前用户的配置 user.name user.email ...
git config --global --list

# 配置用户信息
git config --global user.name guodada
git config --global user.email alvin00216@163.com
```

## 配置 ssh

```bash
# 进入ssh目录
cd ～/.ssh

# 生成密钥
ssh-keygen -t rsa -C alvin00216@163.com

# 提示输入目录，目录可以不填，有默认路径，直接回车 ==>
Enter file in which to save the key (/root/.ssh/id_rsa):

# 提示输入密码, 密码可以不填, 默认没有密码，直接回车 ==>
Enter passphrase (empty for no passphrase):
Enter same passphrase again:

# 成功后就可以看到 SHA256: xxxxx

# 查看 ssh key
cd ~/.ssh     # ~ 表示当前用户主目录
cat id_rsa.pub # 查看手动拷贝
```

`github` => `settings` => `SSH and GPG keys` => `New SSH key` 输入信息之后

```bash
ssh -T git@github.com

# 输出：Hi alvin00216! You've successfully authenticated, but GitHub does not provide shell access.
```

之前已经是 `https` 的链接，现在想要用 `SSH` 提交怎么办？
直接修改项目目录下 `.git` 文件夹下的 `config` 文件，将地址修改一下就好了。

`git` 地址获取可以看如下图切换。

![](https://img-blog.csdnimg.cn/20181029093141515.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTM3Nzg5MDU=,size_12,color_FFFFFF,t_70)

## 提高 github 访问速度

提升 github 访问速度的 host 文件-使用 [http://tool.chinaz.com/dns/?type=1](http://tool.chinaz.com/dns/?type=1)

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

## git 多用户

```bash
ssh-keygen -t rsa -C xx@pvmedtech.com

# Enter file in which to save the key (/Users/guosw/.ssh/id_rsa):
# 这里输入私钥名 比如 pvmed_rsa_gitlab
# 一路回车
cd ~/.ssh

cat pvmed_rsa_gitlab.pub
# 添加公钥到所在 gitlab 地址

# 是把专用密钥添加到ssh-agent的高速缓存中
ssh-add ~/.ssh/pvmed_rsa_gitlab

# 修改配置
vim ~/.ssh/config

# 添加
Host pvmed #给你的host取个名字 方便自己记忆
   User guosw #你的用户名
   Host http://192.168.1.222 #host主机的url
   IdentityFile ~/.ssh/pvmed_rsa_gitlab #私钥的访问路径
   Port 8000 #host主机的端口

# 测试
ssh -T git@192.168.1.222
```
