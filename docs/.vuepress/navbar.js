module.exports = [
  { text: '主页', link: '/' },
  // { text: '学习日程栏', link: '/schedule/' },
  { text: '题目', link: '/question/' },
  { text: 'Javascript', link: '/javascript/' },
  { text: 'React', link: '/react/' },
  { text: 'React 原理解析', link: '/react-code-read/home' },
  { text: 'HTTP', link: '/http/' },
  { text: 'NODE', link: '/node/' },
  {
    text: '更多',
    ariaLabel: '了解更多',
    items: [
      {
        items: [
          { text: 'HTML & CSS', link: '/html-css/' },
          // { text: 'HTTP 系列', link: '/http/' }
        ]
      },
      {
        items: [
          { text: '常用配置/工具方法', link: '/tools/' },
          { text: '收藏的链接、博文', link: '/collect/' },
          // { text: '提问系列', link: '/question/javascript' }
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