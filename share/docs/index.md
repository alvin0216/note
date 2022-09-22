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

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-1.png)

So what is the enclosed box and how it looks in a normal web application? Well, this enclosed box is nothing but a custom HTML element. For example,

```html
<user-card></user-card>
```

Here, user-card is similar to a div or span HTML element but its look and behaviour will be defined by us and not the browser. So how to create it?

### Creating a custom element

A custom element can be created using `window.customElements.define()` or just customElement.define() method which has below syntax.

```js
customElements.define(name, constructor, options);
```

- **name**: You custom element tag name, like my-component
- **constructor**: A constructor function or ES6 class which provide initialization mechanism and behaviour to our custom element
- **options**: An object to provide extra configuration for our custom element
  Let’s define a simple user-card custom element using customElement.define() method.

Let’s define a simple user-card custom element using customElement.define() method.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-2.png)

At the moment, our user-card element is doing nothing. Let’s have a look at the JavaScript part. We have created a class UserCard which extends HTMLElement. Inside it, we have just a constructor which calls super. Using customElements registry, we have defined user-card element.

But why we have to extend UserCard class to HTMLElement class? What is this HTMLElement class and where it comes from?

HTMLElement is a global class present on window object. We know what the DOM is, it is a representation of HTML elements in JavaScript objects. Every DOM element has some common properties like attributes, event handlers, manipulation methods, property getters, setters, etc. Some have a specific purpose like input is very different from div when it comes to behaviour, but they still share some common behaviour.

Every HTML element has a constructor function or a class. For example, body element is an instance of HTMLBodyElement which extends HTMLElement.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-3.png)

From the above example, document.body in the console points to the HTML element in the DOM but its actual JavaScript implementation is hidden from us. Its constructor function or class is HTMLBodyElement which extends HTMLElement. Whenever the browser encounters new body element in the page, it creates a new instance of HTMLBodyElement. DOM elements inheriting HTMLElement will share common behaviour.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-4.png)

To verify the above claims, just open your debugger tool and console.dir any dom element (you can use document.body) to check its constructor and prototype chain. You will find below the hierarchy of inheritance.

```bash
HTMLBodyElement > HTMLElement > Element > Node > EventTarget
```

That means when you want to create a custom element, it must have a constructor function or a class that must inherit HTMLElement class. Our custom element class can also extend existing element classes like HTMLDivElement to extend additional behaviour to div element. This is all done using customElements.define() function.

Let’s understand how we can create a customized built-in element.

In the above example, we have the same user-card element but we passed extra config with {extends: 'div'} which states that we want to create this element from built-in div element, hence our UserCard must extend specific constructor of the div element which is HTMLDivElement. The functionality hasn’t changed much if we see the output, but internally, user-card element behaves like div element.

The major thing to remember is, div behaves like a block element because default CSS styles provided by the browser makes it happen AKA user-agent stylesheet. A custom element does not have any built-in CSS styles because not defined in user-agent stylesheet, hence it behaves like an inline element as shown in the below example, but we will fix that later.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-5.png)

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-6.png)

## Custom Element Lifecycle

Like lifecycle of a component in React or Angular, our custom anonymous element also has a lifecycle and we can tap into a lifecycle event and perform some actions. When we define a custom element class, we can have lifecycle methods which will be invoked throughout the life of a custom element. Below are the few important lifecycle methods, but here is the full list [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks).

- **connectedCallback()**: This callback is called when (an instance of) a custom element is added to the DOM. Here, we can perform DOM operations on the custom element, like adding new children.
- **disconnectedCallback()**: This callback is called when (an instance of) a custom element is removed to the DOM. Here, we can perform some cleanup operations like sending an AJAX request.
- **attributeChangedCallback(attrName, oldVal, newVal)**: When an attribute is added or removed as well as when an attribute’s value is changed. We need a getter method observedAttributes on the class for this to work. This getter should return an array of attributes to watch. Here, we can perform some CSS styling or DOM operations based on attribute value.

Using the above methods, we can construct our user-card element with the below implementation. Right now, we are just logging a message to the console whenever these methods are invoked.

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

We haven’t done any complicated in the above example. We have created a container which hosts three buttons to add and remove user-card element, add and remove name attribute and finally to change name attribute value. Based on our button click action, different lifecycle method of our user-card element is called, as you can see in the console.

Let’s populate our user-card element with some HTML elements and add some CSS styles to make it look professional.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-7.png)

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-8.png)

In the above example, using some simple DOM element creation and manipulation techniques, we have populated user-card element. We also used some CSS classes to make it nicer to look at. Nothing complicated.

## Using template element

But the drawback here is, we need to do all elements population in JavaScript. We can avoid that using template element. template is a built-in element which wraps HTML which browser would not paint on the screen, which makes it perfect to hold HTML which will be extracted in JavaScript.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-9.png)

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-10.png)

## Using Shadow DOM

So far, we have learned how to create a custom HTML element and populate it with a template and custom data. We have come to the point where we need to discuss the encapsulation.

At the moment, user-card CSS styles are defined globally and it is based on the element tag name. We need to change that because if we had to change the tag name, we need to modify the CSS as well. We can make it class based, then there is a chance of class name collision which means any CSS in the page using the same class name can impact the user-card layout.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-11.png)

To solve all these problems, we have to use a Shadow DOM. Shadow DOM is a huge topic to discuss, hence I recommend you to read this [MDN document](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) first. But in a nutshell, a Shadow DOM is a DOM tree with a parent (AKA Shadow Root) which is attached to an HTML element (AKA Shadow Host). This is explained in below screenshot from MDN.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-12.png)

Not to get overwhelmed by the Shadow DOM, a shadow DOM is just a DOM tree that won’t impact the normal Document tree. A Shadow DOM has its own context, hence any globally defined CSS styles won’t work here. Though you can still access the Shadow DOM elements from the JavaScript and manipulate it, but that is also a tricky business as we will see.

Since a Shadow Root needs a Shadow Host to attach itself, it is only created using element.attachShadow() method where element is the Shadow Host.

Let’s take this theory to our user-card element. We will attach a Shadow Root to user-card element and populate with elements from the template.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-13.png)

In the above example, we have attached a Shadow Root to our user-card element using this.attachedShadow method. We have passed extra configuration {mode: 'open'} which means to allow JavaScript outside the element constructor to access the Shadow DOM.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-14.png)

As you can see from the above screenshot, user-card element contains a Shadow Root element with mode open. Since the mode is open, we can access its content from the outside.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-15.png)

A Shadow DOM completely encapsulate its DOM tree, hence ross.firstChild returns null as it doesn’t have any children present in normal DOM tree. You can only access the children through Shadow Root and to get the Shadow Root, we need to use element.shadowRoot property which returns it. Using shadowRoot, we can get access to the DOM tree it encapsulates.

If you don’t want anyone to access the Shadow DOM tree, then set the mode to closed and element.shadowRoot will simply return null making it impossible to access the Shadow DOM.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-16.png)

As we can see, somehow our user-card element is not looking well. So, what happened? This has happened because none of the globally defined CSS styles are going to working inside a Shadow DOM. This means we need to put all the styles inside our Shadow DOM.

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-17.png)

![](https://lenovobeijing-my.sharepoint.com/:i:/r/personal/guosw5_lenovo_com/Documents/Public/images/web-component-18.png)

From the above example, we can see that none of the CSS styles defined inside is the web component impacting the main DOM while outside CSS is not impacting styles of Shadow DOM elements.

:host pseudo-selector matches the Shadow Host and :host(.some-class) matches the Shadow Host with .some-class class name. You can see the list of pseudo-select in web components on MDN.
