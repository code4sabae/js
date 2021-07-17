import * as t from "https://deno.land/std/testing/asserts.ts";
import { Table } from "../Table.js";
import {} from "https://code4fukui.github.io/domtest/domtest.js";

Deno.test("simple", () => {
  const data = [
    ["name", "val"],
    ["abc", "123"],
    ["def", "456"],
  ];
  const s = Table.makeTable(data);
  t.assertEquals(s.toString(), "<table><tr><th>name</th><th>val</th></tr><tr><td>abc</td><td>123</td></tr><tr><td>def</td><td>456</td></tr></table>");
});
Deno.test("https", () => {
  const data = [
    ["val"],
    ["https://jig.jp/"],
  ];
  const s = Table.makeTable(data);
  t.assertEquals(s.toString(), "<table><tr><th>val</th></tr><tr><td><a href='https://jig.jp/'>https://jig.jp/</a></td></tr></table>");
});
Deno.test("tel:", () => {
  const data = [
    ["val"],
    ["tel:123"],
  ];
  const s = Table.makeTable(data);
  t.assertEquals(s.toString(), "<table><tr><th>val</th></tr><tr><td><a href='tel:123'>123</a></td></tr></table>");
});
