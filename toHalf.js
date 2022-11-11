export const toHalf = s => {
  if (s === null || s === undefined) {
    return s
  }
  const ZEN = "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝〜”“‘’";
  const HAN = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\"\"''";
  let s2 = "";
  for (const c of s) {
    const n = ZEN.indexOf(c);
    if (n >= 0) {
      s2 += HAN.charAt(n);
    } else {
      s2 += c;
    }
  }
  return s2;
};
