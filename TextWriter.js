export class TextWriter {
  constructor(w) {
    this.w = w;
    this.enc = new TextEncoder();
  }
  writeString(s) {
    this.w.write(this.enc.encode(s));
  }
}
