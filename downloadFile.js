const downloadFile = (name, uint8arry) => {
  const link = document.createElement("a");
  const dataurl = URL.createObjectURL(new Blob([uint8arry])); // , { type: "text/plain" }));
  link.href = dataurl;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export { downloadFile };

