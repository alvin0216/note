module.exports = {
  title: "alvin's note",
  description: '每天努力一小时！',
  base: '/note/',
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
      { text: 'docs', link: '/docs/coding/' },
      { text: 'Javascript', link: '/docs/javascript/' },
      { text: '算法', link: '/docs/algorithm/' },
      { text: '网络协议', link: '/docs/protocol/' },
      { text: '工程化', link: '/docs/devops/package/micro-frontend' },
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
      '/docs/coding/': [
        '',
        {
          title: '低代码可视化平台',
          children: ['lowcode/', 'lowcode/dynamic', 'lowcode/practice'],
        },
        { title: 'Typescript', children: ['typescript/', 'typescript/react'] },
        { title: 'HTML', children: ['html/tag', 'html/script', 'html/iframe'] },
        {
          title: 'CSS',
          children: [
            'css/center',
            'css/bfc',
            'css/drop-shadow',
            'css/transform',
          ],
        },
        { title: '开发笔记', children: ['dev/oAuth2', 'dev/oAuth2-github'] },
      ],

      // TODO react
      '/docs/react/': [{ title: 'React', children: ['', 'mini', 'async'] }],

      // TODO devops
      '/docs/devops/': [
        {
          title: 'Devops',
          children: ['package/micro-frontend', 'package/npm', 'package/lerna'],
        },
        { title: '打包工具', children: ['webpack/module'] },
        {
          title: '持续集成',
          children: ['ci/travis', 'ci/webhooks', 'ci/github-action'],
        },
        {
          title: '环境配置',
          children: [
            'config/mac',
            'config/ssh',
            'config/certificate',
            'config/charles',
          ],
        },
        {
          title: 'nginx',
          children: ['nginx/basics', 'nginx/proxy', 'nginx/gizp'],
        },
      ],

      // TODO browser
      '/docs/browser/': ['cache', 'cross-domain', 'xss', 'csrf', 'cookie'],

      // TODO algorithm
      '/docs/algorithm/': [
        '',
        {
          title: '数据结构',
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
          title: '排序算法',
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
          title: '一些算法思想',
          children: [
            'method/complexity',
            'method/sliding-window',
            'method/binarySearch',
            'method/divide',
            'method/shuffle',
          ],
        },
      ],

      // TODO protocol
      '/docs/protocol/': [
        {
          title: '计算机基础',
          children: ['', 'network-model', 'dns', 'uri'],
        },
        {
          title: 'TCP',
          children: [
            'tcp/structure',
            'tcp/tcp-udp',
            'tcp/handshake',
            'tcp/wave',
            'tcp/sync-attack',
          ],
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
            'http/cache',
            'http/cross-domain',
          ],
        },
        {
          title: 'HTTPS',
          children: [
            'https/overview',
            'https/ca',
            'https/tsl1.2',
            'https/tsl1.3',
          ],
        },
        {
          title: 'HTTP2',
          children: [
            'http2/http2-vs-http',
            'http2/frame',
            'http2/http3',
            'http2/push',
          ],
        },
      ],

      // TODO javascript
      '/docs/javascript/': [
        {
          title: 'JS - 基础',
          children: [
            'basis/data-types',
            'basis/prototype',
            'basis/this',
            'basis/extends',
            'basis/for-of',
          ],
        },
        {
          title: 'JS - 代码实现',
          children: ['achieve/call-apply', 'achieve/bind', 'achieve/promise'],
        },
        {
          title: 'v8 - 引擎工作原理',
          children: [
            'v8/run-js',
            'v8/context-stack',
            'v8/scope',
            'v8/scope-chain',
            'v8/closure',
            'v8/gc',
            'v8/compile',
            'v8/eventloop',
          ],
        },
      ],
    },
    locales: {
      '/': { lang: 'zh-CN' },
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
  markdown: { lineNumbers: false },
  plugins: ['vuepress-plugin-element-tabs', 'demo-container'],
};
