class AWikipedia extends HTMLElement {
  constructor() {
    super();
    const word = this.textContent;
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    const a = document.createElement("a");
    a.href = "https://ja.wikipedia.org/wiki/" + encodeURIComponent(word);
    this.appendChild(a);
    a.textContent = word;
  }
}
customElements.define("a-wikipedia", AWikipedia);

export { AWikipedia };
