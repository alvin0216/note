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
    sidebar: {
      '/tools/': [
        {
          title: 'Tools',
          collapsable: false,
          children: ['github-webhooks', 'ssh-login-server', 'mac-quick-start', 'git', 'vim', 'command', 'awesome']
        }
      ],
      '/question/': ['javascript'],

      // js
      '/javascript/': [
        {
          title: '文件和二进制数据',
          collapsable: false,
          children: ['arraybuffer']
        },
        {
          title: '模拟实现系列',
          collapsable: false,
          children: ['new', 'bind', 'call-apply', 'throttle', 'debounce']
        },
        {
          title: '其他',
          collapsable: false,
          children: ['this', 'skills']
        },
      ],

      // react
      '/react/': [
        {
          title: 'React',
          collapsable: false,
          children: ['compound-component', 'redux', 'hooks', 'daily']
        }
      ],

      // react 源码解析
      '/react-code-read/': [
        {
          title: 'React 原理解析',
          collapsable: false,
          children: ['home', 'base', 'render', 'update', 'expirationTime', 'scheduler', 'scheduleWork']
        }
      ],

      // html & css
      '/html-css/': [
        {
          title: 'HTML & CSS',
          children: ['file-deal', 'css-base', 'BFC']
        }
      ],

      '/http/': [
        {
          title: 'HTTP 系列知识',
          children: ['model', 'handshake', 'cross-domain', 'cache']
        }
      ],

      '/node/': [
        {
          title: 'node 系列知识',
          children: ['node-shell', 'middleware']
        }
      ],

      '/schedule/': ['']
    },
    // === nav
    nav: [
      { text: '主页', link: '/' },
      { text: '学习日程栏', link: '/schedule/' },
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
