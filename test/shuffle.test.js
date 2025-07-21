import * as t from "https://deno.land/std/testing/asserts.ts";
import { shuffle } from "../shuffle.js";
import { rnd } from "../rnd.js";

// 偏りあり
const shuffle0 = (array) => {
  for (let i = 0; i < array.length; i++) {
    const n = rnd(array.length);
    const tmp = array[i];
    array[i] = array[n];
    array[n] = tmp;
  }
};

const make = n => {
  const res = new Array(n);
  for (let i = 0; i < n; i++) res[i] = i;
  return res;
};

/*
const chk = (a) => {
  return a.reduce((pre, n, idx) => n == idx ? pre + 1 : pre, 0);
};

const chk1000 = (func) => {
  let cnt = 0;
  const n = 1000;
  for (let i = 0; i < n; i++) {
    const a = make(100);
    func(a);
    cnt += chk(a);
  }
  return cnt / n;
};
*/

const chk2 = (test, func) => {
  const count = {};
  const trials = 600000;
  const arr = [0, 1, 2];

  for (let i = 0; i < trials; i++) {
      const a = [...arr];
      func(a);
      const key = a.join('');
      count[key] = (count[key] || 0) + 1;
  }

  console.log("output:", test);
  let min = 100000;
  let max = 0;
  Object.keys(count).sort().forEach(key => {
    const v = count[key];
    if (v < min) min = v;
    if (v > max) max = v;
    console.log(`${key}: ${v}`);
  });
  const w = max - min;
  console.log("width", w);
  return w;
};

Deno.test("simple", () => {
  //console.log(chk1000(shuffle));
  //console.log(chk1000(shuffle0));
  t.assert(chk2("new", shuffle) < 2000); // 偏り少ない
  t.assert(chk2("old", shuffle0) > 2000); // 偏り大きい
});
