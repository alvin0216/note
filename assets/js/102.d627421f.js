(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{695:function(v,_,s){"use strict";s.r(_);var t=s(7),a=Object(t.a)({},(function(){var v=this,_=v.$createElement,s=v._self._c||_;return s("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[s("p",[v._v("我们都知道数据的存储方式是：基本类型的数据值都是直接保存在“栈”中的，引用类型的值是存放在“堆”中的。")]),v._v(" "),s("h2",{attrs:{id:"调用栈中的数据回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#调用栈中的数据回收"}},[v._v("#")]),v._v(" 调用栈中的数据回收")]),v._v(" "),s("p",[v._v("执行完函数，"),s("strong",[v._v("ESP 指针下移")]),v._v("，也就是上下文切换之后，栈顶的空间会自动被回收，释放内存。 但对于堆内存而言就比较复杂了，我们下面着重分析堆内存的垃圾回收。")]),v._v(" "),s("h2",{attrs:{id:"堆中的数据回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#堆中的数据回收"}},[v._v("#")]),v._v(" 堆中的数据回收")]),v._v(" "),s("p",[v._v("V8 中会把堆分为"),s("strong",[v._v("新生代")]),v._v("和"),s("strong",[v._v("老生代")]),v._v("两个区域，新生代就是临时分配的内存，存活时间短， 老生代是常驻内存，存活的时间长。V8 的堆内存，也就是两个内存之和。")]),v._v(" "),s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc1.png",alt:""}})]),v._v(" "),s("p",[v._v("根据这两种不同种类的堆内存，V8 采用了不同的回收策略，来根据不同的场景做针对性的优化。")]),v._v(" "),s("h3",{attrs:{id:"新生代内存的回收-scavenge"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#新生代内存的回收-scavenge"}},[v._v("#")]),v._v(" 新生代内存的回收 Scavenge")]),v._v(" "),s("p",[v._v("首先是新生代的内存，在 64 位和 32 位系统下分别为 32MB 和 16MB。新生代中的变量存活时间短，来了马上就走，不容易产生太大的内存负担，因此可以将它设的足够小。")]),v._v(" "),s("p",[v._v("那好了，新生代的垃圾回收是怎么做的呢？")]),v._v(" "),s("p",[v._v("首先将新生代内存空间一分为二:")]),v._v(" "),s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc2.png",alt:""}})]),v._v(" "),s("p",[v._v("其中 From 部分表示正在使用的内存，To 是目前闲置的内存。")]),v._v(" "),s("p",[v._v("当进行垃圾回收时，V8 将 From 部分的对象检查一遍，如果是存活对象那么复制到 To 内存中(在 To 内存中按照顺序从头放置的)，如果是非存活对象直接回收即可。")]),v._v(" "),s("p",[v._v("当所有的 From 中的存活对象按照顺序进入到 To 内存之后，From 和 To 两者的角色对调，From 现在被闲置，To 为正在使用，如此循环。")]),v._v(" "),s("p",[v._v("那你很可能会问了，直接将非存活对象回收了不就万事大吉了嘛，为什么还要后面的一系列操作？")]),v._v(" "),s("p",[v._v("From 内存是不按顺序放置的，在 To 内存中按照顺序从头放置的。不直接回收是为了应对：")]),v._v(" "),s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc3.png",alt:""}})]),v._v(" "),s("p",[v._v("深色的小方块代表存活对象，白色部分表示待分配的内存，由于堆内存是连续分配的，这样零零散散的空间可能会导致稍微大一点的对象没有办法进行空间分配，这种零散的空间也叫做"),s("code",[v._v("内存碎片")]),v._v("。刚刚介绍的新生代垃圾回收算法也叫 "),s("code",[v._v("Scavenge")]),v._v(" 算法。")]),v._v(" "),s("p",[s("code",[v._v("Scavenge")]),v._v(" 算法主要就是解决内存碎片的问题，在进行一顿复制之后，To 空间变成了这个样子:")]),v._v(" "),s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc4.png",alt:""}})]),v._v(" "),s("p",[v._v("是不是整齐了许多？这样就大大方便了后续连续空间的分配")]),v._v(" "),s("p",[v._v("不过 Scavenge 算法的劣势也非常明显，就是内存只能使用新生代内存的一半，但是它只存放生命周期短的对象，这种对象一般很少，因此时间性能非常优秀。")]),v._v(" "),s("h3",{attrs:{id:"老生代内存的回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#老生代内存的回收"}},[v._v("#")]),v._v(" 老生代内存的回收")]),v._v(" "),s("p",[v._v("刚刚介绍了新生代的回收方式，那么新生代中的变量如果经过多次回收后依然存在，那么就会被放入到老生代内存中，这种现象就叫晋升。")]),v._v(" "),s("p",[v._v("发生晋升其实不只是这一种原因，我们来梳理一下会有那些情况触发晋升:")]),v._v(" "),s("ul",[s("li",[v._v("已经经历过一次 Scavenge 回收。")]),v._v(" "),s("li",[v._v("To（闲置）空间的内存占用超过 25%。")])]),v._v(" "),s("p",[v._v("现在进入到老生代的垃圾回收机制当中，老生代中累积的变量空间一般都是很大的，当然不能用 Scavenge 算法啦，浪费一半空间不说，对庞大的内存空间进行复制岂不是劳民伤财？")]),v._v(" "),s("p",[v._v("那么对于老生代而言，究竟是采取怎样的策略进行垃圾回收的呢？")]),v._v(" "),s("p",[v._v("第一步，进行"),s("code",[v._v("标记-清除")]),v._v("。这个过程在《JavaScript 高级程序设计(第三版)》中有过详细的介绍，主要分成两个阶段，即标记阶段和清除阶段。首先会遍历堆中的所有对象，对它们做上标记，然后对于代码环境中"),s("code",[v._v("使用的变量")]),v._v("以及"),s("code",[v._v("被强引用")]),v._v("的变量取消标记，剩下的就是要删除的变量了，在随后的清除阶段对其进行空间的回收。")]),v._v(" "),s("p",[v._v("当然这又会引发内存碎片的问题，存活对象的空间不连续对后续的空间分配造成障碍。老生代又是如何处理这个问题的呢？")]),v._v(" "),s("p",[v._v("第二步，整理内存碎片。V8 的解决方式非常简单粗暴，在清除阶段结束后，把存活的对象全部往一端靠拢。")]),v._v(" "),s("p",[s("img",{attrs:{src:"https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc5.png",alt:""}})]),v._v(" "),s("p",[v._v("由于是移动对象，它的执行速度不可能很快，事实上也是整个过程中最耗时间的部分。")]),v._v(" "),s("h3",{attrs:{id:"增量标记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#增量标记"}},[v._v("#")]),v._v(" 增量标记")]),v._v(" "),s("p",[v._v("由于 JS 的单线程机制，V8 在进行垃圾回收的时候，不可避免地会阻塞业务逻辑的执行，倘若老生代的垃圾回收任务很重，那么耗时会非常可怕，严重影响应用的性能。")]),v._v(" "),s("p",[v._v("那这个时候为了避免这样问题，V8 采取了增量标记的方案，"),s("strong",[v._v('即将一口气完成的标记任务分为很多小的部分完成，每做完一个小的部分就"歇"一下')]),v._v("，就 js 应用逻辑执行一会儿，然后再执行下面的部分，如果循环，直到标记阶段完成才进入内存碎片的整理上面来。")])])}),[],!1,null,null,null);_.default=a.exports}}]);