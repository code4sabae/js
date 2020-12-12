const getPath = (url) => url.substring(url.lastIndexOf("/") + 1);

const fetchViaCurl = async (url) => {
  const path = getPath(url);
  await Deno.mkdir("data", { recursive: true });
  const p = Deno.run({ cmd: ["curl", "-o", "data/" + path, "-L", url ], stdout: "piped" });
  const out = await p.output();
  p.close();
};

const fetchTextViaCurl = async (url) => {
  await fetchViaCurl(url);
  const path = getPath(url);
  return await Deno.readTextFile("data/" + path);
};

export { fetchViaCurl, fetchTextViaCurl };
