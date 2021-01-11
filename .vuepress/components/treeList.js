export default {
  'javascript/forof': [
    'for in 遍历数组拿到的是索引，而 for of 直接可以拿到值',
    'for in 里面无法使用 async await 循环请求',
    {
      title: 'for of 原理',
      children: [
        '一个数据只要部署了 Symbol.iterator，就具有了 iterator接口',
        '比如 数组，字符串，Map，Set，arguments 等等, 注意：对象没有 Symbol.iterator 所以不能迭代，除非加上'
      ]
    }
  ],
  'javascript/closure': [
    {
      title: '闭包的概念',
      link:
        'https://segmentfault.com/a/1190000009886713?f=tt&hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io',
      children: [
        '闭包是指有权访问另一个函数作用域中的变量的函数。',
        '闭包使得一个函数能够记住和访问它的词法作用域，即使这个函数是在作用域外执行。 '
      ]
    },
    {
      title: '闭包的运用场景',
      children: [
        '方便调用上下文的局部变量。利于代码封装。',
        '模块化开发，防止全局污染',
        '缓存变量（函数柯里化）'
      ]
    },
    '函数执行完后,函数内的局部变量没有释放，占用内存时间会变长，容易造成内存泄露。'
  ],
  'javascript/v8': [
    {
      title: '编译阶段',
      children: [
        {
          title: '执行上下文',
          children: ['变量环境 => VO', '词法环境 => 作用域', 'this 绑定']
        },
        '可执行代码'
      ]
    },
    {
      title: '执行阶段',
      children: [{ title: '执行代码', children: [{ title: '全局代码、函数代码、eval 代码' }] }]
    }
  ],
  'javascript/v8-scope': [
    {
      title: '来谈谈什么是作用域',
      children: [
        '说白了就是就是变量与函数的可访问范围。',
        {
          title: 'ES5 中只有全局作用域和局部作用域，ES6 才新增了块级作用域，那他是怎么支持的？',
          children: [
            '词法环境采用的就是静态作用域',
            {
              title:
                'v8 编译，创建执行上下文，其中包含了 变量环境、词法环境还有 this 绑定，而重要的是变量是如何进行查找的',
              children: [
                '函数内部通过 var 声明的变量，在编译阶段全都被存放到变量环境里面',
                '通过 let 声明的变量，在编译阶段会被存放到词法环境（Lexical Environment）中。',
                '➡️ 变量的查找方式为：词法 => 变量环境 => 作用域链...'
              ]
            }
          ]
        }
      ]
    }
  ],
  'profession/test': [
    '高质量的代码',
    '更早的发现Bug,减少成本',
    '让重构和升级变得更加容易和可靠',
    '让开发流程更加敏捷'
  ],
  'profession/component-ui': [
    '代码结构',
    '样式解决方案',
    '组件需求分析和编码',
    '组件测试用例分析和编码',
    '代码打包输出和发布',
    'CI/CD 文档的生成'
  ]
};
