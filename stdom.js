const setDoctype = () => {
  if (!globalThis.document) {
    return;
  }
  const doctype = document.implementation.createDocumentType("html", "", "");
  if (document.doctype) {
    document.replaceChild(doctype, document.doctype);
  } else {
    document.insertBefore(doctype, document.childNodes[0]);
  }
  console.log(document.doctype);
};
setDoctype();

const create = (tag) => document.createElement(tag);
const add = (tag, text) => {
  const o = create(tag);
  o.textContent = text;
  document.body.appendChild(o);
  return o;
};
const h1 = (text) => {
  add("h1", text);
  document.title = text;
};
const inp = () => add("input");
const div = (text) => add("div", text);
const link = (text, url) => {
  add("a", text).href = url;
  add("br");
};
const json2css = (css) => {
  const res = [];
  for (const name in css) {
    res.push(name + " {");
    const body = css[name];
    for (const st in body) {
      res.push(`  ${st}: ${body[st]};`);
    }
    res.push("}");
  }
  const s = res.join("\n");
  return s;
};
const style = (text) => {
  const c = document.createElement("style");
  c.innerText = typeof text == "object" ? json2css(text) : text;
  document.head.appendChild(c);
};

export { create, add, h1, inp, div, link, style };
