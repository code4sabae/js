import { DOMParser } from "https://js.sabae.cc/DOMParser.js";

export const regexpURL = /(https?:\/\/((\[([a-f0-9:]+:+)+([a-f0-9]+)?\])|([-.a-zA-Z0-9]+))(:[0-9]+)?[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g;
export const addLinkTag = (text) => {
  const dom = new DOMParser().parseFromString(text, "text/html");
  const res = [];
  const ser = (dom) => {
    for (const c of dom.childNodes) {
      if (c.nodeType == 3) {
        const text = c.text;
        res.push(text.replaceAll(regexpURL, '<a href="$1">$1</a>'));
      } else if (c.nodeType == 1) {
        res.push(`<${c.rawTagName}${c.rawAttrs ? " " + c.rawAttrs : ""}>`);
      }
    }
  }
  ser(dom);
  return res.join("");
  //return text.replaceAll(regexpURL, '<a href="$1">$1</a>');
};
