export const create = (tag, parent, text, cls) => {
  const c = document.createElement(tag);
  if (parent) {
    parent.appendChild(c);
  }
  if (text) {
    c.textContent = text;
  }
  if (cls) {
    c.className = cls;
  }
  return c;
};
