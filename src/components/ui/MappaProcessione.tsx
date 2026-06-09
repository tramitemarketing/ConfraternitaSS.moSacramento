"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Coordinate GPS approssimative del percorso nel centro storico di Monteprandone
// (rifinibili con MYMAPS_EMBED_URL in Processione.tsx se si vuole maggiore precisione)
const PERCORSO: [number, number][] = [
  [42.9205, 13.8352], // Chiesa San Nicolò di Bari — partenza/rientro
  [42.9199, 13.8360], // Via Giacomo Leopardi
  [42.9194, 13.8355], // Via Roma
  [42.9190, 13.8347], // Piazza 14 Novembre
  [42.9193, 13.8339], // Via Corso
  [42.9199, 13.8334], // Via Tavernette
  [42.9206, 13.8333], // Via Orti
  [42.9213, 13.8340], // Contrada Macigne
  [42.9212, 13.8350], // Via Borgo da Monte
  [42.9208, 13.8358], // Via Borgo da Sole
  [42.9205, 13.8352], // Rientro in chiesa
];

const TAPPE = [
  "Chiesa San Nicolò di Bari — partenza ore 21:00",
  "Via Giacomo Leopardi",
  "Via Roma",
  "Piazza 14 Novembre",
  "Via Corso",
  "Via Tavernette",
  "Via Orti",
  "Contrada Macigne",
  "Via Borgo da Monte",
  "Via Borgo da Sole",
  "Rientro in chiesa",
];

export default function MappaProcessione() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      const leafletModule = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      const L = leafletModule.default;

      // Fix webpack asset resolution for default markers
      // @ts-expect-error private Leaflet field
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [42.9201, 13.8347],
        zoom: 17,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // OpenStreetMap tiles — dark-ish variant via Stadia
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Polyline del percorso in oro
      L.polyline(PERCORSO, {
        color: "#C9A24A",
        weight: 5,
        opacity: 0.9,
        lineJoin: "round",
        lineCap: "round",
      }).addTo(map);

      // Marcatore freccia lungo il percorso (mostra la direzione)
      const arrowIcon = (label: string) =>
        L.divIcon({
          className: "",
          html: `<div style="
            background:#C9A24A;color:#0A0A0B;
            border-radius:50%;width:22px;height:22px;
            display:flex;align-items:center;justify-content:center;
            font-size:10px;font-weight:bold;
            border:2px solid #fff;
            box-shadow:0 2px 6px rgba(0,0,0,0.6);
            font-family:sans-serif;
          ">${label}</div>`,
          iconAnchor: [11, 11],
          iconSize: [22, 22],
        });

      // Icona chiesa (inizio e fine)
      const churchIcon = L.divIcon({
        className: "",
        html: `<div style="
          background:#0A0A0B;color:#C9A24A;
          border-radius:50%;width:28px;height:28px;
          display:flex;align-items:center;justify-content:center;
          font-size:14px;
          border:2px solid #C9A24A;
          box-shadow:0 2px 8px rgba(0,0,0,0.7);
        ">✝</div>`,
        iconAnchor: [14, 14],
        iconSize: [28, 28],
      });

      // Marker chiesa con popup
      L.marker(PERCORSO[0], { icon: churchIcon })
        .bindPopup(
          `<div style="font-family:sans-serif;min-width:160px">
            <strong style="color:#8C6A2B">Chiesa San Nicolò di Bari</strong><br/>
            <span style="font-size:12px">Partenza e rientro<br/>Venerdì Santo · ore 21:00</span>
          </div>`
        )
        .addTo(map);

      // Marker numerati per le tappe intermedie (1–9)
      PERCORSO.slice(1, -1).forEach((latlng, i) => {
        L.marker(latlng, { icon: arrowIcon(String(i + 1)) })
          .bindPopup(
            `<div style="font-family:sans-serif">
              <span style="font-size:12px">${TAPPE[i + 1]}</span>
            </div>`
          )
          .addTo(map);
      });

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}
