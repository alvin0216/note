import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  vite: {
    plugins: [
      vueJsx(), //插件使用
    ],
  },
  title: "Alvin's note",
  description: 'Peace and love...',
  lastUpdated: true,

  base: '/note/',

  themeConfig: {
    algolia: {
      appId: '4QUKK9AB99',
      apiKey: '859dce261164de50e0989b1b9e819711',
      indexName: 'alvin0216io',
    },

    nav: [
      { text: '记录', link: '/' },
      { text: '网络协议', link: '/network-protocol/' },
      { text: '算法', link: '/algorithm/' },
    ],
    sidebar: {
      '/': [
        {
          text: '理论',
          collapsed: false,
          items: [
            { text: 'Javascript', link: '/javascript' },
            { text: '垃圾回收机制', link: '/gc' },
            { text: 'EvenLoop', link: '/eventloop' },
            { text: '[安全] CSREF 攻击', link: '/csrf' },
            { text: '[浏览器] 缓存', link: '/浏览器缓存' },
          ],
        },
        {
          text: 'Quick Guide',
          collapsed: false,
          items: [
            { text: 'Github Action 配置', link: '/github-action' },
            { text: 'ssh 免密登陆服务器配置', link: '/ssh' },
            { text: "申请Let's Encrypt免费SSL证书", link: '/certificate' },
            { text: 'H5 拖拽示例', link: '/live-codes/h5-drag/h5-drag' },
            { text: 'Postmessage 通信', link: '/live-codes/iframe-postmessage/iframe-postmessage' },
            { text: 'OAuth2', link: '/oAuth2' },
            { text: 'Github 授权登录', link: '/oAuth2-github' },
            { text: 'nginx gzip 不生效', link: '/nginx gzip 不生效' },
            { text: 'iframe 打开全屏无效', link: '/iframe 打开全屏无效' },
          ],
        },
      ],

      '/network-protocol/': [
        {
          text: 'Awsome',
          items: [
            { text: 'DNS', link: '/network-protocol/dns' },
            { text: 'CDN', link: '/network-protocol/cdn' },
            { text: '网络模型', link: '/network-protocol/01.网络模型' },
          ],
        },
        {
          text: 'TCP',
          collapsed: true,
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
          items: [
            { text: 'https改进了什么', link: '14.https改进了什么' },
            { text: 'https的tsl连接过程', link: '15.https的tsl连接过程' },
            { text: 'https证书', link: '16.https证书' },
          ],
        },
        {
          text: 'HTTP2',
          items: [
            { text: 'http2新功能', link: '17.http2新功能' },
            { text: 'http2剖析', link: '18.http2剖析' },
            { text: 'http2服务器推送功能', link: '19.http2服务器推送功能' },
            { text: 'http3', link: '20.http3' },
          ],
        },
      ],

      '/algorithm/': [
        {
          text: '字符串',
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
          collapsed: true,
          items: [
            { text: '岛屿数量', link: '/algorithm/深度遍历/岛屿数量' },
            { text: '单词搜索', link: '/algorithm/深度遍历/单词搜索' },
            { text: '螺旋矩阵', link: '/algorithm/深度遍历/螺旋矩阵' },
          ],
        },
        {
          text: '贪心算法',
          collapsed: true,
          items: [{ text: '贪心入门', link: '/algorithm/贪心算法/贪心入门' }],
        },
        {
          text: '排序算法',
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
