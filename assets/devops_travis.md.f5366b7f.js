import{_ as s,c as n,o as a,a as l}from"./app.218f227b.js";const h=JSON.parse('{"title":"\u4F7F\u7528 travis \u8FDB\u884C\u6301\u7EED\u96C6\u6210","description":"","frontmatter":{"title":"\u4F7F\u7528 travis \u8FDB\u884C\u6301\u7EED\u96C6\u6210","date":"2019-07-15T13:00:30.000Z","sidebar":"auto","tags":["travis","\u6301\u7EED\u96C6\u6210","\u524D\u7AEF\u5DE5\u7A0B\u5316"],"categories":["\u524D\u7AEF\u5DE5\u7A0B\u5316"]},"headers":[{"level":2,"title":"\u4E8B\u524D\u51C6\u5907","slug":"\u4E8B\u524D\u51C6\u5907","link":"#\u4E8B\u524D\u51C6\u5907","children":[]},{"level":2,"title":"\u90E8\u7F72\u5230 github pages","slug":"\u90E8\u7F72\u5230-github-pages","link":"#\u90E8\u7F72\u5230-github-pages","children":[]},{"level":2,"title":"\u914D\u7F6E\u5230 CentOS \u670D\u52A1\u5668","slug":"\u914D\u7F6E\u5230-centos-\u670D\u52A1\u5668","link":"#\u914D\u7F6E\u5230-centos-\u670D\u52A1\u5668","children":[{"level":3,"title":"\u5B89\u88C5 travis","slug":"\u5B89\u88C5-travis","link":"#\u5B89\u88C5-travis","children":[]},{"level":3,"title":"\u6DFB\u52A0 ssh \u94FE\u63A5\u5230\u670D\u52A1\u5668","slug":"\u6DFB\u52A0-ssh-\u94FE\u63A5\u5230\u670D\u52A1\u5668","link":"#\u6DFB\u52A0-ssh-\u94FE\u63A5\u5230\u670D\u52A1\u5668","children":[]},{"level":3,"title":"\u52A0\u5BC6 ssh \u5BC6\u94A5","slug":"\u52A0\u5BC6-ssh-\u5BC6\u94A5","link":"#\u52A0\u5BC6-ssh-\u5BC6\u94A5","children":[]}]},{"level":2,"title":"\u76F8\u5173\u6587\u7AE0","slug":"\u76F8\u5173\u6587\u7AE0","link":"#\u76F8\u5173\u6587\u7AE0","children":[]}],"relativePath":"devops/travis.md","lastUpdated":1661883935000}'),p={name:"devops/travis.md"},e=l(`<h2 id="\u4E8B\u524D\u51C6\u5907" tabindex="-1">\u4E8B\u524D\u51C6\u5907 <a class="header-anchor" href="#\u4E8B\u524D\u51C6\u5907" aria-hidden="true">#</a></h2><p>\u8FDB\u5165 <a href="https://travis-ci.com" target="_blank" rel="noreferrer">travis-ci.com</a>\uFF0C\u767B\u5F55\u4E4B\u540E Github \u7684 repo \u6388\u6743\u7ED9 travis\uFF0C\u6309\u7167\u6307\u793A\u6765\u5373\u53EF\u3002</p><h2 id="\u90E8\u7F72\u5230-github-pages" tabindex="-1">\u90E8\u7F72\u5230 github pages <a class="header-anchor" href="#\u90E8\u7F72\u5230-github-pages" aria-hidden="true">#</a></h2><p>\u5728\u9879\u76EE\u6839\u76EE\u5F55\u914D\u7F6E <code>.travis.yaml</code> \u914D\u7F6E\u6587\u4EF6\uFF0C\u914D\u7F6E <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer">github token</a> \u5230 travis \u9879\u76EE\u7684 settings \u4E2D \u4F5C\u4E3A\u5BC6\u94A5</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">language: node_js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6307\u5B9A NodeJs \u7248\u672C\uFF0C\u4E5F\u53EF\u76F4\u63A5\u8BBE\u4E3A 12</span></span>
<span class="line"><span style="color:#A6ACCD;">node_js:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">stable</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u7F13\u5B58\u4F9D\u8D56</span></span>
<span class="line"><span style="color:#A6ACCD;">cache:</span></span>
<span class="line"><span style="color:#A6ACCD;">  directories:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - node_modules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4F7F\u7528 yarn \u5B89\u88C5</span></span>
<span class="line"><span style="color:#A6ACCD;">install:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - yarn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u8BBE\u7F6E\u9700\u8981\u76D1\u542C\u7684\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;">branches:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - master</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u9700\u8981\u6267\u884C\u7684\u811A\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">script:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - yarn build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">  provider: pages</span></span>
<span class="line"><span style="color:#A6ACCD;">  skip_cleanup: </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">  github_token: </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">github_token </span><span style="color:#676E95;"># Set in the settings page of your repository, as a secure variable</span></span>
<span class="line"><span style="color:#A6ACCD;">  keep_history: </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">  local_dir: public </span><span style="color:#676E95;"># \u6253\u5305\u7684\u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">  on:</span></span>
<span class="line"><span style="color:#A6ACCD;">    branch: master</span></span>
<span class="line"></span></code></pre></div><p>push \u5373\u53EF\u770B\u5230\u6548\u679C</p><h2 id="\u914D\u7F6E\u5230-centos-\u670D\u52A1\u5668" tabindex="-1">\u914D\u7F6E\u5230 CentOS \u670D\u52A1\u5668 <a class="header-anchor" href="#\u914D\u7F6E\u5230-centos-\u670D\u52A1\u5668" aria-hidden="true">#</a></h2><h3 id="\u5B89\u88C5-travis" tabindex="-1">\u5B89\u88C5 travis <a class="header-anchor" href="#\u5B89\u88C5-travis" aria-hidden="true">#</a></h3><p>mac \u4E0B\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># \u5B89\u88C5rvm</span></span>
<span class="line"><span style="color:#A6ACCD;">curl -sSL https://get.rvm.io </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> bash -s stable</span></span>
<span class="line"><span style="color:#676E95;"># \u5B89\u88C5\u5B8C\u6210\u540E\u6D4B\u8BD5\u662F\u5426\u5B89\u88C5\u6210\u529F</span></span>
<span class="line"><span style="color:#A6ACCD;">rvm version</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5B89\u88C5ruby</span></span>
<span class="line"><span style="color:#A6ACCD;">rvm install ruby</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4FEE\u6539\u955C\u50CF\u6E90</span></span>
<span class="line"><span style="color:#A6ACCD;">gem sources -l</span></span>
<span class="line"><span style="color:#A6ACCD;">gem sources --add http://gems.ruby-china.org/ --remove https://rubygems.org/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5B89\u88C5travis\u547D\u4EE4\u884C\u5DE5\u5177</span></span>
<span class="line"><span style="color:#A6ACCD;">gem install travis</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5207\u56DEtravis\u7528\u6237\uFF0C\u6267\u884Ctravis\u547D\u4EE4\u6709\u4EE5\u4E0B\u8F93\u51FA\u8BF4\u660E\u5B89\u88C5\u6210\u529F</span></span>
<span class="line"><span style="color:#A6ACCD;">travis</span></span>
<span class="line"><span style="color:#A6ACCD;">Shell completion not installed. Would you like to install it now</span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">y</span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> y...</span></span>
<span class="line"></span></code></pre></div><h3 id="\u6DFB\u52A0-ssh-\u94FE\u63A5\u5230\u670D\u52A1\u5668" tabindex="-1">\u6DFB\u52A0 ssh \u94FE\u63A5\u5230\u670D\u52A1\u5668 <a class="header-anchor" href="#\u6DFB\u52A0-ssh-\u94FE\u63A5\u5230\u670D\u52A1\u5668" aria-hidden="true">#</a></h3><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">ssh-keygen -t rsa </span><span style="color:#676E95;"># \u4F1A\u751F\u6210 id_rsa \u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u9009\u62E9\u6587\u4EF6\u540D...</span></span>
<span class="line"><span style="color:#A6ACCD;">ssh-copy-id -i .ssh/id_rsa.pub </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u90E8\u7F72\u670D\u52A1\u5668\u7528\u6237\u540D</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">@</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u90E8\u7F72\u670D\u52A1\u5668\u5730\u5740</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;">#  \u6D4B\u8BD5\u4E00\u4E0B SSH \u514D\u5BC6\u767B\u9646</span></span>
<span class="line"><span style="color:#A6ACCD;">ssh </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u90E8\u7F72\u670D\u52A1\u5668\u7528\u6237\u540D</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">@</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u90E8\u7F72\u670D\u52A1\u5668\u5730\u5740</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="\u52A0\u5BC6-ssh-\u5BC6\u94A5" tabindex="-1">\u52A0\u5BC6 ssh \u5BC6\u94A5 <a class="header-anchor" href="#\u52A0\u5BC6-ssh-\u5BC6\u94A5" aria-hidden="true">#</a></h3><p>\u8FDB\u5165\u9879\u76EE\u6839\u76EE\u5F55\uFF0C\u6267\u884C</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># \u767B\u5F55 travis github token \u81EA\u5DF1\u62FF</span></span>
<span class="line"><span style="color:#A6ACCD;">travis login --pro -g </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">github-token</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5C06 ssh \u5BC6\u94A5\u5199\u5165 .travis.yaml</span></span>
<span class="line"><span style="color:#A6ACCD;">travis encrypt-file </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa --add</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u51FA\u73B0\u63D0\u793A\u8F93\u5165 y \u4E4B\u540E\u4F1A\u91CD\u65B0\u683C\u5F0F\u5316 .travis.yaml \u6587\u4EF6\u3002</span></span>
<span class="line"></span></code></pre></div><p>\u767B\u5F55\u7684\u914D\u7F6E\u53EF\u53C2\u8003 <a href="https://github.com/travis-ci/travis.rb/issues/788#issuecomment-750927765" target="_blank" rel="noreferrer">788 issue</a></p><p>\u6253\u5F00 .travis.yaml \u6587\u4EF6\u4F1A\u770B\u5230\u591A\u4E86\u4EE5\u4E0B\u5185\u5BB9</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">before_install:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - openssl aes-256-cbc -K </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">encrypted_</span><span style="color:#89DDFF;">******</span><span style="color:#A6ACCD;">_key -iv </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">encrypted_</span><span style="color:#89DDFF;">******</span><span style="color:#A6ACCD;">_iv</span></span>
<span class="line"><span style="color:#A6ACCD;">    -in id_rsa.enc -out </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa -d</span></span>
<span class="line"></span></code></pre></div><p>\u6DFB\u52A0\u811A\u672C</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">language: node_js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6307\u5B9A NodeJs \u7248\u672C\uFF0C\u4E5F\u53EF\u76F4\u63A5\u8BBE\u4E3A 12</span></span>
<span class="line"><span style="color:#A6ACCD;">node_js:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">stable</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u7F13\u5B58\u4F9D\u8D56</span></span>
<span class="line"><span style="color:#A6ACCD;">cache:</span></span>
<span class="line"><span style="color:#A6ACCD;">  directories:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - node_modules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4F7F\u7528 yarn \u5B89\u88C5</span></span>
<span class="line"><span style="color:#A6ACCD;">install:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - yarn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u8BBE\u7F6E\u9700\u8981\u76D1\u542C\u7684\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;">branches:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - master</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u9700\u8981\u6267\u884C\u7684\u811A\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">script:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - yarn </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">  - yarn build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6DFB\u52A0 SSH \u4FE1\u4EFB\u5217\u8868\uFF08\u670D\u52A1\u5668\u7684IP\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">addons:</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssh_known_hosts:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_ip</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">before_install:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># \u7528\u4E8E ssh \u8FDE\u63A5\u670D\u52A1\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">  - openssl aes-256-cbc -K </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">encrypted_f217180e22ee_key -iv </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">encrypted_f217180e22ee_iv</span></span>
<span class="line"><span style="color:#A6ACCD;">  -in id_rsa.enc -out </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa -d</span></span>
<span class="line"><span style="color:#A6ACCD;">  - chmod 600 </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6267\u884C\u90E8\u7F72\u811A\u672C \uFF08$remote_ip $remote_user $project_dir \u5728 travis \u4E0A\u914D\u7F6E\u5373\u53EF\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">after_success:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - ssh </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_user@</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_ip -o StrictHostKeyChecking=no rm -rf </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">project_dir</span></span>
<span class="line"><span style="color:#A6ACCD;">  - scp -o StrictHostKeyChecking=no -r ./public </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_user@</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_ip:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">project_dir</span></span>
<span class="line"></span></code></pre></div><h2 id="\u76F8\u5173\u6587\u7AE0" tabindex="-1">\u76F8\u5173\u6587\u7AE0 <a class="header-anchor" href="#\u76F8\u5173\u6587\u7AE0" aria-hidden="true">#</a></h2><ul><li><a href="https://www.bluesdream.com/blog/travis-ci-auto-deployment-the-github-project-to-remote-server.html" target="_blank" rel="noreferrer">Travis CI \u81EA\u52A8\u90E8\u7F72 Github \u9879\u76EE\u81F3\u8FDC\u7A0B\u670D\u52A1\u5668</a></li><li><a href="https://juejin.cn/post/6844903570563858445" target="_blank" rel="noreferrer">Travis-CI \u81EA\u52A8\u5316\u6D4B\u8BD5\u5E76\u90E8\u7F72\u81F3\u81EA\u5DF1\u7684 CentOS \u670D\u52A1\u5668</a></li><li><a href="https://juejin.cn/post/6844903808758185998" target="_blank" rel="noreferrer">\u7528 Travis CI \u6253\u9020\u5927\u524D\u7AEF\u6301\u7EED\u96C6\u6210\u548C\u81EA\u52A8\u5316\u90E8\u7F72</a></li></ul>`,22),o=[e];function t(c,r,i,y,C,A){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{h as __pageData,d as default};
