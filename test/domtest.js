class Node {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.atts = {};
  }
  appendChild(ch) {
    this.children.push(ch);
  }
  toString() {
    const res = [];
    const att = Object.keys(this.atts);
    if (att.length > 0) {
      const satt = att.map(a => a + "='" + this.atts[a] + "'").join(" ");
      res.push(`<${this.tag} ${satt}>`);
    } else {
      res.push(`<${this.tag}>`);
    }
    if (this.value) {
      res.push(this.value);
    } else {
      for (const ch of this.children) {
        res.push(ch.toString());
      }
    }
    res.push(`</${this.tag}>`);
    return res.join("");
  }
  set textContent(val) {
    this.value = val;
  }
  set href(val) {
    this.atts.href = val;
  }
}
class Document {
  createElement(tag) {
    return new Node(tag);
  }
}

globalThis.document = new Document();
