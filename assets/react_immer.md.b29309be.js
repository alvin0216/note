import{_ as s,c as n,o as a,a as l}from"./app.218f227b.js";const i=JSON.parse('{"title":"\u4E0D\u53EF\u53D8\u6570\u636E","description":"","frontmatter":{"title":"\u4E0D\u53EF\u53D8\u6570\u636E","date":"2021-08-31T09:58:29.000Z","sidebar":"auto","tags":["React"],"categories":"React"},"headers":[{"level":2,"title":"\u4E3A\u4EC0\u4E48\u5F3A\u8C03\u4E0D\u53EF\u53D8\u6570\u636E","slug":"\u4E3A\u4EC0\u4E48\u5F3A\u8C03\u4E0D\u53EF\u53D8\u6570\u636E","link":"#\u4E3A\u4EC0\u4E48\u5F3A\u8C03\u4E0D\u53EF\u53D8\u6570\u636E","children":[]},{"level":2,"title":"\u5B9E\u73B0\u7B80\u5355\u7684 immutable","slug":"\u5B9E\u73B0\u7B80\u5355\u7684-immutable","link":"#\u5B9E\u73B0\u7B80\u5355\u7684-immutable","children":[]},{"level":2,"title":"defineProperty vs Proxy","slug":"defineproperty-vs-proxy","link":"#defineproperty-vs-proxy","children":[]}],"relativePath":"react/immer.md","lastUpdated":1661882834000}'),p={name:"react/immer.md"},o=l(`<ul><li><a href="https://es6.ruanyifeng.com/#docs/proxy" target="_blank" rel="noreferrer">\u962E\u4E00\u5CF0 ECMAScript 6 \u5165\u95E8</a></li><li><a href="https://juejin.cn/post/6857319959774265358" target="_blank" rel="noreferrer">\u5E26\u4F60\u91CD\u5B66 ES6 | proxy</a></li><li><a href="https://juejin.cn/post/6859162309449744391" target="_blank" rel="noreferrer">\u5E26\u4F60\u91CD\u5B66 ES6 | Reflect</a></li><li><a href="https://juejin.cn/post/6844903601416978439" target="_blank" rel="noreferrer">\u5B9E\u73B0\u53CC\u5411\u7ED1\u5B9A Proxy \u6BD4 defineproperty \u4F18\u52A3\u5982\u4F55?</a></li></ul><h2 id="\u4E3A\u4EC0\u4E48\u5F3A\u8C03\u4E0D\u53EF\u53D8\u6570\u636E" tabindex="-1">\u4E3A\u4EC0\u4E48\u5F3A\u8C03\u4E0D\u53EF\u53D8\u6570\u636E <a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u5F3A\u8C03\u4E0D\u53EF\u53D8\u6570\u636E" aria-hidden="true">#</a></h2><div class="language-jsx"><button class="copy"></button><span class="lang">jsx</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> React </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">setObj</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">alvin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> others</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> age</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">18</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">setCount</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useState</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hanleClick</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">others</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">99</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setCount</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">prev</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prev</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> (</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&lt;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onClick</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">hanleClick</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;">click</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/&gt;</span></span>
<span class="line"><span style="color:#F07178;">  )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><p>\u5982\u4E0A\uFF0C\u70B9\u51FB\u540E\u5C31\u4F1A\u53D1\u73B0 obj \u5F15\u7528\u6CA1\u53D8\uFF0C\u4F46\u662F <code>obj.others.age</code> \u4FEE\u6539\u4E86\uFF0C\u7136\u540E\u4E5F\u88AB\u91CD\u65B0\u6E32\u67D3\u4E86\uFF0C\u8FD9\u662F\u7531\u4E8E\u8FD9\u5C31\u662F\u5F15\u7528\u7C7B\u578B\u7684\u526F\u4F5C\u7528\u5BFC\u81F4\u7684\u3002</p><p>\u89E3\u51B3\u65B9\u6848</p><ol><li>\u6D45\u590D\u5236\uFF1A\u53EA\u80FD\u590D\u5236\u4E00\u5C42</li><li>\u6DF1\u514B\u9686\uFF1A\u6211\u4EEC\u4E0D\u4EC5\u8981\u8003\u8651\u5230\u6B63\u5219\u3001Symbol\u3001Date \u7B49\u7279\u6B8A\u7C7B\u578B,\u8FD8\u8981\u8003\u8651\u5230\u539F\u578B\u94FE\u548C\u5FAA\u73AF\u5F15\u7528\u7684\u5904\u7406\uFF0C\u6027\u80FD\u6D88\u8017\u5927\uFF01</li><li>\u6DF1\u514B\u9686\u7684\u7684\u6027\u80FD\u76F8\u6BD4\u4E8E\u6D45\u514B\u9686\u5927\u6253\u6298\u6263,\u4F46\u662F\u6D45\u514B\u9686\u53C8\u4E0D\u80FD\u4ECE\u6839\u672C\u4E0A\u675C\u7EDD\u5F15\u7528\u7C7B\u578B\u7684\u526F\u4F5C\u7528\uFF0C\u4F7F\u7528 immutable\uFF1A <ul><li>\u5373\u5982\u679C\u5BF9\u8C61\u6811\u4E2D\u4E00\u4E2A\u8282\u70B9\u53D1\u751F\u53D8\u5316\uFF0C\u53EA\u4FEE\u6539\u8FD9\u4E2A\u8282\u70B9\u548C\u53D7\u5B83\u5F71\u54CD\u7684\u7236\u8282\u70B9\uFF0C\u5176\u5B83\u8282\u70B9\u5219\u8FDB\u884C\u5171\u4EAB\u3002</li></ul></li></ol><h2 id="\u5B9E\u73B0\u7B80\u5355\u7684-immutable" tabindex="-1">\u5B9E\u73B0\u7B80\u5355\u7684 immutable <a class="header-anchor" href="#\u5B9E\u73B0\u7B80\u5355\u7684-immutable" aria-hidden="true">#</a></h2><p><code>immer</code> \u7528\u6CD5\u4E3E\u4F8B\uFF1A <code>const nextState = produce(state, (draft) =&gt; {});</code></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">/** \u6D45\u590D\u5236 */</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">shallowCopy</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">assign</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">assign</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{},</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createState</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">modified</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u662F\u5426\u88AB\u4FEE\u6539</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u76EE\u6807\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">copy</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u62F7\u8D1D\u7684\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">createState</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5BF9\u4E8Eget\u64CD\u4F5C,\u5982\u679C\u76EE\u6807\u5BF9\u8C61\u6CA1\u6709\u88AB\u4FEE\u6539\u76F4\u63A5\u8FD4\u56DE\u539F\u5BF9\u8C61,\u5426\u5219\u8FD4\u56DE\u62F7\u8D1D\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!this.</span><span style="color:#A6ACCD;">modified</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">copy</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5BF9\u4E8Eset\u64CD\u4F5C,\u5982\u679C\u76EE\u6807\u5BF9\u8C61\u6CA1\u88AB\u4FEE\u6539\u90A3\u4E48\u8FDB\u884C\u4FEE\u6539\u64CD\u4F5C,\u5426\u5219\u4FEE\u6539\u62F7\u8D1D\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">set</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!this.</span><span style="color:#A6ACCD;">modified</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">markChanged</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">copy</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u6807\u8BB0\u72B6\u6001\u4E3A\u5DF2\u4FEE\u6539,\u5E76\u62F7\u8D1D</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">markChanged</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!this.</span><span style="color:#A6ACCD;">modified</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">modified</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">copy</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">shallowCopy</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> PROXY_STATE </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Symbol</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">proxy-state</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u63A5\u53D7\u4E00\u4E2A\u76EE\u6807\u5BF9\u8C61\u548C\u4E00\u4E2A\u64CD\u4F5C\u76EE\u6807\u5BF9\u8C61\u7684\u51FD\u6570</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">produce</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">producer</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">store</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createState</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">state</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">proxy</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Proxy</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PROXY_STATE</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">producer</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">proxy</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">proxy</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">PROXY_STATE</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">newState</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">modified</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newState</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">copy</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newState</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> baseState </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">todo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Learn typescript</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">todo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Try immer</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> nextState </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">produce</span><span style="color:#A6ACCD;">(baseState</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">draft</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">draft</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> todo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Tweet about it</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> done</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">draft</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">done</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u8FD9\u91CC\u4F1A\u6539\u5230\u539F\u5C5E\u6027</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(baseState</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nextState)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>\u6267\u884C\u7ED3\u679C\uFF1A</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">todo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Learn typescript</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">todo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Try immer</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">][</span></span>
<span class="line"><span style="color:#A6ACCD;">  (</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">todo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Learn typescript</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">todo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Try immer</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">todo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Tweet about it</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="defineproperty-vs-proxy" tabindex="-1">defineProperty vs Proxy <a class="header-anchor" href="#defineproperty-vs-proxy" aria-hidden="true">#</a></h2><p>\u8FD9\u4E2A\u6CA1\u7279\u522B\u7684\u6DF1\u5165\uFF0C</p><ol><li><code>defineProperty</code> \u65E0\u6CD5\u76D1\u542C\u6570\u7EC4\u53D8\u5316 \u6BD4\u5982 <code>arr[1] = 2</code>; \u5982\u679C\u9700\u8981\u76D1\u542C</li><li><code>defineProperty</code> \u53EA\u80FD\u52AB\u6301\u5BF9\u8C61\u7684\u5C5E\u6027,\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u5BF9\u6BCF\u4E2A\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u8FDB\u884C\u904D\u5386\uFF0C\u5982\u679C\u5C5E\u6027\u503C\u4E5F\u662F\u5BF9\u8C61\u90A3\u4E48\u9700\u8981\u6DF1\u5EA6\u904D\u5386,\u663E\u7136\u80FD\u52AB\u6301\u4E00\u4E2A\u5B8C\u6574\u7684\u5BF9\u8C61\u662F\u66F4\u597D\u7684\u9009\u62E9\u3002</li><li><code>Proxy</code> \u53EF\u4EE5\u76F4\u63A5\u76D1\u542C\u5BF9\u8C61\u800C\u975E\u5C5E\u6027,<code>Proxy</code> \u7684\u52A3\u52BF\u5C31\u662F\u517C\u5BB9\u6027\u95EE\u9898,\u800C\u4E14\u65E0\u6CD5\u7528 <code>polyfill</code> \u78E8\u5E73</li></ol>`,14),e=[o];function t(c,r,F,y,D,A){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
