import * as t from "https://deno.land/std/testing/asserts.ts";
import { hex2bytes } from "./hex2bytes.js";

Deno.test("hex2bytes", () => {
  t.assertEquals(hex2bytes("0103"), new Uint8Array([1, 3]));
});
