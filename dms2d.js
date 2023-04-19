export const dms2d = (d, m, s) => {
  const p = (s) => parseFloat(s);
  return p(d) + p(m) / 60 + p(s) / (60 * 60);
};
