module.exports = {
  title: "alvin's note",
  description: '天行健，君子以自强不息',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      // { text: '主页', link: '/', icon: 'reco-home' },

      { text: 'Typescript', link: '/docs/typescript/' },
      { text: 'HTML & CSS', link: '/docs/html-css/iframe' },
      { text: '浏览器', link: '/docs/browser/cache' },
      { text: '前端工程化', link: '/docs/devops/' },
      { text: '算法', link: '/docs/algorithm/data-structure/stack' },
      {
        text: '快速入口',
        items: [
          { text: '标签索引', link: '/tag/', icon: 'reco-tag' },
          { text: '分类索引', link: '/categories/Typescript/', icon: 'reco-category' },
          { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
        ],
      },
    ],
    sidebar: {
      '/docs/typescript/': [''],
      '/docs/html-css/': ['iframe'],
      '/docs/devops/': [
        '',
        {
          title: '持续集成',
          children: ['travis', 'webhooks', 'github-action'],
        },
        {
          title: '环境配置',
          children: ['ssh', 'iterm2', 'charles'],
        },
      ],
      '/docs/browser/': ['cache', 'cross-domain', 'xss', 'csrf'],
      '/docs/algorithm/': [
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
      ],
      // '/docs/theme-reco/': [
      //   { title: 'xx', children: ['', 'api'] },
      //   { title: '2', children: ['theme', 'plugin'] },
      // ],
    },
    type: 'blog',
    // 博客设置
    blogConfig: {
      // category: { location: 8, text: '分类' },
      // tag: { location: 2, text: '标签' },
    },
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
  plugins: ['vuepress-plugin-element-tabs'],
};
