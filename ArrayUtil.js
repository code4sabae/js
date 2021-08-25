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
const melt = (array, keep, name = "varname", valname = "value") => {
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
const ArrayUtil = {
  min,
  max,
  isUnique,
  toUnique,
  melt,
};
export { ArrayUtil }
