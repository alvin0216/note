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
      { text: '浏览器', link: '/docs/browser/' },
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
        {
          title: '问题 & 解决方案',
          children: [
            'problem/canvas-cross-origin',
            'problem/safe',
            'problem/lerna',
            'problem/gzip',
            'problem/iframe-fullScreen',
          ],
        },
        {
          title: 'Awsome',
          children: [
            'awsome/oAuth2',
            'awsome/oAuth2-github',
            {
              title: '🍪 低代码平台',
              children: ['awsome/lowcode/', 'awsome/lowcode/problem'],
            },
            { title: '😍 Typescript', children: ['awsome/typescript/', 'awsome/typescript/react'] },
            { title: '🙃️ 面试系列', children: ['awsome/interview/'] },
          ],
        },
        { title: 'HTML', children: ['html/tag', 'html/script', 'html/iframe'] },
        {
          title: 'CSS',
          children: ['css/center', 'css/bfc', 'css/drop-shadow', 'css/transform'],
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
          title: '模块化解决方案',
          children: ['module/mf'],
        },
        {
          title: '打包工具',
          children: ['build/esbuild'],
        },
        {
          title: '监控系列',
          children: ['monitor/'],
        },
      ],

      // TODO browser
      '/docs/browser/': ['cache', 'cross-origin', 'xss', 'csrf', 'cookie', 'render'],

      // TODO algorithm
      '/docs/algorithm/': [
        {
          title: 'Leetcode',
          children: [
            {
              title: '字符串',
              children: ['offer/48. 最长不含重复字符的子字符串'],
            },
            {
              title: '递归',
              children: ['offer/16.数值的整数次方', 'offer/33. 二叉搜索树的后序遍历序列'],
            },
            {
              title: '链表',
              children: ['offer/25. K 个一组翻转链表'],
            },
            {
              title: '动态规划',
              children: ['offer/42. 连续子数组的最大和'],
            },
            {
              title: '高频',
              children: ['offer/31. 最近最少使用缓存'],
            },
          ],
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
          children: ['', 'network-model', 'dns', 'cdn'],
        },
        {
          title: 'TCP',
          children: ['tcp/structure', 'tcp/tcp-udp', 'tcp/handshake', 'tcp/wave', 'tcp/sync-attack'],
        },
        {
          title: 'HTTP',
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
          title: 'HTTPS',
          children: ['https/https', 'https/tsl', 'https/ca'],
        },
        {
          title: 'HTTP2',
          children: ['http2/http2-vs-http', 'http2/frame', 'http2/http3', 'http2/push'],
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
