(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{686:function(t,v,_){"use strict";_.r(v);var n=_(6),o=Object(n.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("ul",[_("li",[_("code",[t._v("TCP")]),t._v(" 是一个面向连接的、可靠的、基于字节流的传输层协议。")]),t._v(" "),_("li",[t._v("而 "),_("code",[t._v("UDP")]),t._v(" 是一个面向无连接的传输层协议。")])]),t._v(" "),_("ol",[_("li",[_("strong",[t._v("面向连接")]),t._v("。所谓的连接，指的是客户端和服务器的连接，在双方互相通信之前，TCP 需要三次握手建立连接，而 UDP 没有相应建立连接的过程。")]),t._v(" "),_("li",[_("strong",[t._v("可靠性")]),t._v("。TCP 花了非常多的功夫保证连接的可靠，这个可靠性体现在哪些方面呢？一个是有状态，另一个是可控制。")])]),t._v(" "),_("p",[t._v("TCP 会精准记录哪些数据发送了，哪些数据被对方接收了，哪些没有被接收到，而且保证数据包按序到达，不允许半点差错。这是"),_("strong",[t._v("有状态")]),t._v("。")]),t._v(" "),_("p",[t._v("当意识到丢包了或者网络环境不佳，TCP 会根据具体情况调整自己的行为，控制自己的发送速度或者重发。这是"),_("strong",[t._v("可控制")]),t._v("。")]),t._v(" "),_("p",[t._v("相应的，UDP 就是无状态, 不可控的。")]),t._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[_("strong",[t._v("面向字节流")]),t._v("。UDP 的数据传输是基于数据报的，这是因为仅仅只是继承了 IP 层的特性，而 TCP 为了维护状态，将一个个 IP 包变成了字节流。")])])])}),[],!1,null,null,null);v.default=o.exports}}]);