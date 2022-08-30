import{_ as s,c as n,o as a,a as l}from"./app.218f227b.js";const d=JSON.parse('{"title":"nginx \u57FA\u7840","description":"","frontmatter":{"title":"nginx \u57FA\u7840","date":"2019-07-15T13:00:28.000Z","sidebar":"auto","tags":["nginx","\u6280\u672F\u6F2B\u8C08"],"categories":["\u6280\u672F\u6F2B\u8C08"]},"headers":[{"level":2,"title":"\u57FA\u672C\u64CD\u4F5C","slug":"\u57FA\u672C\u64CD\u4F5C","link":"#\u57FA\u672C\u64CD\u4F5C","children":[]},{"level":2,"title":"nginx.conf","slug":"nginx-conf","link":"#nginx-conf","children":[]},{"level":2,"title":"nginx.conf.default","slug":"nginx-conf-default","link":"#nginx-conf-default","children":[]},{"level":2,"title":"\u8BBF\u95EE\u63A7\u5236","slug":"\u8BBF\u95EE\u63A7\u5236","link":"#\u8BBF\u95EE\u63A7\u5236","children":[{"level":3,"title":"\u5904\u7406\u9519\u8BEF\u9875\u9762","slug":"\u5904\u7406\u9519\u8BEF\u9875\u9762","link":"#\u5904\u7406\u9519\u8BEF\u9875\u9762","children":[]},{"level":3,"title":"\u9650\u5236\u8BBF\u95EE","slug":"\u9650\u5236\u8BBF\u95EE","link":"#\u9650\u5236\u8BBF\u95EE","children":[]}]},{"level":2,"title":"gizp \u914D\u7F6E","slug":"gizp-\u914D\u7F6E","link":"#gizp-\u914D\u7F6E","children":[]}],"relativePath":"devops/nginx/basics.md","lastUpdated":1661883935000}'),p={name:"devops/nginx/basics.md"},e=l(`<h2 id="\u57FA\u672C\u64CD\u4F5C" tabindex="-1">\u57FA\u672C\u64CD\u4F5C <a class="header-anchor" href="#\u57FA\u672C\u64CD\u4F5C" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># \u67E5\u770B yum \u6E90\u662F\u5426\u5B58\u5728</span></span>
<span class="line"><span style="color:#A6ACCD;">yum list </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> grep nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5B89\u88C5 nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">yum install nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># version</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B Nginx \u7684\u5B89\u88C5\u76EE\u5F55\uFF1Arpm \u662Flinux\u7684rpm\u5305\u7BA1\u7406\u5DE5\u5177\uFF0C-q \u4EE3\u8868\u8BE2\u95EE\u6A21\u5F0F\uFF0C-l \u4EE3\u8868\u8FD4\u56DE\u5217\u8868</span></span>
<span class="line"><span style="color:#A6ACCD;">rpm -ql nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u542F\u52A8 nginx \u670D\u52A1 \u2728</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u670D\u52A1\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">ps aux </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> grep nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u505C\u6B62\u670D\u52A1 \u2728</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s stop </span><span style="color:#676E95;">#\u7ACB\u5373\u505C\u6B62\u670D\u52A1</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s quit </span><span style="color:#676E95;">#\u4ECE\u5BB9\u505C\u6B62\u670D\u52A1 \u8FDB\u7A0B\u5B8C\u6210\u5F53\u524D\u5DE5\u4F5C\u540E\u518D\u505C\u6B62</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u91CD\u542F nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart nginx.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u91CD\u65B0\u8F7D\u5165\u914D\u7F6E\u6587\u4EF6 \u2728</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u7AEF\u53E3\u53F7\u7684\u5360\u7528\u60C5\u51B5</span></span>
<span class="line"><span style="color:#A6ACCD;">netstat -tlnp</span></span>
<span class="line"></span></code></pre></div><h2 id="nginx-conf" tabindex="-1">nginx.conf <a class="header-anchor" href="#nginx-conf" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># \u8FD0\u884C\u7528\u6237\uFF0C\u9ED8\u8BA4\u5373\u662Fnginx\uFF0C\u53EF\u4EE5\u4E0D\u8FDB\u884C\u8BBE\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">user nginx</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;"># Nginx \u8FDB\u7A0B\uFF0C\u4E00\u822C\u8BBE\u7F6E\u4E3A\u548C CPU \u6838\u6570\u4E00\u6837</span></span>
<span class="line"><span style="color:#A6ACCD;">worker_processes auto</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;"># \u9519\u8BEF\u65E5\u5FD7\u5B58\u653E\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">error_log /var/log/nginx/error.log</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;">#\u8FDB\u7A0B pid \u5B58\u653E\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">pid /run/nginx.pid</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.</span></span>
<span class="line"><span style="color:#A6ACCD;">include /usr/share/nginx/modules/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.conf</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">events </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    worker_connections 1024</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u5355\u4E2A\u540E\u53F0\u8FDB\u7A0B\u7684\u6700\u5927\u5E76\u53D1\u6570</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">http </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># \u8BBE\u7F6E\u65E5\u5FD7\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">    log_format  main  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">$remote_addr - $remote_user [$time_local] &quot;$request&quot; </span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">$status $body_bytes_sent &quot;$http_referer&quot; </span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    access_log  /var/log/nginx/access.log  main</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    sendfile            on</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u5F00\u542F\u9AD8\u6548\u4F20\u8F93\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">    tcp_nopush          on</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u51CF\u5C11\u7F51\u7EDC\u62A5\u6587\u6BB5\u7684\u6570\u91CF</span></span>
<span class="line"><span style="color:#A6ACCD;">    tcp_nodelay         on</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u7981\u7528\u4E86Nagle\u7B97\u6CD5\uFF0C\u5141\u8BB8\u5C0F\u5305\u7684\u53D1\u9001</span></span>
<span class="line"><span style="color:#A6ACCD;">    keepalive_timeout   65</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># keep-live \u8D85\u65F6\u65F6\u95F4</span></span>
<span class="line"><span style="color:#A6ACCD;">    types_hash_max_size 2048</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    include             /etc/nginx/mime.types</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u6587\u4EF6\u6269\u5C55\u540D\u4E0E\u7C7B\u578B\u6620\u5C04\u8868</span></span>
<span class="line"><span style="color:#A6ACCD;">    default_type        application/octet-stream</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">#\u9ED8\u8BA4\u6587\u4EF6\u7C7B\u578B</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># \u52A0\u8F7D\u5B50\u914D\u7F6E\u9879\u7684\u76EE\u5F55\uFF0C\u81EA\u5B9A\u914D\u7F6E\u5B58\u653E\u7684\u5730\u65B9 \u2728</span></span>
<span class="line"><span style="color:#A6ACCD;">    include /etc/nginx/conf.d/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.conf</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">#...</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="nginx-conf-default" tabindex="-1">nginx.conf.default <a class="header-anchor" href="#nginx-conf-default" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;">#... \u524D\u9762\u8FD8\u6709\u914D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">http </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    include       mime.types</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    default_type  application/octet-stream</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    sendfile        on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    keepalive_timeout  65</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        listen       80</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u914D\u7F6E\u76D1\u542C\u7AEF\u53E3</span></span>
<span class="line"><span style="color:#A6ACCD;">        server_name  localhost</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u914D\u7F6E\u57DF\u540D</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            root   html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">#\u670D\u52A1\u9ED8\u8BA4\u542F\u52A8\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">            index  index.html index.htm</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u9ED8\u8BA4\u8BBF\u95EE\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        error_page   500 502 503 504  /50x.html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#\u9519\u8BEF\u72B6\u6001\u7801\u7684\u663E\u793A\u9875\u9762\uFF0C\u914D\u7F6E\u540E\u9700\u8981\u91CD\u542F</span></span>
<span class="line"><span style="color:#A6ACCD;">        location = /50x.html </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            root   html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"># Settings for a TLS enabled server....</span></span>
<span class="line"></span></code></pre></div><h2 id="\u8BBF\u95EE\u63A7\u5236" tabindex="-1">\u8BBF\u95EE\u63A7\u5236 <a class="header-anchor" href="#\u8BBF\u95EE\u63A7\u5236" aria-hidden="true">#</a></h2><h3 id="\u5904\u7406\u9519\u8BEF\u9875\u9762" tabindex="-1">\u5904\u7406\u9519\u8BEF\u9875\u9762 <a class="header-anchor" href="#\u5904\u7406\u9519\u8BEF\u9875\u9762" aria-hidden="true">#</a></h3><p><code>error_page</code> \u6307\u4EE4\u7528\u4E8E\u81EA\u5B9A\u4E49\u9519\u8BEF\u9875\u9762</p><ul><li><code>500</code>\uFF0C<code>502</code>\uFF0C<code>503</code>\uFF0C<code>504</code> \u8FD9\u4E9B\u5C31\u662F HTTP \u4E2D\u6700\u5E38\u89C1\u7684\u9519\u8BEF\u4EE3\u7801\uFF0C/50.html \u7528\u4E8E\u8868\u793A\u5F53\u53D1\u751F\u4E0A\u8FF0\u6307\u5B9A\u7684\u4EFB\u610F\u4E00\u4E2A\u9519\u8BEF\u7684\u65F6\u5019\uFF0C\u90FD\u662F\u7528\u7F51\u7AD9\u6839\u76EE\u5F55\u4E0B\u7684/50.html \u6587\u4EF6\u8FDB\u884C\u5904\u7406\u3002</li><li>404 Not Found</li></ul><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">root /usr/share/nginx/html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u6839\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">error_page   500 502 503 504  /50x.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">error_page 404 /404.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>error_page \u4E0D\u4EC5\u53EF\u4EE5\u53EA\u4F7F\u7528\u672C\u670D\u52A1\u5668\u7684\u8D44\u6E90\uFF0C\u8FD8\u53EF\u4EE5\u4F7F\u7528\u5916\u90E8\u7684\u8D44\u6E90 \u6BD4\u5982</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">error_page  404 https://alvin.run</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u627E\u5230\u6587\u4EF6 \u8DF3\u8F6C\u5230 https://alvin.run</span></span>
<span class="line"></span></code></pre></div><h3 id="\u9650\u5236\u8BBF\u95EE" tabindex="-1">\u9650\u5236\u8BBF\u95EE <a class="header-anchor" href="#\u9650\u5236\u8BBF\u95EE" aria-hidden="true">#</a></h3><p><strong>\u6307\u4EE4\u4F18\u5148\u7EA7</strong></p><p>\u6211\u4EEC\u7684\u670D\u52A1\u5668\u53EA\u5141\u8BB8\u7279\u5B9A\u4E3B\u673A\u8BBF\u95EE\uFF0C\u6BD4\u5982\u5185\u90E8 OA \u7CFB\u7EDF\uFF0C\u6216\u8005\u5E94\u7528\u7684\u7BA1\u7406\u540E\u53F0\u7CFB\u7EDF\uFF0C\u66F4\u6216\u8005\u662F\u67D0\u4E9B\u5E94\u7528\u63A5\u53E3\uFF0C\u8FD9\u65F6\u5019\u6211\u4EEC\u5C31\u9700\u8981\u63A7\u5236\u4E00\u4E9B IP \u8BBF\u95EE\uFF0C\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u5728 <code>location</code> \u91CC\u8FDB\u884C\u914D\u7F6E\u3002</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        allow  47.112.48.225</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        deny   all</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u4E0A\u9762\u7684\u914D\u7F6E\u8868\u793A\u53EA\u5141\u8BB8 <code>47.112.48.225</code> \u8FDB\u884C\u8BBF\u95EE\uFF0C\u5176\u4ED6\u7684 IP \u662F\u7981\u6B62\u8BBF\u95EE\u7684\u3002</p><p>\u4F46\u662F\u5982\u679C\u6211\u4EEC\u628A <code>deny all</code> \u6307\u4EE4\uFF0C\u79FB\u52A8\u5230 <code>allow 47.112.48.225</code> \u4E4B\u524D\uFF0C\u6240\u6709\u7684 IP \u90FD\u4E0D\u5141\u8BB8\u8BBF\u95EE\u3002</p><p><strong>\u590D\u6742\u8BBF\u95EE\u63A7\u5236\u6743\u9650\u5339\u914D</strong></p><p>\u5728\u5DE5\u4F5C\u4E2D\uFF0C\u8BBF\u95EE\u6743\u9650\u7684\u63A7\u5236\u9700\u6C42\u66F4\u52A0\u590D\u6742\uFF0C\u4F8B\u5982\uFF0C\u5BF9\u4E8E\u7F51\u7AD9\u4E0B\u7684 img\uFF08\u56FE\u7247\u76EE\u5F55\uFF09\u662F\u8FD0\u884C\u6240\u6709\u7528\u6237\u8BBF\u95EE\uFF0C\u4F46\u5BF9\u4E8E\u7F51\u7AD9\u4E0B\u7684 admin \u76EE\u5F55\u5219\u53EA\u5141\u8BB8\u516C\u53F8\u5185\u90E8\u56FA\u5B9A IP \u8BBF\u95EE\u3002\u8FD9\u65F6\u5019\u4EC5\u9760 deny \u548C allow \u8FD9\u4E24\u4E2A\u6307\u4EE4\uFF0C\u662F\u65E0\u6CD5\u5B9E\u73B0\u7684\u3002\u6211\u4EEC\u9700\u8981 location \u5757\u6765\u5B8C\u6210\u76F8\u5173\u7684\u9700\u6C42\u5339\u914D\u3002</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">location =/img{</span></span>
<span class="line"><span style="color:#A6ACCD;">        allow all</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    location =/admin{</span></span>
<span class="line"><span style="color:#A6ACCD;">        deny all</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"></span></code></pre></div><p><code>=</code>\u53F7\u4EE3\u8868\u7CBE\u786E\u5339\u914D\uFF0C\u4F7F\u7528\u4E86<code>=</code>\u540E\u662F\u6839\u636E\u5176\u540E\u7684\u6A21\u5F0F\u8FDB\u884C\u7CBE\u786E\u5339\u914D\u3002</p><p><strong>\u4F7F\u7528\u6B63\u5219\u8868\u8FBE\u5F0F\u8BBE\u7F6E\u8BBF\u95EE\u6743\u9650</strong></p><p>\u7981\u6B62\u8BBF\u95EE\u6240\u6709 php \u7684\u9875\u9762:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;"> location </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">\\</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">php$ </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">deny</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">all</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="gizp-\u914D\u7F6E" tabindex="-1">gizp \u914D\u7F6E <a class="header-anchor" href="#gizp-\u914D\u7F6E" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   .....</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip on</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u5F00\u542F\u538B\u7F29</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_buffers 32 4k</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u8BBE\u7F6E\u7528\u4E8E\u5904\u7406\u8BF7\u6C42\u538B\u7F29\u7684\u7F13\u51B2\u533A\u6570\u91CF\u548C\u5927\u5C0F</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_comp_level 6</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u8BBE\u7F6Egzip\u538B\u7F29\u7EA7\u522B\uFF0C\u7EA7\u522B\u8D8A\u5E95\u538B\u7F29\u901F\u5EA6\u8D8A\u5FEB\u6587\u4EF6\u538B\u7F29\u6BD4\u8D8A\u5C0F\uFF0C\u53CD\u4E4B\u901F\u5EA6\u8D8A\u6162\u6587\u4EF6\u538B\u7F29\u6BD4\u8D8A\u5927</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_min_length 200</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u5F53\u8FD4\u56DE\u5185\u5BB9\u5927\u4E8E\u6B64\u503C\u65F6\u624D\u4F1A\u4F7F\u7528gzip\u8FDB\u884C\u538B\u7F29,\u4EE5K\u4E3A\u5355\u4F4D,\u5F53\u503C\u4E3A0\u65F6\uFF0C\u6240\u6709\u9875\u9762\u90FD\u8FDB\u884C\u538B\u7F29\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_vary on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   .....</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u67E5\u770B HTTP \u54CD\u5E94\u5934\u4FE1\u606F\u3002\u4F60\u53EF\u4EE5\u6E05\u695A\u7684\u770B\u89C1 <code>Content-Encoding</code> \u4E3A gzip \u7C7B\u578B\u3002</p><hr><p>\u63A8\u8350\u6587\u7AE0</p><p><a href="https://juejin.im/post/5ea931866fb9a043815146fb" target="_blank" rel="noreferrer">Nginx \u4ECE\u5165\u95E8\u5230\u5B9E\u8DF5\uFF0C\u4E07\u5B57\u8BE6\u89E3\uFF01</a></p>`,32),o=[e];function c(t,r,i,D,y,C){return a(),n("div",null,o)}const F=s(p,[["render",c]]);export{d as __pageData,F as default};
