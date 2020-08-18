import { ImageUploader } from "./ImageUploader.js";
import { uploadFile } from "./uploadFile.js";

class InputFile extends HTMLElement {
  constructor() {
    super();

    const uploadurl = this.getAttribute("uploadurl");
    const maxwidth = this.getAttribute("maxwidth");
    const maxsize = this.getAttribute("maxsize");
    const name = this.getAttribute("name");
    const accept = this.getAttribute("accept");
    const multiple = this.getAttribute("multiple") != null;
    //console.log(uploadurl, maxwidth, maxsize);

    const inp = document.createElement("input");
    this.appendChild(inp);
    inp.type = "file";
    inp.accept = accept;
    if (multiple) {
      inp.multiple = true;
    }

    const inp2 = document.createElement("input");
    this.appendChild(inp2);
    inp2.type = "hidden";
    inp2.name = name;

    const imgc = document.createElement("div");
    this.imgc = imgc;
    this.appendChild(imgc);
    inp.onchange = async (e) => {
      if (!multiple) {
        while (this.imgc.firstElementChild) {
          this.imgc.removeChild(this.imgc.firstElementChild);
        }
      }
      const update = (url) => {
        console.log("update", url);
        inp2.value = this.value;
      };
      for (const file of e.target.files) {
        const type = file.type;
        if (type.startsWith("image/")) {
          const imgup = new ImageUploader(uploadurl);
          imgup.onload = update;
          imgup.setFile(file, maxwidth, maxsize);
          imgc.appendChild(imgup);
        } else {
          console.log("file");
          const inpurl = document.createElement("input");
          imgc.appendChild(inpurl);
          uploadFile(uploadurl, file, maxsize).then((url) => {
            inpurl.value = url;
            update(url);
          });
        }
        if (!multiple) {
          break;
        }
      }
    };
  }

  get value() {
    const urls = [];
    for (let i = 0; i < this.imgc.children.length; i++) {
      urls.push(this.imgc.children[i].value);
    }
    return urls.join(",");
  }
}
customElements.define("input-file", InputFile);

export { InputFile };
