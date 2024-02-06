const imgcache = {};

export const fetchImage = async (url) => {
  const img = imgcache[url];
  if (img) {
    return img;
  }
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        imgcache[url] = img;
        resolve(img);
      };
      img.onerror = () => reject();
      img.src = url;
  });
};
