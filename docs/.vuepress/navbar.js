module.exports = [
  { text: '主页', link: '/' },
  { text: 'Javascript', link: '/javascript/' },
  { text: 'React', link: '/react/' },
  { text: '数据结构与算法', link: '/algorithm/' },
  { text: 'HTTP', link: '/http/' },
  { text: '杂文', link: '/others/' },
  {
    text: '更多',
    ariaLabel: '了解更多',
    items: [
      // {
      //   items: [
      //     { text: '常用配置/工具方法', link: '/tools/' },
      //     { text: '收藏的链接、博文', link: '/collect/' },
      //     // { text: '提问系列', link: '/question/javascript' }
      //   ]
      // },
      {
        items: [
          { text: 'Github', link: 'https://github.com/gershonv', target: '_self' },
          { text: '郭大大的博客', link: 'http://47.112.48.225:4002', target: '_self' }
        ]
      }
    ]
  }
]