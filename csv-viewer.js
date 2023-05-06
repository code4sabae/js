import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import IMIMojiConverter from "https://code4sabae.github.io/imi-moji-converter-es/IMIMojiConverter.mjs";
import { ArrayUtil } from "./ArrayUtil.js";

const std = (s) => IMIMojiConverter.toHalfWidth(s).toLowerCase();

//const EMBED_IMAGE_DEFAULT = true;
const EMBED_IMAGE_W = 100; // 300;
const EMBED_IMAGE_H = 100; // 225;
const USE_RESIZED_IMAGE = false; // if true, define getResizedImage

const create = (tag) => document.createElement(tag);
const clear = (ele) => ele.innerHTML = "";

const main = async (parent) => {
  const showTable = function (p, csv, sfilter, sortidx, sortorder) {
    sfilter = std(sfilter);
    let array = [];
    array.push(csv[0]);
    if (sfilter.length == 0) {
      for (let i = 1; i < csv.length; i++) {
        array.push(csv[i]);
      }
    } else {
      const afilter = sfilter.split(" ");
      for (let i = 1; i < csv.length; i++) {
        const ar = csv[i];
        let flg = false;
        for (let k = 0; k < afilter.length; k++) {
          const af = afilter[k];
          flg = false;
          for (let j = 0; j < ar.length; j++) {
            if (std(ar[j]).indexOf(af) >= 0) {
              flg = true;
              break;
            }
          }
          if (!flg) {
            break;
          }
        }
        if (flg) {
          array.push(ar);
        }
      }
    }
    
    const csvmode = true;
    array = ArrayUtil.getSorted(array, sortidx, sortorder, csvmode);
  
    const tbl = create("table");
  
    const tr = create("tr");
    const td = create("th");
    td.textContent = "-";
    tr.appendChild(td);
  
    const dd = array[0];
    for (let j = 0; j < dd.length; j++) {
      const td = create("th");
      const val = dd[j];
      const lbl = create("span");
      lbl.textContent = val;
      td.appendChild(lbl);
      const up = create("span");
      up.idx = j;
      up.className = "sort";
      up.textContent = "▲";
      up.onclick = function () {
        showTable(p, array, sfilter, this.idx, true);
      };
      td.appendChild(up);
      const down = create("span");
      down.idx = j;
      down.className = "sort";
      down.textContent = "▼";
      down.onclick = function () {
        showTable(p, array, sfilter, this.idx, false);
      };
      td.appendChild(down);
      tr.appendChild(td);
    }
    tbl.appendChild(tr);
    for (let i = 1; i < array.length; i++) {
      const dd = array[i];
      const tr = create("tr");
  
      const td = create("td");
      td.textContent = i;
      tr.appendChild(td);
  
      for (let j = 0; j < dd.length; j++) {
        const td = create("td");
        let val = dd[j];
        if (val.startsWith("http://") || val.startsWith("https://")) {
          let s = "";
          val = val.replace(/</g, "&lt;");
          val = val.replace(/>/g, "&gt;");
          //				if (val.toLowerCase().endsWith(".jpg") || val.toLowerCase().endsWith(".png")) {
          if (val.toLowerCase().endsWith(".jpg")) {
            if (parent.getAttribute("embedimage") != "false") {
              if (USE_RESIZED_IMAGE) {
                s = "<img src='" +
                  getResizedImageURL(val, EMBED_IMAGE_W, EMBED_IMAGE_H) + "'><br>";
                s += "<a href=" + val + ">" + val + "</a>";
              } else {
                s = "<img src='" + val + "'><br>";
                s += "<a href=" + val + ">" + val + "</a>";
              }
            } else {
              s += "<a href=" + val + ">" + val + "</a>";
            }
          } else {
            s += "<a href=" + val + ">" + val + "</a>";
          }
          td.innerHTML = s;
        } else {
          val = val.replace(/</g, "&lt;");
          val = val.replace(/>/g, "&gt;");
          val = val.replace(/\\n/g, "<br>");
          td.innerHTML = val;
        }
        tr.appendChild(td);
      }
      tbl.appendChild(tr);
    }
    clear(p);
    p.appendChild(tbl);
  };

  const url = parent.getAttribute("src");
  const name = parent.getAttribute("name") || url;
  const q = parent.getAttribute("q") || "";

  const csv = await CSV.fetch(url);
  const filter = create("input");
  filter.className = "filter";
  filter.placeholder = "フィルター";
  filter.value = q;
  parent.appendChild(filter);
  const tbl = create("div");
  parent.appendChild(tbl);
  showTable(tbl, csv, filter.value);
  filter.onchange = filter.onkeyup = () => showTable(tbl, csv, filter.value);

  const data = create("div");
  data.innerHTML = `DATA: <a href=${url}>${name}</a>`;
  parent.appendChild(data);
};



class CSVViewer extends HTMLElement {
  constructor(param) {
    super();
    for (const name in param) {
      this.setAttribute(name, param[name]);
    }
    main(this);
  }
}

customElements.define("csv-viewer", CSVViewer);

export { CSVViewer };
