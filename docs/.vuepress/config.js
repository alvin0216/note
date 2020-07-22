module.exports = {
  port: '4040', // 开发端口
  title: "Alvin's notes",
  description: "alvin's notes, front-end, react, javascript, vue, algorithm, alvin 的博客，前端开发",
  head: [['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }]],
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
          children: ['context', 'compound-component', 'redux', 'hooks', 'daily']
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
            'principle/key'
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
          title: 'SSR',
          children: ['ssr/ssr-csr', 'ssr/isomorphism']
        }
      ],
      // === algorithm
      '/algorithm/': [
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
            'sort/shellSort',
            'sort/mergeSort',
            'sort/heapSort',
            'sort/quickSort'
          ]
        },
        {
          title: 'Tree 专题',
          children: ['tree/binarySearch', 'tree/rebuild-binary-tree']
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
          children: ['nginx/1', 'nginx/2']
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
          children: ['coding/oAuth2', 'coding/oAuth2-github']
        },
        {
          title: 'Webpack',
          children: ['webpack/module', 'webpack/basic-environment']
        },
        {
          title: 'GIT & 运维',
          children: [
            '/git/base',
            '/git/webhook',
            'O&M/mac',
            'O&M/linux',
            'O&M/vim',
            'O&M/vscode',
            'O&M/ssh',
            'O&M/certificate',
            'O&M/charles',
            'O&M/nginx-gzip'
          ]
        },
        {
          title: 'Node',
          children: ['/node/middleware', 'node/node-shell']
        },
        {
          title: '性能优化',
          children: ['performance/lazyload-img']
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
    }
  ]
}
