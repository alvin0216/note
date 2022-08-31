import { defineConfig } from 'vitepress';

export default defineConfig({
  title: "Alvin's note",
  description: 'Peace and love...',
  lastUpdated: true,

  // @ts-ignore
  base: process?.env.KEY === 'gh-pages' ? '/note/' : undefined,

  themeConfig: {
    algolia: {
      appId: 'KFDE6WX025',
      apiKey: '1921e3dd751514552b76ac8dd28ece9a',
      indexName: 'note',
    },
    nav: [
      { text: 'Home', link: '/others/' },
      { text: 'Javascript', link: '/javascript/' },
      { text: '网络协议', link: '/network-protocol/' },
      { text: '工程化', link: '/devops/' },
      { text: '浏览器', link: '/browser/' },
      { text: '算法', link: '/algorithm/' },
      { text: 'React', link: '/react/' },
    ],
    sidebar: {
      '/others/': [
        {
          text: '遇到的一些问题',
          items: [
            { text: 'canvas 跨域', link: '/others/problems/canvas 跨域' },
            { text: 'url 转为 Base64', link: '/others/problems/url 转为 Base64' },
            { text: 'lerna 多包管理发布问题', link: '/others/problems/lerna 多包管理发布问题' },
            { text: 'nginx gzip 不生效', link: '/others/problems/nginx gzip 不生效' },
            { text: 'iframe 打开全屏无效', link: '/others/problems/iframe 打开全屏无效' },
          ],
        },
        {
          text: 'Uncategorized',
          items: [
            { text: 'OAuth2', link: '/others/oAuth2' },
            { text: 'Github 授权登录', link: '/others/oAuth2-github' },
            { text: '远程组件加载方案', link: '/others/远程组件加载方案' },
          ],
        },
      ],

      '/react/': [
        {
          text: 'React',
          items: [
            { text: 'hooks原理', link: '/react/hooks原理' },
            { text: 'requestIdleCallback', link: '/react/requestIdleCallback' },
            {
              text: 'React',
              items: [
                { text: 'React 集合', link: '/react/' },
                { text: '不可变数据', link: '/react/immer' },
                { text: '探索 hooks API', link: '/react/hooks-api' },
                { text: 'setState 是同步还是异步的？', link: '/react/setState' },
                { text: 'concurrent 模式', link: '/react/concurrent' },
                { text: 'React Diff 算法', link: '/react/diff' },
                { text: 'React 合成事件', link: '/react/synthetic-event' },
              ],
            },
          ],
        },
      ],

      '/devops/': [
        {
          text: '持续集成',
          items: [
            { text: '使用 travis 进行持续集成', link: '/devops/travis' },
            { text: 'github webhooks 自动化部署', link: '/devops/webhooks' },
            { text: 'Github Action', link: '/devops/github-action' },
          ],
        },
        {
          text: '环境配置',
          items: [
            { text: 'Mac 常用命令', link: '/devops/mac' },
            { text: 'ssh 免密登陆服务器配置', link: '/devops/ssh' },
            { text: "申请Let's Encrypt免费SSL证书", link: '/devops/certificate' },
            { text: 'charles 抓包环境配置', link: '/devops/charles' },
          ],
        },
        {
          text: 'nginx',
          items: [
            { text: 'nginx 基础', link: '/devops/nginx/basics' },
            { text: 'nginx 代理', link: '/devops/nginx/proxy' },
          ],
        },
      ],

      '/network-protocol/': [
        {
          text: 'Awsome',
          collapsible: true,
          items: [
            { text: 'DNS', link: '/network-protocol/dns' },
            { text: 'CDN', link: '/network-protocol/cdn' },
            { text: '网络模型', link: '/network-protocol/01.网络模型' },
          ],
        },
        {
          text: 'TCP',
          collapsible: true,
          items: [
            { text: 'tcp报文', link: '/network-protocol/02.tcp报文' },
            { text: 'tcp三次握手', link: '/network-protocol/03.tcp三次握手' },
            { text: 'tcp四次挥手', link: '/network-protocol/04.tcp四次挥手' },
            { text: 'tcp中syn攻击', link: '/network-protocol/05.tcp中syn攻击' },
            { text: 'tcp和udp的区别', link: '/network-protocol/06.tcp和udp的区别' },
          ],
        },

        {
          text: 'HTTP',
          collapsible: true,
          items: [
            { text: 'http报文结构', link: '/network-protocol/07.http报文结构' },
            { text: 'http的请求方法', link: '/network-protocol/08.http的请求方法' },
            { text: 'http状态码', link: '/network-protocol/09.http状态码' },
            { text: 'http请求体和请求头', link: '/network-protocol/10.http请求体和请求头' },
            { text: 'cookie', link: '/network-protocol/11.cookie' },
            { text: 'http优缺点', link: '/network-protocol/12.http优缺点' },
            { text: 'http队头阻塞', link: '/network-protocol/13.http队头阻塞' },
          ],
        },
        {
          text: 'HTTPS',
          collapsible: true,
          items: [
            { text: 'https改进了什么', link: '14.https改进了什么' },
            { text: 'https的tsl连接过程', link: '15.https的tsl连接过程' },
            { text: 'https证书', link: '16.https证书' },
          ],
        },
        {
          text: 'HTTP2',
          collapsible: true,
          items: [
            { text: 'http2新功能', link: '17.http2新功能' },
            { text: 'http2剖析', link: '18.http2剖析' },
            { text: 'http2服务器推送功能', link: '19.http2服务器推送功能' },
            { text: 'http3', link: '20.http3' },
          ],
        },
      ],

      '/javascript/': [
        {
          text: '基础知识',
          items: [
            { text: 'this', link: '/javascript/this' },
            { text: '闭包', link: '/javascript/closure' },
            { text: '原型', link: '/javascript/prototype' },
            { text: '继承', link: '/javascript/extends' },
            { text: 'for of', link: '/javascript/for-of' },
            { text: 'setTimeout', link: '/javascript/setTimeout' },
            { text: 'requestAnimationFrame', link: '/javascript/requestAnimationFrame' },
            { text: '数据类型', link: '/javascript/data-types' },
            { text: 'eval', link: '/javascript/eval' },
            { text: 'proxy', link: '/javascript/proxy' },
          ],
        },
        {
          text: 'v8 - 引擎工作原理',
          items: [
            { text: 'JavaScript 代码的执行流程', link: '/javascript/v8/run-js' },
            { text: '什么是执行上下文栈？', link: '/javascript/v8/context-stack' },
            { text: '什么是作用域？', link: '/javascript/v8/scope' },
            { text: '变量在作用域链上怎么查找？', link: '/javascript/v8/scope-chain' },
            { text: '谈一谈 v8 的垃圾回收机制？', link: '/javascript/v8/gc' },
            { text: 'V8 是如何执行 JavaScript 的？', link: '/javascript/v8/compile' },
            { text: '谈一谈 EventLoop？', link: '/javascript/v8/eventloop' },
          ],
        },
      ],
      '/browser/': [
        {
          text: '浏览器',
          items: [
            { text: 'Cookie', link: '/browser/cookie' },
            { text: '浏览器缓存', link: '/browser/cache' },
            { text: '跨域', link: '/browser/cross-origin' },
            // { text: 'xss 攻击', link: '/browser/xss' },
            { text: 'CSRF 攻击', link: '/browser/csrf' },
          ],
        },
      ],

      '/algorithm/': [
        {
          text: '字符串',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '千位分隔数', link: '/algorithm/字符串/千位分隔数' },
            { text: '反转字符串II', link: '/algorithm/字符串/反转字符串II' },
            { text: '最长不含重复字符的子字符串', link: '/algorithm/字符串/最长不含重复字符的子字符串' },
            { text: '字符串的排列', link: '/algorithm/字符串/字符串的排列' },
            { text: '最小覆盖子串', link: '/algorithm/字符串/最小覆盖子串' },
            { text: '回文系列', link: '/algorithm/字符串/回文系列' },
          ],
        },
        {
          text: '数组',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '两数之和', link: '/algorithm/数组/两数之和' },
            { text: '合并两个有序数组', link: '/algorithm/数组/合并两个有序数组' },
            { text: '长度最小的子数组', link: '/algorithm/数组/长度最小的子数组' },
            { text: '双指针', link: '/algorithm/数组/双指针' },
          ],
        },
        {
          text: '链表',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '移除链表元素', link: '/algorithm/链表/移除链表元素' },
            { text: '删除链表的倒数第n个结点', link: '/algorithm/链表/删除链表的倒数第n个结点' },
            { text: '反转链表', link: '/algorithm/链表/反转链表' },
            { text: '环形链表II', link: '/algorithm/链表/环形链表II' },
            { text: '相交链表', link: '/algorithm/链表/相交链表' },
            { text: 'k个一组翻转链表', link: '/algorithm/链表/k个一组翻转链表' },
          ],
        },
        {
          text: '二叉树',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '二叉树的遍历方式', link: '/algorithm/二叉树/二叉树的遍历方式' },
            { text: '二叉树的属性', link: '/algorithm/二叉树/二叉树的属性' },
            { text: '二叉树的修改与构造', link: '/algorithm/二叉树/二叉树的修改与构造' },
            { text: '二叉树的修改与构造2', link: '/algorithm/二叉树/二叉树的修改与构造2' },
            { text: '求二叉搜索树的属性', link: '/algorithm/二叉树/求二叉搜索树的属性' },
            { text: '二叉树的公共祖先', link: '/algorithm/二叉树/二叉树的公共祖先' },
            { text: '二叉树其他题目', link: '/algorithm/二叉树/二叉树其他题目' },
          ],
        },
        {
          text: '动态规划',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '动态规划理论基础', link: '/algorithm/动态规划/动态规划理论基础' },
            { text: '爬楼梯', link: '/algorithm/动态规划/爬楼梯' },
            { text: '不同路径', link: '/algorithm/动态规划/不同路径' },
            { text: '打家劫舍系列', link: '/algorithm/动态规划/打家劫舍系列' },
            { text: '买卖股票的最佳时机', link: '/algorithm/动态规划/买卖股票的最佳时机' },
            { text: '背包系列', link: '/algorithm/动态规划/背包系列' },
            { text: '连续', link: '/algorithm/动态规划/连续' },
          ],
        },
        {
          text: '回溯算法',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '回溯算法', link: '/algorithm/回溯/回溯算法' },
            { text: '回溯排列', link: '/algorithm/回溯/回溯排列' },
            { text: '回溯分割', link: '/algorithm/回溯/回溯分割' },
            { text: '子集', link: '/algorithm/回溯/子集' },
            { text: '子集II', link: '/algorithm/回溯/子集II' },
            { text: '组合总和', link: '/algorithm/回溯/组合总和' },
            { text: 'N皇后', link: '/algorithm/回溯/N皇后' },
          ],
        },
        {
          text: '深度遍历',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '岛屿数量', link: '/algorithm/深度遍历/岛屿数量' },
            { text: '单词搜索', link: '/algorithm/深度遍历/单词搜索' },
            { text: '螺旋矩阵', link: '/algorithm/深度遍历/螺旋矩阵' },
          ],
        },
        {
          text: '贪心算法',
          collapsible: true,
          collapsed: true,
          items: [{ text: '贪心入门', link: '/algorithm/贪心算法/贪心入门' }],
        },
        {
          text: '排序算法',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '冒泡排序', link: '/algorithm/sort/bubbleSort' },
            { text: '选择排序', link: '/algorithm/sort/selectionSort' },
            { text: '插入排序', link: '/algorithm/sort/insertSort' },
            { text: '归并排序', link: '/algorithm/sort/mergeSort' },
            { text: '快速排序', link: '/algorithm/sort/quickSort' },
            { text: '希尔排序', link: '/algorithm/sort/shellSort' },
            { text: '堆排序', link: '/algorithm/sort/heapSort' },
          ],
        },
      ],
    },
    editLink: {
      pattern: 'https://github.com/alvin0216/note//blob/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/alvin0216/note/blob/master' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Alvin',
    },
  },
});
