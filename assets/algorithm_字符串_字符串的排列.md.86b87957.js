import{_ as s,c as n,o as a,a as l}from"./app.218f227b.js";const i=JSON.parse('{"title":"\u5B57\u7B26\u4E32\u7684\u6392\u5217","description":"","frontmatter":{"title":"\u5B57\u7B26\u4E32\u7684\u6392\u5217","date":"2022-03-31T20:46:00.000Z","sidebar":"auto","tags":["\u5B57\u7B26\u4E32"],"categories":["leetcode"]},"headers":[],"relativePath":"algorithm/\u5B57\u7B26\u4E32/\u5B57\u7B26\u4E32\u7684\u6392\u5217.md","lastUpdated":1661882834000}'),p={name:"algorithm/\u5B57\u7B26\u4E32/\u5B57\u7B26\u4E32\u7684\u6392\u5217.md"},o=l(`<p><a href="https://leetcode.cn/problems/permutation-in-string" target="_blank" rel="noreferrer">567. \u5B57\u7B26\u4E32\u7684\u6392\u5217</a>: \u7ED9\u4F60\u4E24\u4E2A\u5B57\u7B26\u4E32 \xA0<code>s1</code>\xA0 \u548C \xA0<code>s2</code> \uFF0C\u5199\u4E00\u4E2A\u51FD\u6570\u6765\u5224\u65AD <code>s2</code> \u662F\u5426\u5305\u542B <code>s1</code>\xA0 \u7684\u6392\u5217\u3002\u5982\u679C\u662F\uFF0C\u8FD4\u56DE <code>true</code> \uFF1B\u5426\u5219\uFF0C\u8FD4\u56DE <code>false</code> \u3002</p><p>\u6362\u53E5\u8BDD\u8BF4\uFF0Cs1 \u7684\u6392\u5217\u4E4B\u4E00\u662F s2 \u7684 \u5B50\u4E32 \u3002</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1As1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ab</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> s2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eidbaooo</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A</span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">\u89E3\u91CA\uFF1As2 \u5305\u542B s1 </span><span style="color:#82AAFF;">\u7684\u6392\u5217\u4E4B\u4E00</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ba</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1As1</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ab</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> s2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eidboaoo</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A</span><span style="color:#FF9CAC;">false</span></span>
<span class="line"></span></code></pre></div><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">s1</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">s2</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> checkInclusion </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">s1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">s2</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">of</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s1</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">]) </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slider</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">start</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">end</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">end</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s2</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">end</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">slider</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">]) </span><span style="color:#A6ACCD;">slider</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slider</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">char</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">end</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u8C03\u6574\u7A97\u53E3\uFF0C\u5224\u65AD\u5DE6\u4FA7\u7A97\u53E3\u662F\u5426\u8981\u6536\u7F29</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">end</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">start</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">slider</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">s2</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">start</span><span style="color:#F07178;">]]</span><span style="color:#89DDFF;">--;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">start</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">entries</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">every</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">([</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">])</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slider</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div>`,4),e=[o];function c(t,r,y,F,D,C){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{i as __pageData,d as default};
