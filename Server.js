import { createApp } from "https://servestjs.org/@v1.1.2/mod.ts";
import { CONTENT_TYPE } from "./CONTENT_TYPE.js";
import { UUID } from "./UUID.js";
import { getExtension } from "./getExtension.js";

class Server {
  constructor(port) {
    const app = createApp();

    app.handle(/\/api\/*/, async (req) => {
      try {
        const json = req.method === "POST" ? await req.json() : null;
        console.log("[req api]", json);
        const res = this.api(req.path, json);
        console.log("[res api]", res);
        await req.respond({
          status: 200,
          headers: new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Accept", // 必要
            "Access-Control-Allow-Methods": "PUT, DELETE, PATCH", // 必要? なくても動いた
          }),
          body: JSON.stringify(res),
        });
      } catch (e) {
        console.log("err", e.stack);
      }
    });

    const getFileNameFromDate = () => {
      const d = new Date();
      const fix0 = (n) => n < 10 ? "0" + n : n;
      const ymd = d.getFullYear() + fix0(d.getMonth() + 1) + fix0(d.getDate());
      return ymd + "/" + UUID.generate();
    };

    app.handle(/\/data\/*/, async (req) => {
      try {
        if (req.method === "POST") {
          const ext = getExtension(req.path, ".jpg");
          const bin = await req.arrayBuffer();
          console.log("[req data]", bin.length);
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
          console.log("[data res]", res);
          await req.respond({
            status: 200,
            headers: new Headers({
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type, Accept", // 必要
              "Access-Control-Allow-Methods": "PUT, DELETE, PATCH", // 必要? なくても動いた
            }),
            body: JSON.stringify(res),
          });
        } else if (req.method === "GET") {
          const fn = req.path;
          if (fn.indexOf("..") >= 0) {
            throw new Error("illegal filename");
          }
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
        }
      } catch (e) {
        console.log("err", e.stack);
      }
    });

    this.socks = [];
    let cnt = 0;
    app.ws("/ws/", async (sock) => {
      sock.id = UUID.generate();
      cnt++;
      this.onopen(sock.id);

      this.socks.push(sock);
      const members = this.socks.map((s) => {
        return { id: s.id };
      });
      sock.send(JSON.stringify({ type: "init", from: sock.id, members }));

      console.log("added", this.socks.length);
      /* // 呼び出されない
      const funcremove = (e) => {
        this.socks = this.socks.filter((a) => a !== e.target);
        console.log("removed", this.socks.length);
      };
      sock.onclose = sock.onerror = funcremove;
      */
      for await (const msg of sock) {
        if (typeof msg === "string") {
          try {
            console.log("ws", msg);
            const req = JSON.parse(msg);
            const res = this.onmessage(sock.id, req);
            if (res) {
              const mesres = { type: "response", from: sock.id, data: res };
              sock.send(JSON.stringify(mesres));
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("err on ws", msg);
          // ws { code: 0, reason: "" } -- close
          // ws { code: 1001, reason: "" } -- 遮断
          break;
        }
      }
      const newsocks = this.socks.filter((s) => s !== sock);
      if (newsocks.length !== this.socks.length) {
        this.socks = newsocks;
        console.log("removed", this.socks.length);
        this.onclose(sock.id);
      }
    });

    app.handle(/\/*/, async (req) => {
      if (req.path.startsWith("/ws/")) {
        return;
      }
      try {
        const fn = req.path === "/" || req.path.indexOf("..") >= 0
          ? "/index.html"
          : req.path;
        const n = fn.lastIndexOf(".");
        const ext = n < 0 ? "html" : fn.substring(n + 1);
        const data = Deno.readFileSync("static" + fn);
        const ctype = CONTENT_TYPE[ext] || "text/plain";
        await req.respond({
          status: 200,
          headers: new Headers({ "Content-Type": ctype }),
          body: data,
        });
      } catch (e) {
        if (req.path !== "/favicon.ico") {
          console.log("err", req.path, e.stack);
        }
      }
    });

    app.listen({ port });

    console.log(`http://localhost:${port}/`);
  }

  push(sockid, data) {
    this.pushRaw({ type: "push", from: sockid, data: data });
  }

  pushRaw(data) {
    console.log(data);
    const sdata = JSON.stringify(data);
    const oksock = [];
    const errsock = [];
    this.socks.forEach((s) => {
      try {
        s.send(JSON.stringify(data));
        oksock.push(s);
      } catch (e) {
        errsock.push(s);
      }
    });
    if (oksock.length !== this.socks.length) {
      this.socks = oksock;
      errsock.forEach((s) => {
        try {
          this.onclose(s.id);
        } catch (e) {
        }
      });
      console.log("removed", this.socks.length);
    }
  }

  send(sockid, data) {
    const sdata = JSON.stringify({ type: "message", from: sockid, data: data });
    const sock = this.socks.find((s) => s.id === sockid);
    if (!sock) {
      return false;
    }
    try {
      sock.send(sdata);
      return true;
    } catch (e) {
      this.socks = this.socks.filter((s) => s !== sock);
      console.log("removed", this.socks.length);
      this.onclose(sock.id);
      return false;
    }
  }

  // Web API
  api(path, req) { // to override
    return req;
  }

  // WebSocket API
  onmessage(sockid, req) { // to override
    this.push(sockid, { type: "push", from: sockid, data: req });
    return null; // reply to sender
  }

  onopen(sockid) { // to override
    this.pushRaw({ type: "open", from: sockid });
  }

  onclose(sockid) { // to override
    this.pushRaw({ type: "close", from: sockid });
  }
}

export { Server };
