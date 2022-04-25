export const encodeHTML = (s) => { // supported: string, array, object
  if (s == null) {
    return null;
  }
  if (Array.isArray(s)) {
    return s.map(s => encodeHTML(s));
  }
  const t = typeof s;
  if (t == "object") {
    const res = {};
    for (const name in s) {
      const n2 = encodeHTML(name);
      const v2 = encodeHTML(s[name]);
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
  return s;
};
