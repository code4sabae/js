import { create } from "./stdcomp.js";

// from stdom.js

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
const insertChild = (parent, c) => {
  if (parent.childNodes.length > 0) {
    parent.insertBefore(c, parent.childNodes[0]);
  } else {
    parent.appendChild(c);
  }
};
const style = (text) => {
  const c = document.createElement("style");
  c.innerText = typeof text == "object" ? json2css(text) : text;
  document.head.appendChild(c);
  //insertChild(document.head, c);
};
const css = (url = "https://unpkg.com/sakura.css/css/sakura.css") => {
  const c = create("link");
  c.setAttribute("rel", "stylesheet");
  c.setAttribute("type", "text/css");
  c.setAttribute("href", url);
  document.head.appendChild(c);
};

export { style, css };
