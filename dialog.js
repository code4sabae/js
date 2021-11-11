import { css } from "https://js.sabae.cc/stdom.js";
import { PopupAlert } from "https://code4fukui.github.io/popup-alert/popup-alert.js";
import { PopupConfirm } from "https://code4fukui.github.io/popup-confirm/popup-confirm.js";

css("https://code4fukui.github.io/popup-alert/popup-alert.css");
css("https://code4fukui.github.io/popup-confirm/popup-confirm.css");

export const alert = async (s) => {
  return await PopupAlert.show(s);
};

export const confirm = async (s) => {
  return await PopupConfirm.show(s);
};
