import{_ as t,o as e,c as r,Q as a}from"./chunks/framework.20999013.js";const p=JSON.parse('{"title":"Cookie","description":"","frontmatter":{"title":"Cookie","date":"2020-06-10T16:01:15.000Z"},"headers":[],"relativePath":"safe/cookie.md","lastUpdated":1717400793000}'),o={name:"safe/cookie.md"},i=a('<h2 id="相关属性" tabindex="-1">相关属性 <a class="header-anchor" href="#相关属性" aria-label="Permalink to &quot;相关属性&quot;">​</a></h2><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/cookie3.png" alt=""></p><table><thead><tr><th>Field</th><th>作用</th></tr></thead><tbody><tr><td>httpOnly</td><td>boolean，不能通过 document.cookie 访问到 cookie，有效防止 xss 攻击</td></tr><tr><td>secure</td><td>true, cookie 只会在 https 和 ssl 等安全协议下传输</td></tr><tr><td>samesite</td><td>第三方 cookie 的一些协定</td></tr><tr><td>expires</td><td>绝对过期时间</td></tr><tr><td>max-age</td><td>相对过期时间</td></tr><tr><td>domain</td><td>cookie 的 domain 限制</td></tr><tr><td>path</td><td>限制 cookie 的路由匹配</td></tr></tbody></table><h2 id="samesite" tabindex="-1">SameSite <a class="header-anchor" href="#samesite" aria-label="Permalink to &quot;SameSite&quot;">​</a></h2><table><thead><tr><th>SameSite</th><th>作用</th></tr></thead><tbody><tr><td>Strict</td><td>浏览器完全禁止第三方请求携带 Cookie</td></tr><tr><td>Lax</td><td>就宽松一点了，但是只能在 <strong>get 方法提交表单</strong>况或者 <strong>a 标签发送 get 请求</strong>的情况下可以携带 Cookie，其他情况均不能。</td></tr><tr><td>None</td><td>默认自动携带 Cookie</td></tr></tbody></table><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-label="Permalink to &quot;相关文章&quot;">​</a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies" target="_blank" rel="noreferrer">Cookie</a></li><li><a href="https://juejin.cn/post/6844904115080790023" target="_blank" rel="noreferrer">看完这篇 Session、Cookie、Token，和面试官扯皮就没问题了</a></li><li><a href="https://cloud.tencent.com/developer/article/1751237" target="_blank" rel="noreferrer">概念区分，什么是跨站，什么是跨域</a></li><li><a href="https://juejin.cn/post/6844904095271288840" target="_blank" rel="noreferrer">当 CORS 遇到 SameSite</a></li><li><a href="https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html" target="_blank" rel="noreferrer">阮一峰：Cookie 的 SameSite 属性</a></li><li><a href="https://juejin.cn/post/6844904128557105166" target="_blank" rel="noreferrer">✨ 当浏览器全面禁用三方 Cookie</a></li><li><a href="https://www.youtube.com/watch?v=lrNwwcA9SKs" target="_blank" rel="noreferrer">✨ Chrome 80+以後的第三方 cookie 政策</a></li></ul>',7),d=[i];function l(s,n,c,h,k,_){return e(),r("div",null,d)}const f=t(o,[["render",l]]);export{p as __pageData,f as default};