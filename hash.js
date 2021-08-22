import { SHA256 } from "https://taisukef.github.io/sha256-es/SHA256.js";
import { hex } from "https://code4sabae.github.io/js/hex.js";

export const hash = (s) => hex.fromBin(SHA256.digest(new TextEncoder().encode(s)));
