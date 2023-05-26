import { fetchBin } from "https://js.sabae.cc/fetchBin.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";

const escapeURL = (url) => {
  let s = url.replace(/\//g, "_");
  s = s.replace(/\?/g, "_");
  s = s.replace(/\s/g, "_");
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
  const bin = await fetchBin(url);
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
