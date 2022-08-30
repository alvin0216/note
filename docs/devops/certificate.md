---
title: 申请Let's Encrypt免费SSL证书
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - SSL证书
  - 前端工程化
categories:
  - 前端工程化
---

环境 centos + nginx + 阿里云

方式 acme.sh + Let's Encrypt

## 申请证书

1. 获取 acme.sh

```bash
curl https://get.acme.sh | sh
```

2. 开始获取证书

请先前往阿里云后台获取 `App_Key` 跟 `App_Secret`，[传送门](https://ak-console.aliyun.com/#/accesskey)

首先添加从阿里云获取的 `App_Key` 跟 `App_Secret` 到环境变量。

```bash
# 比如 我用的 zsh, 则 vim ~/.zshrc, 添加下面这段代码。key、secret 从阿里云那里获取
export Ali_Key="sdfsdfsdfljlbjkljlkjsdfoiwje"
export Ali_Secret="jlsdflanljkljlfdsaklkjflsa"

source ～/.zshrc # 使配置生效

# 然后执行下面这段代码 alvin.run 是我的域名，需要替换为所需域名
acme.sh --issue --dns dns_ali -d alvin.run -d '*.alvin.run'
```

通过线程休眠 120 秒等待 DNS 生效的方式，所以至少需要等待两分钟。

成功的结果：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/certificate.png)

到了这一步大功告成，撒花

生成的证书放在该目录下: `~/acme.sh/alvin.run/`

## 配置 nginx

在 `conf.d` 新建一个配置文件，这里我命名为 `443.conf`

```yaml
server {
    listen       443 http2 ssl; # 443 端口 http2 ssl
    server_name  alvin.run;

    ssl_certificate      /root/.acme.sh/alvin.run/fullchain.cer; # Nginx所需要ssl_certificate文件
    ssl_certificate_key  /root/.acme.sh/alvin.run/alvin.run.key; #
    ssl_trusted_certificate /root/.acme.sh/alvin.run/ca.cer; #

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;


    root /work/note/docs/.vuepress/dist; # 项目地址
    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on; # 开启压缩
    gzip_buffers 32 4k; # 设置用于处理请求压缩的缓冲区数量和大小
    gzip_comp_level 6; # 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大
    gzip_min_length 100; # 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
}
```

如果要配置多个，可以新增配置文件或者直接在一个文件写多个 `server`, 比如这里

:::details 点击查看配置

```yaml {10}
server {
    listen       443 http2 ssl; # 443 端口 http2 ssl
    server_name  alvin.run;
    #... 这是是上面的配置
}

server {
    # 这里是新的配置
    listen       443 http2 ssl; # 443 端口 http2 ssl
    server_name  blog.alvin.run; # 配置二级域名

    ssl_certificate      /root/.acme.sh/alvin.run/fullchain.cer; # Nginx所需要ssl_certificate文件
    ssl_certificate_key  /root/.acme.sh/alvin.run/alvin.run.key; #
    ssl_trusted_certificate /root/.acme.sh/alvin.run/ca.cer; #

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;


    root /work/4002-react-blog/build;
    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
      proxy_pass http://localhost:6002/; # proxy_pass 转发服务
    }

    gzip on; # 开启压缩
    gzip_buffers 32 4k; # 设置用于处理请求压缩的缓冲区数量和大小
    gzip_comp_level 6; # 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大
    gzip_min_length 100; # 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
}
```

:::

## http 重定向到 https

在 `conf.d` 新建一个配置文件，这里我命名为 `80.conf`

```bash
server {
  listen 80;
  return 301 https://$server_name$request_uri;
}
```

最终 `nginx -s reload`。记得开启 `443` 端口

---

参考 [申请 Let's Encrypt 永久免费 SSL 证书](https://www.cnblogs.com/sage-blog/p/10302934.html)
