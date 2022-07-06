import { SJIS } from "./SJIS.js";

export class TextDecoderSJIS {
  decode(bin) {
    return SJIS.decode(bin);
  }
}
