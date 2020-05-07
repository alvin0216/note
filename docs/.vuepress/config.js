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
    sidebar: {
      '/tools/': [
        {
          title: 'Tools',
          collapsable: false,
          children: ['github-webhooks', 'ssh-login-server', 'mac-quick-start', 'git', 'vim', 'command', 'awesome']
        }
      ],
      '/question/': [''],

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
          children: ['css-base', 'BFC']
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
      // js
      '/javascript/': [
        {
          title: '基础',
          collapsable: false,
          children: ['data-types', 'prototype', 'this', 'closure', 'extends']
        },
        {
          title: '模拟实现系列',
          collapsable: false,
          children: ['new', 'bind', 'call-apply', 'throttle', 'debounce', 'instanceof']
        },
        {
          title: '文件和二进制数据',
          // collapsable: false,
          children: ['blob', 'file-upload', 'large-file-upload', 'arraybuffer']
        },
        {
          title: '补充知识',
          // collapsable: false,
          children: ['web-worker', 'skills']
        },
      ],
      '/': [
        {
          title: 'HTML',
          collapsable: false,
          children: ['root/html5', 'root/meta']
        }
      ]
    },
    // === nav
    nav: navbar,
  },
  plugins: ['@vuepress/back-to-top']
}
