import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";
import { sleep } from "https://js.sabae.cc/sleep.js";

class Browser {
  constructor() {
  }
  async init() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    await this.page.setDefaultNavigationTimeout(0); 
    return this;
  }
  async fetchText(url, options) {
    const res = await this.page.goto(url);
    const html = await res.text();
    if (options.sleepms) {
      console.log("sleep", options.sleepms);
      await sleep(options.sleepms);
    }
    return html;
  }
  async capture(path) {
    await this.page.screenshot({ path });
  }
  async close() {
    await this.browser.close();
  }
}

export { Browser };
