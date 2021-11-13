import { CONTENT_TYPE } from "https://js.sabae.cc/CONTENT_TYPE.js";
import { UUID } from "https://js.sabae.cc/UUID.js";
import { getExtension } from "https://js.sabae.cc/getExtension.js";
import { parseURL } from "https://js.sabae.cc/parseURL.js";

const getFileNameFromDate = () => {
  const d = new Date();
  const fix0 = (n) => (n < 10 ? "0" + n : n).toString();
  const ymd = d.getFullYear() + fix0(d.getMonth() + 1) + fix0(d.getDate());
  return ymd + "/" + UUID.generate();
};

const DENO_BUF_SIZE = 32 * 1024;

const readFilePartial = async (fn, offset, len) => {
  const f = await Deno.open(fn);
  //console.log(fn, offset, len);
  await Deno.seek(f.rid, offset, Deno.SeekMode.Start);
  const buf = new Uint8Array(len);
  const rbuf = new Uint8Array(DENO_BUF_SIZE);
  let off = 0;
  for (;;) {
    const rlen = await Deno.read(f.rid, rbuf);
    for (let i = 0; i < rlen; i++) {
      buf[off + i] = rbuf[i];
    }
    //console.log(off, rlen);
    off += rlen;
    len -= rlen;
    if (len == 0) {
      break;
    }
  }
  await Deno.close(f.rid);
  return buf;
};

const RANGE_LEN = 1024 * 1024 * 10;

const readFileRange = async (fn, range) => {
  let gzip = true;
  let data = null;
  let range0 = 0;
  let range1 = RANGE_LEN - 1;
  if (range) {
    range0 = parseInt(range[0]);
    if (range[1] != "") {
      range1 = parseInt(range[1]);
    } else {
      range1 += range0;
    }
  }
  let flen = 0;
  try {
    /* // unsupported gzip & range request
    //data = Deno.readFileSync(fn + ".gz");
    flen = (await Deno.stat(fn + ".gz")).size;
    if (range1 >= flen) {
      range1 = flen - 1;
    }
    data = await readFilePartial(fn + ".gz", range0, range1 - range0 + 1);
    */
    flen = (await Deno.stat(fn + ".gz")).size;
    if (flen < RANGE_LEN) {
      data = await Deno.readFile(fn + ".gz");
      return [data, data.length, gzip];
    }
  } catch (e) {
  }
  gzip = false;
  flen = (await Deno.stat(fn)).size;
  if (range1 >= flen) {
    range1 = flen - 1;
  }
  data = await readFilePartial(fn, range0, range1 - range0 + 1);
  return [data, flen, gzip];
};

class Server {
  constructor(port) {
    this.start(port);
  }
  async handleApi(req) {
    //const url = req.url;
    const path = req.path;
    if (req.method === "OPTIONS") {
      const res = "ok";
      return new Response(JSON.stringify(res), {
        status: 200,
        headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Accept",
          // "Access-Control-Allow-Methods": "PUT, DELETE, PATCH",
        })
      });
    }
    try {
      const json = await (async () => {
        if (req.method === "POST") {
          return await req.json();
        } else if (req.method === "GET") {
          const n = req.url.indexOf("?");
          const sjson = decodeURIComponent(req.url.substring(n + 1));
          try {
            return JSON.parse(sjson);
          } catch (e) {
            return sjson;
          }
        }
        return null;
      })();
      this.log("[req api]", json);
      const res = await this.api(path, json, req.remoteAddr);
      this.log("[res api]", res);
      return new Response(JSON.stringify(res), {
        status: 200,
        headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Accept", // must
          //"Access-Control-Allow-Methods": "PUT, DELETE, PATCH",
        })
      });
    } catch (e) {
      this.err(e.stack);
    }
    return null;
  };
  async handleData(req) {
    //const url = req.url;
    const path = req.path;
    try {
      if (req.method === "POST") {
        const ext = getExtension(path, ".jpg");
        const bin = new Uint8Array(await req.arrayBuffer());
        this.log("[req data]", bin.length);
        const fn = getFileNameFromDate();
        const name = fn + ext;
        try {
          Deno.mkdirSync("data");
        } catch (e) {
        }
        try {
          const dir = name.substring(0, name.lastIndexOf("/"));
          Deno.mkdirSync("data/" + dir);
        } catch (e) {
        }
        Deno.writeFileSync("data/" + name, bin);
        const res = { name };
        this.log("[data res]", res);
        return new Response(JSON.stringify(res), {
          status: 200,
          headers: new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Accept", // must
            //"Access-Control-Allow-Methods": "PUT, DELETE, PATCH",
          })
        });
      } else if (req.method === "GET" || req.method === "HEAD") {
        const fn = path;
        if (fn.indexOf("..") >= 0) {
          throw new Error("illegal filename");
        }
        const n = fn.lastIndexOf(".");
        const ext = n < 0 ? "html" : fn.substring(n + 1);
        const data = Deno.readFileSync("." + fn);
        const ctype = CONTENT_TYPE[ext] || "text/plain";
        return new Response(req.method === "HEAD" ? null : data, {
          status: 200,
          headers: new Headers({
            "Content-Type": ctype,
            "Access-Control-Allow-Origin": "*",
            "Content-Length": data.length,
          }),
        });
      }
    } catch (e) {
      this.err("err", e.stack);
    }
  }
  async handleWeb(req) {
    //const url = req.url;
    const path = req.path;
    try {
      //console.log(path, req.headers);
      const getRange = (req) => {
        const range = req.headers.get("Range");
        if (!range || !range.startsWith("bytes=")) {
          return null;
        }
        const res = range.substring(6).split("-");
        if (res.length === 0) {
          return null;
        }
        return res;
      };
      let range = getRange(req);
      const calcPath = (path) => {
        if (path === "/" || path.indexOf("..") >= 0) {
          return "/index.html";
        }
        if (path.endsWith("/")) {
          return path + "index.html";
        }
        return path;
      };
      const fn = calcPath(path);
      const n = fn.lastIndexOf(".");
      const ext = n < 0 ? "html" : fn.substring(n + 1);
      const [data, totallen, gzip] = await readFileRange("static" + fn, range);
      if (!range) {
        if (data.length != totallen) {
          range = [0, data.length - 1];
        }
      } else if (range[1] == "") {
        range[1] = parseInt(range[0]) + data.length - 1;
      }

      const ctype = CONTENT_TYPE[ext] || "text/plain";
      const headers = {
        "Content-Type": ctype,
        "Accept-Ranges": "bytes",
        "Content-Length": data.length,
      };
      if (gzip) {
        headers["Content-Encoding"] = "gzip";
      }
      if (totallen == data.length) {
        range = null;
      }
      if (range) {
        headers["Content-Range"] = "bytes " + range[0] + "-" + range[1] +
          "/" + totallen;
      }
      return new Response(data, {
        status: range ? 206 : 200,
        headers: new Headers(headers),
      });
    } catch (e) {
      if (path !== "/favicon.ico") {
        this.err(e);
      }
    }
  }
  async start(port) {
    this.log(`http://localhost:${port}/`);
    const hostname = "::"; // for IPv6
    for await (const conn of Deno.listen({ port, hostname })) {
      (async () => {
        //console.log(conn.localAddr);
        const remoteAddr = conn.remoteAddr.hostname;
        try {
          for await (const res of Deno.serveHttp(conn)) {
            const req = res.request;
            const url = req.url;
            const purl = parseURL(url);
            if (!purl) {
              continue;
            }
            req.path = purl.path;
            req.query = purl.query;
            req.host = purl.host;
            req.port = purl.port;
            req.remoteAddr = remoteAddr;
            let resd = null;
            const path = req.path;
            if (path.startsWith("/api/")) {
              resd = await this.handleApi(req);
            } else if (path.startsWith("/data/")) {
              resd = await this.handleData(req);
              if (resd == null) {
                resd = await this.handleWeb(req);
              }
            } else {
              resd = await this.handleWeb(req);
            }
            if (resd) {
              res.respondWith(resd);
            } else {
              res.respondWith(await this.handleNotFound(req));
            }
          }
        } catch (e) {
          err(e);
        }
      })();
    }
  }
  // not found
  async handleNotFound(req) { // to override
    const err = new TextEncoder().encode("not found");
    return new Response(err);
  }

  // Web API
  async api(path, req, remoteAddr) { // to override
    return req;
  }

  // for debug
  debug() {
    return false;
  }
  err(e) {
    if (this.debug()) {
      console.log(e);
    }
  }
  log(s) {
    if (this.debug()) {
      console.log(s);
    }
  }
}

export { Server };

/*
if (import.meta.url.endsWith("/Server.js")) {
  const port = parseInt(Deno.args[0]);
  new Server(port);
  console.log(`http://localhost:${port}/`);
}
*/
