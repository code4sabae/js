const ECDH = {};

ECDH.generateKeyPair = async () => {
  return await window.crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-384" }, false, ["deriveKey"]);
};

ECDH.getPublicKey = async (keypair) => {
  const exported = await window.crypto.subtle.exportKey("raw", keypair.publicKey);
  const exportedKeyBuffer = new Uint8Array(exported);
  return exportedKeyBuffer;
};

ECDH.deriveSecretKey = async (keypair, publicKey) => {
  const importedKey = await window.crypto.subtle.importKey(
    "raw",
    publicKey,
    { name: "ECDH", namedCurve: "P-384" },
    false,
    []
  );

  return await window.crypto.subtle.deriveKey(
    { name: "ECDH", public: importedKey },
    keypair.privateKey,
    { name: "AES-GCM", length: 256 },
    false,
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
  return new TextDecoder().decode(await ECDH.decrypt(secretKey, iv, ciphertext));
};

export { ECDH };
