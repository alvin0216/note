class MyDiv extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          color: red;
          font-size: 20px;
        }
      </style>
      <div><slot /></div>
    `;
  }
}

customElements.define('my-div', MyDiv);

class Counter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<button>${this.count}</button>`;
    this.btn = this.shadowRoot.querySelector('button');

    this.btn.addEventListener('click', () => this.count++);
  }

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
}

customElements.define('my-counter', Counter);
