(window.webpackJsonp=window.webpackJsonp||[]).push([[162],{753:function(t,a,r){"use strict";r.r(a);var s=r(7),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("p",[t._v("数据链路层（mac） -> 网络层（IP）-> 传输层（TCP/UDP）-> 应用层（HTTP、SMTP、FTP）")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/network-model.png",alt:""}})]),t._v(" "),r("h2",{attrs:{id:"数据链路层-mac"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#数据链路层-mac"}},[t._v("#")]),t._v(" 数据链路层(Mac)")]),t._v(" "),r("p",[t._v("负责在以太网、WiFi 这样的底层网络上发送原始数据包，工作在网卡这个层次，使用 "),r("code",[t._v("MAC")]),t._v(" 地址来标记网络上的设备，所以有时候也叫 "),r("code",[t._v("MAC")]),t._v(" 层。")]),t._v(" "),r("h2",{attrs:{id:"网络层-ip"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#网络层-ip"}},[t._v("#")]),t._v(" 网络层(IP)")]),t._v(" "),r("p",[t._v("IP 协议就处在这一层。因为 IP 协议定义了“IP 地址”的概念，所以就可以在“链接层”的基础上，用 IP 地址取代 MAC 地址，把许许多多的局域网、广域网连接成一个虚拟的巨大网络，在这个网络里找设备时只要把 IP 地址再“翻译”成 MAC 地址就可以了。")]),t._v(" "),r("h2",{attrs:{id:"传输层-tcp-udp"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#传输层-tcp-udp"}},[t._v("#")]),t._v(" 传输层(TCP/UDP)")]),t._v(" "),r("p",[t._v("传输层负责为两台主机中的进程提供通信服务，它使用 16 位的端口号来标识端口，当两个计算机中的进程要进行通讯时，除了要知道对方的 IP 地址外，还需要知道对方的端口。该层主要有以下两个协议：用户数据报协议（UDP，User Datagram Protocol）和传输控制协议（TCP，Transmission Control Protocol）：")]),t._v(" "),r("h2",{attrs:{id:"应用层-http-smtp-ftp"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#应用层-http-smtp-ftp"}},[t._v("#")]),t._v(" 应用层(HTTP/SMTP/FTP...)")]),t._v(" "),r("p",[t._v("由于下面的三层把基础打得非常好，所以在这一层就“百花齐放”了，有各种面向具体应用的协议。例如 Telnet、SSH、FTP、SMTP 等等，当然还有我们的 HTTP。")]),t._v(" "),r("p",[t._v("相关链接 "),r("a",{attrs:{href:"https://juejin.im/post/6844904049800642568",target:"_blank",rel:"noopener noreferrer"}},[t._v("详解 四层、五层、七层 计算机网络模型"),r("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);