import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const EMBED_IMAGE = true;
const EMBED_IMAGE_W = 100; // 300;
const EMBED_IMAGE_H = 100; // 225;

const create = (tag) => document.createElement(tag);
const clear = (ele) => ele.innerHTML = "";

const main = async (parent) => {
	const url = parent.getAttribute("src");
	const name = parent.getAttribute("name") || url;

	const csv = await CSV.fetch(url);
	const filter = create("input");
	filter.className = "filter";
	filter.placeholder = "フィルター";
	parent.appendChild(filter);
	const tbl = create("div");
	parent.appendChild(tbl);
	showTable(tbl, csv, filter.value);
	filter.onchange = filter.onkeyup = () => showTable(tbl, csv, filter.value);

	const data = create("div");
	data.innerHTML = `DATA: <a href=${url}>${name}</a>`
	parent.appendChild(data);
};

const showTable = function(p, csv, sfilter, sortidx, sortorder) {
	var array = []
	array.push(csv[0])
	if (sfilter.length == 0) {
		for (var i = 1; i < csv.length; i++) {
			array.push(csv[i])
		}
	} else {
		const afilter = sfilter.split(" ")
		for (var i = 1; i < csv.length; i++) {
			const ar = csv[i]
			var flg = false
			for (var k = 0; k < afilter.length; k++) {
				const af = afilter[k]
				flg = false
				for (var j = 0; j < ar.length; j++) {
					if (ar[j].indexOf(af) >= 0) {
						flg = true;
						break;
					}
				}
				if (!flg)
					break
			}
			if (flg)
				array.push(ar)
		}
	}


	const getNumber = function(s) {
		if (s.length == 0)
			return Math.NaN
		let i
		for (i = 0; i < s.length; i++) {
			if ("0123456789.,".indexOf(s.charAt(i)) == -1) {
				break
			}
		}
		if (i == 0)
			return Math.NaN
		return parseFloat(s.substring(0, i).replace(/,/g, ""))
	}

	/*
	console.log(getNumber("") == Math.NaN)
	console.log(getNumber("n/a") == Math.NaN)
	console.log(getNumber("1,500"))
	console.log(getNumber("3.45%"))
	*/
	// nline.textContent = array.length - 1
	if (sortidx != undefined) {
		var head = array[0];
		array.shift();
		var arbk = [];
		for (var i = 0; i < array.length; i++) {
			arbk.push(array[i]);
		}
		array.sort(function(a, b) {
			var an = a[sortidx];
			var bn = b[sortidx];
			for (var am = 0;; am++)
				if (arbk[am] == a)
					break;
			for (var bm = 0;; bm++)
				if (arbk[bm] == b)
					break;
			var flg = 0;
			if (an == bn) {
				flg = sortorder ? am - bm : bm - am;
			} else {
				// cut unit
				let ad = getNumber(an)
				let bd = getNumber(bn)
				if (ad == Math.NaN && bd == Math.NaN) {
					flg = an > bn ? 1 : -1
				} else if (ad == Math.NaN) {
					flg = -1
				} else if (bd == Math.NaN) {
					flg = 1
				} else {
					flg = ad > bd ? 1 : -1
				}

				/*
				var anv = parseFloat(an);
				var bnv = parseFloat(bn);
				if (an == anv && bn == bnv) {
					flg = anv > bnv ? 1 : -1;
				} else {
					flg = an > bn ? 1 : -1;
				}
				*/
			}
			return flg * (sortorder ? 1 : -1);
		});
		array.splice(0, 0, head);
	}
	
	var tbl = create("table");
	
	var tr = create("tr");
	var td = create("th")
	td.textContent = "-"
	tr.appendChild(td)

	var dd = array[0];
	for (var j = 0; j < dd.length; j++) {
		var td = create("th");
		var val = dd[j];
		var lbl = create("span");
		lbl.textContent = val;
		td.appendChild(lbl);
		var up = create("span");
		up.idx = j;
		up.className = "sort";
		up.textContent = "▲";
		up.onclick = function() {
			showTable(p, array, sfilter, this.idx, true);
		};
		td.appendChild(up);
		var down = create("span");
		down.idx = j;
		down.className = "sort";
		down.textContent = "▼";
		down.onclick = function() {
			showTable(p, array, sfilter, this.idx, false);
		};
		td.appendChild(down);
		tr.appendChild(td);
	}
	tbl.appendChild(tr);
	for (var i = 1; i < array.length; i++) {
		var dd = array[i];
		var tr = create("tr");

		var td = create("td")
		td.textContent = i
		tr.appendChild(td)

		for (var j = 0; j < dd.length; j++) {
			var td = create("td");
			var val = dd[j];
			if (val.startsWith("http://") || val.startsWith("https://")) {
				var s = "";
				val = val.replace(/</g, "&lt;");
				val = val.replace(/>/g, "&gt;");
//				if (val.toLowerCase().endsWith(".jpg") || val.toLowerCase().endsWith(".png")) {
				if (val.toLowerCase().endsWith(".jpg")) {
					if (EMBED_IMAGE) {
						s = "<img src='" + getResizedImageURL(val, EMBED_IMAGE_W, EMBED_IMAGE_H) + "'><br>";
						s += "<a href=" + val + ">" + val + "</a>";
					} else {
						s += "<a href=" + val + ">" + val + "</a>";
					}
				} else {
					s += "<a href=" + val + ">" + val + "</a>";
				}
				td.innerHTML = s;
			} else {
				val = val.replace(/</g, "&lt;");
				val = val.replace(/>/g, "&gt;");
				val = val.replace(/\\n/g, "<br>");
				td.innerHTML = val;
			}
			tr.appendChild(td);
		}
		tbl.appendChild(tr);
	}
	clear(p);
	p.appendChild(tbl);
};

class CSVViewer extends HTMLElement {
  constructor () {
    super();
    main(this);
  }
}

customElements.define('csv-viewer', CSVViewer);
