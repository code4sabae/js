export const encodeHTML = (s) => {
  s = s.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/\n/g, "<br>");
  return s;
};
