import * as t from "https://deno.land/std/testing/asserts.ts";
import { equals } from "../equals.js";

Deno.test("str", () => {
  t.assert(equals("a", "a"));
  t.assert(!equals("a", "b"));
  t.assert(!equals("abc", "abcd"));
  t.assert(!equals("abc", null));
  t.assert(equals("abc", "abc"));
});
Deno.test("num", () => {
  t.assert(equals(123, 123));
  t.assert(equals(0, ""));
  t.assert(equals("123", 123));
  t.assert(equals("0", 0));
});
Deno.test("obj", () => {
  t.assert(equals({ a: 1, b: 2 }, { a: 1, b: 2 }));
  t.assert(equals({ a: 1, b: 2 }, { b: 2, a: 1 }));
  t.assert(!equals({ a: 1, b: 2 }, { b: 1, a: 2, c: 3 }));
  t.assert(!equals({ a: 1, b: 2 }, null));
  t.assert(equals({ a: 1, b: { c: "ab" } }, { b: { c: "ab" }, a: 1 }));
});
Deno.test("array", () => {
  t.assert(equals([1, 2], [1, 2]));
  t.assert(!equals([1, 2, 3], [1, 2]));
  t.assert(!equals([1, 2, 3], null));
});
Deno.test("typedarray", () => {
  t.assert(!equals([1, 2, 3], new Uint8Array([1, 2, 3])));
  t.assert(equals(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3])));
  t.assert(!equals(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2])));
  t.assert(equals(new Uint8Array([1, 2, 3]), new Uint16Array([1, 2, 3])));
  t.assert(equals(new Uint8Array([1, 2, 3]), new Float32Array([1, 2, 3])));
  t.assert(!equals(new Uint8Array([1.2, 2, 3]), new Float32Array([1.2, 2, 3])));
});
Deno.test("null", () => {
  t.assert(equals(null, null));
  t.assert(equals(null, undefined));
  t.assert(!equals(undefined, 0));
  t.assert(!equals(0, null));
  t.assert(!equals("", null));
});
