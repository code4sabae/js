const getPath = (url) => url.substring(url.lastIndexOf("/") + 1);

const fetchCurl = async (url) => {
  const path = getPath(url);
  await Deno.mkdir("temp", { recursive: true });
  const p = Deno.run({ cmd: ["curl", "-o", "temp/" + path, "-L", url ], stdout: "piped" });
  const out = await p.output();
  p.close();
  const bin = await Deno.readFile("temp/" + path);
  await Deno.remove("temp/" + path);
  return bin;
};

const fetchTextCurl = async (url) => {
  const bin = await fetchCurl(url);
  return new TextDecoder().decode(bin);
};

export { fetchCurl, fetchTextCurl };
