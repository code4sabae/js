export const fetchText = async (url) => await (await fetch(url)).text();
