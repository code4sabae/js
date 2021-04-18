import { createFullElement } from "./createFullElement.js";

const createFullCanvas = () => {
  const c = createFullElement('canvas');
  c.g = c.getContext('2d');
  const fitSize = function () {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    if (c.bkw !== w || c.bkh !== h) {
      const ratio = window.devicePixelRatio || 1;
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      c.width = w * ratio >> 0;
      c.height = h * ratio >> 0;
      c.ratio = ratio;
      c.bkw = w;
      c.bkh = h;
    }
  }
  fitSize();
  c.redraw = function () {
    fitSize();
    if (this.draw) {
		this.draw(this.g, this.width, this.height);
	}
  }
  window.onresize = () => c.redraw();
  return c;
};
export { createFullCanvas };
