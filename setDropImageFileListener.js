import { setDropFilesListener } from "./setDropFilesListener.js";
import { readAsArrayBufferAsync } from "https://code4sabae.github.io/js/readAsArrayBufferAsync.js";
import { ImageUtil } from "https://code4fukui.github.io/ImageUtil/ImageUtil.js";

export const setDropImageFileListener = (comp, callback) => { // callback(img)
  setDropFilesListener(comp, async (files) => {
    const file = files[0].file;
    const bin = await readAsArrayBufferAsync(file);
    const img = await ImageUtil.getImageFromArrayBuffer(bin);
    callback(img);
  });
};
