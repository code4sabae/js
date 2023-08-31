import * as t from "https://deno.land/std/testing/asserts.ts";
import { bincat } from "../binutil.js";

Deno.test("bincat", async () => {
  const a = new Uint8Array([1, 2]);
  const b = new Uint8Array([3, 4]);
  const c = new Uint8Array([5, 6]);
  t.assertEquals(bincat(a, b), new Uint8Array([1, 2, 3, 4]));
  t.assertEquals(bincat(b, a), new Uint8Array([3, 4, 1, 2]));
  t.assertEquals(bincat(a), new Uint8Array([1, 2]));
  t.assertEquals(bincat(a, b, c), new Uint8Array([1, 2, 3, 4, 5, 6]));
});
