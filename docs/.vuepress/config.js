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
      '/javascript/': [
        {
          title: '基础',
          // collapsable: false,
          children: ['data-types', 'prototype', 'extends', 'this', 'closure']
        },
        {
          title: '模拟实现系列',
          // collapsable: true,
          children: ['new', 'bind', 'call-apply', 'throttle', 'debounce', 'instanceof', 'deepClone']
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
      // react
      '/react/': [
        {
          title: 'React',
          // collapsable: true,
          children: ['compound-component', 'redux', 'hooks', 'daily']
        },
        {
          title: 'React 源码解读',
          // collapsable: true,
          children: [
            'code/home',
            'code/base',
            'code/render',
            'code/update',
            'code/expirationTime',
            'code/scheduler',
            'code/scheduleWork'
          ]
        }
      ],
      '/algorithm/': [
        {
          title: '数据结构',
          collapsable: true,
          children: [
            'data-structure/stack',
            'data-structure/queue',
            'data-structure/linkedList',
            'data-structure/set',
            'data-structure/dict-hashtable',
            'data-structure/tree',
            'data-structure/graph',
            'data-structure/graph-traverse',
          ]
        },
        {
          title: '排序算法',
          collapsable: true,
          children:
            ['complexity',
              'sort/bubbleSort',
              'sort/selectionSort',
              'sort/insertSort',
              'sort/shellSort',
              'sort/mergeSort',
              'sort/heapSort',
              'sort/quickSort',
              'temp/binarySearch'
            ]
        },
        {
          title: 'leetcode',
          collapsable: true,
          children: ['leetcode/01']
        }
      ],
      '/http/': [
        {
          title: 'HTTP 系列知识',
          children: ['model', 'handshake', 'cross-domain', 'cache']
        }
      ],
      '/others/': [
        {
          title: 'HTML-CSS',
          collapsable: false,
          children: ['html-css/css-base', 'html-css/BFC']
        },
        {
          title: 'node 系列知识',
          collapsable: false,
          children: ['node/node-shell', 'node/middleware']
        },
        {
          title: '服务器相关',
          collapsable: true,
          children: ['system/git', 'system/ssh', 'system/github-webhooks', 'system/linux', 'system/vim']
        },
        {
          title: 'Mark',
          collapsable: true,
          children: ['mark/collect', 'mark/vscode']
        },
      ],
      // js
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
        {
          title: '笔试/面试题',
          children: [
            'root/interview/01',
            'root/interview/02',
            'root/interview/03',
            'root/interview/04',
            'root/interview/05',
            'root/interview/06',
          ]
        }
      ]
    },
    // === nav
    nav: navbar,
  },
  plugins: ['@vuepress/back-to-top']
}
