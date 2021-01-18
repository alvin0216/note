module.exports = {
  // TODO 关于
  '/blogs/more/': ['me', 'markdown', 'profession', 'secret'],

  // TODO typescript
  '/blogs/typescript/': ['overview', 'react'],

  // TODO webpack
  '/blogs/webpack/': ['overview', 'optimization', 'my-webpack'],

  // TODO javascript
  '/blogs/javascript/': [
    {
      title: 'JS - 基础',
      children: [
        'basis/data-types',
        'basis/prototype',
        'basis/this',
        'basis/extends',
        'basis/for-of'
      ]
    },
    {
      title: 'JS - 代码实现',
      children: ['achieve/call-apply', 'achieve/bind', 'achieve/promise']
    },
    {
      title: 'v8 - 引擎工作原理',
      children: [
        'v8/run-js',
        'v8/context-stack',
        'v8/scope',
        'v8/scope-chain',
        'v8/closure',
        'v8/gc',
        'v8/compile',
        'v8/eventloop'
      ]
    }
  ],

  // TODO react
  '/blogs/react/': [
    {
      title: 'React API',
      children: ['api/ref', 'api/context', 'api/compound-component']
    },
    {
      title: 'React 原理',
      children: [
        'theory/is-async-setState',
        'theory/useState',
        'theory/useEffect-todo',
        'theory/immutable',
        'theory/algebraic-effects'
      ]
    },

    {
      title: 'React Redux',
      children: ['redux/achieve', 'redux/redux-dynamic-injection']
    },
    {
      title: 'React Router',
      children: ['router/history-location', 'router/hash-router']
    }
  ],

  // TODO 网络协议
  '/blogs/protocol/': [
    {
      title: '计算机基础',
      children: ['', 'network-model', 'dns', 'uri']
    },
    {
      title: 'TCP',
      children: ['tcp/structure', 'tcp/tcp-udp', 'tcp/handshake', 'tcp/wave', 'tcp/sync-attack']
    },
    {
      title: 'HTTP',
      children: [
        'http/structure',
        'http/request-method',
        'http/status-code',
        'http/request-header',
        'http/desc',
        'http/cookie',
        'http/blocking',
        'http/cache',
        'http/cross-domain'
      ]
    },
    {
      title: 'HTTPS',
      children: ['https/overview', 'https/ca', 'https/tsl1.2', 'https/tsl1.3']
    },
    {
      title: 'HTTP2',
      children: ['http2/http2-vs-http', 'http2/frame', 'http2/http3', 'http2/push']
    }
  ],

  // TODO 浏览器
  '/blogs/algorithm/': [
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
        'sort/bubbleSort',
        'sort/selectionSort',
        'sort/insertSort',
        'sort/mergeSort',
        'sort/quickSort',
        'sort/shellSort',
        'sort/heapSort'
      ]
    }
  ],

  // TODO 算法与数据结构
  '/blogs/browser/': [
    { title: '浏览器渲染', children: ['render/cache'] },
    { title: '浏览器安全', children: ['security/cross-domain', 'security/xss', 'security/csrf'] }
  ],

  // TODO 技术漫谈
  '/blogs/ramble/': [
    {
      title: '技术漫谈',
      children: [
        'webhooks',
        'certificate',
        'node-shell',
        'id3',
        {
          title: '未归置',
          children: ['others/format', 'others/sandbox']
        }
      ]
    },
    {
      title: '环境配置',
      children: ['tools/git', 'tools/ssh', 'tools/iterm2', 'tools/charles']
    },
    {
      title: '前端工程化',
      children: [
        'devops/overview',
        'devops/git-commit',
        'devops/husky',
        'devops/jest',
        'devops/lerna'
      ]
    },
    {
      title: '性能优化',
      children: [
        'performance/dns-prefetch',
        'performance/cdn',
        'performance/base64',
        'performance/preload-vs-httpPush'
      ]
    },
    { title: '设计模式', children: ['design-patterns/strategy'] },
    { title: 'nginx', children: ['nginx/basics', 'nginx/proxy', 'nginx/gizp'] }
  ],

  // TODO html
  '/blogs/': [
    {
      title: 'html',
      children: ['html/tag', 'html/script', 'html/iframe']
    },
    {
      title: 'css',
      children: ['css/center', 'css/bfc']
    }
  ]
};
