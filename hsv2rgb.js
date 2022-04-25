import { fix0 } from "https://js.sabae.cc/fix0.js";

const rgb2hash = (r, g, b) => {
  return "#" + fix0(r.toString(16), 2) + fix0(g.toString(16), 2) + fix0(b.toString(16), 2)
};
export const hsv2rgb = (h, s, v) => {
	while (h < 0) {
		h += 360;
  }
	h %= 360;
	if (s == 0) {
		v *= 255;
		return rgb2hash(v, v, v);
	}
	const hi = h / 60 >> 0;
	const f = h / 60 - hi;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
	let rgb = [ 1, 1, 1 ];
	if (hi == 0)
		rgb = [ v, t, p ];
	else if (hi == 1)
		rgb = [ q, v, p ];
	else if (hi == 2)
		rgb = [ p, v, t ];
	else if (hi == 3)
		rgb = [ p, q, v ];
	else if (hi == 4)
		rgb = [ t, p, v ];
	else if (hi == 5)
		rgb = [ v, p, q ];
	rgb[0] = rgb[0] * 255 >> 0;
	rgb[1] = rgb[1] * 255 >> 0;
	rgb[2] = rgb[2] * 255 >> 0;
	return rgb2hash(rgb[0], rgb[1], rgb[2]);
};
