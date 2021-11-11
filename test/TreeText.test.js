import * as t from "https://deno.land/std/testing/asserts.ts";
import { TreeText } from "../TreeText.js";

Deno.test("simple", () => {
  const data = `
a
  b
d
  d
`;
console.log(data);
  t.assertEquals(TreeText.parse(data), { a: "b" });
});

/*
Deno.test("simple", () => {
  const data = `
a
  b
    ab
  c
    ac
d
  e
    de
  f
    df
`;
  t.assertEquals(TreeText.parse(data), { a: [ "b", "c" ], d: bs.toString(), "<table><tr><th>name</th><th>val</th></tr><tr><td>abc</td><td>123</td></tr><tr><td>def</td><td>456</td></tr></table>");
});
*/
