export const setDropFilesListener = (comp, callback) => { // callback(files)
  comp.ondrop = comp.ondragover = async (e) => {
    e.preventDefault();
    if (e.type !== "drop") {
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
    if (files.length > 0) callback(files);
  };
};
