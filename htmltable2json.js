import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

export const htmltable2json = (html) => {
  const dom = HTMLParser.parse(html);
  const tbls = dom.querySelectorAll("table");
  const res = tbls.map(tbl => {
    const trs = tbl.querySelectorAll("tr");
    const rows = [];
    trs.forEach(tr => {
      const row = [];
      tr.querySelectorAll("th").forEach(th => row.push(th.text));
      tr.querySelectorAll("td").forEach(td => row.push(td.text));
      rows.push(row);
    })
    return CSV.toJSON(rows);
  });
  return res;
};

const url = "https://project.nikkeibp.co.jp/atclppp/PPP/report/090200284/?P=2";
const html = await (await fetch(url)).text();
const ar = htmltable2json(html);
for (let i = 0; i < ar.length; i++) {
  const a = ar[i];
  await Deno.writeTextFile(i + ".csv", CSV.stringify(a));
}
