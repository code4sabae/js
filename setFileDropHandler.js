const readAsArrayBuffer = async (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
          const bin = e.target.result;
          resolve(bin);
      };
      reader.onerror = reader.onabort = (e) => {
          reject(e);
      };
      reader.readAsArrayBuffer(file);
  });
};

const dropHandler = (e, dropFileHandler) => {
  e.preventDefault();
  if (e.type != "drop") {
    return;
  }
  const files = [];
  const ditems = e.dataTransfer.items;
  for (let i = 0; i < ditems.length; i++) {
    const item = ditems[i];
    if (item.kind !== "file") {
        continue;
    }
    const file = item.getAsFile();
    files.push({ type: item.type, file });
  }
  const file = files[0];
  readAsArrayBuffer(file.file).then(data => dropFileHandler(data));
};

export const setFileDropHandler = (div, handler) => {
  div.ondrop = div.ondragover = (e) => dropHandler(e, handler);
};
