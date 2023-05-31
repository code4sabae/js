export const getRandomValue = (ar) => {
  if (globalThis.crypto && crypto.getRandamValue) {
    crypto.getRandamValue(ar);
  } else {
    for (let i = 0; i < ar.length; i++) {
    ar[i] = (Math.random() * 256) >> 0;
    }
  }
};
