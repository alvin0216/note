---
title: 使用 wireshark 搭建抓包环境
date: 2020-05-31 00:51:06
---

第一步 安装 `wireshark`: 自行百度

软件开始界面：

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/series/wireshark.png)

## 抓取本地数据

安装好了以后，打开 Wireshark，选择如上的 Npcap <span class='orange'>Loopback</span> 模式抓取本地包

使用 `http-server` 开一个静态服务器, 打开端口

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/series/wireshark2.png)
