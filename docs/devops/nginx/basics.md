---
title: nginx 基础
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - nginx
  - 技术漫谈
categories:
  - 技术漫谈
---

## 基本操作

```bash
# 查看 yum 源是否存在
yum list | grep nginx

# 安装 nginx
yum install nginx

# version
nginx -v

# 查看 Nginx 的安装目录：rpm 是linux的rpm包管理工具，-q 代表询问模式，-l 代表返回列表
rpm -ql nginx

# 启动 nginx 服务 ✨
nginx

# 查看服务状态
ps aux | grep nginx

# 停止服务 ✨
nginx -s stop #立即停止服务
nginx -s quit #从容停止服务 进程完成当前工作后再停止

# 重启 nginx
systemctl restart nginx.service

# 重新载入配置文件 ✨
nginx -s reload

# 查看端口号的占用情况
netstat -tlnp
```

## nginx.conf

```bash
# 运行用户，默认即是nginx，可以不进行设置
user nginx;
# Nginx 进程，一般设置为和 CPU 核数一样
worker_processes auto;
# 错误日志存放目录
error_log /var/log/nginx/error.log;
#进程 pid 存放位置
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024; # 单个后台进程的最大并发数
}

http {
    # 设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on; #开启高效传输模式
    tcp_nopush          on; #减少网络报文段的数量
    tcp_nodelay         on; #禁用了Nagle算法，允许小包的发送
    keepalive_timeout   65; # keep-live 超时时间
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types; #文件扩展名与类型映射表
    default_type        application/octet-stream;  #默认文件类型

    # 加载子配置项的目录，自定配置存放的地方 ✨
    include /etc/nginx/conf.d/*.conf;

    server {
      #...
    }
}
```

## nginx.conf.default

```bash
#... 前面还有配置
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80; #配置监听端口
        server_name  localhost; #配置域名

        location / {
            root   html;  #服务默认启动目录
            index  index.html index.htm; #默认访问文件
        }

        error_page   500 502 503 504  /50x.html; #错误状态码的显示页面，配置后需要重启
        location = /50x.html {
            root   html;
        }
    }
}
# Settings for a TLS enabled server....
```

## 访问控制

### 处理错误页面

`error_page` 指令用于自定义错误页面

- `500`，`502`，`503`，`504` 这些就是 HTTP 中最常见的错误代码，/50.html 用于表示当发生上述指定的任意一个错误的时候，都是用网站根目录下的/50.html 文件进行处理。
- 404 Not Found

```bash
root /usr/share/nginx/html; # 根目录
error_page   500 502 503 504  /50x.html;
error_page 404 /404.html;
```

error_page 不仅可以只使用本服务器的资源，还可以使用外部的资源 比如

```bash
error_page  404 https://alvin.run; # 找到文件 跳转到 https://alvin.run
```

### 限制访问

**指令优先级**

我们的服务器只允许特定主机访问，比如内部 OA 系统，或者应用的管理后台系统，更或者是某些应用接口，这时候我们就需要控制一些 IP 访问，我们可以直接在 `location` 里进行配置。

```bash
location / {
        allow  47.112.48.225;
        deny   all;
    }
```

上面的配置表示只允许 `47.112.48.225` 进行访问，其他的 IP 是禁止访问的。

但是如果我们把 `deny all` 指令，移动到 `allow 47.112.48.225` 之前，所有的 IP 都不允许访问。

**复杂访问控制权限匹配**

在工作中，访问权限的控制需求更加复杂，例如，对于网站下的 img（图片目录）是运行所有用户访问，但对于网站下的 admin 目录则只允许公司内部固定 IP 访问。这时候仅靠 deny 和 allow 这两个指令，是无法实现的。我们需要 location 块来完成相关的需求匹配。

```bash
location =/img{
        allow all;
    }
    location =/admin{
        deny all;
    }
```

`=`号代表精确匹配，使用了`=`后是根据其后的模式进行精确匹配。

**使用正则表达式设置访问权限**

禁止访问所有 php 的页面:

```js
 location ~\.php$ {
        deny all;
    }
```

## gizp 配置

```bash
server {
   .....
    gzip on; # 开启压缩
    gzip_buffers 32 4k; # 设置用于处理请求压缩的缓冲区数量和大小
    gzip_comp_level 6; # 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大
    gzip_min_length 200; # 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
   .....
}
```

查看 HTTP 响应头信息。你可以清楚的看见 `Content-Encoding` 为 gzip 类型。

---

推荐文章

[Nginx 从入门到实践，万字详解！](https://juejin.im/post/5ea931866fb9a043815146fb)
