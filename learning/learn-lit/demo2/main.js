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
