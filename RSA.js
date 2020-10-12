// Javascriptで公開鍵ペア生成・暗号化/復号をしてみた - Qiita
// https://qiita.com/poruruba/items/272bdc8f539728d5b076

import { NodeRSA, Buffer } from "./NodeRSA.js";

const RSA = {};

RSA.generateKeyPair = (bits) => {
  const key = new NodeRSA({b: bits});
  const pri = key.exportKey('pkcs1-private-der');
  const pub = key.exportKey('pkcs1-public-der');
  return { public: pub, private: pri };
};
RSA.pem2der = (scheme, pem) => {
  const rsa = new NodeRSA(pem, scheme + '-pem');
  return rsa.exportKey(scheme + '-der');
};
RSA.der2pem = (scheme, key) => {
  const der = Buffer.from(key);
  const rsa = new NodeRSA(der, scheme + '-der');
  return rsa.exportKey(scheme + '-pem');
};
RSA.der2der = (key, src_scheme, dest_scheme) => {
  const der = Buffer.from(key);
  const rsa = new NodeRSA(der, src_scheme + '-der');
  return rsa.exportKey(dest_scheme+ '-der');
};
RSA.publicEncrypt = (key, buffer) => {
  const input = Buffer.from(buffer);
  const der = Buffer.from(key);
  const rsa = new NodeRSA(der, 'pkcs1-public-der', { encryptionScheme : 'pkcs1_oaep' });
  const enc = rsa.encrypt(input);
  return enc;
};
RSA.privateDecrypt = (key, buffer) => {
  const input = Buffer.from(buffer);
  const der = Buffer.from(key);
  const rsa = new NodeRSA(der, 'pkcs1-private-der', { encryptionScheme : 'pkcs1_oaep' });
  const dec = rsa.decrypt(input);
  return dec;
};

const b2s = (bin) => {
  const s = [];
  for (const b of bin) {
    const n = b.toString(16);
    s.push(n.length == 1 ? "0" + n : n);
  }
  return s.join("");
};
const s2b = (s) => {
  const bin = new Uint8Array(s.length / 2);
  for (let i = 0; i < s.length; i += 2) {
    bin[i / 2] = parseInt(s.substring(i, i + 2), 16);
  }
  return bin;
};

RSA.sign = (key, buffer) => {
  const input = Buffer.from(buffer);
  const der = Buffer.from(key);
  const rsa = new NodeRSA(der, 'pkcs1-private-der');
  const sig = rsa.sign(input);
  return b2s(sig);
};
RSA.verify = (key, buffer, signature) => {
  const input = Buffer.from(buffer);
  const der = Buffer.from(key);
  const sig = Buffer.from(s2b(signature));
  const rsa = new NodeRSA(der, 'pkcs1-public-der');
  const result = rsa.verify(input, sig);
  return result;
};

export { RSA };
