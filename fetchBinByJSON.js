export const fetchBinByJSON = async (url, req) => {
  const opt = req ? {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Accept": "audio/wav",
    },
    body: JSON.stringify(req),
  } : null;
  const res = new Uint8Array(await (await fetch(url, opt)).arrayBuffer());
  return res;
};
