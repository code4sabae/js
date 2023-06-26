export const waitClick = (comp) => {
  comp ||= document.body;
  if (!Array.isArray(comp)) {
    return new Promise((resolve) => {
      comp.style.cursor = "pointer";
      const f = (e) => {
        comp.removeEventListener("click", f);
        comp.style.cursor = "";
        resolve(e);
      };
      comp.addEventListener("click", f);
    });
  } else {
    return new Promise((resolve) => {
      for (const c of comp) {
        c.style.cursor = "pointer";
        const f = () => {
          let idx = 0;
          let res = 0;
          for (const c2 of comp) {
            c2.removeEventListener("click", f);
            c2.style.cursor = "";
            if (c == c2) {
              res = idx;
            }
            idx++;
          }
          resolve(res);
        };
        c.addEventListener("click", f);
      }
    });
  }
};
