export const cr = (tag, parent, cls) => {
  const c = document.createElement(tag);
  if (cls) t.className = cls;
  if (parent) parent.appendChild(c);
  return c;
};
