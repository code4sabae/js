import * as t from "https://deno.land/std/testing/asserts.ts";
import { ArrayUtil } from "../ArrayUtil.js";

Deno.test("melt", () => {
  const data = [
    { key1: 1, key2: 2, key3: 10 },
    { key1: 2, key2: 3, key3: 20 },
    { key1: 3, key2: 5, key3: 50 },
  ];
  const expect1 = [
    { key1: 1, varname: "key2", value: 2 },
    { key1: 1, varname: "key3", value: 10 },
    { key1: 2, varname: "key2", value: 3 },
    { key1: 2, varname: "key3", value: 20 },
    { key1: 3, varname: "key2", value: 5 },
    { key1: 3, varname: "key3", value: 50 },
  ];
  t.assertEquals(ArrayUtil.melt(data, ["key1"]), expect1);

  const expect2 = [
    { key1: 1, key: "key2", val: 2 },
    { key1: 1, key: "key3", val: 10 },
    { key1: 2, key: "key2", val: 3 },
    { key1: 2, key: "key3", val: 20 },
    { key1: 3, key: "key2", val: 5 },
    { key1: 3, key: "key3", val: 50 },
  ];
  t.assertEquals(ArrayUtil.melt(data, ["key1"], "key", "val"), expect2);
});
Deno.test("removeByKeys", () => {
  const data = [
    { key1: 1, key2: 2, key3: 10 },
    { key1: 2, key2: 3, key3: 20 },
    { key1: 3, key2: 5, key3: 50 },
  ];
  const expect1 = [
    { key2: 2, key3: 10 },
    { key2: 3, key3: 20 },
    { key2: 5, key3: 50 },
  ];
  ArrayUtil.removeByKeys(data, ["key1"]);
  t.assertEquals(data, expect1);
});
Deno.test("groupBy", () => {
  const data = [
    { key1: 1, key2: 2, key3: 10 },
    { key1: 2, key2: 2, key3: 10 },
    { key1: 3, key2: 3, key3: 20 },
    { key1: 4, key2: 3, key3: 20 },
    { key1: 5, key2: 2, key3: 20 },
    { key1: 6, key2: 5, key3: 50 },
    { key1: 7, key3: 50 },
  ];
  const expect1 = {
    "2": [
      { key1: 1, key2: 2, key3: 10 },
      { key1: 2, key2: 2, key3: 10 },
      { key1: 5, key2: 2, key3: 20 },
    ],
    "3": [
      { key1: 3, key2: 3, key3: 20 },
      { key1: 4, key2: 3, key3: 20 },
      ],
    "5": [
      { key1: 6, key2: 5, key3: 50 },
    ],
    undefined: [
      { key1: 7, key3: 50 },
    ]
  };
  t.assertEquals(ArrayUtil.groupBy(data, "key2"), expect1);
});
Deno.test("toUniqueString", () => {
  const data = [
    { key1: 1, key2: 2, key3: 10 },
    { key1: 2, key2: 2, key3: 10 },
    { key1: 3, key2: 3, key3: 20 },
    { key1: 2, key2: 2, key3: 10 },
    { key1: 3, key2: 3, key3: 20 },
  ];
  const expect1 = [
    { key1: 1, key2: 2, key3: 10 },
    { key1: 2, key2: 2, key3: 10 },
    { key1: 3, key2: 3, key3: 20 },
  ];
  t.assertEquals(ArrayUtil.toUnique(data), data);
  t.assertEquals(ArrayUtil.toUniqueByString(data), expect1);
});
Deno.test("getUnion", () => {
  const res1 = ArrayUtil.getUnion([
    [1, 2, 3],
    [2, 3, 4],
    [3, 2, 5],
  ]);
  t.assertEquals(res1, [2, 3]);

  const res2 = ArrayUtil.getUnion([
    [1, 2, 3],
    [2, 3, 4],
    [4, 5, 2],
  ]);
  t.assertEquals(res2, [2]);

  const res3 = ArrayUtil.getUnion([
    [1, 2, 3],
    [2, 3, 4],
    [4, 5, 6],
  ]);
  t.assertEquals(res3, []);
});
