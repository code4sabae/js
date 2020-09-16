import { WebSocketClient } from "./WebSocketClient.js";

class ClientSync {
  async connect(path, host, port, secure) {
    this.ws = await new WebSocketClient().connect(path, host, port, secure);
    return this;
  }
  isConnected() {
    return this.ws.isConnected();
  }
  send(json) {
    return this.ws.send(json);
  }
  async get() {
    if (!this.isConnected())
      return null;
    for (;;) {
      const d = await this.ws.get();
      if (d.type === "response" || d.type === "push" || d.type === "message") {
        return d.data;
      }
    }
  }
  async close() {
    await this.ws.close();
  }
}

export { ClientSync };
