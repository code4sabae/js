import { CSV } from "./CSV.js";
import { StrictCSV } from "https://code4fukui.github.io/StrictCSV/js/StrictCSV.js";

class TreeText {
  static makeCSV(s) {
    const ss = s.split("\n")
    const list = [];
    let max = 0;
    for (const s of ss) {
      if (s.length == 0) {
        continue;
      }      
      let n = 0;
      for (let i = 0;; i++, n++) {
        if (s[i] != " ") {
          break;
        }
      }
      const d = [];
      const lv = n / 2;
      for (let i = 0; i < lv; i++) {
        d.push("");
      }
      if (lv >= max) {
        max = lv;
      }
      d.push(s.substring(n));
      list.push(d);
    }
    /*
    const l = [];
    for (let i = 0; i <= max; i++) {
      l.push("name" + (i + 1))
    }
    list.unshift(l);
    */
    console.log("list", list);
    const scsv = CSV.stringify(list);
    console.log("scsv", scsv);
    return scsv;
    /*
    const scsv = StrictCSV.stringify(list);
    console.log("scsv", scsv);
    return StrictCSV.parse(data);
    */
    /*
    const csv = CSV.encode(list);
    const data2 = StrictCSV.parse(csv);
    return data2;
    */
  }
  /*
  static stringify(json) {

  }
  */
}

export { TreeText };
