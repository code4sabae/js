const hsl2rgb = (h, s, l) => { // h:0-360, s:0-1, l:0-1
	const s2 = (s * (1. - Math.abs((2 * l) - 1)) / 2);
	const max = l + s2;
	const min = l - s2;
	while (h < 0) {
		h += 360;
	}
	const n = Math.floor(h / 60) % 6;
	let rgb = [];
	switch (n) {
		case 0:
			rgb = [max, min + (max - min) * (h / 60), min];
			break;
		case 1:
			rgb = [min + (max - min) * ((120 - h) / 60), max, min];
			break;
		case 2:
			rgb = [min, max, min + (max - min) * ((h - 120) / 60)];
			break;
		case 3:
			rgb = [min, min + (max - min) * ((240 - h) / 60), max];
			break;
		case 4:
			rgb = [min + (max - min) * ((h - 240) / 60), min, max];
			break;
		case 5:
			rgb = [max, min, min + (max - min) * (360 - h / 60)];
			break;
	}
	return rgb.map(v => v * 255);
};
export { hsl2rgb };
