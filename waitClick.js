const waitClick = async (c) => {
  return new Promise(resolve => {
    const f = () => {
      c.removeEventListener("click", f);
      resolve();
    };
    c.addEventListener("click", f);
  });
};

export { waitClick };
