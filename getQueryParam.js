const getQueryParam = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const res = regex.exec(location.search);
  return res ? decodeURIComponent(res[1].replace(/\+/g, " ")) : "";
};

export { getQueryParam };
