import { imgutil } from "./imgutil.js";
import { getExtension } from "./getExtension.js";

class ImageUploader extends HTMLElement {
  constructor(uploadurl) {
    super();
    this.uploadurl = uploadurl || "/data/";
    this.style.display = "inline-block";

    const cr = (tag) => document.createElement(tag);
    const c = cr("div");
    this.appendChild(c);

    c.style.display = "grid"; // inline-block";
    c.style.placeItems = "center";
    c.style.width = "30vw";
    c.style.height = "30vw";
    c.style.margin = ".2vw";
    c.style.border = "1px solid gray";
    c.style.padding = "5px";
    const tf = document.createElement("input");
    tf.type = "text";
    this.appendChild(tf);
    tf.value = "https://url ...";
    tf.style.position = "relative";
    tf.style.top = "-2.5em";
    tf.style.left = ".5em";
    tf.style.width = "25vw";
    tf.style.fontSize = "80%";
    this.tf = tf;
    this.c = c;
  }
  get value() {
    return this.tf.value;
  }
  // this.onload (callback)
  async setFile(file, maxwidth, maxsize) {
    const img = await imgutil.loadResizedImage(file, maxwidth, maxsize);
    img.orgwidth = img.width; // img.width が変わってしまうので保存 getArrayBufferFromImageで使う
    img.orgheight = img.height;
    this.c.appendChild(img);
    const iw = 28;
    if (img.width > img.height) {
      img.style.width = iw + "vw";
      img.style.height = (iw / img.width * img.height) + "vw";
    } else {
      img.style.height = iw + "vw";
      img.style.width = (iw / img.height * img.width) + "vw";
    }
    img.style.display = "block";
    this.upload(file, img).then((url) => {
      if (this.onload) {
        this.onload(url);
      }
    });
  }
  async upload(file, img) {
    console.log(file.name);
    const isjpg = getExtension(file.name, ".jpg").toLowerCase() === ".jpg";
    const mimeType = isjpg ? "image/jpeg" : "image/png"; // image/webp も?
    const quality = .9;
    const bin = await imgutil.getArrayBufferFromImage(img, mimeType, quality);
    // console.log(bin);

    //const img2 = await imgutil.getImageFromArrayBuffer(bin);
    //this.appendChild(img2);
    const url = this.uploadurl + file.name;
    const res = await fetch(url, { method: "POST", body: bin });
    const json = await res.json();
    this.tf.value = this.uploadurl + json.name;
    return this.tf.value;
  }
}
customElements.define("img-uploader", ImageUploader);

export { ImageUploader };
