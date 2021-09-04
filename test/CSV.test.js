import * as t from "https://deno.land/std/testing/asserts.ts";
import { CSV } from "../CSV.js";

Deno.test("stringify", () => {
  const data = [
    { a: 123, b: "abc" },
    { a: 456, b: "def" },
  ];
  const s = CSV.stringify(data);
  const expect = CSV.addBOM("a,b\n123,abc\n456,def\n");
  t.assertEquals(s, expect);
});
Deno.test("parse", () => {
  const s = CSV.addBOM("a,b\n123,abc\n456,def\n");
  const data = CSV.parse(s);
  const expect = [
    { a: "123", b: "abc" },
    { a: "456", b: "def" },
  ];
  t.assertEquals(data, expect);
});
