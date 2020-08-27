module.exports = {
  port: '4040', // 开发端口
  title: "Alvin's notes",
  description: "alvin's notes, front-end, react, javascript, vue, algorithm, alvin 的博客，前端开发",
  head: [
    // SEO
    ['meta', { name: 'keywords', content: "alvin's notes, alvin 的博客, 前端开发" }],
    ['meta', { name: 'author', content: 'Alvin, alvin00216@163.com' }],
    // SEO end...
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { 'http-equiv': 'x-dns-prefetch-control', content: 'on' }],
    ['link', { rel: 'dns-prefetch', href: 'https://gitee.com/alvin0216/cdn' }]
  ],
  themeConfig: {
    smoothScroll: true,
    sidebarDepth: 2,
    // === nav
    nav: [
      { text: '主页', link: '/' },
      { text: 'Javascript', link: '/javascript/' },
      { text: 'React', link: '/react/' },
      { text: 'Webpack', link: '/webpack/' },
      { text: '数据结构与算法', link: '/algorithm/' },
      { text: 'HTTP', link: '/http/' },
      { text: '浏览器', link: '/browser/' },
      {
        text: '更多',
        ariaLabel: '了解更多',
        items: [
          {
            items: [
              { text: 'todo list', link: '/todo/' },
              { text: 'mark list', link: '/mark/' }
            ]
          },
          {
            items: [
              { text: 'Github', link: 'https://github.com/alvin0216', target: '_self' },
              { text: "Alvin's blog", link: 'https://blog.alvin.run', target: '_self' }
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
          children: [
            'base/data-types',
            'base/prototype',
            'base/this',
            'base/closure',
            'base/extends',
            'base/es5-es6-extends',
            'base/curry'
          ]
        },
        {
          title: '实现',
          children: [
            'achieve/call-apply',
            'achieve/new',
            'achieve/bind',
            'achieve/debounce',
            'achieve/throttle',
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
        },
        {
          title: '设计模式',
          children: ['design-patterns/event-emitter', 'design-patterns/proxy']
        }
      ],
      // === react
      '/react/': [
        {
          title: 'React',
          // collapsable: true,
          children: [
            // ...
            'uncontrolled-components',
            'context',
            'compound-component',
            'hooks',
            'daily',
            'reconciliation'
          ]
        },
        {
          title: 'Redux',
          children: ['redux/achieve', 'redux/redux-dynamic-injection']
        },
        {
          title: 'React 原理',
          children: [
            'principle/requestIdleCallback',
            'principle/updateQueue',
            'principle/react-fiber',
            'principle/jsx-to-vdom',
            'principle/vdom-to-fiber',
            'principle/mini-react',
            'principle/hooks',
            'principle/key',
            'principle/vdom-diff',
            'principle/react-diff',
            'principle/event'
          ]
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
        },
        {
          title: 'React router',
          children: ['router/history-location', 'router/hash-router']
        },
        {
          title: 'SSR',
          children: ['ssr/ssr-csr', 'ssr/isomorphism']
        }
      ],
      // === algorithm
      '/algorithm/': [
        {
          title: 'Math',
          children: ['math/bit-operation', 'math/log', 'math/magnitude']
        },
        {
          title: '数据结构',
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
          children: [
            'complexity',
            'sort/bubbleSort',
            'sort/selectionSort',
            'sort/insertSort',
            'sort/mergeSort',
            'sort/quickSort',
            'sort/shellSort',
            'sort/heapSort'
          ]
        },
        {
          title: '树',
          children: [
            //
            'tree/overview',
            'tree/traverse',
            'tree/symmetric',
            'tree/search',
            'tree/depth',
            'tree/pathSum',
            'tree/treeToDoublyList',
            'tree/serialize',
            'tree/isSubStructure'
          ]
        },
        {
          title: '链表',
          children: [
            'linkList/overview',
            'linkList/base-use',
            'linkList/reverseList',
            'linkList/copyRandomList',

            // 'stack/convertToBase', // 进制转换
            // 'stack/valid-parentheses',
            // 'queue/933',
            'linkList/2',
            'linkList/141',
            'linkList/summary'
          ]
        },
        {
          title: '字符串',
          children: ['string/isPalindrome']
        },
        {
          title: '动态规划',
          children: [
            //
            'dynamic-programming/overview',
            'dynamic-programming/method',
            'dynamic-programming/climbStairs',
            'dynamic-programming/house-robber'
          ]
        },
        {
          title: '一些算法思想',
          children: ['others/sliding-window', 'others/binarySearch', 'others/divide']
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
          children: ['nginx/1', 'nginx/2', 'nginx/gzip']
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
          children: ['security/cross-domain', 'security/xss', 'security/csrf', 'security/https']
        },
        {
          title: '拷问篇',
          children: ['torture/process', 'torture/rendering']
        }
      ],
      '/interviews/': ['01', '02', 'react', 'promise', 'less-sass', 'closure', 'react-vue'],
      '/webpack/': [
        'dev-env',
        'optimization',
        {
          title: '概念',
          children: [
            'concept/engineering',
            'concept/webpack-module',
            'concept/commonjs',
            'concept/babel',
            'concept/babel-ast',
            'concept/tree-shaking',
            'concept/loader'
          ]
        },
        {
          title: '原理',
          children: ['principle/overview', 'principle/self-loader']
        }
      ],
      // js
      '/': [
        {
          title: 'HTML',
          children: ['html/semantic', 'html/defer-async', 'html/meta', 'html/src-href']
        },

        {
          title: 'CSS',
          children: ['css/note', 'css/text', 'css/BFC', 'css/flex', 'css/flex-examples', 'css/grid', 'css/rem']
        },

        {
          title: 'Browser',
          children: ['root/css-block', 'root/network', 'root/performance']
        },
        {
          title: 'Coding',
          children: ['coding/oAuth2', 'coding/oAuth2-github', 'coding/axios-cancel']
        },
        {
          title: 'Node',
          children: ['/node/middleware', 'node/node-shell']
        },
        {
          title: '性能优化',
          children: ['performance/keyword', 'performance/lazyload-img']
        },
        {
          title: '重学系列',
          children: ['relearn/html', 'relearn/attack']
        },
        {
          title: '开发工具',
          children: [
            '/git/base',
            '/git/webhook',
            'O&M/mac',
            'O&M/linux',
            'O&M/vim',
            'O&M/vscode',
            'O&M/ssh',
            'O&M/certificate',
            'O&M/charles'
          ]
        }
        // {
        //   title: 'Question',
        //   children: ['question/01', 'question/02', 'question/03', 'question/04', 'question/05', 'question/06']
        // }
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
    },
    'vuepress-plugin-mathjax'
  ]
}
