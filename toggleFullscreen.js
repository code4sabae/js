export const toggleFullscreen = (c) => {
  if (!document.fullscreenElement) {
    c.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
