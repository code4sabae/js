// https://aframe.io/
import "https://code4fukui.github.io/aframe/dist/aframe-master.min.js";

export const cr = (tag, parent) => {
  const c = document.createElement(tag);
  if (parent) {
    parent.appendChild(c);
  }
  return c;
};

export const rgb = (r, g, b) => `rgb(${r},${g},${b})`;

export const asset = (url) => {
  const scene = document.body.querySelector("a-scene");
  const assets = scene.querySelector("a-assets") || cr("a-assets", scene);
  const a = cr("a-asset-item");
  const aid = "asset" + (assets.childNodes.length + 1);
  a.setAttribute("id", aid);
  a.setAttribute("src", url);
  assets.appendChild(a);
  return "#" + aid;
};
