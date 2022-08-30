import{_ as s,c as n,o as a,a as p}from"./app.218f227b.js";const F=JSON.parse('{"title":"Mac \u5E38\u7528\u547D\u4EE4","description":"","frontmatter":{"title":"Mac \u5E38\u7528\u547D\u4EE4","date":"2019-07-15T13:00:28.000Z","sidebar":"auto","tags":["\u524D\u7AEF\u5DE5\u7A0B\u5316"],"categories":["\u524D\u7AEF\u5DE5\u7A0B\u5316"]},"headers":[],"relativePath":"devops/mac.md","lastUpdated":1661882834000}'),l={name:"devops/mac.md"},o=p(`<p>:::: tabs</p><p>::: tab linux \u547D\u4EE4</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">lsof -i:4040 </span><span style="color:#676E95;"># \u67E5\u770B 4040 \u7AEF\u53E3\u5360\u7528\u60C5\u51B5</span></span>
<span class="line"><span style="color:#82AAFF;">kill</span><span style="color:#A6ACCD;"> pid </span><span style="color:#676E95;"># \u91CA\u653E\u8FDB\u7A0B</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5176\u4ED6</span></span>
<span class="line"><span style="color:#676E95;"># \u5207\u6362 bash \u4E0E zsh</span></span>
<span class="line"><span style="color:#A6ACCD;">chsh -s /bin/bash</span></span>
<span class="line"><span style="color:#A6ACCD;">chsh -s /bin/zsh</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u83B7\u53D6\u7CFB\u7EDF\u65F6\u95F4 2021-07-22 09:23:33</span></span>
<span class="line"><span style="color:#A6ACCD;">time=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">date </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">+%Y-%m-%d %H:%M:%S</span><span style="color:#89DDFF;">&quot;)</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;\${</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">}&quot;</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::: tab \u914D\u7F6E bash \u522B\u540D</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">vim </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.bash_profile</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">alias</span><span style="color:#A6ACCD;"> dev=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">npm run dev</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">alias</span><span style="color:#A6ACCD;"> start=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">npm run start</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">alias</span><span style="color:#A6ACCD;"> ip=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ifconfig | grep -oE &#39;inet.*netmask&#39; | grep -oE &#39;(\\d+\\.){3}\\d+&#39; | sed -n 2p</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#82AAFF;">alias</span><span style="color:#A6ACCD;"> taobao=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">echo --registry=https://registry.npm.taobao.org</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u8F93\u51FA\u6DD8\u5B9D\u955C\u50CF</span></span>
<span class="line"><span style="color:#676E95;"># h \u4E5F\u5373 help \u7684\u610F\u601D</span></span>
<span class="line"><span style="color:#82AAFF;">alias</span><span style="color:#A6ACCD;"> h=</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">echo alvin \u7684\u5E2E\u52A9\u6587\u6863</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">echo \\\\n</span></span>
<span class="line"><span style="color:#C3E88D;">echo scp \u547D\u4EE4</span></span>
<span class="line"><span style="color:#C3E88D;">echo \u62F7\u8D1D\u6587\u4EF6\u76EE\u5F55\u5230\u670D\u52A1\u5668 scp -r \\&lt;filepath\\&gt; \\&lt;remote:filePath\\&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">echo \u62F7\u8D1D\u6587\u4EF6\u5230\u670D\u52A1\u5668 scp \\&lt;filepath\\&gt; \\&lt;remote:filePath\\&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">echo demo: scp /Users/guosw/Desktop/a.js guosw:/code/a.js</span></span>
<span class="line"><span style="color:#C3E88D;">echo \u5907\u6CE8\uFF1A\u62F7\u8D1D\u670D\u52A1\u7AEF\u5230\u672C\u5730 \u53EA\u9700\u8981\u8C03\u6362 filePath \u5373\u53EF</span></span>
<span class="line"><span style="color:#C3E88D;">echo \\\\n</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">echo linux \u547D\u4EE4</span></span>
<span class="line"><span style="color:#C3E88D;">echo \u5173\u95ED\u7AEF\u53E3\u5360\u7528 1. lsof -i:\u7AEF\u53E3\u53F7 2. kill -9 PID</span></span>
<span class="line"><span style="color:#C3E88D;">echo \u67E5\u770B\u67D0\u4E2A\u8FDB\u7A0B ps | grep -i mysql</span></span>
<span class="line"><span style="color:#C3E88D;">echo \u538B\u7F29\u89E3\u538B</span></span>
<span class="line"><span style="color:#C3E88D;">echo &quot;  \u538B\u7F29 test\u6587\u4EF6\u5939\u4E3A test.gz:  tar zcvf ./test.gz ./test&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">echo &quot;  \u89E3\u538B test.gz \u5230\u5F53\u524D\u76EE\u5F55:  tar zxvf test.gz&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4FEE\u6539\u540E</span></span>
<span class="line"><span style="color:#82AAFF;">source</span><span style="color:#A6ACCD;"> .bash_profile</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::: tab homebrew</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># \u5B89\u88C5</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/bin/ruby -e </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># check</span></span>
<span class="line"><span style="color:#A6ACCD;">brew -v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5B89\u88C5\u5378\u8F7D\u8F6F\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">brew install </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">formula</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u5B89\u88C5\u6307\u5B9A\u8F6F\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">brew uninstall </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">formula </span><span style="color:#676E95;"># \u5378\u8F7D\u6307\u5B9A\u8F6F\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">brew list </span><span style="color:#676E95;"># \u663E\u793A\u6240\u6709\u7684\u5DF2\u5B89\u88C5\u7684\u8F6F\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">brew search text </span><span style="color:#676E95;">#\u641C\u7D22\u672C\u5730\u8FDC\u7A0B\u4ED3\u5E93\u7684\u8F6F\u4EF6\uFF0C\u5DF2\u5B89\u88C5\u4F1A\u663E\u793A\u7EFF\u8272\u7684\u52FE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5347\u7EA7\u8F6F\u4EF6\u76F8\u5173</span></span>
<span class="line"><span style="color:#A6ACCD;">brew update </span><span style="color:#676E95;"># \u81EA\u52A8\u5347\u7EA7homebrew</span></span>
<span class="line"><span style="color:#A6ACCD;">brew outdated </span><span style="color:#676E95;"># \u68C0\u6D4B\u5DF2\u7ECF\u8FC7\u65F6\u7684\u8F6F\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">brew upgrade </span><span style="color:#676E95;"># \u5347\u7EA7\u6240\u6709\u5DF2\u8FC7\u65F6\u7684\u8F6F\u4EF6\uFF0C\u5373\u5217\u51FA\u7684\u4EE5\u8FC7\u65F6\u8F6F\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">brew upgrade </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">formula</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u5347\u7EA7\u6307\u5B9A\u7684\u8F6F\u4EF6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6E05\u7406\u76F8\u5173 homebrew\u518D \u5347\u7EA7\u8F6F\u4EF6\u65F6\u5019\u4E0D\u4F1A\u6E05\u7406\u76F8\u5173\u7684\u65E7\u7248\u672C\uFF0C\u5728\u8F6F\u4EF6\u5347\u7EA7\u540E\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u5982\u4E0B\u547D\u4EE4\u6E05\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">brew cleanup -n </span><span style="color:#676E95;"># \u5217\u51FA\u9700\u8981\u6E05\u7406\u7684\u5185\u5BB9</span></span>
<span class="line"><span style="color:#A6ACCD;">brew cleanup </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">formula</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u6E05\u7406\u6307\u5B9A\u7684\u8F6F\u4EF6\u8FC7\u65F6\u5305</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u6E90</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">brew --repo</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">git remote -v</span></span>
<span class="line"></span></code></pre></div><p>\u66F4\u6362\u56FD\u5185\u6E90</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">/usr/bin/ruby -e </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">curl -fsSL https://raw.githubusercontent.com/rgf456/HomebrewInstall/master/install.rb</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::: tab autojump</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">stat </span><span style="color:#676E95;">// \u67E5\u770B\u6743\u91CD</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">\u6539\u53D8\u6743\u91CD\u503C\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">i [\u6743\u91CD] </span><span style="color:#676E95;">// \u589E\u52A0</span></span>
<span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">d [\u6743\u91CD] </span><span style="color:#676E95;">// \u51CF\u5C11</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">j </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">purge </span><span style="color:#676E95;">// \u53BB\u9664\u4E0D\u5B58\u5728\u7684\u8DEF\u5F84</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">jco c </span><span style="color:#676E95;">// \u5728\u6587\u4EF6\u7BA1\u7406\u5668\u4E2D\u6253\u5F00\u4E00\u4E2A\u5B50\u76EE\u5F55</span></span>
<span class="line"></span></code></pre></div><p>:::</p><p>::::</p><p>Sed \u4E3B\u8981\u7528\u6765\u81EA\u52A8\u7F16\u8F91\u4E00\u4E2A\u6216\u591A\u4E2A\u6587\u4EF6\u3001\u7B80\u5316\u5BF9\u6587\u4EF6\u7684\u53CD\u590D\u64CD\u4F5C\u3001\u7F16\u5199\u8F6C\u6362\u7A0B\u5E8F\u7B49.</p><p><a href="https://www.runoob.com/linux/linux-comm-sed.html" target="_blank" rel="noreferrer">Linux sed \u547D\u4EE4</a></p>`,18),e=[o];function c(t,r,i,y,D,C){return a(),n("div",null,e)}const u=s(l,[["render",c]]);export{F as __pageData,u as default};
