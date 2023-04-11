import{_ as s,o as a,c as n,N as l}from"./chunks/framework.208f6f3f.js";const A=JSON.parse('{"title":"ssh 免密登陆服务器配置","description":"","frontmatter":{"title":"ssh 免密登陆服务器配置","date":"2019-07-15T13:00:28.000Z","tags":["ssh","前端工程化"],"categories":["前端工程化"]},"headers":[],"relativePath":"devops/ssh.md","lastUpdated":1681197312000}'),p={name:"devops/ssh.md"},e=l(`<h2 id="创建-ssh-公钥" tabindex="-1">创建 ssh 公钥 <a class="header-anchor" href="#创建-ssh-公钥" aria-label="Permalink to &quot;创建 ssh 公钥&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 进入ssh 查看公钥</span></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa.pub</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 如果不存在 则需要创建公钥</span></span>
<span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">alvin0216@163.com</span></span>
<span class="line"></span></code></pre></div><p>复制完公钥后，我们先登陆进服务器。</p><h2 id="在服务器的-ssh-中添加-authorized-keys" tabindex="-1">在服务器的 ssh 中添加 authorized_keys <a class="header-anchor" href="#在服务器的-ssh-中添加-authorized-keys" aria-label="Permalink to &quot;在服务器的 ssh 中添加 authorized_keys&quot;">​</a></h2><p>在云服务器中进行以下操作：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ls</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 查看是否存在 authorized_keys 文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">vim</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">authorized_keys</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 如果没有的话</span></span>
<span class="line"><span style="color:#FFCB6B;">vim</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/authorized_keys</span></span>
<span class="line"></span></code></pre></div><p>保存我们刚刚复制的公钥</p><h2 id="设置登陆名" tabindex="-1">设置登陆名 <a class="header-anchor" href="#设置登陆名" aria-label="Permalink to &quot;设置登陆名&quot;">​</a></h2><p>在进行完上面的操作后，可以发现登陆服务器已经不需要密码了，但是仍然需要输入 <code>IP</code>。</p><p>此时我们可以通过配置 <code>~/.ssh/config</code> 来做一个别名</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">vim</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">Host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server1</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#FFCB6B;">HostName</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">server1 的ip</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 注意⚠️ 这里不需要加引号 比如直接写上服务器地址 47.112.48.225</span></span>
<span class="line"><span style="color:#FFCB6B;">Host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server2</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#FFCB6B;">HostName</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">server2 的ip</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>然后我们打开控制台，输入</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server1</span></span>
<span class="line"></span></code></pre></div><p>就可以快速登陆服务器了，退出登陆则 <code>control + d</code></p>`,14),o=[e];function t(c,r,i,C,y,h){return a(),n("div",null,o)}const D=s(p,[["render",t]]);export{A as __pageData,D as default};
