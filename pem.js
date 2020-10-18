const pem = {};

pem.fromBin = (bin) => {
  const s = [];
  s.push("-----BEGIN CERTIFICATE REQUEST-----");
  console.log(bin.length);
  const maxlen = 48;
  for (let i = 0; i < bin.length; i += maxlen) {
    const len = Math.min(maxlen, bin.length - i);
    let b = "";
    for (let j = 0; j < len; j++) {
      b += String.fromCharCode(bin[i + j]);
    }
    /* // NG
    const b = new Uint8Array(len);
    for (let j = 0; j < len; j++) {
      b[j] = bin[i + j];
    }
    */
    s.push(btoa(b));
  }
  s.push("-----END CERTIFICATE REQUEST-----");
  console.log(s);
  return s.join("\n");
};
pem.toBin = (pem) => {
  const ss = pem.split("\n");
  const bin = new Uint8Array(pem.length);
  let n = 0;
  let flg = 0;
  for (const s of ss) {
    if (flg === 0) {
      if (!s.startsWith("-")) {
        flg++;
      } else {
        continue;
      }
    } else if (flg === 1) {
      if (s.startsWith("-")) {
        break;
      }
    }
    const b = atob(s);
    console.log(b.length);
    for (const c of b) {
      bin[n++] = c.charCodeAt(0);
    }
  }
  const res = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = bin[i];
  }
  return res;
};

/*

const binEquals = (b1, b2) => {
  if (b1 === b2) {
    return true;
  }
  if (!b1 || !b2) {
    return false;
  }
  if (b1.length != b2.length) {
    return false;
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] !== b2[i]) {
      return false;
    }
  }
  return true;
};

const pemX = `-----BEGIN CERTIFICATE REQUEST-----
MIICXTCCAUUCAQAwGDEWMBQGA1UEAwwNaGkgd2lraXBlZGlhITCCASIwDQYJKoZI
-`;
const pem = `-----BEGIN CERTIFICATE REQUEST-----
MIICXTCCAUUCAQAwGDEWMBQGA1UEAwwNaGkgd2lraXBlZGlhITCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMTwzCYD+iLlDwTu5Y43aQH9q1LF3kgot8I4
9ZgbFhDmCE4YlLhZKO4hieK6z8z+IfZjfapn01rzuzvTHESj5bSSU6AcEsKSOgTQ
uB+KKn4mgngyBrJwWjr4IZ9XkGsCLAP2/wkyJC2ire6FuTSQ00YGhKf1B3WbIBbn
5i1rvZXnYxlheWlNSmxx54q4gTwcd/V4nS4BThYA/ypATjHS/gfQ650cOQzRK/Jh
WfAbfnETYUpD6MCgZAIbaBuYvYpQEGqQ4niTvtSd07RHKnewcPFqJhMV86qN4HQY
4ZBNzQcF/2aCGHYyRniKznSDNijT2kaAz/L7ORqh+90qH/BLnKsCAwEAAaAAMA0G
CSqGSIb3DQEBCwUAA4IBAQAqV5g9AZGXEbM97ouTGDJqFNP2QjO9ZK9J3BOUTrFO
tMUrVWj+ixhC6vXD3o5uVL/fg6OlmK+13gsBpzg2mq72TBrZsNOK4+O0XvltIvSx
0H5tf1NYwuHxFgHDqgs/fQBOKFTadebJZHbPBtMrqlnenKYJiVb5YSWBZ7JKRCK7
VSgwNxxAMnSCNI0xF3EjZ1bjQkM8xGhnwe+n/RAd5Q2pMLIrquMoGMTUYLOq1xSB
sGTp8iLWbbWPl6gC1hcSMpFsbdyjMCWs+a2R2F8QnahrRfvpgFEndvzA2EvqHIoR
BHE1ChD7l691PxZP1eKA1I4AzZno5sb6SWyd8+pqY0oG
-----END CERTIFICATE REQUEST-----`;

const bin = pem2bin(pem);
const pem2 = bin2pem(bin);
const bin2 = pem2bin(pem2);
console.log(binEquals(bin, bin2), bin, bin2);
*/

export { pem };
