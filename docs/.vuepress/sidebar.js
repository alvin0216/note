module.exports = {
  '/tools/': [
    {
      title: 'Tools',
      collapsable: false,
      children: ['github-webhooks', 'ssh-login-server', 'mac-quick-start', 'git', 'vim', 'command', 'awesome']
    }
  ],
  '/question/': [''],

  // js
  '/javascript/': [
    {
      title: '原型和原型链',
      collapsable: false,
      children: ['this']
    },
    {
      title: '作用域和闭包',
      collapsable: false,
      children: ['this']
    },
    {
      title: '文件和二进制数据',
      // collapsable: false,
      children: ['blob', 'file-upload', 'large-file-upload', 'arraybuffer']
    },
    {
      title: '模拟实现系列',
      // collapsable: false,
      children: ['new', 'bind', 'call-apply', 'throttle', 'debounce']
    },
    {
      title: '补充知识',
      // collapsable: false,
      children: ['web-worker', 'skills']
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
  '/': [
    {
      title: 'HTML',
      collapsable: false,
      children: ['root/html5']
    }
  ]
}