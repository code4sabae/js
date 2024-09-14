import * as t from "https://deno.land/std/testing/asserts.ts";
import { escapeURL, fetchOrLoad, getEncodingFromHTML } from "../fetchOrLoad.js";

const make = (n, len = 200) => {
  const ss = [];
  for (let i = 0; i < len; i++) {
    ss.push(n);
  }
  const fn = ss.join("");
  return fn;
};

Deno.test("escapeURL", async () => {
  const fn = make("1");
  const hashed = escapeURL(fn);
  t.assertEquals(hashed, "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111aa053afb4424a29dbccd00b2aa976f");
});
Deno.test("escapeURL", async () => {
  const fn = make("2");
  const hashed = escapeURL(fn);
  t.assertEquals(hashed, "2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222a52e021d676968f6a3f013c333e4446b");
});
Deno.test("escapeURL short", async () => {
  const fn = make("2", 50);
  const hashed = escapeURL(fn);
  t.assertEquals(hashed, "22222222222222222222222222222222222222222222222222");
});
Deno.test("as browser", async () => {
  const url = "https://3d.nih.gov/entries/3DPX-021000";
  const html = await fetchOrLoad(url);
  t.assert(html.indexOf("403 Forbidden") !== -1);
});
Deno.test("getEncodingFromHTML", () => {
  const e = s => new TextEncoder().encode(s);
  t.assert(getEncodingFromHTML(e(`<html encoding="UTF-8">`)), "UTF-8");
  t.assert(getEncodingFromHTML(e(`<html charset="UTF-8">`)), "UTF-8");
  t.assert(getEncodingFromHTML(e(`<html encoding="UTF-a" charset="UTF-b">`)), "UTF-a");
  t.assert(getEncodingFromHTML(e(`<html charset="UTF-b" encoding="UTF-a">`)), "UTF-a");
});
