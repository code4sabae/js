import { CONTENT_TYPE } from "./CONTENT_TYPE.js";

const handleWeb = (req) => {
  try {
    const fn = req.url === "/" || req.url.indexOf("..") >= 0 ? "/index.html" : req.url;
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
  (async () => {
    for await (const res of Deno.serveHttp(conn)) {
      const req = res.request;
      const resd = handleWeb(req);
      res.respondWith(resd);
    }
  })();
}
