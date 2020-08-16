import { createApp } from "https://servestjs.org/@v1.1.1/mod.ts";
import { CONTENT_TYPE } from "./CONTENT_TYPE.js";

class Server {
  constructor(port) {
    const app = createApp();

    app.handle(/\/*/, async (req) => {
      try {
        const fn = req.path === "/" || req.path.indexOf("..") >= 0
          ? "/index.html"
          : req.path;
        const n = fn.lastIndexOf(".");
        const ext = n < 0 ? "html" : fn.substring(n + 1);
        const data = Deno.readFileSync("." + fn);
        const ctype = CONTENT_TYPE[ext] || "text/plain";
        await req.respond({
          status: 200,
          headers: new Headers(
            { "Content-Type": ctype, "Access-Control-Allow-Origin": "*" },
          ),
          body: data,
        });
      } catch (e) {
        console.log("err", e.stack);
      }
    });

    app.listen({ port });

    console.log(`http://localhost:${port}/`);
  }

  api(path, req) { // to override
    return req;
  }
}

new Server(8080);
