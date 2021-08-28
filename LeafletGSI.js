import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";
import { LeafletSprite } from "https://taisukef.github.io/leaflet.sprite-es/src/sprite.js";
LeafletSprite.init(L);

const initMap = async (div) => {
    //await loadCSS("https://code4sabae.github.io/leaflet-mjs/leaflet-grayscale.css");
    await loadCSS("https://code4sabae.github.io/leaflet-mjs/leaflet.css");
    const map = L.map(div);
    // set 国土地理院地図 https://maps.gsi.go.jp/development/ichiran.html
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
        attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"',
        maxZoom: 18,
    }).addTo(map);
    return map;
};
const loadCSS = async (css) => {
    return new Promise((resolve) => {
        const comp = document.body;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = css;
        comp.appendChild(link);
        link.onload = () => resolve();
    });
};

const LeafletGSI = {
    initMap,
};

export { LeafletGSI }
