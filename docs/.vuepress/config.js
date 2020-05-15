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
      '/algorithm/': [
        {
          title: '数据结构',
          collapsable: false,
          children: ['data-structure/stack', 'data-structure/queue', 'data-structure/linkedList', 'data-structure/set', 'data-structure/dict-hashtable']
        },
        {
          title: '排序算法',
          collapsable: false,
          children: ['complexity', 'sort/1']
        },
      ],
      // js
      '/javascript/': [
        {
          title: '基础',
          // collapsable: false,
          children: ['data-types', 'prototype', 'extends', 'this', 'closure']
        },
        {
          title: '模拟实现系列',
          // collapsable: true,
          children: ['new', 'bind', 'call-apply', 'throttle', 'debounce', 'instanceof']
        },
        {
          title: 'ES6',
          // collapsable: false,
          children: ['set-map', 'web-worker', 'skills']
        },
        {
          title: '文件和二进制数据',
          // collapsable: false,
          children: ['blob', 'file-upload', 'large-file-upload', 'arraybuffer']
        },

      ],
      '/': [
        {
          title: 'HTML',
          collapsable: false,
          children: ['root/html/html5', 'root/html/meta']
        },
        {
          title: 'Javascript',
          collapsable: false,
          children: ['root/js/question', 'root/js/regexp']
        },

      ]
    },
    // === nav
    nav: navbar,
  },
  plugins: ['@vuepress/back-to-top']
}
