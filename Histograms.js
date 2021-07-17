import { Histogram } from "./Histogram.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

class Histograms {
  constructor() {
    this.sets = {};
  }
  add(grp, name) {
    if (!this.sets[grp]) {
      this.sets[grp] = new Histogram();
    }
    this.sets[grp].add(name);
  }
  toString() {
    const s = [];
    for (const grp  in this.sets) {
      const set = this.sets[grp];
      s.push(grp);
      s.push(set.toString());
    }
    return s.join("\n");
  }
  async saveAsCSV(prefix) {
    for (const grp  in this.sets) {
      const set = this.sets[grp];
      const s = set.toArray();
      await Deno.writeTextFile(prefix + grp + ".csv", CSV.encode(s));
    }
  }
}

export { Histograms };
