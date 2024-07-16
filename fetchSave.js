import { fetchBinAsBrowser } from "https://js.sabae.cc/fetchBinAsBrowser.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";

export const fetchSave = async (url, path, sjischange) => {
  if (url.endsWith(".csv")) sjischange = true;
  
  const fn = url.substring(url.lastIndexOf("/") + 1);
  if (!path.endsWith("/")) path += "/";
  try {
    await Deno.readFile(path + fn);
    return false;
  } catch (e) {
  }
  const bin = await fetchBinAsBrowser(url);
  if (sjischange) {
    const utf8 = SJIS.decodeAuto(bin);
    await Deno.writeTextFile(path + fn, utf8);
  } else {
    await Deno.writeFile(path + fn, bin);
  }
  return true;
};
