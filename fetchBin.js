const fetchBin = async (url) => new Uint8Array(await (await fetch(url)).arrayBuffer());

export { fetchBin };
