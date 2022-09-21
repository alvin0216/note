# Web Component

## What is Web Component?

Component-based frontend architecture is a new fashion in web development. It provides flexibility to reuse shared components. Let’s learn about Web Components which is a built-in mechanism in the browser to create custom components.

If you are coming from **React** or **Angular** background, then you very well know what a component is. A component in nutshell is a box whose job is to **print something on the screen** or **provide some functionality** or both, without affecting other parts of our application unintentionally.

This box contains the jargons to render a useful view on the screen or provide some interactive/non-interactive functionality. But the given condition is that enclosed CSS and JavaScript in this box must not affect the other parts of our application unless it is to do so intentionally.

## Here are few requirements for a web component

1. A web component must be a custom HTML element.
2. A web component should contain all the logic to function itself.
3. A web component must not affect other components and other parts of the application unintentionally.
4. A web component must encapsulate itself to avoid any collisions between outside JavaScript or CSS.
5. Multiple instances of the same web component must not interfere with each other.

When we say web component, imagine an enclosed box which contains all the jargons (HTML, CSS, JavaScript) to provide some functionality, for an example, a widget that shows user card. This card contains the user’s profile picture, basic information like name, email, etc. and a button to follow him/her. This enclosed box is self-sufficient to paint the complete picture.

![](https://miro.medium.com/max/1400/1*m6GJ3seKAr4Fove_EyKz7Q.png)

So what is the enclosed box and how it looks in a normal web application? Well, this enclosed box is nothing but a custom HTML element. For example,

```html
<user-card></user-card>
```

Here, user-card is similar to a div or span HTML element but its look and behaviour will be defined by us and not the browser. So how to create it?

### Registering a Custom Element

We can register a custom element using [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) interface. `customElements` is the read-only object (an instance of `CustomElementRegistry`) present in `window` object which provides global API to create custom elements.

A custom element can be created using `window.customElements.define()` or just customElement.define() method which has below syntax.

```js
customElements.define(name, constructor, options);
```

## 参考

- [The anatomy of Web Components](https://medium.com/jspoint/the-anatomy-of-web-components-d6afedb81b37)
- [阮一峰 Web Components 入门实例教程](https://www.ruanyifeng.com/blog/2019/08/web_components.html)
- [关于 Web Component](https://juejin.cn/post/7026642674044125221)
- [custom-elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements)
