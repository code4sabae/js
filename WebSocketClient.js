class WebSocketClient {
  async connect(path, host, port, secure) {
    if (host == null) {
      const url = document.location.toString().match(/(http(s?)):\/\/([^:^\/]+)(:([0-9]+))\//);
      secure = url[1] == "https";
      host = url[3];
      port = url[5] ? parseInt(url[5]) : 0;
    }
    return new Promise((resolve) => {
      const ws = new WebSocket((secure ? "wss" : "ws") + "://" + host + (port ? ":" + port : "") + path);
      ws.onopen = () => {
        this.ws = ws;
        resolve(this);
      };
      const queue = [];
      ws.getSync = async () => {
        return new Promise((resolve) => {
          ws.onmessage2 = () => {
            resolve(queue.shift());
          };
        });
      };
      ws.onmessage = (mes) => {
        queue.push(mes);
        ws.onmessage2();
      };
    })
  }
  isConnected() {
    return this.ws != null;
  }
  send(json) {
    this.ws.send(JSON.stringify(json));
  }
  async get() {
    const data = await this.ws.getSync();
    return JSON.parse(data.data);
  }
}

export { WebSocketClient };
