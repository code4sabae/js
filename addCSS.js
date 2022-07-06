export const addCSS = (css) => {
  const getStyle = () => {
    if (!document.styleSheets.length) {
      const style = document.createElement("style");
      document.head.appendChild(style);
    }
    return document.styleSheets[0];
  };
  const style = getStyle();
  style.insertRule(css);
};
