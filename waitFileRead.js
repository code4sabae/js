import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";

export const waitFileRead = async (f) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = (e) => {
			reject(e);
		};
		reader.onload = (e) => {
      const src = e.target.result;
      const n = src.indexOf("base64,");
      const s = src.substring(n + "base64,".length);
      const bin = Base64.decode(s);
			resolve(bin);
		};
		reader.readAsDataURL(f);
	});
};
