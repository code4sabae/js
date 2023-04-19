export const addComma = (num, beam) => {
	const flg = num < 0;
	if (flg) num = -num;
	if (beam == null) beam = 0;
	if (isNaN(parseFloat(num))) return num;
	const f = parseFloat(num) - parseInt(num);
	let s = "" + parseInt(num);
	for (let i = 3; i < s.length; i += 4) {
		s = s.substring(0, s.length - i) + "," + s.substring(s.length - i);
	}
	if (beam > 0) {
		s += "." + fixnum(Math.floor(f * Math.pow(10, beam)), beam);
	}
	return (flg ? "-" : "") + s;
};
export const removeComma = (s, b) => {
	if (s.length == 0) return s;
	const s2 = s.replace(/,/g, "");
	const n = parseFloat(s2);
	if (!isNaN(n)) return n;
	return s;
};
const fixnum = (n, m) => {
	const s = '00000000000000000' + n;
	return s.substring(s.length - m);
};
