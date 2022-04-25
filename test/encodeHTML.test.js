import * as t from "https://deno.land/std/testing/asserts.ts";
import { encodeHTML } from "../encodeHTML.js";

Deno.test("simple", () => {
  t.assertEquals(encodeHTML("&<>"), "&amp;&lt;&gt;");
});
Deno.test("enter", () => {
  t.assertEquals(encodeHTML("a\nb"), "a<br>b");
  //t.assertEquals(encodeHTML("a\nb"), "a\nb");
});
Deno.test("number", () => {
  t.assertEquals(encodeHTML(321), "321");
  //t.assertEquals(encodeHTML(321), 321);
});
Deno.test("array", () => {
  t.assertEquals(encodeHTML(["&", "<", ">", 321]), ["&amp;", "&lt;", "&gt;", "321"]);
});
Deno.test("object", () => {
  t.assertEquals(encodeHTML({ amp: "&", lt: "<", gt: ">", num: 321 }), { amp: "&amp;", lt: "&lt;", gt: "&gt;", num: "321" });
  t.assertEquals(encodeHTML({ "&": "&" }), { "&amp;": "&amp;" });
});
Deno.test("null", () => {
  t.assertEquals(encodeHTML(null), null);
});
