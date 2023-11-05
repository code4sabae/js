export const removeHash = () => {
  history.pushState("", document.title, location.pathname + location.search);
};
