class Histogram {
  constructor() {
    this.data = {};
  }
  add(name) {
    if (this.data[name] === undefined) {
      this.data[name] = 1;
    } else {
      this.data[name]++;
    }
  }
  toString() {
    const ar = Object.keys(this.data).map(k => [k, this.data[k]]);
    ar.sort((a, b) => b[1] - a[1]);
    return ar.map(a => a[0] + ": " + a[1]).join("\n");
  }
  toArray() {
    const ar = Object.keys(this.data).map(k => [k, this.data[k]]);
    ar.sort((a, b) => b[1] - a[1]);
    return [["name", "count"], ...ar];
  }
}

export { Histogram };
