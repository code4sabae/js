const hex2bytes = (s) => {
  const len = s.length / 2;
  const bytes = new Uint8Array(len);
  const res = [];
  for (let i = 0; i < len; i++) {
    bytes[i] = parseInt(s.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
};

export { hex2bytes };
