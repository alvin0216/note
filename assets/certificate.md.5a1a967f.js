import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2c915ec2.js";const h=JSON.parse(`{"title":"申请Let's Encrypt免费SSL证书","description":"","frontmatter":{"title":"申请Let's Encrypt免费SSL证书","date":"2019-07-15T13:00:28.000Z","sidebar":"auto","tags":["SSL证书","前端工程化"],"categories":["前端工程化"]},"headers":[],"relativePath":"certificate.md","lastUpdated":1716905716000}`),p={name:"certificate.md"},e=l(`<p>环境 centos + nginx + 阿里云</p><p>方式 acme.sh + Let&#39;s Encrypt</p><h2 id="申请证书" tabindex="-1">申请证书 <a class="header-anchor" href="#申请证书" aria-label="Permalink to &quot;申请证书&quot;">​</a></h2><ol><li>获取 acme.sh</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://get.acme.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">sh</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>开始获取证书</li></ol><p>请先前往阿里云后台获取 <code>App_Key</code> 跟 <code>App_Secret</code>，<a href="https://ak-console.aliyun.com/#/accesskey" target="_blank" rel="noreferrer">传送门</a></p><p>首先添加从阿里云获取的 <code>App_Key</code> 跟 <code>App_Secret</code> 到环境变量。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 比如 我用的 zsh, 则 vim ~/.zshrc, 添加下面这段代码。key、secret 从阿里云那里获取</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> Ali_Key</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sdfsdfsdfljlbjkljlkjsdfoiwje</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> Ali_Secret</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">jlsdflanljkljlfdsaklkjflsa</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">source</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">～/.zshrc</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 使配置生效</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 然后执行下面这段代码 alvin.run 是我的域名，需要替换为所需域名</span></span>
<span class="line"><span style="color:#FFCB6B;">acme.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--issue</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--dns</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dns_ali</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">alvin.run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">*.alvin.run</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>通过线程休眠 120 秒等待 DNS 生效的方式，所以至少需要等待两分钟。</p><p>成功的结果：</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/certificate.png" alt=""></p><p>到了这一步大功告成，撒花</p><p>生成的证书放在该目录下: <code>~/acme.sh/alvin.run/</code></p><h2 id="配置-nginx" tabindex="-1">配置 nginx <a class="header-anchor" href="#配置-nginx" aria-label="Permalink to &quot;配置 nginx&quot;">​</a></h2><p>在 <code>conf.d</code> 新建一个配置文件，这里我命名为 <code>443.conf</code></p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C3E88D;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">listen       443 http2 ssl;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 443 端口 http2 ssl</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">server_name  alvin.run;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_certificate      /root/.acme.sh/alvin.run/fullchain.cer;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># Nginx所需要ssl_certificate文件</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_certificate_key  /root/.acme.sh/alvin.run/alvin.run.key;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_trusted_certificate /root/.acme.sh/alvin.run/ca.cer;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_session_timeout  5m;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_prefer_server_ciphers  on;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">root /work/note/docs/.vuepress/dist;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 项目地址</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip on;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 开启压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_buffers 32 4k;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 设置用于处理请求压缩的缓冲区数量和大小</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_comp_level 6;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_min_length 100;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_vary on;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><p>如果要配置多个，可以新增配置文件或者直接在一个文件写多个 <code>server</code>, 比如这里</p><details class="details custom-block"><summary>点击查看配置</summary><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#C3E88D;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">listen       443 http2 ssl;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 443 端口 http2 ssl</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">server_name  alvin.run;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">#... 这是是上面的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">server {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 这里是新的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">listen       443 http2 ssl;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 443 端口 http2 ssl</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">server_name  blog.alvin.run;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 配置二级域名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_certificate      /root/.acme.sh/alvin.run/fullchain.cer;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># Nginx所需要ssl_certificate文件</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_certificate_key  /root/.acme.sh/alvin.run/alvin.run.key;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_trusted_certificate /root/.acme.sh/alvin.run/ca.cer;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_session_timeout  5m;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">ssl_prefer_server_ciphers  on;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">root /work/4002-react-blog/build;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">location /api/ {</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#C3E88D;">proxy_pass http://localhost:6002/;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># proxy_pass 转发服务</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip on;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 开启压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_buffers 32 4k;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 设置用于处理请求压缩的缓冲区数量和大小</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_comp_level 6;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_min_length 100;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">gzip_vary on;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div></details><h2 id="http-重定向到-https" tabindex="-1">http 重定向到 https <a class="header-anchor" href="#http-重定向到-https" aria-label="Permalink to &quot;http 重定向到 https&quot;">​</a></h2><p>在 <code>conf.d</code> 新建一个配置文件，这里我命名为 <code>80.conf</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">listen</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">301</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://</span><span style="color:#A6ACCD;">$server_name$request_uri</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><p>最终 <code>nginx -s reload</code>。记得开启 <code>443</code> 端口</p><hr><p>参考 <a href="https://www.cnblogs.com/sage-blog/p/10302934.html" target="_blank" rel="noreferrer">申请 Let&#39;s Encrypt 永久免费 SSL 证书</a></p>`,25),o=[e];function t(c,r,i,y,C,A){return n(),a("div",null,o)}const d=s(p,[["render",t]]);export{h as __pageData,d as default};
