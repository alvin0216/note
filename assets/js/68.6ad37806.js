(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{668:function(s,t,a){"use strict";a.r(t);var n=a(7),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("环境 centos + nginx + 阿里云")]),s._v(" "),a("p",[s._v("方式 acme.sh + Let's Encrypt")]),s._v(" "),a("h2",{attrs:{id:"申请证书"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#申请证书"}},[s._v("#")]),s._v(" 申请证书")]),s._v(" "),a("ol",[a("li",[s._v("获取 acme.sh")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" https://get.acme.sh "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("开始获取证书")])]),s._v(" "),a("p",[s._v("请先前往阿里云后台获取 "),a("code",[s._v("App_Key")]),s._v(" 跟 "),a("code",[s._v("App_Secret")]),s._v("，"),a("a",{attrs:{href:"https://ak-console.aliyun.com/#/accesskey",target:"_blank",rel:"noopener noreferrer"}},[s._v("传送门"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("首先添加从阿里云获取的 "),a("code",[s._v("App_Key")]),s._v(" 跟 "),a("code",[s._v("App_Secret")]),s._v(" 到环境变量。")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 比如 我用的 zsh, 则 vim ~/.zshrc, 添加下面这段代码。key、secret 从阿里云那里获取")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Ali_Key")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sdfsdfsdfljlbjkljlkjsdfoiwje"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Ali_Secret")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"jlsdflanljkljlfdsaklkjflsa"')]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" ～/.zshrc "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使配置生效")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 然后执行下面这段代码 alvin.run 是我的域名，需要替换为所需域名")]),s._v("\nacme.sh --issue --dns dns_ali -d alvin.run -d "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*.alvin.run'")]),s._v("\n")])])]),a("p",[s._v("通过线程休眠 120 秒等待 DNS 生效的方式，所以至少需要等待两分钟。")]),s._v(" "),a("p",[s._v("成功的结果：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/certificate.png",alt:""}})]),s._v(" "),a("p",[s._v("到了这一步大功告成，撒花")]),s._v(" "),a("p",[s._v("生成的证书放在该目录下: "),a("code",[s._v("~/acme.sh/alvin.run/")])]),s._v(" "),a("h2",{attrs:{id:"配置-nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置-nginx"}},[s._v("#")]),s._v(" 配置 nginx")]),s._v(" "),a("p",[s._v("在 "),a("code",[s._v("conf.d")]),s._v(" 新建一个配置文件，这里我命名为 "),a("code",[s._v("443.conf")])]),s._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[s._v("server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    listen       443 http2 ssl; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 443 端口 http2 ssl")]),s._v("\n    server_name  alvin.run;\n\n    ssl_certificate      /root/.acme.sh/alvin.run/fullchain.cer; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Nginx所需要ssl_certificate文件")]),s._v("\n    ssl_certificate_key  /root/.acme.sh/alvin.run/alvin.run.key; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#")]),s._v("\n    ssl_trusted_certificate /root/.acme.sh/alvin.run/ca.cer; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#")]),s._v("\n\n    ssl_session_cache    shared"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("SSL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("1m;\n    ssl_session_timeout  5m;\n\n    ssl_ciphers  HIGH"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token tag"}},[s._v("!aNULL:")]),a("span",{pre:!0,attrs:{class:"token tag"}},[s._v("!MD5;")]),s._v("\n    ssl_prefer_server_ciphers  on;\n\n\n    root /work/note/docs/.vuepress/dist; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 项目地址")]),s._v("\n    location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        try_files $uri $uri/ /index.html;\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    gzip on; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 开启压缩")]),s._v("\n    gzip_buffers 32 4k; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置用于处理请求压缩的缓冲区数量和大小")]),s._v("\n    gzip_comp_level 6; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大")]),s._v("\n    gzip_min_length 100; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。")]),s._v("\n    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n    gzip_vary on;\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("如果要配置多个，可以新增配置文件或者直接在一个文件写多个 "),a("code",[s._v("server")]),s._v(", 比如这里")]),s._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[s._v("点击查看配置")]),s._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[s._v("server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    listen       443 http2 ssl; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 443 端口 http2 ssl")]),s._v("\n    server_name  alvin.run;\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#... 这是是上面的配置")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nserver "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这里是新的配置")]),s._v("\n    listen       443 http2 ssl; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 443 端口 http2 ssl")]),s._v("\n    server_name  blog.alvin.run; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 配置二级域名")]),s._v("\n\n    ssl_certificate      /root/.acme.sh/alvin.run/fullchain.cer; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Nginx所需要ssl_certificate文件")]),s._v("\n    ssl_certificate_key  /root/.acme.sh/alvin.run/alvin.run.key; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#")]),s._v("\n    ssl_trusted_certificate /root/.acme.sh/alvin.run/ca.cer; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#")]),s._v("\n\n    ssl_session_cache    shared"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("SSL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("1m;\n    ssl_session_timeout  5m;\n\n    ssl_ciphers  HIGH"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token tag"}},[s._v("!aNULL:")]),a("span",{pre:!0,attrs:{class:"token tag"}},[s._v("!MD5;")]),s._v("\n    ssl_prefer_server_ciphers  on;\n\n\n    root /work/4002"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("react"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("blog/build;\n    location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        try_files $uri $uri/ /index.html;\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    location /api/ "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      proxy_pass http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//localhost"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("6002/; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# proxy_pass 转发服务")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    gzip on; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 开启压缩")]),s._v("\n    gzip_buffers 32 4k; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置用于处理请求压缩的缓冲区数量和大小")]),s._v("\n    gzip_comp_level 6; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大")]),s._v("\n    gzip_min_length 100; "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。")]),s._v("\n    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n    gzip_vary on;\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])])]),s._v(" "),a("h2",{attrs:{id:"http-重定向到-https"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-重定向到-https"}},[s._v("#")]),s._v(" http 重定向到 https")]),s._v(" "),a("p",[s._v("在 "),a("code",[s._v("conf.d")]),s._v(" 新建一个配置文件，这里我命名为 "),a("code",[s._v("80.conf")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  listen "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("301")]),s._v(" https://"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$server_name")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$request_uri")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("最终 "),a("code",[s._v("nginx -s reload")]),s._v("。记得开启 "),a("code",[s._v("443")]),s._v(" 端口")]),s._v(" "),a("hr"),s._v(" "),a("p",[s._v("参考 "),a("a",{attrs:{href:"https://www.cnblogs.com/sage-blog/p/10302934.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("申请 Let's Encrypt 永久免费 SSL 证书"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=e.exports}}]);