const downloadTextFile = async (file) => { // name, data (now only string)
  const link = document.createElement("a");
  const dataurl = URL.createObjectURL(new Blob([file.data], { type: "text/plain" }));
  link.href = dataurl;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
export { downloadTextFile };

