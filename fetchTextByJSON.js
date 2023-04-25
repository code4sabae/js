export const fetchTextByJSON = async (url, req, method = "GET") => {
  const opt = req ? {
    method: method == "GET" ? "POST" : method,
    mode: "cors",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  } : { method };
  //const res = await (await fetch(url, opt)).json();
  const res = await (await fetch(url, opt)).text();
  return res;
};
