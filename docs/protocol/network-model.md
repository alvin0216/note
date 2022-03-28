---
title: 网络模型
date: 2018-09-28 18:00:28
sidebar: 'auto'
tags:
  - http
categories:
  - 网络协议
---

数据链路层（mac） -> 网络层（IP）-> 传输层（TCP/UDP）-> 应用层（HTTP、SMTP、FTP）

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/network-model.png)

## 数据链路层(Mac)

负责在以太网、WiFi 这样的底层网络上发送原始数据包，工作在网卡这个层次，使用 `MAC` 地址来标记网络上的设备，所以有时候也叫 `MAC` 层。

## 网络层(IP)

IP 协议就处在这一层。因为 IP 协议定义了“IP 地址”的概念，所以就可以在“链接层”的基础上，用 IP 地址取代 MAC 地址，把许许多多的局域网、广域网连接成一个虚拟的巨大网络，在这个网络里找设备时只要把 IP 地址再“翻译”成 MAC 地址就可以了。

## 传输层(TCP/UDP)

传输层负责为两台主机中的进程提供通信服务，它使用 16 位的端口号来标识端口，当两个计算机中的进程要进行通讯时，除了要知道对方的 IP 地址外，还需要知道对方的端口。该层主要有以下两个协议：用户数据报协议（UDP，User Datagram Protocol）和传输控制协议（TCP，Transmission Control Protocol）：

## 应用层(HTTP/SMTP/FTP...)

由于下面的三层把基础打得非常好，所以在这一层就“百花齐放”了，有各种面向具体应用的协议。例如 Telnet、SSH、FTP、SMTP 等等，当然还有我们的 HTTP。

相关链接 [详解 四层、五层、七层 计算机网络模型](https://juejin.im/post/6844904049800642568)
