import { rnd } from "./rnd.js";
import { deepEqual } from "https://js.sabae.cc/deepEqual.js";

const min = (array, func) => {
  let min = Number.MAX_SAFE_INTEGER;
  let hit = null;
  for (const a of array) {
    const n = func(a);
    if (n < min) {
      min = n;
      hit = a;
    }
  }
  return hit;
};
const max = (array, func) => {
  let max = Number.MIN_SAFE_INTEGER;
  let hit = null;
  for (const a of array) {
    const n = func(a);
    if (n > max) {
      max = n;
      hit = a;
    }
  }
  return hit;
};
const isUnique = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] == array[j]) {
        return false;
      }
    }
  }
  return true;
};
const toUnique = (ar) => {
  const set = new Set();
  for (const a of ar) {
    set.add(a);
  }
  const res = [];
  set.forEach(s => res.push(s));
  return res;
};
const toDuplicated = (ar) => {
  const set = new Set();
  const resset = new Set();
  for (const a of ar) {
    if (set.has(a)) {
      resset.add(a);
    } else {
      set.add(a);
    }
  }
  const res = [];
  resset.forEach(s => res.push(s));
  return res;
};
const toUniqueByString = (ar) => {
  const map = {};
  for (const a of ar) {
    map[JSON.stringify(a)] = a;
  }
  return Object.values(map);
};
const melt = (array, keep, name, valname) => {
  name = name || "varname";
  valname = valname || "value";
  const res = [];
  array.forEach((d) => {
    const base = {};
    const vars = [];
    const vals = [];
    for (const k in d) {
      if (keep.indexOf(k) >= 0) {
        base[k] = d[k];
      } else {
        vars.push(k);
        vals.push(d[k]);
      }
    }
    for (let i = 0; i < vars.length; i++) {
      const row = {};
      Object.assign(row, base);
      row[name] = vars[i];
      row[valname] = vals[i];
      res.push(row);
    }
  });
  return res;
};
const removeByKeys = (array, keys) => {
  array.forEach(d => {
    for (const r of keys) {
        delete d[r];
    }
  });
};
const groupBy = (array, key) => {
  const map = {};
  for (const a of array)  {
    const v = a[key];
    if (map[v]) {
      map[v].push(a);
    } else {
      map[v] = [a];
    }
  }
  return map;
}
const getUnion = (ars) => {
  const unions = ars[0].filter((a) => {
    for (let i = 1; i < ars.length; i++) {
      if (!ars[i].includes(a)) {
        return false;
      }
    }
    return true;
  });
  return unions;
};
const countBy = (ar) => {
  const cnt = {};
  for (const a of ar) {
    if (!cnt[a]) {
      cnt[a] = 1;
    } else {
      cnt[a]++;
    }
  }
  return cnt;
};

const make = (from, to) => {
  if (typeof from == "string" && from.length == 1) {
    const nfrom = from.charCodeAt(0);
    const nto = to.charCodeAt(0);
    const res = [];
    if (nfrom < nto) {
      for (let i = nfrom; i <= to.charCodeAt(0); i++) {
        res.push(String.fromCharCode(i));
      }
    } else {
      for (let i = nfrom; i >= to.charCodeAt(0); i--) {
        res.push(String.fromCharCode(i));
      }
    }
    return res;
  }
  if (typeof from == "number") {
    const res = [];
    if (to > from) {
      for (let i = from; i <= to; i++) {
        res.push(i);
      }
    } else {
      for (let i = from; i >= to; i--) {
        res.push(i);
      }
    }
    return res;
  }
  throw new Error("not supported params");
};
const mapToObject = async (nameArray, mapFunc) => {
  const res = await Promise.all(nameArray.map(mapFunc));
  const o = new Object();
  for (let i = 0; i < res.length; i++) {
    o[nameArray[i]] = res[i];
  }
  return o;
};
const shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
		const n = rnd(array.length);
		const tmp = array[i];
		array[i] = array[n];
		array[n] = tmp;
	}
  return array;
};
const diff = (before, after) => {
  const add = [];
  const remove = [];
  for (const b of before) {
    let hit = false;
    for (const a of after) {
      if (deepEqual(b, a)) {
        hit = true;
        break;
      }
    }
    if (!hit) {
      remove.push(b);
    }
  }
  for (const a of after) {
    let hit = false;
    for (const b of before) {
      if (deepEqual(a, b)) {
        hit = true;
        break;
      }
    }
    if (!hit) {
      add.push(a);
    }
  }
  return { added: add, removed: remove };
};
const getSorted = (array, name, ascorder = true, csvmode = false) => {
  if (name == undefined) {
    return array;
  }
  const getNumber = (s) => {
    if (s.length == 0) {
      return NaN;
    }
    let i;
    for (i = 0; i < s.length; i++) {
      if ("0123456789.,".indexOf(s.charAt(i)) == -1) {
        break;
      }
    }
    if (i == 0) {
      return NaN;
    }
    return parseFloat(s.substring(0, i).replace(/,/g, ""));
  };
  const res = array.map(a => a);
  let head = null;
  if (csvmode) {
    head = res[0];
    res.shift();
  }
  res.sort((a, b) => {
    const an = a[name];
    const bn = b[name];
    if ((an == null || an == "") && bn != null) {
      return 1;
    } else if ((bn == null || bn == "") && an != null) {
      return -1;
    }
    let flg = 0;
    const am = array.indexOf(a);
    const bm = array.indexOf(b);
    if (an == bn) {
      flg = am - bm;
    } else {
      const ad = getNumber(an);
      const bd = getNumber(bn);
      if (isNaN(ad) && isNaN(bd) || ad == bd) {
        flg = an.toString().localeCompare(bn.toString());
      } else if (isNaN(ad)) {
        flg = 1;
      } else if (isNaN(bd)) {
        flg = -1;
      } else {
        flg = ad > bd ? 1 : -1;
      }
    }
    return flg * (ascorder ? 1 : -1);
  });
  if (csvmode) {
    res.splice(0, 0, head);
  }
  return res;
}
const ArrayUtil = {
  min,
  max,
  isUnique,
  toUnique,
  toDuplicated,
  toUniqueByString,
  melt,
  removeByKeys,
  groupBy,
  getUnion,
  countBy,
  make,
  mapToObject,
  shuffle,
  diff,
  getSorted,
};
export { ArrayUtil }
