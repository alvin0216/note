module.exports = {
  port: '4040', // 开发端口
  title: "Alvin's notes",
  description: "alvin's notes",
  head: [
    // add jquert and fancybox
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.slim.js' }],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js' }],
    [
      'link',
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css'
      }
    ]
  ],
  themeConfig: {
    smoothScroll: true,
    sidebarDepth: 2,
    // === nav
    nav: [
      { text: '主页', link: '/' },
      { text: 'Javascript', link: '/javascript/' },
      { text: 'React', link: '/react/' },
      { text: '数据结构与算法', link: '/algorithm/' },
      { text: 'HTTP', link: '/http/' },
      { text: '浏览器', link: '/browser/' },
      { text: '其他', link: '/others/' },
      {
        text: '更多',
        ariaLabel: '了解更多',
        items: [
          {
            items: [{ text: 'todo list', link: '/todo/' }]
          },
          {
            items: [
              { text: 'Github', link: 'https://github.com/alvin0216', target: '_self' },
              { text: "Alvin's blog", link: 'http://47.112.48.225:4002', target: '_self' }
            ]
          }
        ]
      }
    ],
    // === sidebar
    sidebar: {
      '/javascript/': [
        {
          title: '基础',
          children: ['base/data-types', 'base/prototype', 'base/extends', 'base/this', 'base/closure']
        },
        {
          title: '模拟实现',
          children: [
            'achieve/call-apply',
            'achieve/bind',
            'achieve/new',
            'achieve/throttle',
            'achieve/debounce',
            'achieve/promise',
            'achieve/curry',
            'achieve/instanceof',
            'achieve/deepClone'
          ]
        },
        {
          title: 'ES6',
          children: ['es6/symbol', 'es6/set-map', 'es6/web-worker', 'es6/skills']
        },
        {
          title: '文件和二进制数据',
          children: ['files/blob', 'files/file-upload', 'files/large-file-upload', 'files/arraybuffer']
        }
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
            'data-structure/graph-traverse'
          ]
        },
        {
          title: '排序算法',
          collapsable: true,
          children: [
            'complexity',
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
          children: ['leetcode/1', 'leetcode/557', 'leetcode/696']
        },
        {
          title: '剑指 offer',
          collapsable: true,
          children: ['offer/4']
        }
      ],
      // === http
      '/http/': [
        {
          title: '概念篇',
          children: [
            'theory/http-development',
            'theory/what-is-http',
            'theory/related-concepts',
            'theory/related-protocol',
            'theory/network-model',
            'theory/dns',
            'theory/wireshark-env'
          ]
        },
        {
          title: '基础篇',
          children: [
            'basis/type-url-and-press-enter',
            'basis/tcp-connection',
            'basis/http-message',
            'basis/http-methods',
            'basis/status-code',
            'basis/http-body',
            'basis/cache',
            'basis/proxy-cache',
            'basis/http-connection',
            'basis/redirect',
            'basis/cookie-session'
          ]
        },
        {
          title: 'HTTPS',
          children: ['https/https', 'https/certificate', 'https/tsl', 'https/tsl13', 'https/https-perf']
        },
        {
          title: 'HTTP2',
          children: ['http2/http2', 'http2/http2-deep', 'http2/http3']
        },
        {
          title: '拷问篇',
          children: ['torture/1', 'torture/2', 'torture/3']
        },
        {
          title: 'nginx',
          children: ['nginx/1', 'nginx/2', 'certificate']
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
          children: ['macro/browser-process', 'macro/url-to-display', 'macro/rendering1', 'macro/rendering2']
        },
        {
          title: '浏览器中 Javascript 执行机制',
          children: ['js/variable-promotion', 'js/context-stack', 'js/scope', 'js/scope-chain', 'js/this']
        },
        {
          title: 'v8 工作原理',
          children: ['v8/ram', 'v8/gc', 'v8/run-the-code']
        },
        {
          title: 'EventLoop',
          children: [
            'event-loop/thread-queue',
            'event-loop/macrotask-microtask',
            'event-loop/browser-event-loop',
            'event-loop/promise'
          ]
        },
        {
          title: '浏览器安全',
          children: ['security/xss', 'security/https']
        },
        {
          title: '拷问篇',
          children: ['torture/process', 'torture/rendering']
        }
      ],
      '/others/': [
        {
          title: 'HTML',
          children: ['html/html-semantic']
        },
        {
          title: 'CSS',
          children: ['css/rem', 'css/css-base', 'css/BFC']
        },
        {
          title: 'node',
          children: ['node/node-shell', 'node/middleware']
        },
        {
          title: 'git',
          children: ['git/base', 'git/webhook']
        },
        {
          title: 'tools & command',
          children: [
            'tools/mac',
            'tools/vim',
            'tools/linux',
            'mark/vscode',
            'mark/collect',
            'tools/ssh'
            //
          ]
        }
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
            'root/interview/06'
          ]
        }
      ]
    }
  },
  plugins: [
    'vuepress-plugin-medium-zoom',
    {
      selector: '.page .theme-default-content img',
      delay: 1000,
      options: {
        margin: 24,
        background: '#BADA55',
        scrollOffset: 0
      }
    }
  ]
}
