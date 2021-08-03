const fetchPOST = async (url, param) => {
  const method = "POST";
  const body = Object.keys(param).map((s) => s + "=" + encodeURIComponent(param[s])).join("&");
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };
  return await (await fetch(url, { method, headers, body })).json();
};


export { fetchPOST };
