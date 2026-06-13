"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Posizione della Chiesa San Nicolò di Bari, Monteprandone (centro storico)
const CHIESA: [number, number] = [42.9205, 13.8352];

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

      const map = L.map(containerRef.current, {
        center: CHIESA,
        zoom: 17,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Pin scuro con croce dorata sulla Chiesa San Nicolò di Bari
      const pinIcon = L.divIcon({
        className: "",
        html: `
          <svg width="40" height="52" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="pinShadow" x="-30%" y="-10%" width="160%" height="130%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
              </filter>
            </defs>
            <path d="M20 1 C9.5 1 1 9.5 1 20 C1 34.5 20 51 20 51 C20 51 39 34.5 39 20 C39 9.5 30.5 1 20 1 Z"
              fill="#15130E" stroke="#C9A24A" stroke-width="2" filter="url(#pinShadow)"/>
            <g stroke="#C9A24A" stroke-width="2.6" stroke-linecap="round">
              <line x1="20" y1="8.5" x2="20" y2="28"/>
              <line x1="12.5" y1="15" x2="27.5" y2="15"/>
            </g>
          </svg>`,
        iconSize: [40, 52],
        iconAnchor: [20, 51],
        popupAnchor: [0, -46],
      });

      L.marker(CHIESA, { icon: pinIcon })
        .addTo(map)
        .bindPopup("Chiesa San Nicolò di Bari");

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
