import * as t from "https://deno.land/std/testing/asserts.ts";
import { JSONUtil } from "../JSONUtil.js";

Deno.test("diff simple", () => {
  const d1 = {
    name: "abc",
    cnt: "3",
  };
  const d2 = {
    name: "abc",
    cnt: "4",
  };
  const expect = {
    cnt: [
      {
        added: undefined,
        count: 1,
        removed: true,
        value: "3",
      },
      {
        added: true,
        count: 1,
        removed: undefined,
        value: "4",
      },
    ],
  }
  t.assertEquals(JSONUtil.diff(d1, d2), expect);
});
Deno.test("diff removed name", () => {
  const d1 = {
    name: "abc",
    cnt: "3",
  };
  const d2 = {
    name: "abc",
  };
  const expect = {
    cnt: [
      {
          added: undefined,
          count: 1,
          removed: true,
          value: "3",
        },
    ],
  }
  t.assertEquals(JSONUtil.diff(d1, d2), expect);
});
Deno.test("diff add name", () => {
  const d1 = {
    name: "abc",
    cnt: "3",
  };
  const d2 = {
    name: "abc",
    cnt: "3",
    opt: "option",
  };
  const expect = {
    opt: [
      {
          added: true,
          count: 6,
          removed: false,
          value: "option",
        },
    ],
  }
  t.assertEquals(JSONUtil.diff(d1, d2), expect);
});
