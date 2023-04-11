import{_ as l,o as i,c as e,N as t}from"./chunks/framework.208f6f3f.js";const _=JSON.parse('{"title":"谈一谈前端工程化","description":"","frontmatter":{"title":"谈一谈前端工程化","date":"2022-03-29T17:10:52.000Z","sidebar":"auto","tags":["前端工程化"],"categories":["前端工程化"]},"headers":[],"relativePath":"devops/index.md","lastUpdated":1681197312000}'),o={name:"devops/index.md"},a=t('<blockquote><p>个人可以理解为是工程化为了<strong>提高开发效率、通过系统化、规范化、可度量的方式运于前端开发、构建、部署、性能以及维护等方面。</strong></p></blockquote><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/devops1.png" alt=""></p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/devops2.png" alt=""></p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/devops3.png" alt=""></p><h2 id="todo" tabindex="-1">TODO <a class="header-anchor" href="#todo" aria-label="Permalink to &quot;TODO&quot;">​</a></h2><ul><li><a href="https://www.zhihu.com/question/24558375" target="_blank" rel="noreferrer">谁能介绍下 web 前端工程化？</a></li><li><a href="https://www.zhihu.com/question/433854153/answer/1713597311" target="_blank" rel="noreferrer">什么是前端工程化？</a></li><li><a href="https://juejin.cn/post/6966119324478079007" target="_blank" rel="noreferrer">从 0 构建自己的脚手架/CLI 知识体系（万字） 🛠</a></li></ul><h2 id="整合" tabindex="-1">整合 <a class="header-anchor" href="#整合" aria-label="Permalink to &quot;整合&quot;">​</a></h2><ul><li><p>性能优化</p><ul><li><ol><li>如何检测</li></ol><ul><li><code>page test</code>: 网站跑分</li><li><code>chrome lighthouse</code>: 谷歌跑分</li><li><code>chrome performance</code>: 谷歌火焰图。内存泄漏分析</li></ul></li><li><ol start="2"><li>怎么根据指标优化</li></ol><ul><li>...</li></ul></li><li><ol start="3"><li>具体的一个优化方案，优化链路</li></ol><ul><li>常见分为编译优化 &amp; 资源加载优化 <ul><li>分析 TTFB，做出 dns 预解析，开启 http2</li><li>图片等静态资源放 cdn</li><li>公用资源打包 external 放 cdn</li><li></li></ul></li></ul></li></ul></li></ul><hr><ul><li><p>错误监控</p><ul><li>错误捕捉方式以及错误类型 <ul><li>try catch 常规的错误，但是捕捉不到 promise 错误</li><li>window.onerror 捕捉异步错误</li><li>unhandledrejection 捕捉 promise 错误</li></ul></li><li>错误上报方式 <ul><li>...</li></ul></li></ul></li></ul><hr><ul><li>前端安全 <ul><li>xss、csrf、 ddos、 sql 注入</li></ul></li></ul><hr><ul><li>低代码平台 <ul><li>技术选型 <ul><li>逻辑编排，模块独立，基于 dsl 协议作为顶层的数据支持</li></ul></li><li>底层原理</li><li>遇到的问题 <ul><li>在物料组件增多的方式，如果加载优化以及支持到开放化的能力</li><li>本地懒加载部分解决了加载优化问题，但是难以做到业务解耦</li><li>动态加载能力（ 技术选型 微前端，mf，umd） <ul><li>微前端配置成本，但是有一套沙箱隔离</li><li>mf 只限制 webpack 工具，难以拓展，也有配置成本</li><li>umd 满足需求 <ul><li>script load</li><li>eval</li><li>eval + with + proxy</li><li>webcomponent</li></ul></li></ul></li></ul></li></ul></li></ul>',14),r=[a];function s(n,c,u,d,p,h){return i(),e("div",null,r)}const f=l(o,[["render",s]]);export{_ as __pageData,f as default};
