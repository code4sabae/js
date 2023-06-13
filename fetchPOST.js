export const fetchRawPOST = async (url, param) => {
  const method = "POST";
  const ss = [];
  const keys = Object.keys(param);
  for (const key of keys) {
    const v = param[key];
    if (Array.isArray(v)) {
      for (const d of v) {
        ss.push(encodeURIComponent(key + "[]") + "=" + encodeURIComponent(d.toString()));
      }
    } else {
      ss.push(encodeURIComponent(key) + "=" + encodeURIComponent(v.toString()));
    }
  }
  const body = ss.join("&");
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  };
  return await fetch(url, { method, headers, body });
};

export const fetchPOST = async (url, param) => {
  return await (await fetchRawPOST(url, param)).json();
};

export const fetchBinPOST = async (url, param) => {
  return new Uint8Array(await (await fetchRawPOST(url, param)).arrayBuffer());
};
