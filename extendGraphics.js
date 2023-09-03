import { hsl2rgb } from "./hsl2rgb.js";

const extendGraphics = function (g) {
  g.setColor = function (r, g, b, a) {
    if (typeof r === 'string') {
      this.fillStyle = r;
      this.strokeStyle = r;
      return;
    }
    if (Array.isArray(r)) {
      a = r[3];
      b = r[2];
      g = r[1];
      r = r[0];
    }
    if (a == null) {
    a = 1;
  }
    const c = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    this.fillStyle = c;
    this.strokeStyle = c;
  };
  g.setColorHSL = function (h, s, l, a) {
    const c = hsl2rgb(h, s, l);
    this.setColor(c[0], c[1], c[2], a);
  };
  g.drawLine = function (x1, y1, x2, y2) {
    this.beginPath()
    this.moveTo(x1, y1)
    this.lineTo(x2, y2)
    this.closePath()
    this.stroke()
  }
  g.drawRect = function (x, y, w, h) {
    this.beginPath()
    this.moveTo(x, y)
    this.lineTo(x + w - 1, y)
    this.lineTo(x + w - 1, y + h - 1)
    this.lineTo(x, y + h - 1)
    this.closePath()
    this.stroke()
  }
  g.fillRect = function (x, y, w, h) {
    this.beginPath()
    this.moveTo(x, y)
    this.lineTo(x + w, y)
    this.lineTo(x + w, y + h)
    this.lineTo(x, y + h)
    this.closePath()
    this.fill()
  }
  g.drawCircle = function (x, y, r) {
    this.beginPath()
    this.arc(x, y, r, 0, Math.PI * 2, false)
    this.closePath()
    this.stroke()
  }
  g.fillCircle = function (x, y, r) {
    this.beginPath()
    this.arc(x, y, r, 0, Math.PI * 2, false)
    this.closePath()
    this.fill()
  }
  g.drawArc = function (x, y, r, srad, erad) {
    this.beginPath()
    this.arc(x, y, r, srad, erad, false)
    this.lineTo(x, y)
    this.closePath()
    this.stroke()
  }
  g.fillArc = function (x, y, r, srad, erad) {
    this.beginPath()
    this.arc(x, y, r, srad, erad, false)
    this.lineTo(x, y)
    this.closePath()
    this.fill()
  }
  // draw arrow
  g.drawArrow = function (x1, y1, x2, y2, arw, arh, fill) {
    const g = this
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.sqrt(dy * dy + dx * dx)
    const th = Math.atan2(dy, dx)
    const th2 = th - Math.PI / 2
    if (len < arh * 1.5) {
      arh = len / 1.5
      if (arh / 2 < arw) {
      arw = arh / 2
    }
    }
    const dx1 = Math.cos(th2) * arw
    const dy1 = Math.sin(th2) * arw
    const dx2 = Math.cos(th) * (len - arh)
    const dy2 = Math.sin(th) * (len - arh)
    const dx3 = Math.cos(th2) * (arh - arw)
    const dy3 = Math.sin(th2) * (arh - arw)
    g.beginPath()
    g.moveTo(x1, y1)
    g.lineTo(x1 + dx1, y1 + dy1)
    g.lineTo(x1 + dx1 + dx2, y1 + dy1 + dy2)
    g.lineTo(x1 + dx1 + dx2 + dx3, y1 + dy1 + dy2 + dy3)
    g.lineTo(x2, y2)
    g.lineTo(x1 - dx1 + dx2 - dx3, y1 - dy1 + dy2 - dy3)
    g.lineTo(x1 - dx1 + dx2, y1 - dy1 + dy2)
    g.lineTo(x1 - dx1, y1 - dy1)
    g.closePath()
    if (fill) {
    g.fill()
  } else {
    g.stroke()
  }
  }
  g.fillArrow = function (x1, y1, x2, y2, arw, arh) {
    this.drawArrow(x1, y1, x2, y2, arw, arh, true)
  }
  g.fillTextCenter = function (s, x, y) {
    const met = this.measureText(s)
    const sw = met.width
    this.fillText(s, x - sw / 2, y)
  }
  g.setFontSize = function (fonth) {
    g.font = 'normal ' + fonth + 'px sans-serif'
  }
};
export { extendGraphics };
