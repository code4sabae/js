const getExtension = (fn, def) => {
  const n = fn.lastIndexOf(".");
  const m = fn.lastIndexOf("/");
  if (n < 0 || n < m) {
    return def;
  }
  return fn.substring(n);
}

export { getExtension };
