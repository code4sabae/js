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