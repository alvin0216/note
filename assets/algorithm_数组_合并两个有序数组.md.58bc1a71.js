import{_ as s,c as n,o as a,a as p}from"./app.218f227b.js";const i=JSON.parse('{"title":"\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u6570\u7EC4","description":"","frontmatter":{"title":"\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u6570\u7EC4","date":"2022-05-14T12:15:34.000Z","sidebar":"auto","tags":["\u6570\u7EC4"],"categories":["leetcode"]},"headers":[],"relativePath":"algorithm/\u6570\u7EC4/\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u6570\u7EC4.md","lastUpdated":1661882834000}'),l={name:"algorithm/\u6570\u7EC4/\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u6570\u7EC4.md"},o=p(`<p><a href="https://leetcode.cn/problems/merge-sorted-array" target="_blank" rel="noreferrer">leetcode</a>: \u7ED9\u4F60\u4E24\u4E2A\u6309 \u975E\u9012\u51CF\u987A\u5E8F \u6392\u5217\u7684\u6574\u6570\u6570\u7EC4 \xA0nums1 \u548C nums2\uFF0C\u53E6\u6709\u4E24\u4E2A\u6574\u6570 m \u548C n \uFF0C\u5206\u522B\u8868\u793A nums1 \u548C nums2 \u4E2D\u7684\u5143\u7D20\u6570\u76EE\u3002</p><p>\u8BF7\u4F60 \u5408\u5E76 nums2 \u5230 nums1 \u4E2D\uFF0C\u4F7F\u5408\u5E76\u540E\u7684\u6570\u7EC4\u540C\u6837\u6309 \u975E\u9012\u51CF\u987A\u5E8F \u6392\u5217\u3002</p><p>\u6700\u7EC8\uFF0C\u5408\u5E76\u540E\u6570\u7EC4\u4E0D\u5E94\u7531\u51FD\u6570\u8FD4\u56DE\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u6570\u7EC4 nums1 \u4E2D\u3002\u4E3A\u4E86\u5E94\u5BF9\u8FD9\u79CD\u60C5\u51B5\uFF0Cnums1 \u7684\u521D\u59CB\u957F\u5EA6\u4E3A m + n\uFF0C\u5176\u4E2D\u524D m \u4E2A\u5143\u7D20\u8868\u793A\u5E94\u5408\u5E76\u7684\u5143\u7D20\uFF0C\u540E n \u4E2A\u5143\u7D20\u4E3A 0 \uFF0C\u5E94\u5FFD\u7565\u3002nums2 \u7684\u957F\u5EA6\u4E3A n</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1Anums1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> m </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nums2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> n </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">\u89E3\u91CA\uFF1A\u9700\u8981\u5408\u5E76 [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">] \u548C [</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">] \u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5408\u5E76\u7ED3\u679C\u662F [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">] \uFF0C\u5176\u4E2D\u659C\u4F53\u52A0\u7C97\u6807\u6CE8\u7684\u4E3A nums1 \u4E2D\u7684\u5143\u7D20\u3002</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1Anums1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> m </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nums2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> n </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A[</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">\u89E3\u91CA\uFF1A\u9700\u8981\u5408\u5E76 [</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">] \u548C [] \u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5408\u5E76\u7ED3\u679C\u662F [</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">] \u3002</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u5165\uFF1Anums1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> m </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nums2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> n </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8F93\u51FA\uFF1A[</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">\u89E3\u91CA\uFF1A\u9700\u8981\u5408\u5E76\u7684\u6570\u7EC4\u662F [] \u548C [</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">] \u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5408\u5E76\u7ED3\u679C\u662F [</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">] \u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">\u6CE8\u610F\uFF0C\u56E0\u4E3A m </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> \uFF0C\u6240\u4EE5 nums1 \u4E2D\u6CA1\u6709\u5143\u7D20\u3002nums1 \u4E2D\u4EC5\u5B58\u7684 </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> \u4EC5\u4EC5\u662F\u4E3A\u4E86\u786E\u4FDD\u5408\u5E76\u7ED3\u679C\u53EF\u4EE5\u987A\u5229\u5B58\u653E\u5230 nums1 \u4E2D\u3002</span></span>
<span class="line"></span></code></pre></div><p><a href="https://leetcode.cn/problems/merge-sorted-array/solution/ni-xiang-shuang-zhi-zhen-he-bing-liang-g-ucgj/" target="_blank" rel="noreferrer">\u9898\u89E3</a></p><hr><p>\u601D\u8DEF \u540E\u9762\u5F80\u524D\u5408\u5E76</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/leetcode-88.png" alt=""></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">number[]</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">nums1</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">m</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">number[]</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">nums2</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">n</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> Do not return anything, modify nums1 in-place instead.</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> merge </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">m</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">nums2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">m</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">k</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">nums1</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums2</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;">]) </span><span style="color:#A6ACCD;">nums1</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums1</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums1</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums2</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5230\u6700\u540E nums2 \u8FD8\u6709\u6570\u636E\uFF0C\u7EE7\u7EED\u63D2\u5165 nums1 \u524D\u9762</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">nums1</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums2</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div>`,9),e=[o];function c(t,r,y,F,C,D){return a(),n("div",null,e)}const m=s(l,[["render",c]]);export{i as __pageData,m as default};
