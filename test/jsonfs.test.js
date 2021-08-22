import * as t from "https://deno.land/std/testing/asserts.ts";
import { jsonfs } from "../jsonfs.js";

Deno.test("simple", async () => {
  const data = [
    ["name", "val"],
    ["abc", "123"],
    ["def", "456"],
  ];
  await jsonfs.write("test.json", data);
  const data2 = await jsonfs.read("test.json");
  t.assertEquals(data, data2);
});
