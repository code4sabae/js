export const setSprite = div => {
  div.style.position = "absolute";
  div.locate = function (x, y) {
    div.style.left = x + "px";
    div.style.top = y + "px";
  };
  div.onclick = function () {
    this.clicked = true;
  };
  div.isClicked = function () {
    const res = this.clicked;
    this.clicked = false;
    return res;
  };
  div.waitClick = function () {
    return new Promise(resolve => {
      const f = () => {
        resolve();
        this.removeEventListener("click", f);
      };
      this.addEventListener("click", f);
    });
  };
};
