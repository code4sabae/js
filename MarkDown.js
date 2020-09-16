import { marked } from "./min/marked.min.es.js";

class MarkDown extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = marked(this.textContent);
  }
}
customElements.define("mark-down", MarkDown);

export { MarkDown };
