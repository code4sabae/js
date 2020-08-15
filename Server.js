import { createApp } from "https://servestjs.org/@v1.1.1/mod.ts";
import { CONTENT_TYPE } from "./CONTENT_TYPE.js";

class Server {
  constructor(port) {
    const app = createApp();

    app.handle(/\/api\/*/, async req => {
      try {
        const json = await req.json();
        console.log("[req api]", json);
        const res = this.api(req.path, json);
        console.log("[res api]", res);
        await req.respond({
          status: 200,
          headers: new Headers({ "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }),
          body: JSON.stringify(res),
        });
      } catch (e) {
        console.log("err", e.stack);
      }
    });

    app.handle(/\/upload\/*/, async req => {
      try {
        const bin = await req.arrayBuffer();
        console.log("[req upload]", bin.length);
        const fn = new Date().getTime();
        const name = "data/" + fn + ".jpg";
        try {
          Deno.mkdirSync("data");
        } catch (e) {
        }
        Deno.writeFileSync(name, bin);
        const res = { name };
        console.log("[upload res]", res);
        await req.respond({
          status: 200,
          headers: new Headers({ "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }),
          body: JSON.stringify(res),
        });
      } catch (e) {
        console.log("err", e.stack);
      }
    });

    app.handle(/\/data\//, async req => {
      try {
        const fn = req.path;
        console.log(fn);
        if (fn.indexOf("..") >= 0) {
          throw new Error("illegal filename");
        }
        const n = fn.lastIndexOf('.');
        const ext = n < 0 ? "html" : fn.substring(n + 1);
        const data = Deno.readFileSync("." + fn);
        const ctype = CONTENT_TYPE[ext] || "text/plain";
        await req.respond({
          status: 200,
          headers: new Headers({ "Content-Type": ctype, "Access-Control-Allow-Origin": "*" }),
          body: data,
        });
      } catch (e) {
        console.log("err", e.stack);
      }
    });

    app.handle(/\/*/, async req => {
      try {
        const fn = req.path === "/" || req.path.indexOf("..") >= 0 ? "/index.html" : req.path;
        const n = fn.lastIndexOf('.');
        const ext = n < 0 ? "html" : fn.substring(n + 1);
        const data = Deno.readFileSync("static" + fn);
        const ctype = CONTENT_TYPE[ext] || "text/plain";
        await req.respond({
          status: 200,
          headers: new Headers({ "Content-Type": ctype }),
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
};

export { Server };
