const extendUI = function(comp) { // onuidown, onuimove, onuiup
	const istouch = 'ontouchstart' in window;
	const usecapture = false;
	if (istouch) {
		comp.addEventListener("touchstart", function(e) {
			if (this.onuidown != null) {
				if (!this.onuidown(
					(e.changedTouches[0].pageX - this.offsetLeft) * this.ratio,
					(e.changedTouches[0].pageY - this.offsetTop) * this.ratio
				)) {
					e.preventDefault();
				}
			}
		}, usecapture);
		comp.addEventListener("touchmove", function(e) {
			if (this.onuimove != null) {
				if (!this.onuimove(
					(e.changedTouches[0].pageX - this.offsetLeft) * this.ratio,
					(e.changedTouches[0].pageY - this.offsetTop) * this.ratio
				)) {
					e.preventDefault();
				}
			}
		}, usecapture);
		comp.addEventListener("touchend", function(e) {
			if (this.onuiup != null) {
				if (!this.onuiup(
					(e.changedTouches[0].pageX - this.offsetLeft) * this.ratio,
					(e.changedTouches[0].pageY - this.offsetTop) * this.ratio
				)) {
					e.preventDefault();
				}
			}
		}, usecapture);
	}
	comp.addEventListener("mousedown", function(e) {
		if (this.onuidown != null) {
			this.onuidown(e.offsetX * this.ratio, e.offsetY * this.ratio);
		}
	}, usecapture);
	comp.addEventListener("mousemove", function(e) {
		if (this.onuimove != null) {
			this.onuimove(e.offsetX * this.ratio, e.offsetY * this.ratio);
		}
	}, usecapture);
	comp.addEventListener("mouseup", function(e) {
		if (this.onuiup != null) {
			this.onuiup(e.offsetX * this.ratio, e.offsetY * this.ratio);
		}
	}, usecapture);
};
export { extendUI };
