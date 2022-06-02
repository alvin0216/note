(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{682:function(a,t,s){"use strict";s.r(t);var n=s(7),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"相关资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#相关资料"}},[a._v("#")]),a._v(" 相关资料")]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/",target:"_blank",rel:"noopener noreferrer"}},[a._v("lerna 中文"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/71385053",target:"_blank",rel:"noopener noreferrer"}},[a._v("基于 lerna 和 yarn workspace 的 monorepo 工作流"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.cn/post/6844903918279852046",target:"_blank",rel:"noopener noreferrer"}},[a._v("lerna+yarn workspace+monorepo 项目的最佳实践"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.cn/post/6844904194999058440",target:"_blank",rel:"noopener noreferrer"}},[a._v("lerna 多包管理实践"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://www.bilibili.com/read/cv5101274/",target:"_blank",rel:"noopener noreferrer"}},[a._v("在使用 lerna 的实践中遇到了一些问题，这里汇总一下，供大家参考"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/362042945",target:"_blank",rel:"noopener noreferrer"}},[a._v("深入 lerna 发包机制 —— lerna publish"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/350317373",target:"_blank",rel:"noopener noreferrer"}},[a._v("【译】配置 Monorepo 的几种 \b 工具 lerna、npm、yarn 及其性能对比"),s("OutboundLink")],1)])]),a._v(" "),s("p",[a._v("常用配置")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("lerna init "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 初始化")]),a._v("\nlerna clean -y "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 快速删除包")]),a._v("\nlerna "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" --scope"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("aa @alvin/tools "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 往 aa 包里添加 @alvin/tools")]),a._v("\nlerna run start --scope"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("aa --scope"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("bb --parallel "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 启动所有命令")]),a._v("\nlerna create xx "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 新建包")]),a._v("\nlerna publish "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 发布")]),a._v("\nlerna version "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 打版本")]),a._v("\n")])])]),s("h2",{attrs:{id:"yarn-workspaces"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yarn-workspaces"}},[a._v("#")]),a._v(" yarn workspaces")]),a._v(" "),s("Tabs",{attrs:{type:"border-card"}},[s("Tab",{attrs:{label:"配置"}},[s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// lerna.json")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"packages"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"packages/*"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"version"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"independent"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"npmClient"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"yarn"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"useWorkspaces"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// root packages.json")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"workspace"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"packages/*"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("这样执行 "),s("code",[a._v("yarn")]),a._v(" 或者 "),s("code",[a._v("yarn install")]),a._v(" 就和 "),s("code",[a._v("lerna bootstrap --hoist")]),a._v(" 一样了。此时执行 "),s("code",[a._v("lerna bootstrap")]),a._v(" 的意义不大，因为它只是调用 "),s("code",[a._v("yarn install")]),a._v(" 本身罢了。")])]),a._v(" "),s("Tab",{attrs:{label:"常用命令"}},[s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 下面的命令将显示你当前项目的工作空间依赖树。")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" workspaces info\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 下一个指令可以让你在选定的工作空间（即包）中运行所选的yarn命令。")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" workspace "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("package-name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("command"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 举个例子")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" workspace packageA "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" -D react\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" workspace packageA remove react\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 如果你想为所有的包添加一个共同的依赖关系，进入项目的根目录并使用-W")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" react -W\n")])])]),s("p",[a._v("即 yarn 将所有的依赖关系提升到根级。因此，yarn 只在项目中包含一次依赖关系。")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// package.json")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//...")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"workspaces"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"packages"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"packages/*"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"nohoist"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"**/react-native"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//...")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])])])],1),a._v(" "),s("h2",{attrs:{id:"lerna-publish"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lerna-publish"}},[a._v("#")]),a._v(" lerna publish")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("lerna changed "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看那些包修改了 需要发布")]),a._v("\nlerna publish "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 不配置的话 默认让你选择版本 并且会推送 tag 到远程服务器")]),a._v("\nlerna publish --cancary "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 不推送 tag")]),a._v("\n")])])]),s("p",[a._v("以@开头包的发布问题，发布 package 的名字如果是以@开头的，例如 "),s("code",[a._v("@alvin/tools")]),a._v("，npm 默认以为是私人发布，需要使用 "),s("code",[a._v("npm publish --access public")]),a._v(" 发布。但是 lerna publish 不支持该参数，解决方法参考: "),s("a",{attrs:{href:"https://github.com/lerna/lerna/issues/914",target:"_blank",rel:"noopener noreferrer"}},[a._v("issue"),s("OutboundLink")],1)]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// package.json")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@alvin/tools"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"publishConfig"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"access"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"publish"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 如果该模块需要发布，对于scope模块，需要设置为publish，否则需要权限验证")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h2",{attrs:{id:"引入包编译不通过"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#引入包编译不通过"}},[a._v("#")]),a._v(" 引入包编译不通过？")]),a._v(" "),s("p",[a._v("webpack 配置")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("chainWebpack")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[a._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("module\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rule")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'ts-in-node_modules'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("include"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[a._v("node_modules\\/@alvin")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[a._v("Text")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 这里是文件夹的名字 比如 packages/Text")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[a._v("Input")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("end")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])])],1)}),[],!1,null,null,null);t.default=e.exports}}]);