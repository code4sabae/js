import { SJIS } from "https://js.sabae.cc/SJIS.js";

const TEXT = {};

TEXT.parse = (s) => {
  return s.split("\n");
};
TEXT.stringify = (s) => {
  return s.join("\n");
};
TEXT.fetchOrLoad = async (fn) => {
  if (fn.startsWith("https://") || fn.startsWith("http://") || !globalThis.Deno) {
    return new Uint8Array(await (await fetch(fn)).arrayBuffer());
  } else {
    return await Deno.readFile(fn);
  }
};
TEXT.fetchUtf8 = async (url) => {
  const data = await (await fetch(url)).text();
  const txt = TEXT.parse(data);
  return txt;
};
TEXT.fetch = async (url) => {
  const data = SJIS.decodeAuto(await TEXT.fetchOrLoad(url));
  const txt = TEXT.parse(data);
  return txt;
};

export { TEXT };
