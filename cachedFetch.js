const escapeURLtoFilename = (url) => {
  return url.replace(/[\?\//:;]/g, "_");
};
const cachedFetch = async (url) => {
  const fn = escapeURLtoFilename(url);
  const dir = "cache/";
  try {
    const txt = await Deno.readTextFile(dir + fn);
    return txt;
  } catch (e) {
  }
  const txt = await (await fetch(url)).text();
  await Deno.writeTextFile(dir + fn, txt);
  return txt;
};
export { cachedFetch };
