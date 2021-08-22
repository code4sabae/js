const search = (data, key) => {
  const keys = key.split(" ");
  const res = [];
  A: for (const d of data) {
    for (const k of keys) {
      let flg = false;
      if (typeof d == "object") {
        for (const name in d) {
          if (d[name].indexOf(k) >= 0) {
            flg = true;
            break;
          }
        }
      } else {
        if (d.toString().indexOf(k) >= 0) {
          flg = true;
          break;
        }
      }
      if (!flg) {
        continue A;
      }
    }
    res.push(d);
  }
  return res;
};

export { search };
