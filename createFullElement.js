const createFullElement = (tag) => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  const c = document.createElement(tag);
  document.body.style.overflow = 'hidden';
  c.style.margin = '0';
  c.style.padding = '0';
  c.style.width = '100vw';
  c.style.height = '100vh';
  document.body.appendChild(c);
  return c;
};
export { createFullElement };
