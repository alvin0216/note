(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{666:function(t,v,_){"use strict";_.r(v);var o=_(6),s=Object(o.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("p",[_("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/dns.png",alt:""}})]),t._v(" "),_("h2",{attrs:{id:"域名结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#域名结构"}},[t._v("#")]),t._v(" 域名结构")]),t._v(" "),_("p",[t._v("就以 "),_("code",[t._v("mail.baidu.com")]),t._v(" 域名为例，域名最后一个.的右侧部分我们称之为顶级域名，倒数第二个.右侧部分称之为二级域名，以此类推，就会有三级域名，四级域名等等。")]),t._v(" "),_("p",[t._v("在 "),_("code",[t._v("mail.baidu.com")]),t._v(" 的域名中，"),_("code",[t._v("com")]),t._v(" 成为顶级域名，"),_("code",[t._v("baidu.com")]),t._v(" 称为二级域名，"),_("code",[t._v("mail.baidu.com")]),t._v(" 称为三级域名。")]),t._v(" "),_("p",[t._v("域名由两个或两个以上的词组成，常见域名为二级域名+顶级域名组成，所以一般我们会将域名分为顶级域名、二级域名，除此之外，还有国家代码顶级域名。")]),t._v(" "),_("h2",{attrs:{id:"查询顺序"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#查询顺序"}},[t._v("#")]),t._v(" 查询顺序")]),t._v(" "),_("p",[t._v("现在我们来看看怎么去根据域名查询一台服务器的 IP 地址。")]),t._v(" "),_("ol",[_("li",[_("strong",[t._v("检查浏览器缓存")]),t._v("中是否存在该域名与 IP 地址的映射关系，如果有则解析结束，没有则继续")]),t._v(" "),_("li",[t._v("到系统本地查找映射关系，一般在 "),_("strong",[t._v("hosts 文件")]),t._v("中，如果有则解析结束，否则继续")]),t._v(" "),_("li",[t._v("到"),_("strong",[t._v("本地域名服务器")]),t._v("去查询，有则结束，否则继续")]),t._v(" "),_("li",[_("strong",[t._v("本地域名服务器查询根域名服务器")]),t._v("，该过程并不会返回映射关系，只会告诉你去下级服务器(顶级域名服务器)查询")]),t._v(" "),_("li",[_("strong",[t._v("本地域名服务器查询顶级域名服务器")]),t._v("(即 com 服务器)，同样不会返回映射关系，只会引导你去二级域名服务器查询")]),t._v(" "),_("li",[_("strong",[t._v("本地域名服务器查询二级域名服务器")]),t._v("(即 "),_("code",[t._v("baidu.com")]),t._v(" 服务器)，引导去三级域名服务器查询")]),t._v(" "),_("li",[_("strong",[t._v("本地域名服务器查询三级域名服务器")]),t._v("(即 mail.baidu.com 服务器)，此时已经是最后一级了，如果有则返回映射关系，则本地域名服务器加入自身的映射表中，方便下次查询或其他用户查找，同时返回给该用户的计算机，没有找到则网页报错")])]),t._v(" "),_("ul",[_("li",[_("a",{attrs:{href:"https://juejin.cn/post/6909041150728863752",target:"_blank",rel:"noopener noreferrer"}},[t._v("浏览器之 DNS 解析过程详解"),_("OutboundLink")],1)])])])}),[],!1,null,null,null);v.default=s.exports}}]);