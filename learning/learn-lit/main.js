// create user card class

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
