const dig = async (path, files) => {
  for await (const f of Deno.readDir(path)) {
    //console.log(f);
    if (f.isDirectory) {
      await dig(path + "/" + f.name, files);
    } else {
      files.push(path + "/" + f.name);
    }
  }
};

export const dir2array = async (path) => {
  if (path.endsWith("/")) {
    path.substring(0, path.length - 1);
  }
  const res = [];
  await dig(path, res);
  return res.map(fn => fn.substring(path.length + 1));//.sort();
};

/*
if (import.meta.url.endsWith("/dir2array.js")) {
  const ext = Deno.args[0] || "";
  const list = (await dir2array(".")).filter(f => f.endsWith("." + ext));
  console.log(JSON.stringify(list, null, 2));
}
*/
