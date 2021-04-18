import { createFullCanvas } from "./createFullCanvas.js";
import { extendGraphics } from "./extendGraphics.js";
import { extendUI } from "./extendUI.js";

const createEgCanvas = () => {
    const c = createFullCanvas();
    extendGraphics(c.g);
    extendUI(c);
    return c;
}

export { createEgCanvas };
