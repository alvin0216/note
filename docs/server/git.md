---
title: Git 常用命令
date: 2019-12-31 14:20:32
---

## git 常用命令

[高频使用的 Git 命令](https://juejin.im/post/5de8d849e51d455808332166)

```bash
# 软回滚一个版本,可以理解为撤销最近一次的 commit
git reset --soft HEAD~1
```

## 配置个人信息

```bash
# 查看当前用户的配置 user.name user.email ...
git config --global --list

# 配置用户信息
git config --global user.name guodada
git config --global user.email gershonv@163.com
```

## 配置 ssh

```bash
# 进入ssh目录
cd ～/.ssh

# 生成密钥
ssh-keygen -t rsa -C gershonv@163.com

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

# 输出：Hi gershonv! You've successfully authenticated, but GitHub does not provide shell access.
```

之前已经是 `https` 的链接，现在想要用 `SSH` 提交怎么办？
直接修改项目目录下 `.git` 文件夹下的 `config` 文件，将地址修改一下就好了。

`git` 地址获取可以看如下图切换。

![](https://img-blog.csdnimg.cn/20181029093141515.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTM3Nzg5MDU=,size_12,color_FFFFFF,t_70)

## 提高 github 访问速度

`github` 的 `CDN` 被某墙屏了，由于网络代理商的原因，所以访问下载很慢。`ping github.com` 时，速度只有 300 多 ms。

解决办法是绕过 `dns` 解析，在本地直接绑定 `host`，该方法也可加速其他因为 `CDN` 被屏蔽导致访问慢的网站。

```bash
sudo vim /etc/hosts

# 添加以下内容
151.101.185.194 github.global.ssl.fastly.net
192.30.253.112 github.com
151.101.112.133 assets-cdn.github.com
151.101.184.133 assets-cdn.github.com
185.199.108.153 documentcloud.github.com
192.30.253.118 gist.github.com
185.199.108.153 help.github.com
192.30.253.120 nodeload.github.com
151.101.112.133 raw.github.com
23.21.63.56 status.github.com
192.30.253.1668 training.github.com
192.30.253.112 www.github.com
151.101.13.194 github.global.ssl.fastly.net
151.101.12.133 avatars0.githubusercontent.com
151.101.112.133 avatars1.githubusercontent.com
```

刷新 `dns`

```bash
# mac 下
dscacheutil -flushcache

# centos7
systemctl restart network
```
