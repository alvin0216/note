import{_ as s,o as a,c as n,N as l}from"./chunks/framework.208f6f3f.js";const F=JSON.parse('{"title":"Mac 常用命令","description":"","frontmatter":{"title":"Mac 常用命令","date":"2019-07-15T13:00:28.000Z","sidebar":"auto","tags":["前端工程化"],"categories":["前端工程化"]},"headers":[],"relativePath":"devops/mac.md","lastUpdated":1682518848000}'),p={name:"devops/mac.md"},o=l(`<p>:::: tabs</p><p>::: tab linux 命令</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">lsof</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i:4040</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 查看 4040 端口占用情况</span></span>
<span class="line"><span style="color:#82AAFF;">kill</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pid</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 释放进程</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 其他</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 切换 bash 与 zsh</span></span>
<span class="line"><span style="color:#FFCB6B;">chsh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/bash</span></span>
<span class="line"><span style="color:#FFCB6B;">chsh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/zsh</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 获取系统时间 2021-07-22 09:23:33</span></span>
<span class="line"><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">date</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">+%Y-%m-%d %H:%M:%S</span><span style="color:#89DDFF;">&quot;)</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;\${</span><span style="color:#C3E88D;">time</span><span style="color:#89DDFF;">}&quot;</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::: tab 配置 bash 别名</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">vim</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.bash_profile</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">alias</span><span style="color:#A6ACCD;"> dev</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">npm run dev</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">alias</span><span style="color:#A6ACCD;"> start</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">npm run start</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">alias</span><span style="color:#A6ACCD;"> ip</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ifconfig | grep -oE &#39;inet.*netmask&#39; | grep -oE &#39;(\\d+\\.){3}\\d+&#39; | sed -n 2p</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#C792EA;">alias</span><span style="color:#A6ACCD;"> taobao</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">echo --registry=https://registry.npm.taobao.org</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 输出淘宝镜像</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># h 也即 help 的意思</span></span>
<span class="line"><span style="color:#C792EA;">alias</span><span style="color:#A6ACCD;"> h</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">echo alvin 的帮助文档</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">echo \\\\n</span></span>
<span class="line"><span style="color:#C3E88D;">echo scp 命令</span></span>
<span class="line"><span style="color:#C3E88D;">echo 拷贝文件目录到服务器 scp -r \\&lt;filepath\\&gt; \\&lt;remote:filePath\\&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">echo 拷贝文件到服务器 scp \\&lt;filepath\\&gt; \\&lt;remote:filePath\\&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">echo demo: scp /Users/guosw/Desktop/a.js guosw:/code/a.js</span></span>
<span class="line"><span style="color:#C3E88D;">echo 备注：拷贝服务端到本地 只需要调换 filePath 即可</span></span>
<span class="line"><span style="color:#C3E88D;">echo \\\\n</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">echo linux 命令</span></span>
<span class="line"><span style="color:#C3E88D;">echo 关闭端口占用 1. lsof -i:端口号 2. kill -9 PID</span></span>
<span class="line"><span style="color:#C3E88D;">echo 查看某个进程 ps | grep -i mysql</span></span>
<span class="line"><span style="color:#C3E88D;">echo 压缩解压</span></span>
<span class="line"><span style="color:#C3E88D;">echo &quot;  压缩 test文件夹为 test.gz:  tar zcvf ./test.gz ./test&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">echo &quot;  解压 test.gz 到当前目录:  tar zxvf test.gz&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 修改后</span></span>
<span class="line"><span style="color:#82AAFF;">source</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.bash_profile</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::: tab homebrew</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装</span></span>
<span class="line"><span style="color:#FFCB6B;">/usr/bin/ruby</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-e</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># check</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装卸载软件</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">formul</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 安装指定软件</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">uninstall</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">formula</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 卸载指定软件</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 显示所有的已安装的软件</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">search</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">text</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#搜索本地远程仓库的软件，已安装会显示绿色的勾</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 升级软件相关</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 自动升级homebrew</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">outdated</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 检测已经过时的软件</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">upgrade</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 升级所有已过时的软件，即列出的以过时软件</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">upgrade</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">formul</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 升级指定的软件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 清理相关 homebrew再 升级软件时候不会清理相关的旧版本，在软件升级后我们可以使用如下命令清理</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cleanup</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 列出需要清理的内容</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cleanup</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">formul</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 清理指定的软件过时包</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看源</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">brew</span><span style="color:#C3E88D;"> --repo</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span></span>
<span class="line"></span></code></pre></div><p>更换国内源</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">/usr/bin/ruby</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-e</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fsSL https://raw.githubusercontent.com/rgf456/HomebrewInstall/master/install.rb</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::: tab autojump</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">stat </span><span style="color:#676E95;font-style:italic;">// 查看权重</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">改变权重值：</span></span>
<span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">i [权重] </span><span style="color:#676E95;font-style:italic;">// 增加</span></span>
<span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">d [权重] </span><span style="color:#676E95;font-style:italic;">// 减少</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">purge </span><span style="color:#676E95;font-style:italic;">// 去除不存在的路径</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">jco c </span><span style="color:#676E95;font-style:italic;">// 在文件管理器中打开一个子目录</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::::</p><p>Sed 主要用来自动编辑一个或多个文件、简化对文件的反复操作、编写转换程序等.</p><p><a href="https://www.runoob.com/linux/linux-comm-sed.html" target="_blank" rel="noreferrer">Linux sed 命令</a></p>`,18),e=[o];function t(c,r,y,i,C,D){return a(),n("div",null,e)}const E=s(p,[["render",t]]);export{F as __pageData,E as default};
