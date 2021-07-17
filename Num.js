// from fukuno.js

var addComma = function(num, beam) {
	var flg = num < 0;
	if (flg)
		num = -num;
	if (beam == null)
		beam = 0;
	if (isNaN(parseFloat(num)))
		return num;
	var f = parseFloat(num) - parseInt(num);
	var s = "" + parseInt(num);
	for (var i = 3; i < s.length; i += 4) {
		s = s.substring(0, s.length - i) + "," + s.substring(s.length - i);
	}
	if (beam > 0) {
		s += "." + fixnum(Math.floor(f * Math.pow(10, beam)), beam);
	}
	return (flg ? "-" : "") + s;
};
var removeComma = function(s, b) {
	if (s.length == 0)
		return s;
	var s2 = s.replace(/,/g, "");
	var n = parseFloat(s2);
	if (!isNaN(n))
		return n;
	return s;
};
var fixnum = function(n, m) {
	var s = '00000000000000000' + n;
	return s.substring(s.length - m);
};
var fixfloat = function(d, beam) {
	if (beam == 0)
		return Math.floor(d);
	var minus = "";
	if (d < 0) {
		d = -d;
		minus = "-";
	}
	if (beam == null)
		beam = 2;
	var k = Math.pow(10, beam);
	d *= k;
	var m = Math.floor(d % k);
	var s = Math.floor(d / k);
	return minus + s + "." + fixnum(m, beam);
};
var dec2hex = function(n, beam) {
	var hex = "";
	for (var i = 0; i < beam; i++) {
		var m = n & 0xf;
		hex = '0123456789abcdef'.charAt(m) + hex;
		n -= m;
		n >>= 4;
	}
	return hex;
};
var hex2bin = function(s) {
	var res = '';
	for (var i = 0; i < s.length; i++) {
		var n = '0123456789abcdef'.indexOf(s.charAt(i));
		if (n < 0)
			n = 0;
		for (var j = 0; j < 4; j++) {
			res += (n & (1 << (3 - j))) != 0 ? '1' : '0';
		}
	}
	return res;
};

const Num = { addComma, removeComma };
export { Num };

