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
        'data-types',
        'prototype',
        'this',
        'closure',
        'extends',
        'set-map',
        'generator',
        'async',
        'web-worker',
        {
          title: '二进制数据',
          children: ['binary/blob', 'binary/file-upload', 'binary/large-file-upload', 'binary/arraybuffer']
        },
        {
          title: '设计模式',
          children: ['design-patterns/event-emitter', 'design-patterns/proxy', 'design-patterns/strategy']
        }
      ],
      // === react
      '/react/': [
        {
          title: 'React',
          // collapsable: true,
          children: [
            {
              title: 'base',
              children: [
                'record/uncontrolled-components',
                'record/context',

                'record/compound-component',
                'record/reconciliation',
                'record/setState',
                'record/immutable'
              ]
            },
            {
              title: 'hooks',
              children: ['hooks/base', 'hooks/render', 'hooks/self-hooks', 'hooks/useState']
            },
            {
              title: 'Redux',
              children: ['redux/achieve', 'redux/redux-dynamic-injection']
            },
            {
              title: 'React router',
              children: ['router/history-location', 'router/hash-router']
            }
          ]
        },
        {
          title: 'React 进阶',
          children: [
            'deep/way',
            {
              title: 'React 理念',
              children: ['deep/idea', 'deep/oldConstructure']
            },
            {
              title: 'react 原理学习前置知识（零散）',
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
                'principle/event',
                'principle/react-requestIdleCallback'
              ]
            },
            {
              title: '跟着 jokcy 学源码（未完成）',
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
          ]
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
            'data-structure/avl',
            'data-structure/graph',
            'data-structure/graph-traverse'
          ]
        },
        {
          title: '排序算法',
          children: [
            'sort/overview',
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
            'tree/isSubStructure',
            'tree/bfs-dfs'
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
            'dynamic-programming/house-robber',
            'dynamic-programming/coinChange',
            'dynamic-programming/minPathSum',
            'dynamic-programming/uniquePaths'
          ]
        },
        {
          title: '一些算法思想',
          children: [
            'others/complexity',
            'others/sliding-window',
            'others/binarySearch',
            'others/divide',
            'others/shuffle'
          ]
        }
      ],
      // === http
      '/http/': [
        'what-is-http',
        'network-model',
        'dns',
        {
          title: 'TCP',
          children: ['tcp/connection', 'tcp/wave', 'tcp/syn', 'tcp/udp', 'tcp/keep-alive']
        },
        {
          title: 'HTTP 报文',
          children: ['structure/overview', 'structure/method', 'structure/status-code', 'structure/body']
        },
        {
          title: '缓存',
          children: ['cache/overview', 'cache/proxy']
        },
        {
          title: 'cookie',
          children: ['cookie/overview', 'cookie/samesite']
        },
        'cross-domain',
        {
          title: 'HTTPS',
          children: ['https/https', 'https/certificate', 'https/tsl', 'https/tsl13', 'https/https-perf']
        },
        {
          title: 'HTTP2',
          children: ['http2/http2', 'http2/http2-deep', 'http2/http3']
        },
        {
          title: 'nginx',
          children: ['nginx/1', 'nginx/2', 'nginx/gzip']
        }
      ],
      // === browser
      '/browser/': [
        {
          title: '宏观下的浏览器',
          children: [
            'macro/process-thread',
            'macro/browser-process',
            'macro/url-to-display',
            'macro/rendering1',
            'macro/rendering2',
            'macro/repaint-reflow'
          ]
        },
        {
          title: 'Javascript 执行机制',
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
            'event-loop/promise',
            'event-loop/node'
          ]
        },
        {
          title: 'web 安全',
          children: [
            //
            'security/overview',
            'security/xss',
            'security/csrf',
            'security/ssrf',
            'security/clickjacking',
            'security/url-phishing',
            'security/sql',
            'security/file',
            'security/ddos'
          ]
        },
        {
          title: 'DOM 操作',
          children: ['dom/overview', 'dom/capture-bubble']
        },
        {
          title: '其他',
          children: ['others/css-block', 'others/network', 'others/performance']
        }
      ],
      '/webpack/': [
        'dev-env',
        {
          title: '构建优化',
          children: ['optimization/overview', 'optimization/spritesmith']
        },
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
          children: ['html/semantic', 'html/defer-async', 'html/meta', 'html/src-href', 'html/link-meta-script']
        },

        {
          title: 'CSS',
          children: [
            'css/overview',
            {
              title: '布局',
              children: ['css/layout/BFC', 'css/layout/flex', 'css/layout/flex-examples']
            },
            {
              title: '移动端',
              children: ['css/mobile/flexible', 'css/mobile/1px']
            }
          ]
        },

        {
          title: 'Node',
          children: ['/node/middleware', 'node/node-shell']
        },
        {
          title: 'Coding',
          children: [
            {
              title: '第三方授权',
              children: ['coding/oAuth2/oAuth2', 'coding/oAuth2/oAuth2-github']
            },
            {
              title: '网络请求问题',
              children: [
                'coding/request/axios-cancel',
                'coding/request/token',
                'coding/request/optimal',
                'coding/request/lot-of',
                'coding/request/valid-requests',
                'coding/request/queue',
                {
                  title: '😊TODO:HTTP 请求过大',
                  children: ['coding/request/compression/overview']
                }
              ]
            },
            {
              title: '一些实现',
              children: ['coding/achieve/modal']
            },
            {
              title: '其他',
              children: ['coding/others/comment-attack', 'coding/others/subtraction']
            }
          ]
        },
        {
          title: '性能优化',
          children: ['performance/keyword', 'performance/lazyload-img']
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
