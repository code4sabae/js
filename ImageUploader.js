import imgutil from "./imgutil.js";

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
    this.upload(img);
  }
  async upload(img) {
    const bin = await imgutil.getArrayBufferFromImage(img);
    // console.log(bin);

    //const img2 = await imgutil.getImageFromArrayBuffer(bin);
    //this.appendChild(img2);
    const res =
      await (await fetch(this.uploadurl, { method: "POST", body: bin })).json();
    this.tf.value = this.uploadurl + res.name;
  }
}
customElements.define("img-uploader", ImageUploader);

export { ImageUploader };
