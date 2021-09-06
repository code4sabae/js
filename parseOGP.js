import HTMLParser from "https://dev.jspm.io/node-html-parser";

const parseOGP = (html) => {
  const dom = HTMLParser.parse(html);
  const metas = dom.querySelectorAll("meta");
  const res = {};
  for (const meta of metas) {
    const name = meta.attributes.property || meta.attributes.name;
    if (!name || !name.startsWith("og:")) {
      continue;
    }
    const val = meta.attributes.content;
    if (!val) {
      continue;
    }
    res[name] = val;
  }
  return res;
};

export { parseOGP };
