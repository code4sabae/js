export const assert = (b, mes) => {
  if (!b) {
    alert(mes);
    throw new Error(mes);
  }
};
