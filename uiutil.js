import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";

export const waitMouseDown = async (c) => new Promise((resolve) => {
  c.onmousedown = (e) => {
    //console.log(e);
    c.onmousedown = undefined;
    resolve({ x: e.offsetX, y: e.offsetY });
  };
});
export const waitMouseDownOrMove = async (c) => new Promise((resolve) => {
  c.onmousedown = (e) => {
    //console.log(e);
    c.onmousedown = undefined;
    resolve({ x: e.offsetX, y: e.offsetY, down: true });
  };
  c.onmousemove = (e) => {
    //console.log(e);
    c.onmousemove = undefined;
    resolve({ x: e.offsetX, y: e.offsetY, down: false });
  };
});
export const waitMouseDownOrButton = async (c, btn) => new Promise((resolve) => {
  c.onmousedown = (e) => {
    //console.log(e);
    c.onmousedown = undefined;
    resolve({ x: e.offsetX, y: e.offsetY, button: false });
  };
  btn.onclick = (e) => {
    btn.onclick = undefined;
    resolve({ button: true });
  };
});
export const encodeJPG = (imgdata) => {
  const canvas = document.createElement("canvas");
  canvas.width = imgdata.width;
  canvas.height = imgdata.height;
  const g = canvas.getContext("2d");
  g.putImageData(imgdata, 0, 0);
  const s = canvas.toDataURL("image/jpeg");
  return Base64.decode(s.substring(s.indexOf(",") + 1));
};
export const drawLine = (g, x1, y1, x2, y2) => {
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.stroke();
};
export const drawGrid = (g, x, y, w, h, ngw, ngh) => {
  for (let i = 0; i <= ngh; i++) {
    const y1 = y + h / ngh * i;
    for (let j = 0; j <= ngw; j++) {
      const x1 = x + w / ngw * j;
      drawLine(g, x, y1, x + w, y1);
      drawLine(g, x1, y, x1, y + h);
    }
  }
};
