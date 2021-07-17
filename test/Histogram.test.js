import * as t from "https://deno.land/std/testing/asserts.ts";
import { Histogram } from "../Histogram.js";

Deno.test("test", () => {
  const h = new Histogram();
  h.add("a");
  h.add("b");
  h.add("b");
  t.assertEquals(h.toString(), "b: 2\na: 1");
});
