---
title: DNS 解析
date: 2018-09-28 17:00:28
sidebar: 'auto'
tags:
  - dns
categories:
  - 网络协议
---

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/dns.png)

## 域名结构

就以 `mail.baidu.com` 域名为例，域名最后一个.的右侧部分我们称之为顶级域名，倒数第二个.右侧部分称之为二级域名，以此类推，就会有三级域名，四级域名等等。

在 `mail.baidu.com` 的域名中，`com` 成为顶级域名，`baidu.com` 称为二级域名，`mail.baidu.com` 称为三级域名。

域名由两个或两个以上的词组成，常见域名为二级域名+顶级域名组成，所以一般我们会将域名分为顶级域名、二级域名，除此之外，还有国家代码顶级域名。

## 查询顺序

现在我们来看看怎么去根据域名查询一台服务器的 IP 地址。

1. **检查浏览器缓存**中是否存在该域名与 IP 地址的映射关系，如果有则解析结束，没有则继续
2. 到系统本地查找映射关系，一般在 **hosts 文件**中，如果有则解析结束，否则继续
3. 到**本地域名服务器**去查询，有则结束，否则继续
4. **本地域名服务器查询根域名服务器**，该过程并不会返回映射关系，只会告诉你去下级服务器(顶级域名服务器)查询
5. **本地域名服务器查询顶级域名服务器**(即 com 服务器)，同样不会返回映射关系，只会引导你去二级域名服务器查询
6. **本地域名服务器查询二级域名服务器**(即 `baidu.com` 服务器)，引导去三级域名服务器查询
7. **本地域名服务器查询三级域名服务器**(即 mail.baidu.com 服务器)，此时已经是最后一级了，如果有则返回映射关系，则本地域名服务器加入自身的映射表中，方便下次查询或其他用户查找，同时返回给该用户的计算机，没有找到则网页报错

- [浏览器之 DNS 解析过程详解](https://juejin.cn/post/6909041150728863752)
