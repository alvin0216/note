const sidebar = require('./sidebar')
const navbar = require('./navbar')

module.exports = {
  port: '4040', // 开发端口
  title: 'guodada-note',
  description: '郭大大的个人笔记',
  head: [
    // add jquert and fancybox
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }]
  ],
  themeConfig: {
    smoothScroll: true,
    sidebarDepth: 2,
    // === sidebar
    sidebar,
    // === nav
    nav: navbar,
  },
  plugins: ['@vuepress/back-to-top']
}
