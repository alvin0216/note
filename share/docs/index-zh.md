# Web Component

## 什么是 webcomponent

当我们说 `Web Component` 时，想象一个包含所有行话（HTML、CSS、JavaScript ）的封闭框，以提供一些功能，例如，显示用户卡的小部件。此卡片包含用户的头像、姓名、电子邮件等基本信息以及关注他/她的按钮。这个封闭的盒子可以自给自足地描绘完整的画面。

![](https://miro.medium.com/max/1400/1*m6GJ3seKAr4Fove_EyKz7Q.png)

编写 `Web Component` 组件后，你可以这样表示它：

```html
<user-card></user-card>
```

这里的 `user-card` 标签是原生的哦，不需要经过框架复杂的逻辑和算法去编译成 `dom` 挂载，或者说是浏览器本身会帮你做一些编译，但肯定会比框架的实现更加具有性能优势。

## 实现 WebComponent 的步骤

我们先来了解一下 `Web Component` 涉及的核心技术：

- `Custom elements`：一组 `JavaScript API`，允许您定义 `custom elements` 及其行为，然后可以在您的用户界面中按照需要使用它们。
- `Shadow DOM`：一组 `JavaScript API`，用于将封装的 "影子" `DOM` 树 附加到元素（与主文档 `DOM` 分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- `HTML templates`：`<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

## 编写一个 user-card 组件

可以使用 `window.customElements.define()`或仅使用 `customElement.define()`具有以下语法的方法创建自定义元素。

```js
customElements.define(name, constructor, options);
```

- `name`：您自定义的元素标签名称，例如 my-component
- `constructor`：一个构造函数或 ES6 类，为我们的自定义元素提供初始化机制和行为
- `options` :为我们的自定义元素提供额外配置的对象

## 注册组件

让我们使用方法定义一个简单的 `user-card` 自定义元素 `customElement.define()`。

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-com-1.png)

目前，我们的 `user-card` 元素什么也不做。让我们看一下 `JavaScript` 部分。我们创建了一个扩展 `HTMLElement` 的 class `UserCard`。在其中，我们只有一个构造函数，它调用 `super`. 使用 `customElements` 注册表，我们定义了 `user-card` 元素

但是为什么我们必须将 `UserCard` 类扩展到 `HTMLElement` 类呢？这个 `HTMLElement` 类是什么，它来自哪里？

`HTMLElement` 是对象上存在的全局类 window。我们知道 DOM 是什么，它是 HTML 元素在 JavaScript 对象中的表示。每个 DOM 元素都有一些共同的属性，例如属性、事件处理程序、操作方法、属性获取器、设置器等。有些具有特定目的，例如与行为 input 非常不同 div，但它们仍然具有一些共同的行为。

每个 HTML 元素都有一个构造函数或一个类。例如，bodyelement 是 HTMLBodyElementextends 的一个实例 `HTMLElement`。

![](https://miro.medium.com/max/1400/1*OnplArIJOai7pCOrndhmug.png)

从上面的例子 document.body 中，控制台指向 DOM 中的 HTML 元素，但它的实际 JavaScript 实现对我们是隐藏的。它的构造函数或类是 HTMLBodyElementwhich extends HTMLElement。每当浏览器在页面中遇到新的 body 元素时，它都会创建一个新的 HTMLBodyElement. 继承的 DOM 元素 HTMLElement 将共享共同的行为。

![](https://miro.medium.com/max/1400/1*k3hcONynuMw-xhqIyAreIQ.png)

要验证上述声明，只需打开您的调试器工具和 console.dir 任何 dom 元素（您可以使用 document.body）来检查其构造函数和原型链。您将在继承层次结构下方找到。

```bash
HTMLBodyElement > HTMLElement > Element > Node > EventTarget
```

这意味着当您要创建自定义元素时，它必须具有构造函数或必须继承类的 `HTMLElement` 类。我们的自定义元素类还可以扩展现有元素类，例如 `HTMLDivElement` 将附加行为扩展到 div 元素。这都是使用 `customElements.define()`函数完成的。

## 让我们了解如何创建自定义的内置元素。

![](https://miro.medium.com/max/1400/1*tuaaZYU3lMPjS0HkMunTfw.png)

![](https://miro.medium.com/max/1400/1*h39QwVKXlWIB6f74lwlJFg.png)

在上面的示例中，我们有相同的 `user-card` 元素，但我们传递了额外的配置，`{extends: 'div'}`其中声明我们想从内置元素创建这个元素 div，因此我们 `UserCard` 必须扩展 `div` 元素的特定构造函数，即 `HTMLDivElement`. 如果我们看到输出，功能并没有太大变化，但在内部，`user-card` 元素的行为类似于 div 元素。

要注意的事情是，它的 div 行为类似于块元素，因为浏览器提供的默认 CSS 样式使其发生，也称为用户代理样式表。自定义元素没有任何内置的 CSS 样式，因为没有在用户代理样式表中定义，因此它的行为类似于下面示例中所示的内联元素

![](https://miro.medium.com/max/1400/1*S-bolimz_8And_8UN7bmGw.png)

![](https://miro.medium.com/max/1400/1*DKPsWc2rfROrR4KEUyxfXQ.png)

## 自定义元素生命周期

就像 React 或 Angular 中组件的生命周期一样，我们的自定义匿名元素也有生命周期，我们可以利用生命周期事件并执行一些操作。当我们定义一个自定义元素类时，我们可以拥有将在自定义元素的整个生命周期中调用的生命周期方法。[以下是一些重要的生命周期方法](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks):

- **connectedCallback()**：当自定义元素（的实例）添加到 DOM 时调用此回调。在这里，我们可以对自定义元素执行 DOM 操作，例如添加新子元素。
- **disconnectedCallback()**：当自定义元素（的实例）被移除到 DOM 时调用此回调。在这里，我们可以执行一些清理操作，例如发送 AJAX 请求。
- **attributeChangedCallback(attrName,oldVal , newVal)**：添加或删除属性以及更改属性值时。我们需要 `observedAttributes` 类上的 `getter` 方法才能使其工作。这个 `getter` 应该返回一个要观察的属性数组。在这里，我们可以根据属性值执行一些 CSS 样式或 DOM 操作。

```js
class UserCard extends HTMLElement {
  constructor() {
    super();
    console.log('constructor()');
  }

  connectedCallback() {
    console.log('connectedCallback()');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback()');
  }
  static get observedAttributes() {
    return ['name', 'age'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log('attributeChangedCallback()', name, oldVal, newVal);
  }
}

customElements.define('user-card', UserCard);
```

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-com-2.png)

在上面的例子中我们没有做任何复杂的事情。我们创建了一个容器，其中包含三个按钮来添加和删除 user-card 元素，添加和删除 name 属性，最后更改 name 属性值。根据我们的按钮点击动作，我们 user-card 元素的不同生命周期方法被调用，正如您在控制台中看到的那样

让我们用一些 HTML 元素填充我们的 user-card 元素并添加一些 CSS 样式以使其看起来更专业。

![](https://miro.medium.com/max/1400/1*5RjhlIUswOCfMqt3Kn2pEg.png)

![](https://miro.medium.com/max/1400/1*KdRixT6BlU63xOkqr2-r0A.png)

在上面的示例中，使用一些简单的 DOM 元素创建和操作技术，我们填充了 user-card 元素。我们还使用了一些 CSS 类使其看起来更美观。没什么复杂的。

## 使用 template 元素

但这里的缺点是，我们需要在 JavaScript 中填充所有元素。我们可以避免使用 template 元素。template 是一个内置元素，它包装了浏览器不会在屏幕上绘制的 HTML，这使得它可以完美地保存将在 JavaScript 中提取的 HTML。

![](https://miro.medium.com/max/1400/1*8x9R8qvitrjiEbBJK16nhg.png)

![](https://miro.medium.com/max/1400/1*DXO4VskLleWQrR2aJzgVfA.png)

## 使用 Shadow DOM

目前，user-card CSS 样式是全局定义的，它基于元素标签名称。我们需要改变它，因为如果我们必须改变标签名称，我们也需要修改 CSS。我们可以让它基于类，那么就有可能发生类名冲突，这意味着页面中使用相同类名的任何 CSS 都会影响 user-card 布局。

![](https://miro.medium.com/max/1400/1*YKcURWHRSEvLg-dSk0xT5A.png)

为了解决所有这些问题，我们必须使用 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)。

Shadow DOM 是一个 DOM 树，其父节点（AKA Shadow Root）附加到 HTML 元素（AKA Shadow Host）。这在下面来自 MDN 的屏幕截图中进行了解释。

![](https://miro.medium.com/max/1400/0*mDv7NES_acfvLHD7.png)

shadow DOM 只是一个不会影响正常 Document 树的 DOM 树。Shadow DOM 有它自己的上下文，因此任何全局定义的 CSS 样式在这里都不起作用。

由于 Shadow Root 需要一个 Shadow Host 来附加自己，所以它只能使用 Shadow Host 的 element.attachShadow()方法创建 element。

让我们把这个理论变成我们的 user-card 元素。我们将给元素附加一个 Shadow Rootuser-card 并使用模板中的元素进行填充。

![](https://miro.medium.com/max/1400/1*CsxI7RTKhHe7V-Y3Unto3Q.png)

在上面的示例中，我们 `user-card` 使用方法将 `Shadow Root` 附加到我们的元素 `this.attachedShadow`。我们传递了额外的配置`{mode: 'open'}`，这意味着允许元素构造函数之外的 JavaScript 访问 Shadow DOM。

![](https://miro.medium.com/max/1400/1*gYGnfKc8_5zY5mtGhnPT3Q.png)

从上面的截图可以看出，user-card 元素包含一个 Shadow Root 元素，其模式为 open。由于模式是 open，我们可以从外部访问它的内容。

![](https://miro.medium.com/max/1400/1*Cw6xMLVXNgBeuSmKe_Wgjw.png)

Shadow DOM 完全封装了它的 DOM 树，因此 ross.firstChild 返回 null，因为它在普通 DOM 树中没有任何子节点。您只能通过 Shadow Root 访问子项，并且要获取 Shadow Root，我们需要使用 element.shadowRoot 返回它的属性。使用 shadowRoot，我们可以访问它封装的 DOM 树。

如果您不希望任何人访问 Shadow DOM 树，则将 设置 mode 为关闭并 element.shadowRoot 简单地返回 null，从而无法访问 Shadow DOM。

![](https://miro.medium.com/max/1400/1*P-p5X6mMEynUlqI0ZKiOmw.png)

正如我们所看到的，不知何故我们的 user-card 元素看起来不太好。所以发生了什么事？发生这种情况是因为没有一个全局定义的 CSS 样式将在 Shadow DOM 中工作。这意味着我们需要将所有样式放入 Shadow DOM 中。

![](https://miro.medium.com/max/1400/1*iF8D3JktSF41uSfaDPhOLA.png)

![](https://miro.medium.com/max/1400/1*fLIFwm1rBb295FpC5et77Q.png)

从上面的示例中，我们可以看到，内部定义的 CSS 样式都不是影响主 DOM 的 Web 组件，而外部 CSS 不会影响 Shadow DOM 元素的样式。

> :host 伪选择器匹配影子主机并:host(.some-class)匹配影子主机与.some-class 类名。您可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 上查看 Web 组件中的伪选择列表。

今天我们学到了很多关于 Web 组件的知识，但是你有没有想过我们使用 Web 组件已经有一段时间了？你知道元素吗 video？audio 一个 video 元素是这样写的。

```html
<video controls width="250">
  <source src="http://localhost /flower.mp4 " type="video/mp4" />
</video>
```

你有没有想过，这段简单的代码怎么会产生如此复杂的带有信息和控制元素的视频播放器？为此编写的代码在哪里？好吧，现在你知道了。video 并且 audio 是一个内置的 web 组件，我们可以看到隐藏的元素来自哪里。

![](https://miro.medium.com/max/1400/1*HTRSve2yQgFjaLvfLD9MdQ.png)

尽管 Web Component 是非常强大的东西，但并非所有浏览器都支持它。您可以访问 [webcomponents.org](https://www.webcomponents.org/) 以查看浏览器支持的 Web 组件和 polyfill。
