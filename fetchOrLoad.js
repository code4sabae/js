import { fetchBin } from "https://js.sabae.cc/fetchBin.js";
//import { SJIS } from "https://js.sabae.cc/SJIS.js";
import { SHAKE128 } from "https://code4fukui.github.io/SHA3/SHAKE128.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

const hash = (fn) => {
  const org = new TextEncoder().encode(fn);
  const bin = SHAKE128.digest(org, 128);
  return Base16.encode(bin);
};

export const escapeURL = (url) => {
  let s = url.replace(/\//g, "_");
  s = s.replace(/\?/g, "_");
  s = s.replace(/\s/g, "_");
  if (s.length > 100) {
    s = s.substring(0, 100) + hash(s);
  }
  return s;
};

const getCharsetFromHTML = (bin) => {
  const s = new TextDecoder().decode(bin);
  const cs = s.match(/charset="(.+)"/)
  if (!cs) {
    return "utf-8";
  }
  if (cs[1].length > 20) {
    return "utf-8";
  }
  return cs[1];
};

const fetchText = async (url) => {
  const opt = {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
    },
  };
  const bin = await fetchBin(url, opt);
  const cset = getCharsetFromHTML(bin);
  //console.log(cset);
  //const text = SJIS.decodeAuto(bin);
  //const text = new TextDecoder("euc-jp").decode(bin);
  const text = new TextDecoder(cset).decode(bin);
  return text;
};
export const fetchOrLoad = async (url, forcefetch) => {
  Deno.mkdir("temp", { recursive: true });
  const fn = "temp/" + escapeURL(url);
  if (!forcefetch) {
    try {
      return await Deno.readTextFile(fn);
    } catch (e) {
    }
  }
  try {
    const html = await fetchText(url);
    await Deno.writeTextFile(fn, html);
    return html;
  } catch (e) {
    console.log("fetch err", e);
    return "";
  }
};
