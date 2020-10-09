const toHalf = (s) => {
  const ZEN = "０１２３４５６７８９（）／";
  const HAN = "0123456789()/";
  let s2 = "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    const n = ZEN.indexOf(c);
    if (n >= 0) {
      s2 += HAN.charAt(n);
    } else {
      s2 += c;
    }
  }
  return s2;
};

export { toHalf };
