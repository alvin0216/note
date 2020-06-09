module.exports = [
  { text: '主页', link: '/' },
  { text: 'Javascript', link: '/javascript/' },
  { text: 'React', link: '/react/' },
  { text: '数据结构与算法', link: '/algorithm/' },
  { text: 'HTTP', link: '/http/' },
  { text: '浏览器', link: '/browser/' },
  { text: '杂文', link: '/others/' },
  {
    text: '更多',
    ariaLabel: '了解更多',
    items: [
      {
        items: [
          { text: 'Github', link: 'https://github.com/alvin0216', target: '_self' },
          { text: "Alvin's blog", link: 'http://47.112.48.225:4002', target: '_self' }
        ]
      }
    ]
  }
]