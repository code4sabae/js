// Table is 2 dimentions array, first line is header

const Table = {};

Table.toJSON = (tbl) => {
  const res = [];
  const head = tbl[0];
  for (let i = 1; i < tbl.length; i++) {
    const d = {};
    for (let j = 0; j < head.length; j++) {
      d[head[j]] = tbl[i][j];
    }
    res.push(d);
  }
  return res;
};
Table.fromJSON = (json) => {
  if (!Array.isArray(json)) {
    throw "is not array!";
  }
  const head = [];
  for (const d of json) {
    for (const name in d) {
      if (head.indexOf(name) == -1) {
        head.push(name);
      }
    }
  }
  const res = [head];
  for (const d of json) {
    const line = [];
    for (let i = 0; i < head.length; i++) {
      const v = d[head[i]];
      if (v == undefined) {
        line.push("");
      } else {
        line.push(v);
      }
    }
    res.push(line);
  }
  return res;
};
Table.makeTable = (ar) => {
  const c = (tag) => document.createElement(tag);
  const tbl = c("table");
  const tr0 = c("tr");
  tbl.appendChild(tr0);
  for (let i = 0; i < ar[0].length; i++) {
    const th = c("th");
    tr0.appendChild(th);
    th.textContent = ar[0][i];
  }
  for (let i = 1; i < ar.length; i++) {
    const tr = c("tr");
    tbl.appendChild(tr);
    for (let j = 0; j < ar[i].length; j++) {
      const td = c("td");
      tr.appendChild(td);
      const s = ar[i][j];
      if (s.startsWith("http://") || s.startsWith("https://")) {
        const a = c("a");
        a.href = a.textContent = s;
        td.appendChild(a);
      } else if (s.startsWith("tel:")) {
        const a = c("a");
        a.href = s;
        a.textContent = s.substring(4);
        td.appendChild(a);
      } else {
        td.textContent = s;
      }
    }
  }
  return tbl;
};

export { Table };
