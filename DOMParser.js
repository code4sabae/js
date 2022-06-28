import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { DOMParser as XMLDOMParser } from "https://code4fukui.github.io/xmldom-es/xmldom.js";

export class DOMParser {
  parseFromString(txt, mime) {
    if (!mime) {
      throw new Error("2 arguments required, but only 1 present.");
    }
    if (mime == "text/html") {
      return HTMLParser.parse(txt);
    } else if (mime == "text/xml" || mime == "application/xml") {
      return new XMLDOMParser().parseFromString(txt, mime);
    }
    throw new Error("The provided value '" + mime + "' is not a valid enum value of type SupportedType.");
  }
}
