const navbar = require('./navbar')

module.exports = {
  port: '4040', // 开发端口
  title: "Alvin's notes",
  description: "alvin's notes",
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
          children: [
            'base/data-types',
            'base/prototype',
            'base/extends',
            'base/this',
            'base/closure'
          ]
        },
        {
          title: '模拟实现',
          children: [
            'achieve/call-apply',
            'achieve/bind',
            'achieve/new',
            'achieve/throttle',
            'achieve/debounce',
            'achieve/curry',
            'achieve/instanceof',
            'achieve/deepClone'
          ]
        },
        {
          title: 'ES6',
          children: [
            'es6/symbol',
            'es6/set-map',
            'es6/web-worker',
            'es6/skills'
          ]
        },
        {
          title: '文件和二进制数据',
          children: [
            'files/blob',
            'files/file-upload',
            'files/large-file-upload',
            'files/arraybuffer'
          ]
        },
      ],
      // === react
      '/react/': [
        {
          title: 'React',
          // collapsable: true,
          children: ['context', 'compound-component', 'redux', 'hooks', 'daily']
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
      // === algorithm
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
          children: [
            'leetcode/1',
            'leetcode/557',
            'leetcode/696',
          ]
        },
        {
          title: '剑指 offer',
          collapsable: true,
          children: [
            'offer/4',
          ]
        }
      ],
      // === http
      '/http/': [
        {
          title: '概念篇',
          children: ['http-development', 'what-is-http', 'related-concepts', 'related-protocol', 'network-model', 'dns', 'wireshark-env']
        },
        {
          title: '基础篇',
          children: [
            'type-url-and-press-enter',
            'tcp-connection',
            'http-message',
            'http-methods',
            'status-code',
            'http-body',
            'cache',
            'proxy-cache',
            'http-connection',
            'redirect',
            'cookie-session']
        },
        {
          title: 'HTTPS',
          children: ['https', 'certificate', 'tsl', 'tsl13', 'https-perf']
        },
        {
          title: 'HTTP2',
          children: ['http2', 'http2-deep', 'http3']
        },
        {
          title: '拷问篇',
          children: [
            'torture/1',
            'torture/2',
            'torture/3',
          ]
        }
      ],
      // === browser
      '/browser/': [
        {
          title: '预备知识',
          children: ['process-thread']
        },
        {
          title: '宏观下的浏览器',
          children: ['macro/browser-process', 'macro/url-to-display']
        },
        {
          title: '浏览器安全',
          children: ['security/xss', 'security/https']
        }
      ],
      '/others/': [
        {
          title: 'HTML-CSS',
          collapsable: false,
          children: ['html-css/html-semantic', 'html-css/css-base', 'html-css/BFC']
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
      '/todo/': [],
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
