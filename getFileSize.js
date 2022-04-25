export const getFileSize = async (fn) => {
  const file = await Deno.stat(fn);
  if (file.isFile) {
    //console.log("Last modified:", file.mtime?.toLocaleString());
    //console.log("File size in bytes:", file.size);
    return file.size;
  }
  return 0;
};

export const getFileSizeKB = async (fn) => {
  const b = await getFileSize(fn);
  return (b / 1024).toFixed(1) + "kb";
};
