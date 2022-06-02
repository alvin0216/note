(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{680:function(t,n,s){"use strict";s.r(n);var a=s(7),e=Object(a.a)({},(function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"基本操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基本操作"}},[t._v("#")]),t._v(" 基本操作")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 yum 源是否存在")]),t._v("\nyum list "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装 nginx")]),t._v("\nyum "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# version")]),t._v("\nnginx -v\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 Nginx 的安装目录：rpm 是linux的rpm包管理工具，-q 代表询问模式，-l 代表返回列表")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("rpm")]),t._v(" -ql nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 启动 nginx 服务 ✨")]),t._v("\nnginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看服务状态")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v(" aux "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" nginx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 停止服务 ✨")]),t._v("\nnginx -s stop "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#立即停止服务")]),t._v("\nnginx -s quit "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#从容停止服务 进程完成当前工作后再停止")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重启 nginx")]),t._v("\nsystemctl restart nginx.service\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重新载入配置文件 ✨")]),t._v("\nnginx -s reload\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看端口号的占用情况")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("netstat")]),t._v(" -tlnp\n")])])]),s("h2",{attrs:{id:"nginx-conf"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx-conf"}},[t._v("#")]),t._v(" nginx.conf")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 运行用户，默认即是nginx，可以不进行设置")]),t._v("\nuser nginx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Nginx 进程，一般设置为和 CPU 核数一样")]),t._v("\nworker_processes auto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 错误日志存放目录")]),t._v("\nerror_log /var/log/nginx/error.log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#进程 pid 存放位置")]),t._v("\npid /run/nginx.pid"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.")]),t._v("\ninclude /usr/share/nginx/modules/*.conf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nevents "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    worker_connections "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 单个后台进程的最大并发数")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nhttp "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 设置日志模式")]),t._v("\n    log_format  main  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$remote_addr - $remote_user [$time_local] \"$request\" '")]),t._v("\n                      "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$status $body_bytes_sent \"$http_referer\" '")]),t._v("\n                      "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'"$http_user_agent" "$http_x_forwarded_for"\'')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    access_log  /var/log/nginx/access.log  main"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    sendfile            on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#开启高效传输模式")]),t._v("\n    tcp_nopush          on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#减少网络报文段的数量")]),t._v("\n    tcp_nodelay         on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#禁用了Nagle算法，允许小包的发送")]),t._v("\n    keepalive_timeout   "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("65")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# keep-live 超时时间")]),t._v("\n    types_hash_max_size "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2048")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    include             /etc/nginx/mime.types"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#文件扩展名与类型映射表")]),t._v("\n    default_type        application/octet-stream"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#默认文件类型")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 加载子配置项的目录，自定配置存放的地方 ✨")]),t._v("\n    include /etc/nginx/conf.d/*.conf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    server "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#...")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"nginx-conf-default"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx-conf-default"}},[t._v("#")]),t._v(" nginx.conf.default")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#... 前面还有配置")]),t._v("\nhttp "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    include       mime.types"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    default_type  application/octet-stream"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    sendfile        on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    keepalive_timeout  "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("65")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    server "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        listen       "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#配置监听端口")]),t._v("\n        server_name  localhost"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#配置域名")]),t._v("\n\n        location / "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            root   html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#服务默认启动目录")]),t._v("\n            index  index.html index.htm"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#默认访问文件")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        error_page   "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("502")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("503")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("504")]),t._v("  /50x.html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#错误状态码的显示页面，配置后需要重启")]),t._v("\n        location "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" /50x.html "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            root   html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Settings for a TLS enabled server....")]),t._v("\n")])])]),s("h2",{attrs:{id:"访问控制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#访问控制"}},[t._v("#")]),t._v(" 访问控制")]),t._v(" "),s("h3",{attrs:{id:"处理错误页面"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理错误页面"}},[t._v("#")]),t._v(" 处理错误页面")]),t._v(" "),s("p",[s("code",[t._v("error_page")]),t._v(" 指令用于自定义错误页面")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("500")]),t._v("，"),s("code",[t._v("502")]),t._v("，"),s("code",[t._v("503")]),t._v("，"),s("code",[t._v("504")]),t._v(" 这些就是 HTTP 中最常见的错误代码，/50.html 用于表示当发生上述指定的任意一个错误的时候，都是用网站根目录下的/50.html 文件进行处理。")]),t._v(" "),s("li",[t._v("404 Not Found")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("root /usr/share/nginx/html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 根目录")]),t._v("\nerror_page   "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("502")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("503")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("504")]),t._v("  /50x.html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nerror_page "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("404")]),t._v(" /404.html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("error_page 不仅可以只使用本服务器的资源，还可以使用外部的资源 比如")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("error_page  "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("404")]),t._v(" https://alvin.run"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 找到文件 跳转到 https://alvin.run")]),t._v("\n")])])]),s("h3",{attrs:{id:"限制访问"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#限制访问"}},[t._v("#")]),t._v(" 限制访问")]),t._v(" "),s("p",[s("strong",[t._v("指令优先级")])]),t._v(" "),s("p",[t._v("我们的服务器只允许特定主机访问，比如内部 OA 系统，或者应用的管理后台系统，更或者是某些应用接口，这时候我们就需要控制一些 IP 访问，我们可以直接在 "),s("code",[t._v("location")]),t._v(" 里进行配置。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("location / "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        allow  "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("47.112")]),t._v(".48.225"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        deny   all"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("上面的配置表示只允许 "),s("code",[t._v("47.112.48.225")]),t._v(" 进行访问，其他的 IP 是禁止访问的。")]),t._v(" "),s("p",[t._v("但是如果我们把 "),s("code",[t._v("deny all")]),t._v(" 指令，移动到 "),s("code",[t._v("allow 47.112.48.225")]),t._v(" 之前，所有的 IP 都不允许访问。")]),t._v(" "),s("p",[s("strong",[t._v("复杂访问控制权限匹配")])]),t._v(" "),s("p",[t._v("在工作中，访问权限的控制需求更加复杂，例如，对于网站下的 img（图片目录）是运行所有用户访问，但对于网站下的 admin 目录则只允许公司内部固定 IP 访问。这时候仅靠 deny 和 allow 这两个指令，是无法实现的。我们需要 location 块来完成相关的需求匹配。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("location "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/img"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        allow all"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    location "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/admin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        deny all"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("code",[t._v("=")]),t._v("号代表精确匹配，使用了"),s("code",[t._v("=")]),t._v("后是根据其后的模式进行精确匹配。")]),t._v(" "),s("p",[s("strong",[t._v("使用正则表达式设置访问权限")])]),t._v(" "),s("p",[t._v("禁止访问所有 php 的页面:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v(" location "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),t._v("\\"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("php$ "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        deny all"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"gizp-配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gizp-配置"}},[t._v("#")]),t._v(" gizp 配置")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("server "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("gzip")]),t._v(" on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 开启压缩")]),t._v("\n    gzip_buffers "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),t._v(" 4k"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 设置用于处理请求压缩的缓冲区数量和大小")]),t._v("\n    gzip_comp_level "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大")]),t._v("\n    gzip_min_length "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。")]),t._v("\n    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    gzip_vary on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("查看 HTTP 响应头信息。你可以清楚的看见 "),s("code",[t._v("Content-Encoding")]),t._v(" 为 gzip 类型。")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("推荐文章")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://juejin.im/post/5ea931866fb9a043815146fb",target:"_blank",rel:"noopener noreferrer"}},[t._v("Nginx 从入门到实践，万字详解！"),s("OutboundLink")],1)])])}),[],!1,null,null,null);n.default=e.exports}}]);