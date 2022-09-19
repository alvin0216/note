## 什么是 webcomponent

我们先来简单了解一下什么是 `Web Component`:

`Web Components` 是一系列加入 w3c 的 HTML 和 DOM 的特性，使得开发者可以创建可复用的组件。由于 `web components` 是由 w3c 组织去推动的，因此它很有可能在不久的将来成为浏览器的一个标配。

使用 `Web Component` 编写的组件是脱离框架的，换言之，也就是说使用 `Web Component` 开发的组件库，是适配所有框架的，不会像 `Antd` 这样需要对 `Vue`、`React` 等框架出不同的版本。

编写 `Web Component` 组件后，你可以这样使用它：

```jsx
//引入自定义的组件
<script src='./main.js'></script>

//组件的使用
<my-div>hello world</my-div>
```

这里的 `my-div` 标签是原生的哦，不需要经过框架复杂的逻辑和算法去编译成 `dom` 挂载，或者说是浏览器本身会帮你做一些编译，但肯定会比框架的实现更加具有性能优势。

## 使用 Web Component

了解了 `Web Component` 的概念以后，我们再来看看该如何使用 `Web Component`

### Web Component 核心技术

我们先来了解一下 `Web Component` 涉及的核心技术：

- `Custom elements`：一组 `JavaScript API`，允许您定义 `custom elements` 及其行为，然后可以在您的用户界面中按照需要使用它们。
- `Shadow DOM`：一组 `JavaScript API`，用于将封装的 "影子" `DOM` 树 附加到元素（与主文档 `DOM` 分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- `HTML templates`：`<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

### 一个简单的例子

接下来，我们来具体看一下 Web Component 的具体用法:

```html
<script>
  // 定义自定组件
  class MyButton extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      // template
      this.shadowRoot.innerHTML = `<button>hello <slot /></button>`;
    }
  }
  // 注册组件
  customElements.define('my-button', MyButton);
</script>

<!-- 使用组件 -->
<body>
  <my-button>world</my-button>
</body>
```

这样， 一个简单的 `Web Component` 就完成了。

### 样式隔离测试

```html
<script>
  // 定义自定组件
  class MyButton extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      // template
      this.shadowRoot.innerHTML = `
      <style>
        button { color: red; }
      </style>
      <button>hello <slot /></button>`;
    }
  }
  // 注册组件
  customElements.define('my-button', MyButton);
</script>

<!-- 使用组件 -->
<body>
  <style>
    button {
      color: blue;
    }
  </style>
  <my-button>world</my-button>
  <button>default button</button>
</body>
```

![](https://lenovobeijing-my.sharepoint.com/personal/guosw5_lenovo_com/Documents/Public/images/web-component-1.png?csf=1&web=1&e=mTYrZK&cid=0370c899-30a2-4042-9759-f43d586feaa6)

mark [如何在 Web Components 中引入外部 CSS 样式？](https://www.mybj123.com/14082.html)

### 更复杂的例子

实现一个自增的 `Button`

```js
class MyCounter extends HTMLElement {
  get count() {
    return this.getAttribute('count') || 0;
  }

  set count(value) {
    this.setAttribute('count', value);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `<button>${this.count}</button>`;
    this.btn = this.shadowRoot.querySelector('button');
    this.btn.addEventListener('click', () => this.count++);
  }
}
// 注册组件
customElements.define('my-counter', MyCounter);
```

上面点击 button 并不会触发整个页面的刷新，如果要触发渲染 还需要增加对属性的监听：

`attributeChangedCallback` 事件可以用来监听节点属性的变化，然后通过这个变化来更新内部状态。不过，要想用上这个能力，必须先在节点类里面定义一个名为 `observedAttributes` 的 getter：

```js
class MyCounter extends HTMLElement {
  static get observedAttributes() {
    // 监听 count 属性
    return ['count'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'count') {
      this.btn.textContent = newValue;
    }
  }
  // ...
}
```

source code:

```js
class MyCounter extends HTMLElement {
  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'count') {
      this.btn.textContent = newValue;
    }
  }

  get count() {
    return this.getAttribute('count') || 0;
  }

  set count(value) {
    this.setAttribute('count', value);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `<button>${this.count}</button>`;
    this.btn = this.shadowRoot.querySelector('button');
    this.btn.addEventListener('click', () => this.count++);
  }
}
// 注册组件
customElements.define('my-counter', MyCounter);
```

## Lit

只是简单的实现 webcomponent 的自增 count 就要写这么多复杂的代码，当然需要第三方的框架来简化这些代码。这里给大家介绍 Google 开源的框架 [lit](https://lit.dev/)

`Lit` 是一个基于 `Web-Component` 构建的前端框架，前身基本可以理解为即 `Polymer` ， `Lit` 提供了如下具有竞争力的特性

- 基于 `Web-Component` 的更高层封装，提供了现代前端开发习惯的响应式数据，声明式的模版，减少了 web component 的一部分样板代码.
- 小。运行时仅有 5K
- 性能强悍。规避了 `VDOM` 的一些弊端，更新时仅处理 UI 中的异步部分（可以理解成仅处理响应式的部分）
- 兼容性较好。因为 `web-component` 是 HTML 的原生能力，也就代表着 `web-component` 可以在任何使用 HTML 的地方使用，框架无关。

改写：

main.js

```js
import { LitElement, css, html } from 'lit';

class LitCounter extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    count: {},
  };

  handleClick = () => {
    this.count++;
  };

  render() {
    return html`<button @click=${this.handleClick}>${this.count}</button> `;
  }
}

customElements.define('lit-counter', LitCounter);
```

index.html

```html
<body>
  <script src="./main.js" type="module"></script>
  <lit-counter count="10"></lit-counter>
</body>
```
