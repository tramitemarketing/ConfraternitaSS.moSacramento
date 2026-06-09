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

      // Icona croce dorata sulla chiesa di partenza
      const churchIcon = L.divIcon({
        className: "",
        html: `<div style="
          background:#0A0A0B;color:#C9A24A;
          border-radius:50%;width:34px;height:34px;
          display:flex;align-items:center;justify-content:center;
          font-size:18px;line-height:1;
          border:2px solid #C9A24A;
          box-shadow:0 2px 10px rgba(0,0,0,0.7);
        ">✝</div>`,
        iconAnchor: [17, 17],
        iconSize: [34, 34],
      });

      L.marker(CHIESA, { icon: churchIcon })
        .bindPopup(
          `<div style="font-family:sans-serif;min-width:170px">
            <strong style="color:#8C6A2B">Chiesa San Nicolò di Bari</strong><br/>
            <span style="font-size:12px">Partenza della Processione<br/>Venerdì Santo · ore 21:00</span>
          </div>`
        )
        .addTo(map);

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
