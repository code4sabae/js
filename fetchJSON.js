const fetchJSON = async (url, req) => {
  const opt = {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  };
  const res = await (await fetch(url, opt)).json();
  return res;
};

export { fetchJSON };
