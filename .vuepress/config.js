module.exports = {
  title: "alvin's note",
  description: '天行健，君子以自强不息',
  base: '/note/',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: '笔记', link: '/docs/coding/lowcode/' },
      { text: '前端工程化', link: '/docs/devops/' },
      { text: '浏览器', link: '/docs/browser/cache' },
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
      '/docs/coding/': [
        {
          title: '低代码可视化平台',
          children: ['lowcode/', 'lowcode/dynamic', 'lowcode/practice'],
        },
        { title: 'Typescript', children: ['typescript/'] },
        { title: 'HTML', children: ['html/iframe'] },
      ],
      '/docs/devops/': [
        { title: 'Devops', children: ['', 'package/npm', 'package/lerna'] },
        { title: '打包工具', children: ['webpack/module'] },
        { title: '持续集成', children: ['ci/travis', 'ci/webhooks', 'ci/github-action'] },
        { title: '环境配置', children: ['ssh', 'iterm2', 'certificate', 'charles'] },
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
    },
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: { location: 1, text: '分类' },
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
