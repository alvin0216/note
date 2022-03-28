(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{656:function(t,s,a){"use strict";a.r(s);var n=a(6),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("首先需要明白的是，机器是读不懂 JS 代码，机器只能理解特定的机器码，那如果要让 JS 的逻辑在机器上运行起来，就必须将 JS 的代码翻译成机器码，然后让机器识别。JS 属于解释型语言，对于解释型的语言说，解释器会对源代码做如下分析:")]),t._v(" "),a("ul",[a("li",[t._v("通过词法分析和语法分析生成 AST(抽象语法树)")]),t._v(" "),a("li",[t._v("生成字节码：然后解释器根据字节码来执行程序。")])]),t._v(" "),a("h2",{attrs:{id:"生成-ast-和执行上下文"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成-ast-和执行上下文"}},[t._v("#")]),t._v(" 生成 AST 和执行上下文")]),t._v(" "),a("h3",{attrs:{id:"词法分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#词法分析"}},[t._v("#")]),t._v(" 词法分析")]),t._v(" "),a("p",[a("strong",[t._v("第一阶段是分词（tokenize），又称为词法分析")]),t._v("，其作用是将一行行的源码拆解成一个个 token。所谓 token，指的是语法上不可能再分的、最小的单个字符或字符串。你可以参考下图来更好地理解什么 token。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" myName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'极客时间'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-complie1.png",alt:""}})]),t._v(" "),a("p",[t._v("即解析成了四个 token，这就是词法分析的作用。")]),t._v(" "),a("h3",{attrs:{id:"语法分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#语法分析"}},[t._v("#")]),t._v(" 语法分析")]),t._v(" "),a("p",[a("strong",[t._v("第二阶段是解析（parse），又称为语法分析")]),t._v("，其作用是将上一步生成的 token 数据，根据语法规则转为 AST。如果源码符合语法规则，这一步就会顺利完成。但如果源码存在语法错误，这一步就会终止，并抛出一个“语法错误”。")]),t._v(" "),a("p",[t._v("这就是 AST 的生成过程，先分词，再解析。")]),t._v(" "),a("p",[t._v("你可以结合下面这段代码来直观地感受下什么是 AST：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" myName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'极客时间'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("23")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nmyName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'geektime'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-complie2.png",alt:""}})]),t._v(" "),a("p",[t._v("当生成了 AST 之后，编译器/解释器后续的工作都要依靠 AST 而不是源代码。")]),t._v(" "),a("p",[t._v("AST 是非常重要的一种数据结构，在很多项目中有着广泛的应用。其中最著名的一个项目是 Babel。Babel 是一个被广泛使用的代码转码器，可以将 ES6 代码转为 ES5 代码，这意味着你可以现在就用 ES6 编写程序，而不用担心现有环境是否支持 ES6。Babel 的工作原理就是先将 ES6 源码转换为 AST，然后再将 ES6 语法的 AST 转换为 ES5 语法的 AST，最后利用 ES5 的 AST 生成 JavaScript 源代码。")]),t._v(" "),a("p",[t._v("除了 Babel 外，还有 ESLint 也使用 AST。ESLint 是一个用来检查 JavaScript 编写规范的插件，其检测流程也是需要将源码转换为 AST，然后再利用 AST 来检查代码规范化的问题。")]),t._v(" "),a("h2",{attrs:{id:"生成字节码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成字节码"}},[t._v("#")]),t._v(" 生成字节码")]),t._v(" "),a("p",[t._v("有了 AST 和执行上下文后，那接下来的第二步，解释器 Ignition 就登场了，它会根据 AST 生成字节码，并解释执行字节码。")]),t._v(" "),a("p",[t._v("其实一开始 V8 并没有字节码，而是直接将 AST 转换为机器码，由于执行机器码的效率是非常高效的，所以这种方式在发布后的一段时间内运行效果是非常好的。但是随着 Chrome 在手机上的广泛普及，特别是运行在 512M 内存的手机上，内存占用问题也暴露出来了，因为 V8 需要消耗大量的内存来存放转换后的机器码。为了解决内存占用问题，V8 团队大幅重构了引擎架构，引入字节码，并且抛弃了之前的编译器，最终花了将进四年的时间，实现了现在的这套架构。")]),t._v(" "),a("p",[t._v("那什么是字节码呢？为什么引入字节码就能解决内存占用问题呢？")]),t._v(" "),a("p",[a("strong",[t._v("字节码就是介于 AST 和机器码之间的一种代码。但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码后才能执行。")])]),t._v(" "),a("p",[t._v("和原来不同的是，现在不用一次性将全部的字节码都转换成机器码，而是通过解释器来逐行执行字节码，省去了生成二进制文件的操作，这样就大大降低了内存的压力。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-complie3.png",alt:""}})]),t._v(" "),a("p",[t._v("从图中可以看出，机器码所占用的空间远远超过了字节码，所以使用字节码可以减少系统的内存使用。")]),t._v(" "),a("h2",{attrs:{id:"执行代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行代码"}},[t._v("#")]),t._v(" 执行代码")]),t._v(" "),a("p",[t._v("通常，如果有一段第一次执行的字节码，解释器 Ignition 会逐条解释执行。到了这里，相信你已经发现了，解释器 Ignition 除了负责生成字节码之外，它还有另外一个作用，就是解释执行字节码。在 Ignition 执行字节码的过程中，如果发现有热点代码（HotSpot），比如"),a("strong",[t._v("一段代码被重复执行多次，这种就称为热点代码")]),t._v("，那么后台的编译器 TurboFan 就会把该段热点的字节码编译为高效的机器码，然后当再次执行这段被优化的代码时，只需要执行编译后的机器码就可以了，这样就大大提升了代码的执行效率。")]),t._v(" "),a("p",[t._v("这种字节码跟编译器和解释器结合的技术，我们称之为"),a("code",[t._v("即时编译")]),t._v(", 也就是我们经常听到的 "),a("code",[t._v("JIT")]),t._v("。")]),t._v(" "),a("p",[t._v("你可以结合下图看看 JIT 的工作过程：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-complie4.png",alt:""}})]),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("总结：")]),t._v(" "),a("ul",[a("li",[t._v("V8 依据 JavaScript 代码生成 AST 和执行上下文，")]),t._v(" "),a("li",[t._v("再基于 AST 生成字节码，")]),t._v(" "),a("li",[t._v("由解释器逐行执行字节码，遇到热点代码启动编译器进行编译，生成对应的机器码, 以优化执行效率")])])])}),[],!1,null,null,null);s.default=e.exports}}]);