const ECDH = {};

//const NAMED_CURVE = "P-521";
const NAMED_CURVE = "P-384";

ECDH.generateKeyPair = async () => {
  const canexport = true;
  return await window.crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: NAMED_CURVE },
    canexport,
    ["deriveKey"]
  );
};

ECDH.getPublicKey = async (keypair) => {
  const exported = await window.crypto.subtle.exportKey("raw", keypair.publicKey);
  return new Uint8Array(exported);
};

ECDH.getPrivateKey = async (keypair) => {
  return await window.crypto.subtle.exportKey("jwk", keypair.privateKey);
};

ECDH.importKeyPair = async (pubkey, prikey) => {
  const canexport = false;
  try {
    const publicKey = await window.crypto.subtle.importKey(
      "raw",
      pubkey,
      { name: "ECDH", namedCurve: NAMED_CURVE },
      canexport,
      []
    );
    const privateKey = await window.crypto.subtle.importKey(
      "jwk",
      prikey,
      { name: "ECDH", namedCurve: NAMED_CURVE },
      canexport,
      ["deriveKey"]
    );
    return { publicKey, privateKey };
  } catch (e) {
    console.log(e);
    return null;
  }
};

ECDH.deriveSecretKey = async (keypair, publicKey) => {
  const canexport = true;
  const importedKey = await window.crypto.subtle.importKey(
    "raw",
    publicKey,
    { name: "ECDH", namedCurve: NAMED_CURVE },
    canexport,
    []
  );

  return await window.crypto.subtle.deriveKey(
    { name: "ECDH", public: importedKey },
    keypair.privateKey,
    { name: "AES-GCM", length: 256 },
    canexport,
    ["encrypt", "decrypt"]
  );
};

ECDH.exportSecretKey = async (key) => {
  const exported = await window.crypto.subtle.exportKey("raw", key);
  return new Uint8Array(exported);
};

ECDH.importSecretKey = async (key) => {
  const canexport = true;
  return await window.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-GCM", length: 256 },
    canexport,
    ["encrypt", "decrypt"]
  );
};

ECDH.encrypt = async (secretKey, plaintext) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertextabuf = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, secretKey, plaintext);
  const ciphertext = new Uint8Array(ciphertextabuf);
  return { iv, ciphertext };
};

ECDH.encryptText = async (secretKey, plaintexts) => {
  return await ECDH.encrypt(secretKey, new TextEncoder().encode(plaintexts));
};

ECDH.decrypt = async (secretKey, iv, ciphertext) => {
  const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, secretKey, ciphertext);
  return decrypted;
};

ECDH.decryptText = async (secretKey, iv, ciphertext) => {
  try {
    return new TextDecoder().decode(await ECDH.decrypt(secretKey, iv, ciphertext));
  } catch (e) {
    return "error!! " + e;
  }
};

export { ECDH };
