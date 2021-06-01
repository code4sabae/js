const getHash = () => {
  const hash = document.location.hash;
  if (!hash && hash.length == 0) {
    return null;
  }
  return decodeURIComponent(hash.substring(1));
};

export { getHash };
