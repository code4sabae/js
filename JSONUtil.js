import { diffChars } from "https://taisukef.github.io/jsdiff-es/src/diff/character.js";

class JSONUtil {
  static diff(d1, d2) { // as string
    const res = {};
    let cnt = 0;
    const names = [];
    for (const name in d1) {
      names.push(name);
      const v1 = d1[name];
      const v2 = d2[name] || "";
      const diff = diffChars(v1.toString(), v2.toString());
      //console.log(diff);
      if (diff.length > 1 || diff[0].added || diff[0].removed) {
        res[name] = diff;
        cnt++;
      }
    }
    for (const name in d2) {
      if (names.indexOf(name) >= 0) {
        continue;
      }
      const v = d2[name];
      res[name] = [{ added: true, count: v.length, removed: false, value: v }];
      cnt++;
    }
    if (cnt == 0) {
      return null;
    }
    return res;
  };
}

export { JSONUtil };
