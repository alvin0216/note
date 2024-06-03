import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.20999013.js";const _=JSON.parse('{"title":"nginx gzip 不生效","description":"","frontmatter":{"title":"nginx gzip 不生效","date":"2019-07-15T13:00:28.000Z","sidebar":"auto","tags":["nginx","技术漫谈"],"categories":["技术漫谈"]},"headers":[],"relativePath":"nginx gzip 不生效.md","lastUpdated":1717399453000}'),l={name:"nginx gzip 不生效.md"},o=p(`<p>优化页面的时候，使用 nginx 开启 gzip ，发现并没有什么反映~</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">server</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#BABED8;">   </span><span style="color:#82AAFF;">.....</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">gzip</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">on</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 开启压缩</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">gzip_buffers</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">32</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">4</span><span style="color:#C3E88D;">k</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 设置用于处理请求压缩的缓冲区数量和大小</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">gzip_comp_level</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">gzip_min_length</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">200</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">gzip_types</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">text/plain</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">text/css</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">application/json</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">application/x-javascript</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">text/xml</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">application/xml</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">application/xml+rss</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">text/javascript</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">gzip_vary</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">   </span><span style="color:#82AAFF;">.....</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span>
<span class="line"></span></code></pre></div><p><strong>问题在于 gzip_types 中的 application/x-javascript 需要把 x- 去掉~</strong></p><p>JavaScript 的 MIME 类型通常为“<code>application/x-javascript</code>”, 非 IE 的浏览器认“<code>application/javascript</code>”,用“<code>text/javscript</code>”最通用，因为 type 可以不指定默认是&quot;text/javascript&quot;</p><p><a href="https://www.cnblogs.com/qiangweikang/p/gzip_on.html" target="_blank" rel="noreferrer">nginx gzip on 无效</a></p>`,5),t=[o];function e(c,r,i,y,B,D){return a(),n("div",null,t)}const g=s(l,[["render",e]]);export{_ as __pageData,g as default};
