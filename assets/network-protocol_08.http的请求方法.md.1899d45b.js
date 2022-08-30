import{_ as t,c as s,o as a,a as n}from"./app.218f227b.js";const y=JSON.parse('{"title":"\u5982\u4F55\u7406\u89E3 HTTP \u7684\u8BF7\u6C42\u65B9\u6CD5\uFF1F","description":"","frontmatter":{"title":"\u5982\u4F55\u7406\u89E3 HTTP \u7684\u8BF7\u6C42\u65B9\u6CD5\uFF1F","date":"2018-09-19T13:00:28.000Z","sidebar":"auto","tags":["http"],"categories":["\u7F51\u7EDC\u534F\u8BAE"]},"headers":[{"level":2,"title":"GET \u548C POST \u6709\u4EC0\u4E48\u533A\u522B\uFF1F","slug":"get-\u548C-post-\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","link":"#get-\u548C-post-\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","children":[]},{"level":2,"title":"PUT \u548C POST \u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u65B0\u589E\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","slug":"put-\u548C-post-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u65B0\u589E\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","link":"#put-\u548C-post-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u65B0\u589E\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","children":[]},{"level":2,"title":"PUT \u548C PATCH \u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4FEE\u6539\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","slug":"put-\u548C-patch-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4FEE\u6539\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","link":"#put-\u548C-patch-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4FEE\u6539\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F","children":[]}],"relativePath":"network-protocol/08.http\u7684\u8BF7\u6C42\u65B9\u6CD5.md","lastUpdated":1661882834000}'),o={name:"network-protocol/08.http\u7684\u8BF7\u6C42\u65B9\u6CD5.md"},e=n(`<table><thead><tr><th>\u8BF7\u6C42\u65B9\u6CD5</th><th>\u4F5C\u7528</th></tr></thead><tbody><tr><td><code>GET</code></td><td>\u901A\u5E38\u7528\u4E8E\u8BF7\u6C42\u670D\u52A1\u5668\u53D1\u9001\u67D0\u4E9B\u8D44\u6E90</td></tr><tr><td><code>HEAD</code></td><td>\u8BF7\u6C42\u8D44\u6E90\u7684\u5934\u90E8\u4FE1\u606F, \u5E76\u4E14\u8FD9\u4E9B\u5934\u90E8\u4E0E HTTP GET \u65B9\u6CD5\u8BF7\u6C42\u65F6\u8FD4\u56DE\u7684\u4E00\u81F4. \u8BE5\u8BF7\u6C42\u65B9\u6CD5\u7684\u4E00\u4E2A\u4F7F\u7528\u573A\u666F\u662F\u5728\u4E0B\u8F7D\u4E00\u4E2A\u5927\u6587\u4EF6\u524D\u5148\u83B7\u53D6\u5176\u5927\u5C0F\u518D\u51B3\u5B9A\u662F\u5426\u8981\u4E0B\u8F7D, \u4EE5\u6B64\u53EF\u4EE5\u8282\u7EA6\u5E26\u5BBD\u8D44\u6E90</td></tr><tr><td><code>OPTIONS</code></td><td>\u7528\u4E8E\u83B7\u53D6\u76EE\u7684\u8D44\u6E90\u6240\u652F\u6301\u7684\u901A\u4FE1\u9009\u9879</td></tr><tr><td><code>POST</code></td><td>\u53D1\u9001\u6570\u636E\u7ED9\u670D\u52A1\u5668</td></tr><tr><td><code>PUT</code></td><td>\u7528\u4E8E\u65B0\u589E\u8D44\u6E90\u6216\u8005\u4F7F\u7528\u8BF7\u6C42\u4E2D\u7684\u6709\u6548\u8D1F\u8F7D\u66FF\u6362\u76EE\u6807\u8D44\u6E90\u7684\u8868\u73B0\u5F62\u5F0F</td></tr><tr><td><code>DELETE</code></td><td>\u7528\u4E8E\u5220\u9664\u6307\u5B9A\u7684\u8D44\u6E90</td></tr><tr><td><code>PATCH</code></td><td>\u7528\u4E8E\u5BF9\u8D44\u6E90\u8FDB\u884C\u90E8\u5206\u4FEE\u6539</td></tr><tr><td><code>CONNECT</code></td><td>HTTP/1.1 \u534F\u8BAE\u4E2D\u9884\u7559\u7ED9\u80FD\u591F\u5C06\u8FDE\u63A5\u6539\u4E3A\u7BA1\u9053\u65B9\u5F0F\u7684\u4EE3\u7406\u670D\u52A1\u5668</td></tr><tr><td><code>TRACE</code></td><td>\u56DE\u663E\u670D\u52A1\u5668\u6536\u5230\u7684\u8BF7\u6C42\uFF0C\u4E3B\u8981\u7528\u4E8E\u6D4B\u8BD5\u6216\u8BCA\u65AD</td></tr></tbody></table><h2 id="get-\u548C-post-\u6709\u4EC0\u4E48\u533A\u522B\uFF1F" tabindex="-1">GET \u548C POST \u6709\u4EC0\u4E48\u533A\u522B\uFF1F <a class="header-anchor" href="#get-\u548C-post-\u6709\u4EC0\u4E48\u533A\u522B\uFF1F" aria-hidden="true">#</a></h2><table><thead><tr><th>\u89D2\u5EA6</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td><strong>\u7F13\u5B58</strong></td><td>GET \u8BF7\u6C42\u4F1A\u88AB\u6D4F\u89C8\u5668\u4E3B\u52A8\u7F13\u5B58\u4E0B\u6765\uFF0C\u7559\u4E0B\u5386\u53F2\u8BB0\u5F55\uFF0C\u800C POST \u9ED8\u8BA4\u4E0D\u4F1A\u3002</td></tr><tr><td><strong>\u7F16\u7801</strong></td><td>GET \u53EA\u80FD\u8FDB\u884C URL \u7F16\u7801\uFF0C\u53EA\u80FD\u63A5\u6536 ASCII \u5B57\u7B26\uFF0C\u800C POST \u6CA1\u6709\u9650\u5236\u3002</td></tr><tr><td><strong>\u53C2\u6570</strong></td><td>GET \u4E00\u822C\u653E\u5728 URL \u4E2D\uFF0C\u56E0\u6B64\u4E0D\u5B89\u5168\uFF0CPOST \u653E\u5728\u8BF7\u6C42\u4F53\u4E2D\uFF0C\u66F4\u9002\u5408\u4F20\u8F93\u654F\u611F\u4FE1\u606F\u3002</td></tr><tr><td><strong>\u5E42\u7B49\u6027</strong></td><td>GET \u662F\u5E42\u7B49\u7684\uFF0C\u800C POST \u4E0D\u662F\u3002</td></tr></tbody></table><details class="details custom-block"><summary>\u4EC0\u4E48\u662F\u5E42\u7B49\uFF1F</summary><p>\u5E42\u7B49\u7684\u6982\u5FF5\u662F\u6307\u540C\u4E00\u4E2A\u8BF7\u6C42\u65B9\u6CD5\u6267\u884C\u591A\u6B21\u548C\u4EC5\u6267\u884C\u4E00\u6B21\u7684\u6548\u679C\u5B8C\u5168\u76F8\u540C\u3002</p><p>\u6BD4\u5982 get \u83B7\u53D6\u8D44\u6E90\uFF0Cget \u51E0\u6B21\u90FD\u4E0D\u4F1A\u670D\u52A1\u5668\u90FD\u4E0D\u4F1A\u53D1\u751F\u53D8\u5316\uFF0C\u800C POST \u4E0A\u4F20\u6570\u636E\uFF0C\u4F1A\u65B0\u589E\u8D44\u6E90\u3002</p><ul><li>\u6309\u7167 RFC \u91CC\u7684\u8BED\u4E49\uFF0CPOST \u662F\u201C\u65B0\u589E\u6216\u63D0\u4EA4\u6570\u636E\u201D\uFF0C\u591A\u6B21\u63D0\u4EA4\u6570\u636E\u4F1A\u521B\u5EFA\u591A\u4E2A\u8D44\u6E90\uFF0C\u6240\u4EE5\u4E0D\u662F\u5E42\u7B49\u7684\uFF1B</li><li>\u800C PUT \u662F\u201C\u66FF\u6362\u6216\u66F4\u65B0\u6570\u636E\u201D\uFF0C\u591A\u6B21\u66F4\u65B0\u4E00\u4E2A\u8D44\u6E90\uFF0C\u8D44\u6E90\u8FD8\u662F\u4F1A\u7B2C\u4E00\u6B21\u66F4\u65B0\u7684\u72B6\u6001\uFF0C\u6240\u4EE5\u662F\u5E42\u7B49\u7684\u3002</li></ul></details><h2 id="put-\u548C-post-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u65B0\u589E\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F" tabindex="-1">PUT \u548C POST \u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u65B0\u589E\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F <a class="header-anchor" href="#put-\u548C-post-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u65B0\u589E\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F" aria-hidden="true">#</a></h2><p>PUT \u548C POST \u65B9\u6CD5\u7684\u533A\u522B\u662F,PUT \u65B9\u6CD5\u662F\u5E42\u7B49\u7684\uFF1A\u8FDE\u7EED\u8C03\u7528\u4E00\u6B21\u6216\u8005\u591A\u6B21\u7684\u6548\u679C\u76F8\u540C\uFF08\u65E0\u526F\u4F5C\u7528\uFF09\uFF0C\u800C POST \u65B9\u6CD5\u662F\u975E\u5E42\u7B49\u7684\u3002</p><p>\u300EPOST \u8868\u793A\u521B\u5EFA\u8D44\u6E90\uFF0CPUT \u8868\u793A\u66F4\u65B0\u8D44\u6E90\u300F\u8FD9\u79CD\u8BF4\u6CD5\u662F\u9519\u8BEF\u7684\uFF0C\u4E24\u4E2A\u90FD\u80FD\u521B\u5EFA\u8D44\u6E90\uFF0C\u6839\u672C\u533A\u522B\u5C31\u5728\u4E8E\u5E42\u7B49\u6027</p><h2 id="put-\u548C-patch-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4FEE\u6539\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F" tabindex="-1">PUT \u548C PATCH \u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4FEE\u6539\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F <a class="header-anchor" href="#put-\u548C-patch-\u90FD\u662F\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4FEE\u6539\u8D44\u6E90\uFF0C\u6709\u4EC0\u4E48\u533A\u522B\uFF1F" aria-hidden="true">#</a></h2><p>PUT \u548C PATCH \u90FD\u662F\u66F4\u65B0\u8D44\u6E90\uFF0C<strong>\u800C PATCH \u7528\u6765\u5BF9\u5DF2\u77E5\u8D44\u6E90\u8FDB\u884C\u5C40\u90E8\u66F4\u65B0</strong>\u3002</p><p>\u6BD4\u5982\u6211\u4EEC\u4FEE\u6539\u4E2A\u4EBA\u4FE1\u606F</p><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alvin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">age</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u8981\u4FEE\u6539\u5E74\u9F84\u65F6</p><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#676E95;">// \u4F7F\u7528 PUT \u8986\u76D6\u8D44\u6E90</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> &#39;alvin&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u4F7F\u7528 PATCH \u5C40\u90E8\u66F4\u65B0</span></span>
<span class="line"><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,13),p=[e];function l(r,d,c,i,T,D){return a(),s("div",null,p)}const C=t(o,[["render",l]]);export{y as __pageData,C as default};
