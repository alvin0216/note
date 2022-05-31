module.exports = {
  title: "alvin's note",
  description: 'Peace and love...',
  base: process.env.TARGET === 'gh-pages' ? '/note/' : undefined,
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      // { text: '主页', link: '/', icon: 'reco-home' },
      // { text: '动态', link: '/timeline/', icon: 'reco-date' },
      // { text: '关于', link: '/docs/', icon: 'reco-account' },
      { text: 'docs', link: '/docs/main/' },
      { text: 'Javascript', link: '/docs/javascript/' },
      { text: '算法', link: '/docs/algorithm/' },
      { text: '网络协议', link: '/docs/protocol/' },
      { text: '工程化', link: '/docs/devops/talk' },
      { text: '浏览器', link: '/docs/browser/浏览器如何解析html.html' },
      { text: 'React', link: '/docs/react/' },
    ],
    // 博客设置
    blogConfig: {
      category: { location: 12, text: '分类' },
      // tag: { location: 2, text: '标签' },
    },
    sidebar: {
      // TODO coding
      '/docs/main/': [
        '',
        { title: 'HTML', children: ['html/tag', 'html/script', 'html/iframe'] },
        {
          title: 'CSS',
          children: ['css/center', 'css/bfc', 'css/drop-shadow', 'css/transform'],
        },
        {
          title: '杂七杂八',
          children: [
            'awsome/oAuth2',
            'awsome/oAuth2-github',
            {
              title: '🍪 低代码平台',
              children: ['awsome/lowcode/', 'awsome/lowcode/problem'],
            },
            { title: '😍 Typescript', children: ['awsome/typescript/', 'awsome/typescript/react'] },
            { title: '🙃️ 面试系列', children: ['awsome/interview/', 'awsome/interview/hr'] },
          ],
        },
        {
          title: '疑难杂症',
          children: [
            '疑难杂症/canvas 跨域',
            '疑难杂症/url 转为 Base64',
            '疑难杂症/lerna 多包管理发布问题',
            '疑难杂症/nginx gzip 不生效',
            '疑难杂症/iframe 打开全屏无效',
            '疑难杂症/远程组件加载方案',
          ],
        },
      ],

      // TODO react
      '/docs/react/': [
        {
          title: 'React',
          children: ['', 'immer', 'hooks-api', 'mini', 'setState', 'concurrent', 'diff', 'synthetic-event'],
        },
      ],

      // TODO devops
      '/docs/devops/': [
        {
          title: 'Devops',
          children: [
            'talk',
            'grayscale-release',
            'high-concurrency',
            '沙箱的实现方式',
            {
              title: '🍞 包管理',
              children: ['packages/pnpm', 'packages/npm', 'packages/lerna'],
            },
            {
              title: '🔧 持续集成',
              children: ['ci/travis', 'ci/webhooks', 'ci/github-action'],
            },
            {
              title: '🐒 环境配置',
              children: ['config/mac', 'config/ssh', 'config/certificate', 'config/charles'],
            },
            {
              title: '🥣 nginx',
              children: ['nginx/basics', 'nginx/proxy'],
            },
          ],
        },
        {
          title: '性能优化',
          children: ['performance/what-is-perf'],
        },
        {
          title: '打包工具',
          children: ['build/模块联邦', 'build/esbuild'],
        },
        {
          title: '监控系列',
          children: ['monitor/'],
        },
      ],

      // TODO browser
      '/docs/browser/': [
        '浏览器如何解析html',
        'WebComponent',
        {
          title: 'Browser',
          children: [
            'token-cookie-session',
            'cookie',
            'token',
            'cache',
            'safe',
            {
              title: '🔐 浏览器安全',
              children: ['cross-origin', 'xss', 'csrf'],
            },
          ],
        },
      ],

      // TODO algorithm
      '/docs/algorithm/': [
        {
          title: '字符串',
          children: [
            '字符串/千位分隔数',
            '字符串/反转字符串II',
            '字符串/最长不含重复字符的子字符串',
            '字符串/字符串的排列',
            '字符串/最小覆盖子串',
            '字符串/回文系列',
          ],
        },
        {
          title: '数组',
          children: ['数组/两数之和', '数组/合并两个有序数组', '数组/长度最小的子数组', '数组/双指针'],
        },
        {
          title: '链表',
          children: [
            '链表/移除链表元素',
            '链表/删除链表的倒数第n个结点',
            '链表/反转链表',
            '链表/环形链表II',
            '链表/相交链表',
            '链表/k个一组翻转链表',
          ],
        },
        {
          title: '二叉树',
          children: [
            '二叉树/二叉树的遍历方式',
            '二叉树/二叉树的属性',
            '二叉树/二叉树的修改与构造',
            '二叉树/二叉树的修改与构造2',
            '二叉树/求二叉搜索树的属性',
            '二叉树/二叉树的公共祖先',
            '二叉树/二叉树其他题目',
          ],
        },
        {
          title: '动态规划',
          children: [
            '动态规划/动态规划理论基础',
            '动态规划/爬楼梯',
            '动态规划/不同路径',
            '动态规划/打家劫舍系列',
            '动态规划/买卖股票的最佳时机',
            '动态规划/连续',
          ],
        },
        {
          title: '回溯算法',
          children: [
            '回溯/总结',
            '回溯/回溯排列',
            '回溯/回溯分割',
            '回溯/子集',
            '回溯/子集II',
            '回溯/组合总和',
            '回溯/N皇后',
          ],
        },
        {
          title: '贪心算法',
          children: ['贪心算法/贪心入门'],
        },
        {
          title: '深度遍历',
          children: ['深度遍历/岛屿数量', '深度遍历/单词搜索', '深度遍历/螺旋矩阵'],
        },
        {
          title: '算法基础',
          children: [
            'binarySearch',
            'bfs-dfs',
            'math',
            {
              title: '💭 数据结构',
              children: [
                'data-structure/stack',
                'data-structure/queue',
                'data-structure/linkedList',
                'data-structure/set',
                'data-structure/dict-hashtable',
                'data-structure/tree',
                'data-structure/avl',
                'data-structure/graph',
                'data-structure/graph-traverse',
              ],
            },
            {
              title: '👉 排序算法',
              children: [
                'sort/bubbleSort',
                'sort/selectionSort',
                'sort/insertSort',
                'sort/mergeSort',
                'sort/quickSort',
                'sort/shellSort',
                'sort/heapSort',
              ],
            },
            {
              title: '🧠 一些算法思想',
              children: ['method/complexity', 'method/sliding-window', 'method/divide', 'method/shuffle'],
            },
          ],
        },
      ],

      // TODO protocol
      '/docs/protocol/': [
        {
          title: '计算机基础',
          children: [
            '',
            'network-model',
            'dns',
            'cdn',
            {
              title: '💭 TCP',
              children: ['tcp/structure', 'tcp/tcp-udp', 'tcp/handshake', 'tcp/wave', 'tcp/sync-attack'],
            },
            {
              title: '🏷️ HTTP',
              children: [
                'http/structure',
                'http/request-method',
                'http/status-code',
                'http/request-header',
                'http/desc',
                'http/cookie',
                'http/blocking',
              ],
            },
            {
              title: '🤓️ HTTPS',
              children: ['https/https', 'https/tsl', 'https/ca'],
            },
            {
              title: '🐈 HTTP2',
              children: ['http2/http2-vs-http', 'http2/frame', 'http2/http3', 'http2/push'],
            },
          ],
        },
      ],

      // TODO javascript
      '/docs/javascript/': [
        {
          title: 'Javascript',
          children: [
            'awsome',
            'this',
            'closure',
            'prototype',
            'extends',
            'for-of',
            'setTimeout',
            'requestAnimationFrame',
            'data-types',
            'eval',
            'proxy',
          ],
        },
        {
          title: '代码实现系列',
          children: ['achieve/call-apply', 'achieve/bind', 'achieve/promise'],
        },
        {
          title: 'v8 - 引擎工作原理',
          children: [
            'v8/run-js',
            'v8/context-stack',
            'v8/scope',
            'v8/scope-chain',
            'v8/gc',
            'v8/compile',
            'v8/eventloop',
          ],
        },
      ],
    },

    type: 'blog',
    friendLink: require('./friendLink'),
    logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'alvin',
    authorAvatar: '/avatar.png',
    record: '粤ICP备20056911号',
    startYear: '2017',
  },
  locales: {
    '/': { lang: 'zh-CN' },
  },
  markdown: { lineNumbers: false },
  plugins: ['vuepress-plugin-element-tabs', 'demo-container'],
};
