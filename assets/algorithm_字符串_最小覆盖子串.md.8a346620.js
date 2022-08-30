import{_ as s,c as n,o as a,a as l}from"./app.218f227b.js";const i=JSON.parse('{"title":"\u6700\u5C0F\u8986\u76D6\u5B50\u4E32","description":"","frontmatter":{"title":"\u6700\u5C0F\u8986\u76D6\u5B50\u4E32","date":"2022-05-14T10:09:26.000Z","sidebar":"auto","tags":["\u5B57\u7B26\u4E32"],"categories":["leetcode"]},"headers":[{"level":2,"title":"\u601D\u8DEF","slug":"\u601D\u8DEF","link":"#\u601D\u8DEF","children":[]},{"level":2,"title":"\u4EE3\u7801","slug":"\u4EE3\u7801","link":"#\u4EE3\u7801","children":[]}],"relativePath":"algorithm/\u5B57\u7B26\u4E32/\u6700\u5C0F\u8986\u76D6\u5B50\u4E32.md","lastUpdated":1661882834000}'),p={name:"algorithm/\u5B57\u7B26\u4E32/\u6700\u5C0F\u8986\u76D6\u5B50\u4E32.md"},o=l(`<p><a href="https://leetcode.cn/problems/minimum-window-substring" target="_blank" rel="noreferrer">leetcode</a> \u7ED9\u4F60\u4E00\u4E2A\u5B57\u7B26\u4E32 <code>s</code> \u3001\u4E00\u4E2A\u5B57\u7B26\u4E32 <code>t</code> \u3002\u8FD4\u56DE <code>s</code> \u4E2D\u6DB5\u76D6 <code>t</code> \u6240\u6709\u5B57\u7B26\u7684\u6700\u5C0F\u5B50\u4E32\u3002\u5982\u679C <code>s</code> \u4E2D\u4E0D\u5B58\u5728\u6DB5\u76D6 <code>t</code> \u6240\u6709\u5B57\u7B26\u7684\u5B50\u4E32\uFF0C\u5219\u8FD4\u56DE\u7A7A\u5B57\u7B26\u4E32 &quot;&quot; \u3002</p><p>\u6CE8\u610F</p><ul><li>\u5BF9\u4E8E t \u4E2D\u91CD\u590D\u5B57\u7B26\uFF0C\u6211\u4EEC\u5BFB\u627E\u7684\u5B50\u5B57\u7B26\u4E32\u4E2D\u8BE5\u5B57\u7B26\u6570\u91CF\u5FC5\u987B\u4E0D\u5C11\u4E8E t \u4E2D\u8BE5\u5B57\u7B26\u6570\u91CF\u3002</li><li>\u5982\u679C s \u4E2D\u5B58\u5728\u8FD9\u6837\u7684\u5B50\u4E32\uFF0C\u6211\u4EEC\u4FDD\u8BC1\u5B83\u662F\u552F\u4E00\u7684\u7B54\u6848\u3002</li></ul><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1As </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ADOBECODEBANC</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> t </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ABC</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">BANC</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1As </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> t </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">\u8F93\u5165</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> t </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">aa</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">\u8F93\u51FA</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">\u89E3\u91CA</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> t \u4E2D\u4E24\u4E2A\u5B57\u7B26 </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \u5747\u5E94\u5305\u542B\u5728 s \u7684\u5B50\u4E32\u4E2D\uFF0C</span></span>
<span class="line"><span style="color:#A6ACCD;">\u56E0\u6B64\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u5B50\u5B57\u7B26\u4E32\uFF0C\u8FD4\u56DE\u7A7A\u5B57\u7B26\u4E32\u3002</span></span>
<span class="line"></span></code></pre></div><h2 id="\u601D\u8DEF" tabindex="-1">\u601D\u8DEF <a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a></h2><p>\u4F7F\u7528\u6ED1\u52A8\u7A97\u53E3</p><p>\u7528 i,j \u8868\u793A\u6ED1\u52A8\u7A97\u53E3\u7684\u5DE6\u8FB9\u754C\u548C\u53F3\u8FB9\u754C\uFF0C\u901A\u8FC7\u6539\u53D8 i,j \u6765\u6269\u5C55\u548C\u6536\u7F29\u6ED1\u52A8\u7A97\u53E3\uFF0C\u53EF\u4EE5\u60F3\u8C61\u6210\u4E00\u4E2A\u7A97\u53E3\u5728\u5B57\u7B26\u4E32\u4E0A\u6E38\u8D70\uFF0C\u5F53\u8FD9\u4E2A\u7A97\u53E3\u5305\u542B\u7684\u5143\u7D20\u6EE1\u8DB3\u6761\u4EF6\uFF0C\u5373\u5305\u542B\u5B57\u7B26\u4E32 T \u7684\u6240\u6709\u5143\u7D20\uFF0C\u8BB0\u5F55\u4E0B\u8FD9\u4E2A\u6ED1\u52A8\u7A97\u53E3\u7684\u957F\u5EA6 j-i+1\uFF0C\u8FD9\u4E9B\u957F\u5EA6\u4E2D\u7684\u6700\u5C0F\u503C\u5C31\u662F\u8981\u6C42\u7684\u7ED3\u679C\u3002</p><ol><li>\u4E0D\u65AD\u589E\u52A0 j \u4F7F\u6ED1\u52A8\u7A97\u53E3\u589E\u5927\uFF0C\u76F4\u5230\u7A97\u53E3\u5305\u542B\u4E86 T \u7684\u6240\u6709\u5143\u7D20</li><li>\u4E0D\u65AD\u589E\u52A0 i \u4F7F\u6ED1\u52A8\u7A97\u53E3\u7F29\u5C0F\uFF0C\u56E0\u4E3A\u662F\u8981\u6C42\u6700\u5C0F\u5B57\u4E32\uFF0C\u6240\u4EE5\u5C06\u4E0D\u5FC5\u8981\u7684\u5143\u7D20\u6392\u9664\u5728\u5916\uFF0C\u4F7F\u957F\u5EA6\u51CF\u5C0F\uFF0C\u76F4\u5230\u78B0\u5230\u4E00\u4E2A\u5FC5\u987B\u5305\u542B\u7684\u5143\u7D20\uFF0C\u8FD9\u4E2A\u65F6\u5019\u4E0D\u80FD\u518D\u6254\u4E86\uFF0C\u518D\u6254\u5C31\u4E0D\u6EE1\u8DB3\u6761\u4EF6\u4E86\uFF0C\u8BB0\u5F55\u6B64\u65F6\u6ED1\u52A8\u7A97\u53E3\u7684\u957F\u5EA6\uFF0C\u5E76\u4FDD\u5B58\u6700\u5C0F\u503C</li><li>\u8BA9 i \u518D\u589E\u52A0\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u8FD9\u4E2A\u65F6\u5019\u6ED1\u52A8\u7A97\u53E3\u80AF\u5B9A\u4E0D\u6EE1\u8DB3\u6761\u4EF6\u4E86\uFF0C\u90A3\u4E48\u7EE7\u7EED\u4ECE\u6B65\u9AA4\u4E00\u5F00\u59CB\u6267\u884C\uFF0C\u5BFB\u627E\u65B0\u7684\u6EE1\u8DB3\u6761\u4EF6\u7684\u6ED1\u52A8\u7A97\u53E3\uFF0C\u5982\u6B64\u53CD\u590D\uFF0C\u76F4\u5230 j \u8D85\u51FA\u4E86\u5B57\u7B26\u4E32 S \u8303\u56F4\u3002</li></ol><p>\u56FE\u793A</p><p>\u4EE5 S=&quot;DOABECODEBANC&quot;\uFF0CT=&quot;ABC&quot; \u4E3A\u4F8B</p><p>\u521D\u59CB\u72B6\u6001\uFF1A</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/leetcode-76-1.png" alt=""></p><p>\u6B65\u9AA4\u4E00\uFF1A\u4E0D\u65AD\u589E\u52A0 j \u4F7F\u6ED1\u52A8\u7A97\u53E3\u589E\u5927\uFF0C\u76F4\u5230\u7A97\u53E3\u5305\u542B\u4E86 T \u7684\u6240\u6709\u5143\u7D20</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/leetcode-76-2.png" alt=""></p><p>\u6B65\u9AA4\u4E8C\uFF1A\u4E0D\u65AD\u589E\u52A0 i \u4F7F\u6ED1\u52A8\u7A97\u53E3\u7F29\u5C0F\uFF0C\u76F4\u5230\u78B0\u5230\u4E00\u4E2A\u5FC5\u987B\u5305\u542B\u7684\u5143\u7D20 A\uFF0C\u6B64\u65F6\u8BB0\u5F55\u957F\u5EA6\u66F4\u65B0\u7ED3\u679C</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/leetcode-76-3.png" alt=""></p><p>\u6B65\u9AA4\u4E09\uFF1A\u8BA9 i \u518D\u589E\u52A0\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u5F00\u59CB\u5BFB\u627E\u4E0B\u4E00\u4E2A\u6EE1\u8DB3\u6761\u4EF6\u7684\u6ED1\u52A8\u7A97\u53E3</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/leetcode-76-4.png" alt=""></p><h2 id="\u4EE3\u7801" tabindex="-1">\u4EE3\u7801 <a class="header-anchor" href="#\u4EE3\u7801" aria-hidden="true">#</a></h2><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">s</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">t</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> minWindow </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">t</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u53CC\u6307\u9488\u6ED1\u52A8\u7A97\u53E3\u95EE\u9898</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">of</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">t</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">keys</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u53F3\u79FB\u6307\u9488</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">--;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u5982\u679C\u5339\u914D\u5230\u4E00\u4E2A\u5B57\u7B26\uFF0C\u9700\u8981\u518D\u5339\u914D\u7684\u6570\u91CF\u51CF 1</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">--;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">matchStr</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">matchStr</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">matchStr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// \u5982\u679C\u5F53\u524D\u5DE6\u6307\u9488\u5339\u914D\u4E2D\u4E86</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">]] </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">]]</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">// \u6CE8\u610F\uFF01\u8FD9\u91CC count++ \u7684\u6761\u4EF6\u57FA\u4E8E\u5F53\u524D map[s[i]] === 1, \u5426\u5219\u53EF\u80FD\u4F1A\u91CD\u590D</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">]] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><p>\u9700\u8981\u6CE8\u610F\u7684\u7EC6\u8282\u70B9</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> (map[char] </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">) count</span><span style="color:#89DDFF;">--;</span></span>
<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> (map[char] </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) count</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"></span></code></pre></div>`,22),e=[o];function c(t,r,y,F,D,C){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{i as __pageData,d as default};
