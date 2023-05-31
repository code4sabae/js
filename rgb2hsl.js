export const rgb2hsl = (rgb) => {
	const cssmode = typeof rgb == "string";
	if (cssmode) {
		rgb = [
			parseInt(rgb.substring(1, 3), 16),
			parseInt(rgb.substring(3, 5), 16),
			parseInt(rgb.substring(5, 7), 16),
		];
	}
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const diff = max - min;
	let h = 0;
	const l = (max + min) / 2;
	const s = diff / (1 - (Math.abs(max + min - 1)));
	switch (min) {
		case max:
			h = 0;
			break;
		case r:
			h = (60 * ((b - g) / diff)) + 180;
			break;
		case g:
			h = (60 * ((r - b) / diff)) + 300;
			break;
		case b:
			h = (60 * ((g - r) / diff)) + 60;
	}
	if (cssmode) {
		return `hsl(${h.toFixed(0)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
	}
	return [h, s, l];
};
