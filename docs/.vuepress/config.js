const sidebar = require('./sidebar')

module.exports = {
  port: '4040', // 开发端口
  title: 'guodada-note',
  description: '郭大大的个人笔记',
  themeConfig: {
    smoothScroll: true,
    sidebarDepth: 2,
    sidebar: sidebar,
    nav: [
      { text: '主页', link: '/' },
      { text: 'Javascript', link: '/javascript/' },
      { text: 'React', link: '/react/' },
      { text: 'React 原理解析', link: '/react-code-read/base' },
      { text: 'Node & HTTP', link: '/group/' },
      {
        text: '更多',
        ariaLabel: '了解更多',
        items: [
          {
            items: [
              { text: '常用配置/工具方法', link: '/tools/' },
              { text: '收藏的链接、博文', link: '/collect/' },
              { text: '提问系列', link: '/question/javascript' }
            ]
          },
          {
            items: [
              { text: 'Github', link: 'https://github.com/gershonv', target: '_self' },
              { text: '郭大大的博客', link: 'http://47.112.48.225:4002', target: '_self' }
            ]
          }
        ]
      }
    ]
  },
  plugins: ['@vuepress/back-to-top']
}
