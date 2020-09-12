import { Server } from "./Server.js";

let resolvefunc = null;

class WebSocketServer {
  constructor(server, sockid) {
    this.server = server;
    this.sockid = sockid;
  }
  async get() {
    return new Promise(resolve => {
      resolvefunc = resolve;
    });
  }
  send(json) {
    this.server.push(this.sockid, json);
  }
}
class ServerSync extends Server {
  constructor(port, callback) {
    super(port);
    this.callback = callback;
  }
  onopen(sockid) {
    this.callback(new WebSocketServer(this, sockid));
  }
  onmessage(sockid, req) {
    if (resolvefunc) {
      resolvefunc(req);
    }
    return null; // { reply: "ok", req };
  }
}

export { ServerSync };
