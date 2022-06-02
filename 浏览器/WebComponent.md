---
title: WebComponent
date: 2022-05-31 23:45:41
sidebar: auto
tags:
  - WebComponent
categories:
  - 浏览器
---

WebComponent 给出了解决思路，它提供了对局部视图封装能力，可以让 DOM、CSSOM 和 JavaScript 运行在局部环境中，这样就使得局部的 CSS 和 DOM 不会影响到全局。

```html
<customer-button data-text="click"></customer-button>

<script>
  class CustomerButton extends HTMLElement {
    constructor() {
      super();
      // 开启 shadowdom
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.template = document.createElement('template');
      this.template.innerHTML = `<button>${this.dataset.text}</button>`;

      this.shadowRoot.appendChild(this.template.content);

      // style
      this.styles = document.createElement('style');
      this.styles.innerHTML = `button { color: red; }`;
      this.shadowRoot.appendChild(this.styles);
    }
  }
  customElements.define('customer-button', CustomerButton);
</script>
```
