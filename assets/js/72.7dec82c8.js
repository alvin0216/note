(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{871:function(t,s,a){"use strict";a.r(s);var v=a(3),_=Object(v.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("下面的这张图对比了 HTTP/1、HTTPS 和 HTTP/2 的协议栈，你可以清晰地看到，HTTP/2 是建立在“HPack”“Stream”“TLS1.2”基础之上的，比 HTTP/1、HTTPS 复杂了一些。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/http2-vs-http.png",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"连接前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#连接前言"}},[t._v("#")]),t._v(" 连接前言")]),t._v(" "),a("p",[t._v("由于 HTTP/2“事实上”是基于 TLS，所以在正式收发数据之前，会有 TCP 握手和 TLS 握手，这两个步骤相信你一定已经很熟悉了，所以这里就略过去不再细说。")]),t._v(" "),a("p",[t._v("TLS 握手成功之后，客户端必须要发送一个“"),a("strong",[t._v("连接前言")]),t._v("”（connection preface），用来确认建立 HTTP/2 连接。")]),t._v(" "),a("p",[t._v("这个“连接前言”是标准的 HTTP/1 请求报文，使用纯文本的 ASCII 码格式，请求方法是特别注册的一个关键字“PRI”，全文只有 24 个字节：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PRI")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTTP")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2.0")]),t._v("\\r\\n\\r\\nSM\\r\\n\\r\\n\n")])])]),a("p",[t._v("只要服务器收到这个“有魔力的字符串”，就知道客户端在 TLS 上想要的是 HTTP/2 协议，而不是其他别的协议，后面就会都使用 HTTP/2 的数据格式。")]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("nginx 开启 http2 也比较简单")]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[t._v("server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen       443 http2 ssl; "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 443 端口 http2 ssl")]),t._v("\n    server_name  alvin.run;\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#... 这是是上面的配置")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),a("h2",{attrs:{id:"头部压缩-略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#头部压缩-略"}},[t._v("#")]),t._v(" 头部压缩 （略）")]),t._v(" "),a("p",[t._v("上文讲过")]),t._v(" "),a("h2",{attrs:{id:"二进制帧"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二进制帧"}},[t._v("#")]),t._v(" 二进制帧")]),t._v(" "),a("p",[t._v("HTTP/2 中传输的帧结构如下图所示")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/binary-frame.png",alt:""}})]),t._v(" "),a("p",[t._v("每个帧分为"),a("strong",[t._v("帧头")]),t._v("和"),a("strong",[t._v("帧体")]),t._v("。先是三个字节的帧长度，这个长度表示的是"),a("strong",[t._v("帧体")]),t._v("的长度。")]),t._v(" "),a("p",[t._v("然后是帧类型，大概可以分为"),a("strong",[t._v("数据帧")]),t._v("和"),a("strong",[t._v("控制帧")]),t._v("两种。数据帧用来存放 HTTP 报文，控制帧用来管理流的传输。")]),t._v(" "),a("p",[t._v("接下来的一个字节是"),a("strong",[t._v("帧标志")]),t._v("，里面一共有 8 个标志位，常用的有 "),a("code",[t._v("END_HEADERS")]),t._v(" 表示头数据结束，"),a("code",[t._v("END_STREAM")]),t._v(" 表示单方向数据发送结束。")]),t._v(" "),a("p",[t._v("后 4 个字节是 "),a("code",[t._v("Stream ID")]),t._v(", 也就是"),a("strong",[t._v("流标识符")]),t._v("，有了它，接收方就能从乱序的二进制帧中选择出 ID 相同的帧，按顺序组装成请求/响应报文。")]),t._v(" "),a("h3",{attrs:{id:"流的状态变化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#流的状态变化"}},[t._v("#")]),t._v(" 流的状态变化")]),t._v(" "),a("p",[t._v("从前面可以知道，在 HTTP/2 中，"),a("strong",[t._v("所谓的流，其实就是二进制帧的双向传输的序列")]),t._v("。那么在 HTTP/2 请求和响应的过程中，流的状态是如何变化的呢？")]),t._v(" "),a("p",[t._v("HTTP/2 其实也是借鉴了 TCP 状态变化的思想，根据帧的标志位来实现具体的状态改变。这里我们以一个普通的请求-响应过程为例来说明：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/stream.png",alt:""}})]),t._v(" "),a("p",[t._v("最开始两者都是空闲状态，当客户端发送 Headers 帧后，开始分配 "),a("code",[t._v("Stream ID")]),t._v(", 此时客户端的流打开, 服务端接收之后服务端的流也打开，两端的流都打开之后，就可以互相传递数据帧和控制帧了。")]),t._v(" "),a("p",[t._v("当客户端要关闭时，向服务端发送 "),a("code",[t._v("END_STREAM")]),t._v(" 帧，进入半关闭状态, 这个时候客户端只能接收数据，而不能发送数据。")]),t._v(" "),a("p",[t._v("服务端收到这个 END_STREAM 帧后也进入半关闭状态，不过此时服务端的情况是只能发送数据，而不能接收数据。随后服务端也向客户端发送 END_STREAM 帧，表示数据发送完毕，双方进入关闭状态。")]),t._v(" "),a("p",[t._v("如果下次要开启新的流，流 ID 需要自增，直到上限为止，到达上限后开一个新的 TCP 连接重头开始计数。由于流 ID 字段长度为 4 个字节，最高位又被保留，因此范围是 0 ~ 2 的 31 次方，大约 21 亿个。")])])}),[],!1,null,null,null);s.default=_.exports}}]);