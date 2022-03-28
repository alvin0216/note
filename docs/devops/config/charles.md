---
title: charles 抓包环境配置
date: 2019-07-15 13:00:28
sidebar: auto
tags:
  - charles 抓包
  - 前端工程化
categories:
  - 前端工程化
---

环境 `mac` + `iphone`

## 安装 Charles

```bash
brew cask install charles
```

根据下载的版本号 [破解 Charles](https://www.zzzmode.com/mytools/charles/)

## 配置 Charles

1. 获取本机的 IP 地址

```bash
# 获取本机的 ip 地址（方式很多 这里就直接用命令行）
ifconfig | grep -oE 'inet.*netmask' | grep -oE '(\d+\.){3}\d+' | sed -n 2p
```

2. 配置本机的代理端口

`Charles 菜单栏 -> Proxy -> Proxy Settings`

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/proxy-settings.png)

3. 配置 iPhone 代理

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/phone-proxy.png)

注意，这里链接的是同个局域网。现在可以开始抓 `http` 包了，但是还不可以抓取 `https`

## 抓取 HTTPS

1. 在 `Charles 菜单栏 -> Help -> SSL Proxying -> Install Charles Root Certificate` 中可以为 PC 安装证书，图示配置如下：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/add-certificate.png)

证书可以在 Mac 的钥匙串中查看，双击证书，将信任权限设定为始终信任。图示如下：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/auth-certificate.png)

2. iPhone 安装证书

在 `Charles 菜单栏 -> Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser` 中查看最新的官方证书下载地址。图示如下：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/phone-certificate.png)

下载并安装描述文件。之后在到 `iPhone 设置 -> 关于本机 -> 证书信任设置`中启用根证书。图示如下：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/phone-auth-certificate.png)

这样，就可以使用 Charles 中抓包 iPhone 发出的 HTTPS 请求并预览明文数据了。

[iOS Charles 抓包](https://juejin.im/post/5c4ed14f6fb9a049ed3142cc)

## 另外也推荐 whistle

[【MAC 工具】手机抓包工具之 —— whistle](https://blog.csdn.net/weixin_42534940/article/details/88783455)
