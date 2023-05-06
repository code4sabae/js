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
Deno.test("countBy", () => {
  const test = [
    "abc", "abc", "def", "def", "abc", "xyz",
  ];
  t.assertEquals(ArrayUtil.countBy(test), { abc: 3, def: 2, xyz: 1 });
});
Deno.test("toUnique", () => {
  const data = [
    1, 2, 3, 1, 2, 3, 4
  ];
  const expect1 = [
    1, 2, 3, 4
  ];
  t.assertEquals(ArrayUtil.toUnique(data), expect1);
});
Deno.test("toDuplicated", () => {
  const data = [
    1, 2, 3, 1, 2, 3, 4
  ];
  const expect1 = [
    1, 2, 3
  ];
  t.assertEquals(ArrayUtil.toDuplicated(data), expect1);
});
Deno.test("make string", () => {
  t.assertEquals(ArrayUtil.make("A", "G"), ["A", "B", "C", "D", "E", "F", "G"]);
  t.assertEquals(ArrayUtil.make("Z", "X"), ["Z", "Y", "X"]);
  t.assertEquals(ArrayUtil.make("あ", "う"), ["あ", "ぃ", "い", "ぅ", "う"]);
  t.assertEquals(ArrayUtil.make("0", "9"), ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
});
Deno.test("make number", () => {
  t.assertEquals(ArrayUtil.make(0, 5), [0, 1, 2, 3, 4, 5]);
  t.assertEquals(ArrayUtil.make(5, 0), [5, 4, 3, 2, 1, 0]);
  t.assertEquals(ArrayUtil.make(3, 3), [3]);
  t.assertEquals(ArrayUtil.make(3, null), [3, 2, 1, 0]);
  t.assertThrows(() => { ArrayUtil.make(null, null), [3] });
});
Deno.test("mapToObject", async () => {
  t.assertEquals(await ArrayUtil.mapToObject(["A", "BB", "CCC"], async (s) => s.length), { "A": 1, "BB": 2, "CCC": 3 });
});
Deno.test("shuffle", async () => {
  const abc = ArrayUtil.shuffle(ArrayUtil.make("A", "Z"));
  t.assertEquals(abc.length, 26);
});
Deno.test("getSorted", async () => {
  const array = [
    { a: "1m" },
    { a: "1cm" },
    { a: "2m" },
    { a: "2cm" },
    { a: "a" },
    { a: "b" },
    { a: "1", b: 1 },
    { a: "1", b: 2 },
  ];
  t.assertEquals(ArrayUtil.getSorted(array, "a"), [
    { a: "1", b: 1 },
    { a: "1", b: 2 },
    { a: "1cm" },
    { a: "1m" },
    { a: "2cm" },
    { a: "2m" },
    { a: "a" },
    { a: "b" },
  ]);
  t.assertEquals(ArrayUtil.getSorted(array, "a", false), [
    { a: "b" },
    { a: "a" },
    { a: "2m" },
    { a: "2cm" },
    { a: "1m" },
    { a: "1cm" },
    { a: "1", b: 2 },
    { a: "1", b: 1 },
  ]);
  t.assertEquals(ArrayUtil.getSorted(array, "b", true), [
    { a: "1", b: 1 },
    { a: "1", b: 2 },
    { a: "1m" },
    { a: "1cm" },
    { a: "2m" },
    { a: "2cm" },
    { a: "a" },
    { a: "b" },
  ]);

  t.assertEquals(ArrayUtil.getSorted(array, "b", false), [
    { a: "1", b: 2 },
    { a: "1", b: 1 },
    { a: "b" },
    { a: "a" },
    { a: "2cm" },
    { a: "2m" },
    { a: "1cm" },
    { a: "1m" },
  ]);
});
Deno.test("getSorted str", async () => {
  const array = [
    { a: "a" },
    { a: "c" },
    { a: "d" },
    { a: "b" },
    { a: "" },
  ];
  t.assertEquals(ArrayUtil.getSorted(array, "a"), [
    { a: "a" },
    { a: "b" },
    { a: "c" },
    { a: "d" },
    { a: "" },
  ]);
  t.assertEquals(ArrayUtil.getSorted(array, "a", false), [
    { a: "d" },
    { a: "c" },
    { a: "b" },
    { a: "a" },
    { a: "" },
  ]);
});
Deno.test("getSorted date", async () => {
  const array = [
    { a: "2023-05-06" },
    { a: "2023-04-02" },
    { a: "2023-07-07" },
  ];
  t.assertEquals(ArrayUtil.getSorted(array, "a"), [
    { a: "2023-04-02" },
    { a: "2023-05-06" },
    { a: "2023-07-07" },
  ]);
  t.assertEquals(ArrayUtil.getSorted(array, "a", false), [
    { a: "2023-07-07" },
    { a: "2023-05-06" },
    { a: "2023-04-02" },
  ]);
});
Deno.test("getSorted csvmode", async () => {
  const array = [
    ["id", "date"],
    [1, "2023-05-06"],
    [2, "2023-04-02"],
    [3, "2023-07-07"],
  ];
  t.assertEquals(ArrayUtil.getSorted(array, 1, true, true), [
    ["id", "date"],
    [2, "2023-04-02"],
    [1, "2023-05-06"],
    [3, "2023-07-07"],
  ]);
  t.assertEquals(ArrayUtil.getSorted(array, 1, false, true), [
    ["id", "date"],
    [3, "2023-07-07"],
    [1, "2023-05-06"],
    [2, "2023-04-02"],
  ]);
});
