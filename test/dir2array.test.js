import * as t from "https://deno.land/std/testing/asserts.ts";
import { dir2array } from "../dir2array.js";

Deno.test("simple", async () => {
  const ss = await dir2array("dir2array-test");
  console.log(ss);
  //t.assertEquals(encodeHTML("&<>"), "&amp;&lt;&gt;");
});
