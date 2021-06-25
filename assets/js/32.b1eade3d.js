(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{546:function(t,a,e){"use strict";e.r(a);var s=e(3),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("环境 "),e("code",[t._v("mac")]),t._v(" + "),e("code",[t._v("iphone")])]),t._v(" "),e("h2",{attrs:{id:"安装-charles"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装-charles"}},[t._v("#")]),t._v(" 安装 Charles")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("brew cask "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" charles\n")])])]),e("p",[t._v("根据下载的版本号 "),e("a",{attrs:{href:"https://www.zzzmode.com/mytools/charles/",target:"_blank",rel:"noopener noreferrer"}},[t._v("破解 Charles"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"配置-charles"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-charles"}},[t._v("#")]),t._v(" 配置 Charles")]),t._v(" "),e("ol",[e("li",[t._v("获取本机的 IP 地址")])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 获取本机的 ip 地址（方式很多 这里就直接用命令行）")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ifconfig")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -oE "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'inet.*netmask'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -oE "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'(\\d+\\.){3}\\d+'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("sed")]),t._v(" -n 2p\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("配置本机的代理端口")])]),t._v(" "),e("p",[e("code",[t._v("Charles 菜单栏 -> Proxy -> Proxy Settings")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/proxy-settings.png",alt:""}})]),t._v(" "),e("ol",{attrs:{start:"3"}},[e("li",[t._v("配置 iPhone 代理")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/phone-proxy.png",alt:""}})]),t._v(" "),e("p",[t._v("注意，这里链接的是同个局域网。现在可以开始抓 "),e("code",[t._v("http")]),t._v(" 包了，但是还不可以抓取 "),e("code",[t._v("https")])]),t._v(" "),e("h2",{attrs:{id:"抓取-https"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#抓取-https"}},[t._v("#")]),t._v(" 抓取 HTTPS")]),t._v(" "),e("ol",[e("li",[t._v("在 "),e("code",[t._v("Charles 菜单栏 -> Help -> SSL Proxying -> Install Charles Root Certificate")]),t._v(" 中可以为 PC 安装证书，图示配置如下：")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/add-certificate.png",alt:""}})]),t._v(" "),e("p",[t._v("证书可以在 Mac 的钥匙串中查看，双击证书，将信任权限设定为始终信任。图示如下：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/auth-certificate.png",alt:""}})]),t._v(" "),e("ol",{attrs:{start:"2"}},[e("li",[t._v("iPhone 安装证书")])]),t._v(" "),e("p",[t._v("在 "),e("code",[t._v("Charles 菜单栏 -> Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser")]),t._v(" 中查看最新的官方证书下载地址。图示如下：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/phone-certificate.png",alt:""}})]),t._v(" "),e("p",[t._v("下载并安装描述文件。之后在到 "),e("code",[t._v("iPhone 设置 -> 关于本机 -> 证书信任设置")]),t._v("中启用根证书。图示如下：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/phone-auth-certificate.png",alt:""}})]),t._v(" "),e("p",[t._v("这样，就可以使用 Charles 中抓包 iPhone 发出的 HTTPS 请求并预览明文数据了。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.im/post/5c4ed14f6fb9a049ed3142cc",target:"_blank",rel:"noopener noreferrer"}},[t._v("iOS Charles 抓包"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"另外也推荐-whistle"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#另外也推荐-whistle"}},[t._v("#")]),t._v(" 另外也推荐 whistle")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://blog.csdn.net/weixin_42534940/article/details/88783455",target:"_blank",rel:"noopener noreferrer"}},[t._v("【MAC 工具】手机抓包工具之 —— whistle"),e("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=r.exports}}]);