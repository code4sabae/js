export const bin2s = (bin, n, len) => {
  const b = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    b[i] = bin[i + n];
  }
  return new TextDecoder().decode(b);
};
export const bin2i = (bin, n) => {
  return ((bin[n] & 0xff) << 24) | ((bin[n + 1] & 0xff) << 16) | ((bin[n + 2] & 0xff) << 8) | (bin[n + 3] & 0xff);
};
export const subbin = (bin, n, len) => {
  const b = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    b[i] = bin[i + n];
  }
  return b;
};
export const setbin = (bin, off, b) => {
  for (let i = 0; i < b.length; i++) {
    bin[i + off] = b[i];
  }
  return bin;
};
export const i2bin = (b, off, n) => {
  b[off] = (n >> 24) & 0xff;
  b[off + 1] = (n >> 16) & 0xff;
  b[off + 2] = (n >> 8) & 0xff;
  b[off + 3] = n & 0xff;
};
export const s2bin = (bin, off, s) => {
  setbin(bin, off, new TextEncoder().encode(s));
};
export const bincat = (bin1, bin2) => {
  const bin = new Uint8Array(bin1.length + bin2.length);
  for (let i = 0; i < bin1.length; i++) {
    bin[i] = bin1[i];
  }
  for (let i = 0; i < bin2.length; i++) {
    bin[i + bin1.length] = bin2[i];
  }
  return bin;
};
export const eqbin = (bin1, bin2) => {
  if (bin1 == bin2) {
    return true;
  }
  if (!bin1 || !bin2) {
    return false;
  }
  if (bin1.length != bin2.length) {
    return false;
  }
  for (let i = 0; i < bin1.length; i++) {
    if (bin1[i] != bin2[i]) {
      return false;
    }
  }
  return true;
};
