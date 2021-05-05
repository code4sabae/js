import { CONTENT_TYPE } from "./CONTENT_TYPE.js";
import { parseURL } from "./parseURL.js";

const handleWeb = (req) => {
  try {
    const purl = parseURL(req.url);
    const path = purl.path;
    const fn = path === "/" || path.indexOf("..") >= 0 ? "/index.html" : path;
    console.log(fn);
    const n = fn.lastIndexOf(".");
    const ext = n < 0 ? "html" : fn.substring(n + 1);
    const data = Deno.readFileSync("." + fn);
    const ctype = CONTENT_TYPE[ext] || "text/plain";
    return new Response(data, {
      status: 200,
      headers: new Headers(
        { "Content-Type": ctype, "Access-Control-Allow-Origin": "*" },
      )
    });
  } catch (e) {
    console.log("err", e.stack);
    return new Response("not found", {
      status: 404,
      headers: new Headers(
        { "Content-Type": "text-plain", "Access-Control-Allow-Origin": "*" },
      )
    });
  }
};

const port = 8081;
const hostname = "::";
console.log(`http://localhost:${port}/`);
for await (const conn of Deno.listen({ port, hostname })) {
  //console.log("conn", conn.addr, conn.rid);
  (async () => {
    for await (const res of Deno.serveHttp(conn)) {
      // https://github.com/oakserver/oak/blob/main/request.ts
      const req = res.request;
      console.log("req.ip", req.ip); // ? undefined
      //console.log(req.headers);
      const resd = handleWeb(req);
      res.respondWith(resd);
    }
  })();
}
