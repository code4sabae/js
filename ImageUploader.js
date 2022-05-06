import { imgutil } from "./imgutil.js";
import { getExtension } from "./getExtension.js";
import { EXIF } from "https://taisukef.github.io/exif-js/EXIF.js";

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
    tf.value = null; // "https://url ...";
    tf.style.position = "relative";
    tf.style.top = "-2.5em";
    tf.style.left = ".5em";
    tf.style.width = "25vw";
    tf.style.fontSize = "80%";
    this.tf = tf;
    this.c = c;
  }
  set value(val) {
    this.tf.value = val;
  }
  get value() {
    return this.tf.value;
  }
  // this.onload (callback)
  async setFile(item, maxwidth, maxsize) {
    //const img = await imgutil.loadResizedImage(file, maxwidth, maxsize);
    const file = item.file;
    const bin = await ImageUtil.readAsArrayBufferAsync(file);
    const exif = EXIF.readFromBinaryFile(bin);
    this.colorSpace = exif.ColorSpace == "sRGB" || imgsrgb.checked ? "srgb" : "display-p3";
    const img0 = await ImageUtil.getImageFromArrayBuffer(bin);
    console.log(img0, colorSpace);
    const img = await ImageUtil.resizeImage(img0, "image/jpeg", maxwidth, this.colorSpace);
    // maxsize?

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
  async setImage(url) {
    const img = new Image();
    img.src = url;
    await imgutil.waitImageLoad(img);
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
    this.value = url;
  }
  async upload(file, img) {
    const isjpg = getExtension(file.name, ".jpg").toLowerCase() === ".jpg";
    const mimeType = isjpg ? "image/jpeg" : "image/png"; // image/webp も?
    const quality = .92;
    const bin = await ImageUtil.getArrayBufferFromImage(img, mimeType, quality, this.colorSpace);

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
