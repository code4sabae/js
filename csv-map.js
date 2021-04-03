import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";
import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.mjs";

class CSVMap extends HTMLElement {
  constructor () {
    super();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://code4sabae.github.io/leaflet-mjs/leaflet.css";
    this.appendChild(link);
    link.onload = () => this.init();
  }
  async init () {
    const div = document.createElement("div");
    this.appendChild(div);
    div.style.width = this.getAttribute("width") || "100%";
    div.style.height = this.getAttribute("height") || "60vh";
    const icon = this.getAttribute("icon");
    const iconsize = this.getAttribute("iconsize") || 30;

    const map = L.map(div);
    // set 国土地理院地図 https://maps.gsi.go.jp/development/ichiran.html
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"',
      maxZoom: 18,
    }).addTo(map);

    const iconlayer = L.layerGroup();
    iconlayer.addTo(map);

    const fn = this.getAttribute("src");
    console.log(fn);
    const data = CSV.toJSON(await CSV.fetch(fn));

    const makeTable = (d) => {
      const tbl = [];
      tbl.push("<table>");
      for (const name in d) {
        const val = d[name];
        if (val) {
          if (name == "sabaecc:geo3x3") {
            tbl.push(`<tr><th>${name}</th><td><a href=https://code4sabae.github.io/geo3x3-map/#${d[name]}>${d[name]}</a></td></tr>`);
          } else {
            tbl.push(`<tr><th>${name}</th><td>${d[name]}</td></tr>`);
          }
        }
      }
      tbl.push("</table>");
      return tbl.join("");
    };

    console.log(data);
    const lls = [];
    for (const d of data) {
      const getLatLng = (d) => {
        const geo3x3 = d["sabaecc:geo3x3"] || d["geo3x3"];
        if (geo3x3) {
          const pos = Geo3x3.decode(geo3x3);
          return [pos.lat, pos.lng];
        }
        const lat = d["schema:latitude"] || d["lattiude"] || d["lat"] || d["緯度"] || d["ic:緯度"];
        const lng = d["schema:longitude"] || d["longitude"] || d["lng"] || d["lon"] || d["経度"] || d["ic:経度"];
        return [lat, lng];
      };
      const ll = getLatLng(d);
      if (!ll) {
        continue;
      }
      const title = d["schema:name"] || d["name"];
      const url = d["schema:url"] || d["url"];
      const opt = { title };
      if (icon) {
        opt.icon = L.icon({
          iconUrl: icon,
          iconRetilaUrl: icon,
          iconSize: [iconsize, iconsize],
          iconAnchor: [iconsize / 2, iconsize / 2],
          popupAnchor: [0, -iconsize / 2],
        });
      }
      const marker = L.marker(ll, opt);
      const tbl = makeTable(d);
      marker.bindPopup((title ? `<a href=${url}>${title}</a>` : "") + tbl);
      iconlayer.addLayer(marker);
      lls.push(ll);
    }
    if (lls.length) {
      map.fitBounds(lls);
    }
  }
}

customElements.define('csv-map', CSVMap);
