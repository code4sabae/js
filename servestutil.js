import { createApp } from "https://servestjs.org/@v1.1.9/mod.ts";

const resHTML = async (req, html) => {
  await req.respond({
    status: 200,
    headers: new Headers({ "Content-Type": "text/html" }),
    body: html,
  });
};
const resJSON = async (req, data, alloworigin) => {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  });
  if (!alloworigin) {
    headers.set("Access-Control-Allow-Origin", "*");
  } else {
    headers.set("Access-Control-Allow-Origin", alloworigin);
    headers.set("Vary", "Origin");
  }
  await req.respond({ status: 200, headers, body: JSON.stringify(data) });
};
const resText = async (req, text) => {
  await req.respond({
    status: 200,
    headers: new Headers({ "Content-Type": "text/plain" }),
    body: html,
  });
};
const resJPG = async (req, bin) => {
  await req.respond({
    status: 200,
    headers: new Headers({ "Content-Type": "image/jpeg" }),
    body: bin,
  });
};
const resTempRedirect = async (req, url) => {
  await req.respond({
    status: 307, // Temporary Redirect
    headers: new Headers({
      "Location": url,
    }),
  });
};

// handle
const handleJSON = async (req, api, alloworigin) => { // async api(path, json)
  if (req.method === "OPTIONS") {
    await resJSON(req, "ok", alloworigin);
    return;
  }
  try {
    const json = await (async () => {
      if (req.method === "POST") {
        return await req.json();
      } else if (req.method === "GET") {
        const n = req.url.indexOf("?");
        if (n >= 0) {
          const sjson = decodeURIComponent(req.url.substring(n + 1));
          try {
            return JSON.parse(sjson);
          } catch (e) {
            return sjson;
          }
        }
      }
      return null;
    })();
    console.log("[req api]", json);
    const res = await api(req.path, json);
    console.log("[res api]", res);
    await resJSON(req, res, alloworigin);
  } catch (e) {
    console.log("err", e.stack);
  }
};

// file
const readJSON = async (fn, defaultdata) => {
  try {
    return JSON.parse(await Deno.readTextFile(fn));
  } catch (e) {
    return defaultdata;
  }
};
const writeJSON = async (fn, data) => {
  await Deno.writeTextFile(fn, JSON.stringify(data));
};

// deno http

const getHeaders = (headers) => {
  const res = {};
  for (const name of headers.keys()) {
    res[name] = headers.get(name);
  }
  return res;
}

export { createApp, resHTML, resJSON, resText, resJPG, resTempRedirect, handleJSON, readJSON, writeJSON, getHeaders };
