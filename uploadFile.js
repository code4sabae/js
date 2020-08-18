import { imgutil } from "./imgutil.js";
import { parseSize } from "./parseSize.js";

const uploadFile = async (uploadurl, file, maxsize) => {
  const bin = await imgutil.getArrayBufferFromBlob(file);
  if (maxsize && bin.length > parseSize(maxsize)) {
    return null;
  }
  const url = uploadurl + file.name;
  console.log(url);
  const res = await fetch(url, { method: "POST", body: bin });
  const json = await res.json();
  return uploadurl + json.name;
}

export { uploadFile };
