import{_ as s,c as a,o as n,a as e}from"./app.218f227b.js";const F=JSON.parse('{"title":"\u8BF7\u6C42\u4F53\u4EE5\u53CA Accept","description":"","frontmatter":{"title":"\u8BF7\u6C42\u4F53\u4EE5\u53CA Accept","date":"2018-09-18T13:00:28.000Z","sidebar":"auto","tags":["http"],"categories":["\u7F51\u7EDC\u534F\u8BAE"]},"headers":[{"level":2,"title":"\u6570\u636E\u683C\u5F0F","slug":"\u6570\u636E\u683C\u5F0F","link":"#\u6570\u636E\u683C\u5F0F","children":[]},{"level":2,"title":"\u538B\u7F29\u65B9\u5F0F","slug":"\u538B\u7F29\u65B9\u5F0F","link":"#\u538B\u7F29\u65B9\u5F0F","children":[]},{"level":2,"title":"\u652F\u6301\u8BED\u8A00","slug":"\u652F\u6301\u8BED\u8A00","link":"#\u652F\u6301\u8BED\u8A00","children":[]},{"level":2,"title":"\u5B57\u7B26\u96C6","slug":"\u5B57\u7B26\u96C6","link":"#\u5B57\u7B26\u96C6","children":[]}],"relativePath":"network-protocol/10.http\u8BF7\u6C42\u4F53\u548C\u8BF7\u6C42\u5934.md","lastUpdated":1661882834000}'),p={name:"network-protocol/10.http\u8BF7\u6C42\u4F53\u548C\u8BF7\u6C42\u5934.md"},l=e(`<h2 id="\u6570\u636E\u683C\u5F0F" tabindex="-1">\u6570\u636E\u683C\u5F0F <a class="header-anchor" href="#\u6570\u636E\u683C\u5F0F" aria-hidden="true">#</a></h2><p>HTTP \u5B83\u652F\u6301\u975E\u5E38\u591A\u7684\u6570\u636E\u683C\u5F0F\uFF0C\u90A3\u4E48\u8FD9\u4E48\u591A\u683C\u5F0F\u7684\u6570\u636E\u4E00\u8D77\u5230\u8FBE\u5BA2\u6237\u7AEF\uFF0C\u5BA2\u6237\u7AEF\u600E\u4E48\u77E5\u9053\u5B83\u7684\u683C\u5F0F\u5462\uFF1F</p><p>\u5177\u4F53\u4F53\u73B0\u5728 <code>MIME</code>(Multipurpose Internet Mail Extensions, \u591A\u7528\u9014\u4E92\u8054\u7F51\u90AE\u4EF6\u6269\u5C55)\u3002\u5B83\u9996\u5148\u7528\u5728\u7535\u5B50\u90AE\u4EF6\u7CFB\u7EDF\u4E2D\uFF0C\u8BA9\u90AE\u4EF6\u53EF\u4EE5\u53D1\u4EFB\u610F\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u8FD9\u5BF9\u4E8E HTTP \u6765\u8BF4\u4E5F\u662F\u901A\u7528\u7684\u3002</p><p>\u56E0\u6B64\uFF0CHTTP \u4ECE <code>MIME type</code> \u53D6\u4E86\u4E00\u90E8\u5206\u6765\u6807\u8BB0\u62A5\u6587 body \u90E8\u5206\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u8FD9\u4E9B\u7C7B\u578B\u4F53\u73B0\u5728 <code>Content-Type</code> \u8FD9\u4E2A\u5B57\u6BB5\uFF0C\u5F53\u7136\u8FD9\u662F\u9488\u5BF9\u4E8E\u53D1\u9001\u7AEF\u800C\u8A00\uFF0C\u63A5\u6536\u7AEF\u60F3\u8981\u6536\u5230\u7279\u5B9A\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u7528 <code>Accept</code> \u5B57\u6BB5\u3002</p><p>\u5177\u4F53\u800C\u8A00\uFF0C\u8FD9\u4E24\u4E2A\u5B57\u6BB5\u7684\u53D6\u503C\u53EF\u4EE5\u5206\u4E3A\u4E0B\u9762\u51E0\u7C7B:</p><ul><li><code>text</code>: text/html, text/plain, text/css \u7B49</li><li><code>image</code>: image/gif, image/jpeg, image/png \u7B49</li><li><code>audio/video</code>: audio/mpeg, video/mp4 \u7B49</li><li><code>application</code>: application/json, application/javascript, application/pdf, application/octet-stream</li></ul><h2 id="\u538B\u7F29\u65B9\u5F0F" tabindex="-1">\u538B\u7F29\u65B9\u5F0F <a class="header-anchor" href="#\u538B\u7F29\u65B9\u5F0F" aria-hidden="true">#</a></h2><p>\u5F53\u7136\u4E00\u822C\u8FD9\u4E9B\u6570\u636E\u90FD\u662F\u4F1A\u8FDB\u884C\u7F16\u7801\u538B\u7F29\u7684\uFF0C\u91C7\u53D6\u4EC0\u4E48\u6837\u7684\u538B\u7F29\u65B9\u5F0F\u5C31\u4F53\u73B0\u5728\u4E86\u53D1\u9001\u65B9\u7684 <code>Content-Encoding</code> \u5B57\u6BB5\u4E0A\uFF0C \u540C\u6837\u7684\uFF0C\u63A5\u6536\u4EC0\u4E48\u6837\u7684\u538B\u7F29\u65B9\u5F0F\u4F53\u73B0\u5728\u4E86\u63A5\u53D7\u65B9\u7684 <code>Accept-Encoding</code> \u5B57\u6BB5\u4E0A\u3002\u8FD9\u4E2A\u5B57\u6BB5\u7684\u53D6\u503C\u6709\u4E0B\u9762\u51E0\u79CD\uFF1A</p><ul><li>gzip\uFF1AGNU zip \u538B\u7F29\u683C\u5F0F\uFF0C\u4E5F\u662F\u4E92\u8054\u7F51\u4E0A\u6700\u6D41\u884C\u7684\u538B\u7F29\u683C\u5F0F\uFF1B</li><li>deflate\uFF1Azlib\uFF08deflate\uFF09\u538B\u7F29\u683C\u5F0F\uFF0C\u6D41\u884C\u7A0B\u5EA6\u4EC5\u6B21\u4E8E gzip\uFF1B</li><li>br\uFF1A\u4E00\u79CD\u4E13\u95E8\u4E3A HTTP \u4F18\u5316\u7684\u65B0\u538B\u7F29\u7B97\u6CD5\uFF08Brotli\uFF09\u3002</li></ul><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// \u53D1\u9001\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">Content</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Encoding</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> gzip</span></span>
<span class="line"><span style="color:#676E95;">// \u63A5\u6536\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">Accept</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Encoding</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> gzip</span></span>
<span class="line"></span></code></pre></div><h2 id="\u652F\u6301\u8BED\u8A00" tabindex="-1">\u652F\u6301\u8BED\u8A00 <a class="header-anchor" href="#\u652F\u6301\u8BED\u8A00" aria-hidden="true">#</a></h2><p>\u5BF9\u4E8E\u53D1\u9001\u65B9\u800C\u8A00\uFF0C\u8FD8\u6709\u4E00\u4E2A <code>Content-Language</code> \u5B57\u6BB5\uFF0C\u5728\u9700\u8981\u5B9E\u73B0\u56FD\u9645\u5316\u7684\u65B9\u6848\u5F53\u4E2D\uFF0C\u53EF\u4EE5\u7528\u6765\u6307\u5B9A\u652F\u6301\u7684\u8BED\u8A00\uFF0C\u5728\u63A5\u53D7\u65B9\u5BF9\u5E94\u7684\u5B57\u6BB5\u4E3A <code>Accept-Language</code>\u3002\u5982:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// \u53D1\u9001\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">Content</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Language</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> zh</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">CN</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> zh</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> en</span></span>
<span class="line"><span style="color:#676E95;">// \u63A5\u6536\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">Accept</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Language</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> zh</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">CN</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> zh</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> en</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5B57\u7B26\u96C6" tabindex="-1">\u5B57\u7B26\u96C6 <a class="header-anchor" href="#\u5B57\u7B26\u96C6" aria-hidden="true">#</a></h2><p>\u6700\u540E\u662F\u4E00\u4E2A\u6BD4\u8F83\u7279\u6B8A\u7684\u5B57\u6BB5, \u5728\u63A5\u6536\u7AEF\u5BF9\u5E94\u4E3A <code>Accept-Charset</code>\uFF0C\u6307\u5B9A\u53EF\u4EE5\u63A5\u53D7\u7684\u5B57\u7B26\u96C6\uFF0C\u800C\u5728\u53D1\u9001\u7AEF\u5E76\u6CA1\u6709\u5BF9\u5E94\u7684 <code>Content-Charset</code>, \u800C\u662F\u76F4\u63A5\u653E\u5728\u4E86 <code>Content-Type</code> \u4E2D\uFF0C\u4EE5 <code>charset</code> \u5C5E\u6027\u6307\u5B9A\u3002\u5982:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// \u53D1\u9001\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">Content</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> charset</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">utf</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">8</span></span>
<span class="line"><span style="color:#676E95;">// \u63A5\u6536\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">Accept</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Charset</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> charset</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">utf</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">8</span></span>
<span class="line"></span></code></pre></div><p>\u6700\u540E\u4EE5\u4E00\u5F20\u56FE\u6765\u603B\u7ED3\u4E00\u4E0B\u5427:</p><p><img src="https://static001.geekbang.org/resource/image/b2/58/b2118315a977969ddfcc7ab9d26cb358.png" alt=""></p>`,18),o=[l];function t(c,r,i,d,D,C){return n(),a("div",null,o)}const A=s(p,[["render",t]]);export{F as __pageData,A as default};
