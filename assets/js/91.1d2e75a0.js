(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{657:function(t,a,s){"use strict";s.r(a);var n=s(6),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"执行上下文栈的构成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行上下文栈的构成"}},[t._v("#")]),t._v(" 执行上下文栈的构成")]),t._v(" "),s("p",[t._v("JavaScript 代码的执行流程的第一步就是编译阶段：创建 "),s("code",[t._v("执行上下文")]),t._v(" 和 "),s("code",[t._v("可执行代码")]),t._v("。")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"},[t._v("JavaScript 的可执行代码(executable code)的类型有哪些了？")]),s("p",[t._v("其实很简单，就三种，"),s("strong",[t._v("全局代码、函数代码、eval 代码")]),t._v("。")])]),s("p",[t._v('当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"'),s("strong",[t._v("执行上下文(execution context)")]),t._v('"')]),t._v(" "),s("p",[t._v("所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文。")]),t._v(" "),s("p",[t._v("在执行上下文创建好后，JavaScript 引擎会将执行上下文压入栈中。这里列举一个例子：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" c")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addAll")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" c")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" d "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  result "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" result "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" d"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addAll")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("JS 执行代码后产生的执行上下文栈如图所示：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/ec-stack1.png",alt:""}})]),t._v(" "),s("ul",[s("li",[t._v("第一步，创建全局上下文，并将其压入栈底。")]),t._v(" "),s("li",[t._v("第二步，是调用 "),s("code",[t._v("addAll")]),t._v(" 函数。为 "),s("code",[t._v("addAll")]),t._v(" 创建执行上下文栈并押入栈中。")]),t._v(" "),s("li",[t._v("第三步，在 "),s("code",[t._v("addAll")]),t._v(" 函数中执行了 "),s("code",[t._v("add")]),t._v(" 函数，为 "),s("code",[t._v("add")]),t._v(" 创建执行上下文栈并押入栈中。")]),t._v(" "),s("li",[t._v("当 "),s("code",[t._v("add")]),t._v(" 执行完毕并返回时，"),s("code",[t._v("add")]),t._v(" 函数出栈，以此类推。当整个应用程序结束的时候，栈才被清空。")])]),t._v(" "),s("h2",{attrs:{id:"如何在浏览器中查看调用栈"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何在浏览器中查看调用栈"}},[t._v("#")]),t._v(" 如何在浏览器中查看调用栈")]),t._v(" "),s("Tabs",{attrs:{type:"border-card"}},[s("Tab",{attrs:{label:"打断点"}},[s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/ec-stack2.png",alt:""}})])]),t._v(" "),s("Tab",{attrs:{label:"使用 console.trace() 来输出当前的函数调用关系"}},[s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/ec-stack3.png",alt:""}})])])],1)],1)}),[],!1,null,null,null);a.default=e.exports}}]);