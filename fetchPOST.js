const fetchRawPOST = async (url, param) => {
  const method = "POST";
  const body = Object.keys(param).map((s) => s + "=" + encodeURIComponent(param[s])).join("&");
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };
  return await fetch(url, { method, headers, body });
};

const fetchPOST = async (url, param) => {
  return await (await fetchRawPOST(url, param)).json();
}

const fetchBinPOST = async (url, param) => {
  return new Uint8Array(await (await fetchRawPOST(url, param)).arrayBuffer());
}

export { fetchPOST, fetchBinPOST, fetchRawPOST };
