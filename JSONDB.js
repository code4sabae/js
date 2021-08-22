class JSONDB {
  constructor(fn) {
    this.fn = fn;
    this.data = [];
    this.read();
  }
  read() {
    try {
      this.data = JSON.parse(Deno.readTextFileSync(this.fn));
    } catch (e) {
    }
  }
  write() {
    Deno.writeTextFileSync(this.fn, JSON.stringify(this.data, null, 2));
  }
}

export { JSONDB };
