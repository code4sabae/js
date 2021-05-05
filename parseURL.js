const parseURL = (url) => {
  const n = url.indexOf("://");
  if (n < 0) {
    return null;
  }
  const protocol = url.substring(0, n + 3);
  const n2 = url.indexOf(":", n + 3);
  const n3 = url.indexOf("/", n + 3);
  if (n3 < 0) {
    const port = n2 < 0 ? 80 : parseInt(url.substring(n2 + 1));
    const host = n2 < 0 ? url.substring(n + 3) : url.substring(n + 3, n2);
    const path = "/";
    const query = null;
    return { protocol, port, host, path, query };
  }
  const port = n2 < 0 ? 80 : parseInt(url.substring(n2 + 1, n3));
  const host = n2 < 0 ? url.substring(n + 3, n3) : url.substring(n + 3, n2);
  const n4 = url.indexOf("?", n3);
  const path = n4 < 0 ? url.substring(n3) : url.substring(n3, n4);
  const query = n4 < 0 ? null : url.substring(n4 + 1);
  return { protocol, port, host, path, query };
};

//console.log(parseURL("https://fukuno.jig.jp/3000.html?q=test"));
//console.log(parseURL("http://fukuno.jig.jp/3000"));
//console.log(parseURL("http://fukuno.jig.jp:8881/3000"));

export { parseURL };
