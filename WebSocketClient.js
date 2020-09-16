class WebSocketClient {
  async connect(path, host, port, secure) {
    if (host == null) {
      const url = document.location.toString().match(
        /(http(s?)):\/\/([^:^\/]+)(:([0-9]+))\//,
      );
      secure = url[1] == "https";
      host = url[3];
      port = url[5] ? parseInt(url[5]) : 0;
    }
    return new Promise((resolve) => {
      const ws = new WebSocket(
        (secure ? "wss" : "ws") + "://" + host + (port ? ":" + port : "") +
          path,
      );
      ws.onopen = () => {
        this.ws = ws;
        resolve(this);
      };
      const queue = [];
      ws.getSync = async () => {
        if (queue.length > 0) {
          return queue.shift();
        }
        return new Promise((resolve) => {
          ws.onmessage2 = () => {
            resolve(queue.shift());
            ws.onmessage2 = null;
          };
        });
      };
      ws.onmessage = (mes) => {
        queue.push(mes);
        if (ws.onmessage2) {
          ws.onmessage2();
        }
      };
      ws.closeSync = async () => {
        const res = new Promise((resolve2) => {
          ws.onclose2 = () => {
            resolve2();
            ws.onclose2 = null;
          };
        });
        ws.close();
        return res;
      };
      ws.onclose = () => {
        if (ws.onclose2) {
          ws.onclose2();
        }
        this.ws = null;
      };
      ws.onerror = () => {
        this.ws = null;
      };
    });
  }
  isConnected() {
    return this.ws != null;
  }
  send(json) {
    if (this.ws) {
      try {
        this.ws.send(JSON.stringify(json));
        return true;
      } catch (e) {
        //console.log(e);
      }
    }
    return false;
  }
  async get() {
    if (this.ws) {
      const data = await this.ws.getSync();
      return JSON.parse(data.data);
    }
    return null;
  }
  async close() {
    await this.ws.closeSync();
    this.ws = null;
  }
}

export { WebSocketClient };
