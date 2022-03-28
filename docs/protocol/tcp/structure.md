---
title: TCP 报文结构
date: 2018-09-28 13:00:28
sidebar: 'auto'
tags:
  - tcp
categories:
  - 网络协议
---

TCP 报文是 TCP 层传输的数据单元，也叫报文段。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tcp-structure.png)

## 源端口、目标端口

如何标识唯一标识一个连接？答案是 TCP 连接的四元组——源 **IP、源端口、目标 IP 和目标端口。**

那 TCP 报文怎么没有源 IP 和目标 IP 呢？这是因为在 IP 层就已经处理了 IP 。TCP 只需要记录两者的端口即可。

## 序列号

即 `Sequence number`, 指的是本报文段第一个字节的序列号。

序列号在 TCP 通信的过程中有两个作用:

- 在 SYN 报文中交换彼此的初始序列号。
- 保证数据包按正确的顺序组装。

## ISN

即 `Initial Sequence Number`（初始序列号）,在三次握手的过程当中，双方会用过 SYN 报文来交换彼此的 ISN。

ISN 并不是一个固定的值，而是每 4 ms 加一，溢出则回到 0，这个算法使得猜测 ISN 变得很困难。那为什么要这么做？

如果 ISN 被攻击者预测到，要知道源 IP 和源端口号都是很容易伪造的，当攻击者猜测 ISN 之后，直接伪造一个 RST 后，就可以强制连接关闭的，这是非常危险的。

而动态增长的 ISN 大大提高了猜测 ISN 的难度。

## 确认号

即 `ACK`(Acknowledgment number)。用来告知对方下一个期望接收的序列号，小于 ACK 的所有字节已经全部收到。

## 标记位

常见的标记位有 `SYN`,`ACK`,`FIN`,`RST`,`PSH`。

`SYN` 和 `ACK` 已经在上文说过，后三个解释如下: FIN： 即 Finish，表示发送方准备断开连接。

`RST`：即 `Reset`，用来强制断开连接。

`PSH`： 即 `Push`, 告知对方这些数据包收到后应该马上交给上层的应用，不能缓存。

## 窗口大小

占用两个字节，也就是 16 位，但实际上是不够用的。因此 TCP 引入了窗口缩放的选项，作为窗口缩放的比例因子，这个比例因子的范围在 0 ~ 14，比例因子可以将窗口的值扩大为原来的 2 ^ n 次方。

## 校验和

占用两个字节，防止传输过程中数据包有损坏，如果遇到校验和有差错的报文，TCP 直接丢弃之，等待重传。

## 可选项

可选项的格式如下:

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/tcp-structure2.png)

常用的可选项有以下几个:

- TimeStamp: TCP 时间戳，后面详细介绍。
- MSS: 指的是 TCP 允许的从对方接收的最大报文段。
- SACK: 选择确认选项。
- Window Scale： 窗口缩放选项。
