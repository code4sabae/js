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
Deno.test("toMarkdown", () => {
  const data = [
    { a: 123, b: "abc" },
    { a: 456, b: "def" },
  ];
  const s = CSV.toMarkdown(data);
  const expect = "# a\n\n## 123\n\n- b: abc\n\n## 456\n\n- b: def\n";
  t.assertEquals(s, expect);
});
Deno.test("toMarkdown csv", () => {
  const data = [
    ["a", "b"],
    [123, "abc"],
    [456, "def"],
  ];
  const s = CSV.toMarkdown(data);
  const expect = "# a\n\n## 123\n\n- b: abc\n\n## 456\n\n- b: def\n";
  t.assertEquals(s, expect);
});
Deno.test("fromMarkdown", () => {
  const s = "# a\n\n## 123\n\n- b: abc\n\n## 456\n\n- b: def\n";
  const data = CSV.fromMarkdown(s);
  const expect = [
    { a: "123", b: "abc" },
    { a: "456", b: "def" },
  ];
  t.assertEquals(data, expect);
});
Deno.test("toMarkdown enc", () => {
  const data = [
    { a: 123, b: "- abc" },
    { a: 456, b: "# def\nDEF\n" },
  ];
  const s = CSV.toMarkdown(data);
  const expect = "# a\n\n## 123\n\n- b: - abc\n\n## 456\n\n### b\n\n\\# def\n\nDEF\n\n\n";
  t.assertEquals(s, expect);
});
Deno.test("fromMarkdown", () => {
  const s = "# a\n\n## 123\n\n- b: - abc\n\n## 456\n\n### b\n\n\\# def\n\nDEF\n\n\n";
  const data = CSV.fromMarkdown(s);
  const expect = [
    { a: "123", b: "- abc" },
    { a: "456", b: "# def\nDEF\n" },
  ];
  t.assertEquals(data, expect);
});
Deno.test("fromMarkdown2", () => {
  const s = "# a\n\n## 123\n\n- b: - abc\n\n## 456\n\n### b\n\n\\# def\n\nDEF\n\n";
  const data = CSV.fromMarkdown(s);
  const expect = [
    { a: "123", b: "- abc" },
    { a: "456", b: "# def\nDEF" },
  ];
  t.assertEquals(data, expect);
});
/*
Deno.test("toMarkdown", () => {
  const data = [
    { a: 123, b: "abc", c: true },
    { a: 456, b: "def", c: false },
  ];
  const s = CSV.toMarkdown(data);
  const expect = "# a\n\n## 123\n\n- b: abc\n- c: true\n\n## 456\n\n- b: def\n- c: false\n";
  t.assertEquals(s, expect);
});
*/
/*
const s = "# a\n\n## 123\n\n- b: abc\n\n## 456\n\n- b: def\n";
const data = CSV.fromMarkdown(s);
*/