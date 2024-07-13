const fetchBin = async (url, opt) => new Uint8Array(await (await fetch(url, opt)).arrayBuffer());

export { fetchBin };
