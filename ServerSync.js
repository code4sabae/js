import { Server } from "./Server.js";

class WebSocketServer {
  constructor(server, sockid) {
    this.server = server;
    this.sockid = sockid;
    this.resolvefunc = null;
  }
  async get() {
    return new Promise((resolve) => {
      this.resolvefunc = resolve;
    });
  }
  send(json) {
    this.server.send(this.sockid, json);
  }
  close() {
    this.server.close(this.sockid);
  }
}
class ServerSync extends Server {
  constructor(port, callback) {
    super(port);
    this.callback = callback;
    this.wss = {};
  }
  async onopen(sockid) {
    const ws = new WebSocketServer(this, sockid);
    this.wss[sockid] = ws;
    await this.callback(ws);
    ws.close();
  }
  onclose(sockid) {
    delete this.wss[sockid];
  }
  onmessage(sockid, req) {
    const ws = this.wss[sockid];
    if (ws) {
      if (ws.resolvefunc) {
        ws.resolvefunc(req);
      }
    }
    return null; // { reply: "ok", req };
  }
}

export { ServerSync };
