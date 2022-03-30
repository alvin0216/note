(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{677:function(s,t,a){"use strict";a.r(t);var e=a(6),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("对于 TCP 而言，在传输的时候分为两个部分: "),a("strong",[s._v("TCP 头")]),s._v("和"),a("strong",[s._v("数据部分")]),s._v("。")]),s._v(" "),a("p",[s._v("而 HTTP 类似，也是 "),a("code",[s._v("header + body")]),s._v(" 的结构，具体而言:")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[s._v("起始行 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" 头部 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" 空行 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" 实体"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("details",{staticClass:"custom-block details"},[a("summary",[s._v("See More")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/http-wireshark.png",alt:""}})])]),s._v(" "),a("h2",{attrs:{id:"起始行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#起始行"}},[s._v("#")]),s._v(" 起始行")]),s._v(" "),a("p",[s._v("对于请求报文来说：")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("GET")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("home "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HTTP")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.1")]),s._v("\n")])])]),a("p",[s._v("也就是"),a("code",[s._v("方法")]),s._v(" + "),a("code",[s._v("路径")]),s._v(" + "),a("code",[s._v("http 版本")]),s._v("。")]),s._v(" "),a("p",[s._v("对于响应报文来说，起始行一般长这个样:")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HTTP")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("200")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("OK")]),s._v("\n")])])]),a("p",[a("code",[s._v("http 版本")]),s._v(" + "),a("code",[s._v("状态码")]),s._v(" + "),a("code",[s._v("原因")]),s._v("。")]),s._v(" "),a("h2",{attrs:{id:"头部"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#头部"}},[s._v("#")]),s._v(" 头部")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/response-header.png",alt:""}})]),s._v(" "),a("p",[s._v("不管是请求头还是响应头，其中的字段是相当多的，而且牵扯到 http 非常多的特性，这里就不一一列举的，重点看看这些头部字段的格式：")]),s._v(" "),a("ul",[a("li",[s._v("字段名不区分大小写")]),s._v(" "),a("li",[s._v("字段名不允许出现空格，不可以出现下划线 "),a("code",[s._v("_")])]),s._v(" "),a("li",[s._v("字段名后面必须紧接着 "),a("code",[s._v(":")])])]),s._v(" "),a("h2",{attrs:{id:"空行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#空行"}},[s._v("#")]),s._v(" 空行")]),s._v(" "),a("p",[a("code",[s._v("空行")]),s._v(" 用于区分"),a("strong",[s._v("头部")]),s._v("和"),a("strong",[s._v("实体")])]),s._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"title"},[s._v("如果说在头部中间故意加一个空行会怎么样？")]),a("p",[s._v("那么空行后的内容全部被视为实体。")])]),a("h2",{attrs:{id:"实体"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实体"}},[s._v("#")]),s._v(" 实体")]),s._v(" "),a("p",[s._v("就是具体的数据了，也就是 body 部分。请求报文对应请求体, 响应报文对应响应体。")])])}),[],!1,null,null,null);t.default=r.exports}}]);