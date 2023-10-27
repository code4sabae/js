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
Deno.test("withlink", () => {
  t.assertEquals(encodeHTML("https://sabatwi.com/", true), `<a href="https://sabatwi.com/">https://sabatwi.com/</a>`);
  t.assertEquals(encodeHTML("https://sabatwi.com/"), `https://sabatwi.com/`);
  t.assertEquals(encodeHTML("https://sabatwi.com/", false), `https://sabatwi.com/`);
  t.assertEquals(encodeHTML("ahttps://sabatwi.com/", true), `a<a href="https://sabatwi.com/">https://sabatwi.com/</a>`);
  t.assertEquals(encodeHTML("https://sabatwi.com/ https://sabatwi.com/", true), `<a href="https://sabatwi.com/">https://sabatwi.com/</a> <a href="https://sabatwi.com/">https://sabatwi.com/</a>`);
  t.assertEquals(encodeHTML("http://sabatwi.com/", true), `<a href="http://sabatwi.com/">http://sabatwi.com/</a>`);
  t.assertEquals(encodeHTML("http://sabatwi.com:80/", true), `<a href="http://sabatwi.com:80/">http://sabatwi.com:80/</a>`);
  t.assertEquals(encodeHTML("http://[::]:80/", true), `<a href="http://[::]:80/">http://[::]:80/</a>`);
  t.assertEquals(encodeHTML("http://sabatwi.com/あ", true), `<a href="http://sabatwi.com/">http://sabatwi.com/</a>あ`);
});
