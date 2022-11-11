import * as t from "https://deno.land/std/testing/asserts.ts";
import { addLinkTag } from "../addLinkTag.js";

Deno.test("simple", () => {
  t.assertEquals(addLinkTag("a https://a/"), `a <a href="https://a/">https://a/</a>`);
});
Deno.test("img", () => {
  t.assertEquals(addLinkTag(`<img src="https://a/">`), `<img src="https://a/">`);
});
Deno.test("img and text", () => {
  t.assertEquals(addLinkTag(`<img src="https://a/" w=1>a https://a/ b`), `<img src="https://a/" w=1>a <a href="https://a/">https://a/</a> b`);
});
