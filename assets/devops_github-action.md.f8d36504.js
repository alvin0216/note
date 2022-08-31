import{_ as s,c as n,o as a,a as l}from"./app.d0ab8007.js";const u=JSON.parse('{"title":"Github Action \u624B\u8BB0","description":"","frontmatter":{"title":"Github Action \u624B\u8BB0","tags":["\u6301\u7EED\u96C6\u6210","\u524D\u7AEF\u5DE5\u7A0B\u5316"],"categories":["\u524D\u7AEF\u5DE5\u7A0B\u5316"]},"headers":[{"level":2,"title":"\u90E8\u7F72\u5230\u8FDC\u7A0B\u670D\u52A1\u5668","slug":"\u90E8\u7F72\u5230\u8FDC\u7A0B\u670D\u52A1\u5668","link":"#\u90E8\u7F72\u5230\u8FDC\u7A0B\u670D\u52A1\u5668","children":[]},{"level":2,"title":"\u90E8\u7F72 github pages","slug":"\u90E8\u7F72-github-pages","link":"#\u90E8\u7F72-github-pages","children":[]}],"relativePath":"devops/github-action.md","lastUpdated":1661963816000}'),p={name:"devops/github-action.md"},e=l(`<h2 id="\u90E8\u7F72\u5230\u8FDC\u7A0B\u670D\u52A1\u5668" tabindex="-1">\u90E8\u7F72\u5230\u8FDC\u7A0B\u670D\u52A1\u5668 <a class="header-anchor" href="#\u90E8\u7F72\u5230\u8FDC\u7A0B\u670D\u52A1\u5668" aria-hidden="true">#</a></h2><ul><li>\u65B0\u589E <code>.github/workflows/xxx.yaml</code>\uFF0C</li><li>\u914D\u7F6E <code>secrets</code><ul><li><code>Settings -&gt; Secrets</code></li></ul></li></ul><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">name: Deploy </span><span style="color:#676E95;"># \u81EA\u52A8\u90E8\u7F72\u7684\u540D\u79F0</span></span>
<span class="line"><span style="color:#A6ACCD;">on:</span></span>
<span class="line"><span style="color:#A6ACCD;">  push:</span></span>
<span class="line"><span style="color:#A6ACCD;">    branches: </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">main</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">jobs:</span></span>
<span class="line"><span style="color:#A6ACCD;">  build-and-deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">    runs-on: ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - uses: actions/checkout@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Setup node 12</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: actions/setup-node@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          node-version: 12.x</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Build project</span></span>
<span class="line"><span style="color:#A6ACCD;">        run: yarn </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> yarn build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Remove Prev Files</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: appleboy/ssh-action@master </span><span style="color:#676E95;"># \u4F7F\u7528ssh\u94FE\u63A5\u670D\u52A1\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          host: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DEPLOY_HOST </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          username: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DEPLOY_USER </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          password: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DEPLOY_PASSWORD </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          port: 22</span></span>
<span class="line"><span style="color:#A6ACCD;">          script: </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u6E05\u9664\u7F13\u5B58</span></span>
<span class="line"><span style="color:#A6ACCD;">            rm -rf /site/duty</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Deploy to Server</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: hengkx/ssh-deploy@v1.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">        with: </span><span style="color:#676E95;"># \u4EE5\u4E0B\u4E3A\u53C2\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">          HOST: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DEPLOY_HOST </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          USERNAME: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DEPLOY_USER </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          PASSWORD: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.DEPLOY_PASSWORD </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          SOURCE: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dist</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">          TARGET: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/site/duty</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="\u90E8\u7F72-github-pages" tabindex="-1">\u90E8\u7F72 github pages <a class="header-anchor" href="#\u90E8\u7F72-github-pages" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">name: github pages demo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">on:</span></span>
<span class="line"><span style="color:#A6ACCD;">  push:</span></span>
<span class="line"><span style="color:#A6ACCD;">    branches:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - master </span><span style="color:#676E95;"># default branch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">jobs:</span></span>
<span class="line"><span style="color:#A6ACCD;">  deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">    runs-on: ubuntu-18.04</span></span>
<span class="line"><span style="color:#A6ACCD;">    steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - uses: actions/checkout@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">      - run: npm install</span></span>
<span class="line"><span style="color:#A6ACCD;">      - run: npm run build</span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: peaceiris/actions-gh-pages@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          github_token: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">{ secrets.GITHUB_TOKEN </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">          publish_dir: ./docs-dist</span></span>
<span class="line"></span></code></pre></div>`,5),o=[e];function c(t,r,A,i,C,D){return a(),n("div",null,o)}const d=s(p,[["render",c]]);export{u as __pageData,d as default};
