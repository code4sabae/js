import { WebSocketClient } from "./WebSocketClient.js";

class Client {
  async connect(path, host, port, secure) {
    this.ws = await new WebSocketClient().connect(path, host, port, secure);
    return this;
  }
  isConnected() {
    return this.ws.isConnected();
  }
  send(json) {
    this.ws.send(json);
  }
  async get() {
    for (;;) {
      const d = await this.ws.get();
      if (d.type === "response") {
        return d.data;
      }
    }
  }
}

export { Client };
