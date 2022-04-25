import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";

const Bin = {};

Bin.fetch = async (url) => new Uint8Array(await (await fetch(url)).arrayBuffer());

Bin.toSrc = (bin) => "data:image/*;base64," + Base64.encode(bin);

export { Bin };
