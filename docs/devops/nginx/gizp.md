---
title: nginx gzip 不生效
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - nginx
  - 技术漫谈
categories:
  - 技术漫谈
---

优化页面的时候，使用 nginx 开启 gzip ，发现并没有什么反映~

```bash
server {
   .....
    gzip on; # 开启压缩
    gzip_buffers 32 4k; # 设置用于处理请求压缩的缓冲区数量和大小
    gzip_comp_level 6; # 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大
    gzip_min_length 200; # 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
   .....
}
```

**问题在于 gzip_types 中的 application/x-javascript 需要把 x- 去掉~**

JavaScript 的 MIME 类型通常为“`application/x-javascript`”, 非 IE 的浏览器认“`application/javascript`”,用“`text/javscript`”最通用，因为 type 可以不指定默认是"text/javascript"

[nginx gzip on 无效](https://www.cnblogs.com/qiangweikang/p/gzip_on.html)
