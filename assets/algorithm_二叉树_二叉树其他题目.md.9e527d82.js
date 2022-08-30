import{_ as s,c as n,o as a,a as l}from"./app.218f227b.js";const i=JSON.parse('{"title":"\u4E8C\u53C9\u6811\u5176\u4ED6\u9898\u76EE","description":"","frontmatter":{"title":"\u4E8C\u53C9\u6811\u5176\u4ED6\u9898\u76EE","date":"2022-05-14T22:22:39.000Z","sidebar":"auto","tags":["\u4E8C\u53C9\u6811"],"categories":["leetcode"]},"headers":[{"level":2,"title":"\u6C42\u6839\u8282\u70B9\u5230\u53F6\u8282\u70B9\u6570\u5B57\u4E4B\u548C","slug":"\u6C42\u6839\u8282\u70B9\u5230\u53F6\u8282\u70B9\u6570\u5B57\u4E4B\u548C","link":"#\u6C42\u6839\u8282\u70B9\u5230\u53F6\u8282\u70B9\u6570\u5B57\u4E4B\u548C","children":[]}],"relativePath":"algorithm/\u4E8C\u53C9\u6811/\u4E8C\u53C9\u6811\u5176\u4ED6\u9898\u76EE.md","lastUpdated":1661882834000}'),p={name:"algorithm/\u4E8C\u53C9\u6811/\u4E8C\u53C9\u6811\u5176\u4ED6\u9898\u76EE.md"},o=l(`<h2 id="\u6C42\u6839\u8282\u70B9\u5230\u53F6\u8282\u70B9\u6570\u5B57\u4E4B\u548C" tabindex="-1">\u6C42\u6839\u8282\u70B9\u5230\u53F6\u8282\u70B9\u6570\u5B57\u4E4B\u548C <a class="header-anchor" href="#\u6C42\u6839\u8282\u70B9\u5230\u53F6\u8282\u70B9\u6570\u5B57\u4E4B\u548C" aria-hidden="true">#</a></h2><p><a href="https://leetcode.cn/problems/sum-root-to-leaf-numbers" target="_blank" rel="noreferrer">leetcode</a></p><p><img src="https://assets.leetcode.com/uploads/2021/02/19/num1tree.jpg" alt=""></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1Aroot </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A</span><span style="color:#F78C6C;">25</span></span>
<span class="line"><span style="color:#A6ACCD;">\u89E3\u91CA\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u8DEF\u5F84 </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> \u4EE3\u8868\u6570\u5B57 </span><span style="color:#F78C6C;">12</span></span>
<span class="line"><span style="color:#A6ACCD;">\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u8DEF\u5F84 </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> \u4EE3\u8868\u6570\u5B57 </span><span style="color:#F78C6C;">13</span></span>
<span class="line"><span style="color:#A6ACCD;">\u56E0\u6B64\uFF0C\u6570\u5B57\u603B\u548C </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">13</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">25</span></span>
<span class="line"></span></code></pre></div><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">TreeNode</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">root</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> sumNumbers </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">sum</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">dfs</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">v</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">val</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">right</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">sum</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Number</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">v</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">dfs</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">left</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">v</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">dfs</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">right</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">v</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">dfs</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">sum</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div>`,5),e=[o];function t(c,r,F,y,D,C){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
