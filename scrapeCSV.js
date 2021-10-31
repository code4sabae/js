import { htmltable2json } from "./htmltable2json.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

export const scrapeCSV = async (url, path = "./") => {
  const html = await (await fetch(url)).text();
  const ar = htmltable2json(html);
  for (let i = 0; i < ar.length; i++) {
    const a = ar[i];
    await Deno.writeTextFile(path + i + ".csv", CSV.stringify(a));
  }
};
