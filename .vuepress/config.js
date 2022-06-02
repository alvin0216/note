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
      { text: 'docs', link: '/docs/' },
      { text: 'Javascript', link: '/javascript/' },
      { text: '算法', link: '/算法/' },
      { text: '网络协议', link: '/网络协议/' },
      { text: '工程化', link: '/工程化/' },
      { text: '浏览器', link: '/浏览器/' },
      { text: 'React', link: '/react/' },
    ],
    // 博客设置
    blogConfig: {
      category: { location: 12, text: '分类' },
      // tag: { location: 2, text: '标签' },
    },
    sidebar: {
      ...require('./sidebar'),
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
