// BUILD_TARGET 打包对象
const buildBase = process.env.BUILD_TARGET ? '/note/' : '/';

module.exports = {
  title: "alvin's note",
  description: '天行健，君子以自强不息',
  base: buildBase,
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: '动态', link: '/timeline/', icon: 'reco-date' },
      { text: '关于', link: '/blogs/more/me', icon: 'reco-account' }
    ],
    sidebar: require('./sidebar'),
    type: 'blog',
    blogConfig: {
      category: { location: 2, text: '分类' },
      tag: { location: 3, text: '标签' }
    },
    friendLink: require('./friendLink'),
    // logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'alvin',
    authorAvatar: '/avatar.png',
    record: '粤ICP备20056911号',
    startYear: '2020'
  },
  markdown: {
    lineNumbers: false
  },
  plugins: ['vuepress-plugin-element-tabs']
};
