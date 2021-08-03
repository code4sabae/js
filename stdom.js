import { Table } from "https://js.sabae.cc/Table.js";

const create = (tag, parent) => {
  const c = document.createElement(tag);
  if (parent) {
    parent.appendChild(c);
  }
  return c;
};

const setDefaultStyle = () => {
	style({
    body: { "font-family": "sans-serif" },
		table: { "border-collapse": "collapse", display: "inline-block" },
		"td, th": { border: "1px solid gray", padding: "0 0.3em", "text-align": "center" },
	});
};

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
const h2 = (text) => add("h2", text);
const h3 = (text) => add("h3", text);
const h4 = (text) => add("h4", text);
const hr = () => add("hr");
const button = () => add("button", text);
const inp = (text) => {
  const i = add("input");
  if (text) {
    i.value = text;
  }
  return i;
};
const div = (text) => add("div", text);
const link = (text, url) => {
  const a = add("a", text);
  a.href = url;
  add("br");
  return a;
};
const json2css = (css) => {
  const res = [];
  for (const name in css) {
    res.push(name + " {");
    const body = css[name];
    for (const st in body) {
      if (typeof body[st] == "object") {
        res.push("  " + st + " {");
        const body2 = body[st];
        for (const st2 in body2) {
          res.push(`    ${st2}: ${body2[st2]};`);
        }
        res.push("  }");
      } else {
        res.push(`  ${st}: ${body[st]};`);
      }
    }
    res.push("}");
  }
  const s = res.join("\n");
  //console.log(s);
  return s;
};
const style = (text) => {
  const c = document.createElement("style");
  c.innerText = typeof text == "object" ? json2css(text) : text;
  document.head.appendChild(c);
};
const css = (url = "https://unpkg.com/sakura.css/css/sakura.css") => {
  const c = create("link");
  c.setAttribute("rel", "stylesheet");
  c.setAttribute("type", "text/css");
  c.setAttribute("href", url);
  document.head.appendChild(c);
};

const table = (tbl) => {
	const t = Table.makeTable(Table.fromJSON(tbl));
	document.body.appendChild(t);
  return t;
};

const ul = (list) => {
  const c = add("ul");
  for (const d of list) {
    const li = create("li");
    if (typeof d == "string") {
      li.textContent = d;
    } else {
      li.appendChild(d);
    }
    c.appendChild(li);
  }
  return c;
};

if (globalThis.document) {
  const setDoctype = () => {
    const doctype = document.implementation.createDocumentType("html", "", "");
    if (document.doctype) {
      document.replaceChild(doctype, document.doctype);
    } else {
      document.insertBefore(doctype, document.childNodes[0]);
    }
  };
  setDoctype();
  
  // <head><meta charset="utf-8">
  /*
  const utf8 = create("meta");
  utf8.setAttribute("charset", "utf-8");
  document.head.appendChild(utf8);
  */
 
  // <meta name="viewport" content="width=device-width"></head>-->
  const viewport = create("meta");
  viewport.name = "viewport";
  viewport.content = "width=device-width";
  document.head.appendChild(viewport);

  setDefaultStyle();
}

const getQueryParam = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const res = regex.exec(location.search);
  return res ? decodeURIComponent(res[1].replace(/\+/g, " ")) : "";
};

const getHash = () => {
  const hash = document.location.hash;
  if (!hash && hash.length == 0) {
    return null;
  }
  return decodeURIComponent(hash.substring(1));
};

export { create, add, h1, h2, h3, h4, inp, div, link, style, css, hr, table, button, ul, getQueryParam, getHash };
