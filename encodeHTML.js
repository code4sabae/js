export const addLink = (s) => {
  const reg = /((https?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!\[\]]+))/g;
  return s.replace(reg, (all, url) => `<a href="${url}">${url}</a>`);
};

export const encodeHTML = (s, withlink) => { // supported: string, array, object
  if (s == null) {
    return null;
  }
  if (Array.isArray(s)) {
    return s.map(s => encodeHTML(s, withlink));
  }
  const t = typeof s;
  if (t == "object") {
    const res = {};
    for (const name in s) {
      const n2 = encodeHTML(name, withlink);
      const v2 = encodeHTML(s[name], withlink);
      res[n2] = v2;
    }
    return res;
  }
  if (s != "string") {
    s = s.toString();
  }
  s = s.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/\n/g, "<br>");
  if (withlink) {
    s = addLink(s);
  }
  return s;
};
